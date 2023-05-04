import { mongoService } from "../..";
import { cache, rateLimiter } from "../../app";
import manageParseContent from "../../functions/browser/manageParseContent";
import createScraper from "../../functions/browser/puppeteer";
import createUrls from "../../functions/browser/urls";
import parseColliderSearchResult from "../../functions/collider/parseSearchResults";
import parsePlaylistResult from "../../functions/playlist/parseSearchResults";
import parseScreenRantSearchResult from "../../functions/screenRant/parseSearchResults";
import { ParseResults } from "../../models/parseResults";
import { sentimentSummary } from "../../utils/sentiment";

const gatherNewsService = async (movieTitle: string) => {
  const data: ParseResults[] = [];

  const db = mongoService.db("news").collection("articles");

  const bulkNews = db.initializeUnorderedBulkOp();

  const newsCache = cache.get(movieTitle);

  if (newsCache) return newsCache;

  await rateLimiter.acquire();

  const urls = createUrls(movieTitle);

  const scraper = await createScraper(3);

  try {
    await Promise.allSettled(
      urls.map(async (url) => {
        const content = await scraper?.enqueue(url);
        const val = await manageParseContent(url, content);
        if (val?.length) {
          data.push(...val);
        }
      })
    );
  } catch (error) {
    console.error(error);
  }

  scraper?.close();

  const promiseArr = [
    parseColliderSearchResult(movieTitle),
    parseScreenRantSearchResult(movieTitle),
    parsePlaylistResult(movieTitle),
  ];

  const results = await Promise.allSettled(promiseArr);

  results.forEach((result) => {
    if (result.status === "fulfilled") {
      if (result.value && result.value.length) {
        data.push(...result.value);
      }
    }
  });
  rateLimiter.release();

  const consensus = sentimentSummary(data);

  const payload = {
    success: true,
    body: {
      consensus,
      totalResults: data.length,
      results: data,
    },
  };

  cache.set(movieTitle, payload);

  data.forEach((value) => {
    bulkNews
      .find({
        title: value.title,
        author: value.author,
      })
      .upsert()
      .replaceOne({
        ...value,
      });
  });

  bulkNews.execute();

  return payload;
};

export default gatherNewsService;
