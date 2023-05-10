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
  sentiment?: string;
  source?: string;
  type?: string;
}

const getNewsService = async (
  query: GetNewsQuery,
  sourceType: SourceType,
  sentiment: boolean
) => {
  const db = mongoService.db(DB.name).collection(DB.collections.articles);

  const pipeline: Document[] = [];

  const limitFilter = configureSource(sourceType);

  pipeline.push({
    $match: {
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

export default getNewsService;
