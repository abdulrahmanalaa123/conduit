import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ArticleCard from "./articleCard";
import { getArticlesByPage, getYourFeed } from "../../api/articleFetchingApi";
import { useEffect, useMemo, useState } from "react";
import ErrorComponent from "../errorComponent";

function ArticlesForm({ feedState, tag }) {
  const [page, setPage] = useState(0);

  const queryFunction =
    feedState === "global"
      ? getArticlesByPage(page)
      : feedState === "tagged"
      ? getArticlesByPage(page, tag)
      : getYourFeed(page);
  //TODO
  //query repeats 5 times on render for some
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    isSuccess,
    isPlaceholderData,
  } = useQuery({
    queryKey: [feedState, { page, ...(tag && { tag }) }],
    placeholderData: keepPreviousData,
    queryFn: () => queryFunction,
  });

  // wanted to put this dependent on articlesCount but couldnt since its conditional on the current data state
  // and kept giving me an error Rendered more hooks than during the previous render or articlesCount not defined

  const pagesArray = useMemo(() => {
    setPage(0);
    if (isSuccess) {
      const pagesNo = Math.ceil(data.articlesCount / 10);
      const pagesArr = [...Array(pagesNo).keys()].map((foo) => foo + 1);
      return pagesArr;
    }
    return [];
  }, [feedState, isSuccess]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12 text-2xl text-accentColor font-bold">
        Data is isLoading
      </div>
    );
  }

  if (isError) {
    return <ErrorComponent error={error}></ErrorComponent>;
  }

  return (
    <div className="flex flex-col">
      {!data.articles.length ? (
        <div className="flex justify-center py-12 text-2xl text-accentColor font-bold">
          No Articles to show
        </div>
      ) : (
        data.articles.map((article, index) => {
          return <ArticleCard key={index} article={article}></ArticleCard>;
        })
      )}
      {isFetching ? <span> Loading articles...</span> : null}
      {
        <div className="flex flex-row flex-wrap mt-6 gap-2">
          {pagesArray.map((pageNo) => {
            return (
              <button
                key={pageNo}
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
      }
    </div>
  );
}

export default ArticlesForm;
