/* eslint-disable indent */
import dayjs from "dayjs";
import { Document } from "mongodb";
import { mongoService } from "../..";
import DB from "../../constants/db";
import { SourceType } from "../../constants";
import configureSource from "../../utils/configureSource";

interface GetNewsQuery {
  limit?: number;
  maxDate?: string;
  minDate?: string;
  offset?: number;
  q: string;
  sentiment?: string;
  source?: string;
  type?: string;
}

const searchNewsService = async (
  query: GetNewsQuery,
  sourceType: SourceType,
  sentiment: boolean
) => {
  const db = mongoService.db(DB.name).collection(DB.collections.articles);

  const limitFilter = configureSource(sourceType);

  const pipeline: Document[] = [];

  pipeline.push({
    $match: {
      $text: { $search: query.q },
      ...limitFilter,
    },
  });

  if (query.source) {
    pipeline.push({
      $match: {
        source: query.source,
      },
    });
  }

  if (query.type) {
    pipeline.push({
      $match: {
        type: query.type,
      },
    });
  }

  if (query.minDate) {
    pipeline.push({
      $match: {
        publishedDate: { $gte: dayjs(query.minDate).format() },
      },
    });
  }

  if (query.maxDate) {
    pipeline.push({
      $match: {
        publishedDate: { $lt: dayjs(query.minDate).format() },
      },
    });
  }

  if (query.sentiment) {
    pipeline.push({
      $match: {
        sentiment: query.sentiment,
      },
    });
  }

  pipeline.push({
    $skip: query.offset || 0,
  });

  pipeline.push({
    $limit: query.limit || 20,
  });

  if (sentiment === false) {
    pipeline.push({
      $unset: "sentiment",
    });
  }

  console.log(pipeline);

  // const results = await db
  //   .find(findQuery)
  //   .skip(Number(query.offset) || 0)
  //   .limit(Number(query.limit) || 20)
  //   .toArray();

  const results = await db.aggregate(pipeline).toArray();

  const totalArticles = await db.estimatedDocumentCount();

  return {
    success: true,
    body: {
      totalArticles,
      results,
    },
  };
};

export default searchNewsService;
