import {
  deadlineUrls,
  hollywoodUrls,
  indieWireUrls,
  varietyUrls,
} from "../../constants";

const createUrls = (movieTitle: string) => {
  const hollywoodUrl = `${hollywoodUrls.search}?q=${encodeURIComponent(
    movieTitle
  )}`;
  const indieWireUrl = `${indieWireUrls.search}?q=${encodeURIComponent(
    movieTitle
  )}`;
  const deadLineUrl = `${deadlineUrls.search}?q=${encodeURIComponent(
    movieTitle
  )}`;
  const varietyUrl = `${varietyUrls.search}?q=${encodeURIComponent(
    movieTitle
  )}`;

  return [varietyUrl, hollywoodUrl, indieWireUrl, deadLineUrl];
};

export default createUrls;
