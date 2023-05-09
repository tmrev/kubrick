import { query, header } from "express-validator";

const sentiment = ["positive", "neutral", "negative"];
const sources = ["FREE_SOURCES", "PRO_SOURCES", "ULTRA_SOURCES"];

const getNewsValidation = () => {
  return [
    query("offset")
      .isNumeric()
      .withMessage("offset must be a number.")
      .toInt()
      .optional(),
    query("source")
      .isString()
      .withMessage("source must be a string.")
      .optional(),
    query("limit")
      .isInt({ min: 1, max: 100 })
      .withMessage("limit must be a number within 1-100")
      .toInt()
      .optional(),
    query("type").isString().withMessage("type must be a string").optional(),
    query("minDate")
      .isString()
      .withMessage("minDate must be a string.")
      .optional(),
    query("maxDate")
      .isString()
      .withMessage("maxDate must be a string.")
      .optional(),
    query("sentiment")
      .isIn(sentiment)
      .withMessage(`sentiment must be one of: ${sentiment.map((v) => v)}`)
      .optional(),
    header("sources")
      .isIn(sources)
      .withMessage(`sources must be one of: ${sources.map((v) => v)}`),
    header("sentiment").isBoolean().toBoolean(),
  ];
};

const trendingNewsValidation = () => {
  return [
    query("limit")
      .isInt({ min: 5, max: 50 })
      .withMessage("limit must be a number within 5-50")
      .toInt()
      .optional(),
  ];
};

const advancedSearchNewsValidation = () => {
  return [
    query("offset")
      .isNumeric()
      .withMessage("offset must be a number.")
      .optional(),
    query("source")
      .isString()
      .withMessage("source must be a string.")
      .optional(),
    query("limit")
      .isInt({ min: 1, max: 100 })
      .withMessage("limit must be a number within 1-100")
      .optional(),
    query("sentiment")
      .isIn(sentiment)
      .withMessage(`sentiment must be one of: ${sentiment.map((v) => v)}`)
      .optional(),
    query("q").isString().withMessage("q must be a string"),
    query("type").isString().withMessage("type must be a string").optional(),
    query("minDate").isDate().withMessage("minDate must be a date.").optional(),
    query("maxDate").isDate().withMessage("maxDate must be a date.").optional(),
    header("sources")
      .isIn(sources)
      .withMessage(`sources must be one of: ${sources.map((v) => v)}`),
    header("sentiment").isBoolean().toBoolean(),
  ];
};

const basicSearchNewsValidation = () => {
  return [
    query("offset")
      .isNumeric()
      .withMessage("offset must be a number.")
      .optional(),
    query("limit")
      .isInt({ min: 1, max: 100 })
      .withMessage("limit must be a number within 1-100")
      .optional(),
    query("q").isString().withMessage("q must be a string"),
    header("sources")
      .isIn(sources)
      .withMessage(`sources must be one of: ${sources.map((v) => v)}`),
    header("sentiment").isBoolean().toBoolean(),
  ];
};

export {
  getNewsValidation,
  advancedSearchNewsValidation,
  basicSearchNewsValidation,
  trendingNewsValidation,
};
