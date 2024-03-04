import { useMutation } from "@tanstack/react-query";
import editArticle from "./editArticle";
import createArticle from "./createArticle";
import { queryClient } from "../../lib/queryClient";
import { errorListFormatting } from "../../lib/axios";
import invalidateFetches from "../../lib/invalidateFetches";

export default function createEditArticleHook({ state, setError, navigate }) {
  return useMutation({
    mutationFn: state ? editArticle : createArticle,
    onSuccess(data) {
      invalidateFetches();
      queryClient.setQueryData(["article", data.article.slug], data);
      navigate(`/article/${data.article.slug}`);
    },
    onError(error) {
      const errorList = errorListFormatting(error);

      setError("root", {
        message: errorList,
      });
    },
  });
}
