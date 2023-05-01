import { Sources } from "../constants";
import { SentimentResult } from "../utils/sentiment";

interface ParseResults {
  author: string | null;
  img: string | null;
  publishedDate: string | null;
  sentiment: SentimentResult;
  snippet: string | null;
  source: Sources;
  title: string | null;
  type: string;
  url: string | null;
}

// eslint-disable-next-line import/prefer-default-export
export type { ParseResults };
