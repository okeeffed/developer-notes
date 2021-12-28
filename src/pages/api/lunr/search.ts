// This file was too much of a pain to lint
import lunr from "lunr";

import indexData from "../../../data/_index.json";
import data from "../../../data/_metadata.json";

import type { NextApiRequest, NextApiResponse } from "next";

const idx = lunr.Index.load(indexData);

type IndexResult = Record<string, number>;

/**
 * Filters based on a combination of the tags and search query
 *
 * @param req
 * @param res
 */
export default (req: NextApiRequest, res: NextApiResponse) => {
  const { q, tags, limit } = req.query;
  const hasNoTags = tags === "" || !tags;
  const selectedTags = hasNoTags ? [] : (tags as string).split(",");

  const indexResults: IndexResult = {};
  let indexResultsArr = undefined;

  if (q) {
    indexResultsArr = idx.search(q as string);
    indexResultsArr.map((val) => {
      indexResults[val.ref] = val.score;
    });
  }

  if (!indexResultsArr && !selectedTags.length) {
    res.status(200).json([]);
    return;
  }

  const filteredPosts = data.metadata
    .filter((post) => {
      if (!indexResultsArr) {
        return true;
      } else if (!indexResultsArr.length) {
        return false;
      }

      return indexResults[post.title] !== undefined;
    })
    .sort((a, b) => {
      if (!indexResultsArr || !indexResultsArr.length) {
        return 0;
      }

      return indexResults[a.title] > indexResults[b.title] ? -1 : 1;
    })
    .filter((_post, index) => {
      if (!limit) {
        return true;
      }

      return index <= Number(limit);
    });

  res.status(200).json(filteredPosts);
};
