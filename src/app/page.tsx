import type { Metadata } from "next";
import { FinalCTA } from "@/components/content/FinalCTA";
import {
  ApproachPanel,
  CallOuts,
  Conversation,
  GrowMedia,
  JournalPanel,
  LandingHero,
  MentorPanel,
  Pathways,
  Statement,
  WordScene,
  consultationCallouts,
  differenceCallouts,
  toSceneStories,
} from "@/components/home/Landing";
import { getArticles, getMentorRoles, getProgrammes, getVideoStories } from "@/lib/cms";
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
  const [programmes, roles, stories, articles] = await Promise.all([getProgrammes(), getMentorRoles(), getVideoStories(), getArticles()]);
  const latest = [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 8);

  return (
    <>
      <LandingHero />
      <WordScene stories={toSceneStories(stories)} />
      <Statement />
      <ApproachPanel />
      <GrowMedia src="/media/photos/campus-walk.webp" alt="Students talking outside a university building" />
      <CallOuts id="difference-title" title="Built around each student" items={differenceCallouts} />
      <JournalPanel articles={latest} />
      <Pathways programmes={programmes} />
      <MentorPanel roles={roles} />
      <Conversation />
      <CallOuts id="consult-title" title="What a first consultation gives you" items={consultationCallouts} />
      <FinalCTA source="home-final" />
    </>
  );
}
