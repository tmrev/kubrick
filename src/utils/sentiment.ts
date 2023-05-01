/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import Sentiment from "sentiment";
import { ParseResults } from "../models/parseResults";

// eslint-disable-next-line no-shadow
export enum SentimentResult {
  NEGATIVE = "negative",
  NEUTRAL = "neutral",
  POSITIVE = "positive",
}

function classifySentiment(
  sentimentScore: number,
  posThreshold = 2,
  negThreshold = -2
) {
  let sentiment;
  if (sentimentScore > posThreshold) {
    sentiment = SentimentResult.POSITIVE;
  } else if (sentimentScore < negThreshold) {
    sentiment = SentimentResult.NEGATIVE;
  } else {
    sentiment = SentimentResult.NEUTRAL;
  }
  return sentiment;
}

function preprocessText(
  text: string,
  removeStopWords = true,
  removePunctuation = true
) {
  // Convert to lowercase
  text = text.toLowerCase();
  // Remove URLs
  text = text.replace(/https?:\/\/\S+/g, "");

  if (removePunctuation) {
    // Remove punctuation
    text = text.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
  }

  if (removeStopWords) {
    // Remove stop words
    const stopWords = new Set([
      "the",
      "a",
      "an",
      "and",
      "but",
      "or",
      "in",
      "on",
      "at",
      "to",
      "of",
      "for",
    ]);
    text = text
      .split(" ")
      .filter((word) => !stopWords.has(word))
      .join(" ");
  }

  return text;
}

function sentimentAnalyze(text: string) {
  const sentiment = new Sentiment();

  const cleanText = preprocessText(text);

  const result = classifySentiment(sentiment.analyze(cleanText).score);

  return result;
}

function sentimentSummary(results: ParseResults[]) {
  let positive = 0;
  let negative = 0;
  let neutral = 0;
  const total = results.length;

  results.forEach(({ sentiment }) => {
    if (sentiment === SentimentResult.POSITIVE) {
      positive += 1;
    } else if (sentiment === SentimentResult.NEUTRAL) {
      neutral += 1;
    } else if (sentiment === SentimentResult.NEGATIVE) {
      negative += 1;
    }
  });

  return {
    [SentimentResult.POSITIVE]: (positive / total) * 100,
    [SentimentResult.NEGATIVE]: (negative / total) * 100,
    [SentimentResult.NEUTRAL]: (neutral / total) * 100,
  };
}

export { sentimentAnalyze, sentimentSummary, preprocessText };

export default sentimentAnalyze;
