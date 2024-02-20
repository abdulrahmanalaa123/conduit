import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ArticleCard from "./articleCard";
import { getArticlesByPage, getYourFeed } from "../../api/articleFetchingApi";
import { useMemo, useState } from "react";
import { errorListFormatting } from "../../lib/axios";

function ArticlesForm({ feedState }) {
  const [page, setPage] = useState(0);

  const queryFunction =
    feedState === "global" ? getArticlesByPage(page) : getYourFeed(page);

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    isSuccess,
    isPlaceholderData,
  } = useQuery({
    queryKey: [feedState, page],
    placeholderData: keepPreviousData,
    queryFn: () => queryFunction,
  });

  // wanted to put this dependent on articlesCount but couldnt since its conditional on the current data state
  // and kept giving me an error Rendered more hooks than during the previous render or articlesCount not defined
  const pagesArray = useMemo(() => {
    if (isSuccess) {
      const pagesNo = ~~(data.articlesCount / 20);
      const pagesArr = [...Array(pagesNo).keys()].map((foo) => foo + 1);
      return pagesArr;
    }
    return [];
  }, [isSuccess]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12 text-2xl text-accentColor font-bold">
        Data is isLoading
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
      {data.articles.map((article) => {
        return <ArticleCard article={article}></ArticleCard>;
      })}
      {isFetching ? <span> Loading articles...</span> : null}
      {isSuccess && (
        <div className="flex flex-row flex-wrap mt-6 gap-2">
          {pagesArray.map((pageNo) => {
            return (
              <button
                className={`border-accentColor ${
                  pageNo - 1 === page ? "bg-accentColor text-white" : ""
                } hover:underline border-2  px-4 py-1   rounded-md `}
                onClick={() => {
                  if (!isPlaceholderData) {
                    setPage(pageNo - 1);
                  }
                }}
              >
                {pageNo}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ArticlesForm;
