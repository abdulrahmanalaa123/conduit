import { useQuery } from "@tanstack/react-query";
import ArticleCard from "./articleCard";
import { getArticlesByPage, getYourFeed } from "../../api/articleFetchingApi";
import { useState } from "react";
import { errorListFormatting } from "../../lib/axios";

function ArticlesForm({ feedState }) {
  const [page, setPage] = useState(0);

  const queryFunction =
    feedState === "global" ? getArticlesByPage(page) : getYourFeed(page);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [feedState, page],
    queryFn: () => queryFunction,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12 text-2xl text-accentColor font-bold">
        Your data is isLoading
      </div>
    );
  }

  if (isError) {
    const errorList = errorListFormatting(error);
    return (
      <div className="flex justify-center">
        {errorList.map((errorString) => (
          <p className="text-red-500 font-bold text-2xl">{errorString}</p>
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <ArticleCard></ArticleCard>
      <ArticleCard></ArticleCard>
      <ArticleCard></ArticleCard>
      <ArticleCard></ArticleCard>
      <ArticleCard></ArticleCard>
    </div>
  );
}

export default ArticlesForm;
