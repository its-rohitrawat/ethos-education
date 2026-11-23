import type { JournalArticle, JournalTopic } from "../types";
import raw from "./articles.json";
import { journalTopics } from "./topics";

export { journalTopics };

/** The 34 articles migrated from WordPress by scripts/migration/migrate_journal.py. */
export const articles = raw as unknown as JournalArticle[];

export const topicLabel = (slug: JournalTopic) => journalTopics.find((t) => t.slug === slug)?.label ?? slug;
