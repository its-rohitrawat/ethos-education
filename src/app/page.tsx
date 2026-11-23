import type { Metadata } from "next";
import { BrochureHero, CareerBlock, ConsultBlock, Destinations, FAQBand, Numbers, Steps, StoriesBand, WhyEthos, toStoryVideos } from "@/components/home/Brochure";
import { homepageFaqIds } from "@/content/faqs";
import { getDestinations, getFaqs, getProcessSteps, getStats, getVideoStories } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

const base = pageMetadata({
  title: "Ivy League Mentors & Admissions Counselling",
  description:
    "Ethos Education guides students to leading universities in the USA, UK, Canada, Europe and Singapore — with five-expert mentorship, test preparation, scholarships and visa support.",
  path: "/",
});

export const metadata: Metadata = {
  ...base,
  title: { absolute: "Ethos Education — Ivy League Mentors & Admissions Counselling" },
};

export default async function HomePage() {
  const [stories, stats, steps, destinations, faqs] = await Promise.all([getVideoStories(), getStats(), getProcessSteps(), getDestinations(), getFaqs()]);
  const videos = toStoryVideos(stories);
  const homeFaqs = homepageFaqIds
    .map((id) => faqs.find((f) => f.id === id))
    .filter((f): f is NonNullable<typeof f> => Boolean(f))
    .slice(0, 6);

  return (
    <>
      <BrochureHero story={videos[0]} />
      <Numbers stats={stats} />
      <StoriesBand stories={videos} />
      <WhyEthos />
      <Steps steps={steps} />
      <CareerBlock />
      <ConsultBlock />
      <Destinations destinations={destinations} />
      <FAQBand faqs={homeFaqs.length ? homeFaqs : faqs.slice(0, 6)} />
    </>
  );
}
