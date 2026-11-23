import type { Metadata } from "next";
import { FinalCTA } from "@/components/content/FinalCTA";
import { PageHero } from "@/components/content/PageHero";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { DestinationIndex } from "@/components/home/HomeSections";
import { getDestinations } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Study Abroad Destinations — USA, UK, Canada, Europe & Singapore",
  description: "How university admissions work in the USA, UK, Canada, Europe and Singapore — and how Ethos guides Indian students through each system.",
  path: "/study-abroad/",
});

export default async function StudyAbroadPage() {
  const destinations = await getDestinations();
  return (
    <>
      <PageHero
        label="Study destinations"
        title={
          <>
            Your future knows <em>no borders.</em>
          </>
        }
        intro="Every country admits students differently — different systems, different priorities, different calendars. Our destination guides explain how applications really work, and where Ethos makes the difference."
        crumbs={[{ name: "Study abroad", path: "/study-abroad/" }]}
        actions={<ConsultationButton source="destinations-hero">Help me choose a country</ConsultationButton>}
      />
      <section className="section-y pt-16">
        <div className="shell">
          <DestinationIndex destinations={destinations} />
        </div>
      </section>
      <FinalCTA source="destinations-final" />
    </>
  );
}
