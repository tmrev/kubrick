/* eslint-disable indent */
import {
  FREE_SOURCES,
  PRO_SOURCES,
  SourceType,
  ULTRA_SOURCES,
} from "../constants";

function configureSource(sourceType: SourceType) {
  let limitFilter: any = {};

  switch (sourceType) {
    case "FREE_SOURCES":
      limitFilter = {
        $or: [...FREE_SOURCES.map((value) => ({ source: value }))],
      };
      break;
    case "PRO_SOURCES":
      limitFilter = {
        $or: [...PRO_SOURCES.map((value) => ({ source: value }))],
      };
      break;
    case "ULTRA_SOURCES":
      limitFilter = {
        $or: [...ULTRA_SOURCES.map((value) => ({ source: value }))],
      };
      break;
    default:
      limitFilter = {
        $or: [...FREE_SOURCES.map((value) => ({ source: value }))],
      };
      break;
  }

  return limitFilter;
}

export default configureSource;
