"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { getAttribution, track } from "@/lib/analytics";
import { useIsClient } from "@/lib/hooks";
import {
  countries,
  dialCodes,
  getIntakes,
  roles,
  services,
  studyLevels,
  type ServiceInterest,
} from "@/lib/leads/options";
import { site, whatsappHref } from "@/content/site";
import { ArrowIcon } from "@/components/ui/primitives";

type Values = {
  fullName: string;
  email: string;
  phoneCountry: string;
  phone: string;
  studyLevel: string;
  role: string;
  country: string;
  intake: string;
  service: string;
  message: string;
  consent: boolean;
  website: string;
};

type Errors = Partial<Record<keyof Values | "form", string>>;
type Status = "idle" | "submitting" | "success" | "error";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: { render: (el: HTMLElement, opts: Record<string, unknown>) => string; reset: (id?: string) => void };
  }
}

function validateStep1(v: Values): Errors {
  const e: Errors = {};
  if (v.fullName.trim().length < 2) e.fullName = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Please enter a valid email address.";
  const digits = v.phone.replace(/\D/g, "").length;
  if (!/^[\d\s().-]+$/.test(v.phone.trim()) || digits < 6 || digits > 14) e.phone = "Please enter a valid phone number.";
  if (!v.studyLevel) e.studyLevel = "Please choose what you’re planning to study.";
  return e;
}

const fieldClass =
  "mt-2 block w-full rounded-xl border border-line-strong bg-canvas px-4 py-3 text-[1rem] text-ink placeholder:text-ink-soft/60 transition-[border-color,box-shadow] focus:border-brand-bright focus:outline-none focus:ring-4 focus:ring-brand-bright/15 aria-[invalid=true]:border-danger";

function Field({ id, label, hint, error, children, optional }: { id: string; label: string; hint?: string; error?: string; children: ReactNode; optional?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between gap-4 text-[0.95rem] font-medium">
        <span>{label}</span>
        {optional ? <span className="t-label text-xs text-ink-soft">Optional</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-2 text-sm text-ink-soft">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ConsultationForm({
  source,
  defaultService,
  titleId,
  heading = "Let’s talk about your next step.",
}: {
  source: string;
  defaultService?: ServiceInterest;
  titleId?: string;
  heading?: string;
}) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const startedAt = useRef<number>(0);
  const submissionId = useRef<string>("");
  const started = useRef(false);
  const step2Heading = useRef<HTMLHeadingElement>(null);
  const errorSummary = useRef<HTMLDivElement>(null);
  const turnstileBox = useRef<HTMLDivElement>(null);
  const turnstileToken = useRef<string>("");

  const [step, setStep] = useState<1 | 2>(1);
  const isClient = useIsClient();
  // Intake years depend on today's date, so they are computed in the browser only.
  const intakes = useMemo(() => (isClient ? getIntakes(new Date().getFullYear()) : []), [isClient]);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [reference, setReference] = useState("");
  const [values, setValues] = useState<Values>({
    fullName: "",
    email: "",
    phoneCountry: "+91",
    phone: "",
    studyLevel: "",
    role: "",
    country: "",
    intake: "",
    service: defaultService ?? "",
    message: "",
    consent: false,
    website: "",
  });

  useEffect(() => {
    startedAt.current = Date.now();
    submissionId.current = crypto.randomUUID();
  }, []);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onFirstInteraction = () => {
    if (started.current) return;
    started.current = true;
    track("consultation_form_start", { source });
  };

  const describedBy = (name: keyof Values, hint = false) =>
    errors[name] ? `${id(name)}-error` : hint ? `${id(name)}-hint` : undefined;

  const goToStep2 = () => {
    const e = validateStep1(values);
    setErrors(e);
    if (Object.keys(e).length) {
      requestAnimationFrame(() => errorSummary.current?.focus());
      return;
    }
    track("consultation_step_complete", { source, step: 1, study_level: values.studyLevel });
    setStep(2);
    requestAnimationFrame(() => step2Heading.current?.focus());
  };

  const renderTurnstile = () => {
    if (!TURNSTILE_SITE_KEY || !turnstileBox.current || !window.turnstile || turnstileBox.current.childElementCount) return;
    window.turnstile.render(turnstileBox.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token: string) => {
        turnstileToken.current = token;
      },
    });
  };

  useEffect(() => {
    if (step === 2) renderTurnstile();
  }, [step]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (step === 1) return goToStep2();
    const e1 = validateStep1(values);
    const e: Errors = { ...e1 };
    if (!values.consent) e.consent = "Please confirm we may contact you about your enquiry.";
    setErrors(e);
    if (Object.keys(e).length) {
      if (Object.keys(e1).length) setStep(1);
      requestAnimationFrame(() => errorSummary.current?.focus());
      return;
    }

    setStatus("submitting");
    const attribution = { ...getAttribution(), source, pagePath: window.location.pathname };
    try {
      const res = await fetch("/api/consultation/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          submissionId: submissionId.current,
          fullName: values.fullName,
          email: values.email.trim(),
          phoneCountry: values.phoneCountry,
          phone: values.phone,
          studyLevel: values.studyLevel,
          role: values.role || undefined,
          country: values.country || undefined,
          intake: values.intake || undefined,
          service: values.service || undefined,
          message: values.message || undefined,
          consent: values.consent,
          website: values.website,
          elapsedMs: Date.now() - startedAt.current,
          turnstileToken: turnstileToken.current || undefined,
          attribution,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; reference?: string; message?: string; fieldErrors?: Errors };
      if (res.ok && data.ok) {
        setReference(data.reference ?? "");
        setStatus("success");
        track("consultation_submit", { source, study_level: values.studyLevel, service: values.service || undefined });
        submissionId.current = crypto.randomUUID();
        return;
      }
      const fe = data.fieldErrors ?? {};
      setErrors({ ...fe, form: data.message ?? "Something went wrong. Please try again." });
      if (fe.fullName || fe.email || fe.phone || fe.studyLevel) setStep(1);
      setStatus("error");
      track("consultation_submit_error", { source, status: res.status });
      if (TURNSTILE_SITE_KEY) window.turnstile?.reset();
      requestAnimationFrame(() => errorSummary.current?.focus());
    } catch {
      setErrors({ form: `We couldn’t reach our server. Please check your connection, or call us on ${site.phone.display}.` });
      setStatus("error");
      track("consultation_submit_error", { source, status: "network" });
      requestAnimationFrame(() => errorSummary.current?.focus());
    }
  }

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="py-6">
        <p className="t-label text-ink">Request received{reference ? ` · Ref. ${reference}` : ""}</p>
        <h2 id={titleId} className="t-title mt-5" tabIndex={-1}>
          Thank you, {values.fullName.split(" ")[0]}.
        </h2>
        <p className="t-lead mt-5 text-ink-soft">
          Your request has reached the Ethos team. A counsellor will contact you on {values.phoneCountry} {values.phone} or {values.email} to arrange your consultation.
        </p>
        <div className="mt-10 border-t border-line pt-8">
          <p className="text-[0.95rem] text-ink-soft">Prefer to talk now?</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { source: "form-success" })}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/80 px-5 font-medium hover:bg-ink hover:text-canvas"
            >
              WhatsApp us
            </a>
            <a
              href={`tel:${site.phone.e164}`}
              onClick={() => track("phone_click", { source: "form-success" })}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/80 px-5 font-medium hover:bg-ink hover:text-canvas"
            >
              Call {site.phone.display}
            </a>
          </div>
        </div>
      </div>
    );
  }

  const errorList = Object.entries(errors).filter(([, v]) => v) as [keyof Values | "form", string][];

  return (
    <form noValidate onSubmit={onSubmit} onFocusCapture={onFirstInteraction} className="space-y-8">
      {TURNSTILE_SITE_KEY ? (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="lazyOnload" onLoad={renderTurnstile} />
      ) : null}

      <header>
        <p className="t-label text-ink-soft" aria-live="polite">
          Step {step} of 2 · {step === 1 ? "About you" : "A few details (optional)"}
        </p>
        <h2 id={titleId} className="t-title mt-4">
          {step === 1 ? heading : <span ref={step2Heading} tabIndex={-1} className="outline-none">Anything else we should know?</span>}
        </h2>
        <div className="mt-6 flex gap-2" aria-hidden="true">
          <span className="h-1 flex-1 rounded-full bg-ink" />
          <span className={`h-1 flex-1 rounded-full transition-colors duration-500 ${step === 2 ? "bg-ink" : "bg-cloud"}`} />
        </div>
      </header>

      {errorList.length ? (
        <div ref={errorSummary} tabIndex={-1} role="alert" className="rounded-xl border border-danger/30 bg-danger/5 px-5 py-4 outline-none">
          <p className="font-medium">{errors.form ?? "Please check the following:"}</p>
          {errorList.filter(([k]) => k !== "form").length ? (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
              {errorList
                .filter(([k]) => k !== "form")
                .map(([k, msg]) => (
                  <li key={k}>{msg}</li>
                ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      {/* Honeypot — invisible to people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Website</label>
        <input id={id("website")} name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set("website", e.target.value)} />
      </div>

      <div className={step === 1 ? "space-y-7" : "hidden"}>
        <Field id={id("fullName")} label="Full name" error={errors.fullName}>
          <input
            id={id("fullName")}
            name="fullName"
            autoComplete="name"
            required
            className={fieldClass}
            value={values.fullName}
            onChange={(e) => set("fullName", e.target.value)}
            aria-invalid={!!errors.fullName}
            aria-describedby={describedBy("fullName")}
          />
        </Field>
        <Field id={id("email")} label="Email address" error={errors.email}>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            className={fieldClass}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
          />
        </Field>
        <Field id={id("phone")} label="Phone number" hint="Include the number you use for WhatsApp, if possible." error={errors.phone}>
          <div className="flex gap-2">
            <label htmlFor={id("phoneCountry")} className="sr-only">
              Country code
            </label>
            <select
              id={id("phoneCountry")}
              name="phoneCountry"
              autoComplete="tel-country-code"
              className={`${fieldClass.replace("w-full", "")} w-[8.75rem] shrink-0`}
              value={values.phoneCountry}
              onChange={(e) => set("phoneCountry", e.target.value)}
            >
              {dialCodes.map((d) => (
                <option key={d.code} value={d.code}>
                  {d.label}
                </option>
              ))}
            </select>
            <input
              id={id("phone")}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              required
              className={`${fieldClass} min-w-0 flex-1`}
              value={values.phone}
              onChange={(e) => set("phone", e.target.value)}
              aria-invalid={!!errors.phone}
              aria-describedby={describedBy("phone", true)}
            />
          </div>
        </Field>
        <fieldset aria-describedby={errors.studyLevel ? `${id("studyLevel")}-error` : undefined}>
          <legend className="text-[0.95rem] font-medium">What are you planning to study?</legend>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {studyLevels.map((o) => (
              <label key={o.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="studyLevel"
                  value={o.value}
                  checked={values.studyLevel === o.value}
                  onChange={() => set("studyLevel", o.value)}
                  className="peer sr-only"
                />
                <span className="inline-flex min-h-11 items-center rounded-full border border-line-strong bg-canvas px-4 text-[0.92rem] transition-colors peer-checked:border-brand peer-checked:bg-ink peer-checked:text-canvas peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand hover:border-ink">
                  {o.label}
                </span>
              </label>
            ))}
          </div>
          {errors.studyLevel ? (
            <p id={`${id("studyLevel")}-error`} className="mt-2 text-sm font-medium text-danger">
              {errors.studyLevel}
            </p>
          ) : null}
        </fieldset>
        <div className="pt-2">
          <button
            type="submit"
            className="group/btn inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-ink px-6 font-medium text-canvas transition-colors hover:bg-brand-deep sm:w-auto"
          >
            Continue <ArrowIcon className="transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>

      <div className={step === 2 ? "space-y-7" : "hidden"}>
        <fieldset>
          <legend className="text-[0.95rem] font-medium">I am a…</legend>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {roles.map((o) => (
              <label key={o.value} className="cursor-pointer">
                <input type="radio" name="role" value={o.value} checked={values.role === o.value} onChange={() => set("role", o.value)} className="peer sr-only" />
                <span className="inline-flex min-h-11 items-center rounded-full border border-line-strong bg-canvas px-4 text-[0.92rem] transition-colors peer-checked:border-brand peer-checked:bg-ink peer-checked:text-canvas peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand hover:border-ink">
                  {o.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="grid gap-7 sm:grid-cols-2">
          <Field id={id("country")} label="Preferred country" optional>
            <select id={id("country")} name="country" className={fieldClass} value={values.country} onChange={(e) => set("country", e.target.value)}>
              <option value="">Select…</option>
              {countries.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>
          <Field id={id("intake")} label="Intended intake" optional>
            <select id={id("intake")} name="intake" className={fieldClass} value={values.intake} onChange={(e) => set("intake", e.target.value)}>
              <option value="">Select…</option>
              {intakes.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Field id={id("service")} label="Service of interest" optional>
          <select id={id("service")} name="service" className={fieldClass} value={values.service} onChange={(e) => set("service", e.target.value)}>
            <option value="">Select…</option>
            {services.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id={id("message")} label="Questions or context" optional>
          <textarea
            id={id("message")}
            name="message"
            rows={3}
            maxLength={2000}
            className={`${fieldClass} resize-y`}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
          />
        </Field>

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-[0.95rem] leading-snug">
            <input
              type="checkbox"
              name="consent"
              checked={values.consent}
              onChange={(e) => set("consent", e.target.checked)}
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? `${id("consent")}-error` : `${id("consent")}-hint`}
              className="mt-0.5 h-5 w-5 shrink-0 accent-brand"
            />
            <span>I agree that Ethos Education may contact me by phone, WhatsApp or email about this enquiry.</span>
          </label>
          {errors.consent ? (
            <p id={`${id("consent")}-error`} className="mt-2 text-sm font-medium text-danger">
              {errors.consent}
            </p>
          ) : (
            <p id={`${id("consent")}-hint`} className="mt-2 text-sm text-ink-soft">
              We use your details only to respond to you, along with how you found our site. See our{" "}
              <Link href="/privacy-policy/" className="underline underline-offset-2">
                privacy policy
              </Link>
              .
            </p>
          )}
        </div>

        {TURNSTILE_SITE_KEY ? <div ref={turnstileBox} /> : null}

        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center">
          <button type="button" onClick={() => setStep(1)} className="min-h-12 rounded-full px-5 font-medium text-ink-soft hover:text-ink">
            Back
          </button>
          <button
            type="submit"
            disabled={status === "submitting"}
            aria-busy={status === "submitting"}
            className="group/btn inline-flex min-h-12 flex-1 items-center justify-center gap-3 rounded-full bg-ink px-6 font-medium text-canvas transition-colors hover:bg-brand-deep disabled:opacity-70 sm:flex-none"
          >
            {status === "submitting" ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-canvas/40 border-t-canvas" aria-hidden="true" />
                Sending…
              </>
            ) : (
              <>
                Request my consultation <ArrowIcon className="transition-transform group-hover/btn:translate-x-1" />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
