import ArticleCard from "./articleCard";
import { useMemo, useState } from "react";
import ErrorComponent from "./errorComponent";
import articlesQuery from "../hooks/articlesHook";

//benefit of getting the hook outside and passing the query is the use of loader of home
function ArticlesForm({ feedState, tag, author }) {
  const [page, setPage] = useState(0);

  //TODO
  //query repeats 5 times on render for some
  //after some debugging and using useeffect and taking out the fucntion to the home component it still calls 5 times
  //so i dont know why its something related to axios or the articlFetching function or its a behavior
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    isSuccess,
    isPlaceholderData,
  } = articlesQuery({ page, feed: feedState, author, tag });

  // wanted to put this dependent on articlesCount but couldnt since its conditional on the current data state
  // and kept giving me an error Rendered more hooks than during the previous render or articlesCount not defined
  console.log("data is:", data);
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
        data.articles.map((article) => {
          return (
            <ArticleCard key={article.slug} article={article}></ArticleCard>
          );
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
