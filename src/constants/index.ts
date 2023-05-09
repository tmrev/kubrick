/* eslint-disable no-unused-vars */
import { config } from "dotenv";

config();

const TWITTER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

const rottenTomatoesUrls = {
  base: "https://www.rottentomatoes.com",
  search: "https://www.rottentomatoes.com/search",
};

const varietyUrls = {
  base: "https://variety.com/",
  search: "https://variety.com/results/#",
};

const hollywoodUrls = {
  base: "https://www.hollywoodreporter.com/",
  search: "https://www.hollywoodreporter.com/results/#",
};

const deadlineUrls = {
  base: "https://deadline.com/",
  search: "https://deadline.com/results/#",
};

const indieWireUrls = {
  base: "https://www.indiewire.com/results/#",
  search: "https://www.indiewire.com/results/#",
};

const colliderUrls = {
  base: "https://collider.com",
  search: "https://collider.com/search/",
};

const screenRantUrls = {
  base: "https://screenrant.com",
  search: "https://screenrant.com/search",
};

const empireUrls = {
  base: "https://www.empireonline.com/",
};

const thePlayListUrls = {
  base: "https://theplaylist.net",
  search: "https://theplaylist.net/",
};

const joBloUrls = {
  base: "https://www.joblo.com",
  search: "https://www.joblo.com/search/",
};

const boxOfficeUrl = "https://www.boxofficemojo.com/title/";

const popularUrl = "https://editorial.rottentomatoes.com/guide/popular-movies/";

// eslint-disable-next-line no-shadow
enum Sources {
  COLLIDER = "Collider",
  DEADLINE = "Deadline",
  EMPIRE = "Empire",
  HOLLYWOOD = "Hollywood Reporter",
  INDIE_WIRE = "Indie Wire",
  JOBLO = "Jo Blo",
  PLAYLIST = "The Playlist",
  ROTTEN_TOMATOES = "Rotten Tomatoes",
  SCREEN_RANT = "Screen Rant",
  VARIETY = "Variety",
}

export {
  rottenTomatoesUrls,
  varietyUrls,
  hollywoodUrls,
  deadlineUrls,
  indieWireUrls,
  colliderUrls,
  screenRantUrls,
  joBloUrls,
  empireUrls,
  Sources,
  thePlayListUrls,
  popularUrl,
  boxOfficeUrl,
  TWITTER_TOKEN,
};
