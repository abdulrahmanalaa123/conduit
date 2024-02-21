import ArticlesForm from "../components/articleForm";
import { useState } from "react";
import useAuthStore from "../stores/auth";
import { useQuery } from "@tanstack/react-query";
import { getTags } from "../api/tagsFetching";
import ErrorComponent from "../components/errorComponent";

function Home() {
  const [feedState, setFeedState] = useState("global");
  const [selectedTag, setSelectedTag] = useState(null);
  const logged = useAuthStore((state) => state.identification);

  console.log("home rerender");

  const {
    data: tags,
    isError: tagsIsError,
    isLoading: tagsLoading,
    error: tagsError,
  } = useQuery({ queryKey: ["tags"], queryFn: getTags });

  return (
    <div>
      <div className="bg-accentColor p-8 mb-8 shadow-inner flex flex-col items-center  shadow-black">
        <p className="text-[56px] font-bold drop-shadow-md">conduit</p>
        <p className="text-2xl mt-2">A place to share your knowledge</p>
      </div>

      <div className="w-[70%] mx-auto flex flex-row gap-8 flex-wrap">
        <div className="w-[69%]">
          <nav>
            {logged && (
              <button
                className={`ml-4 font-bold pb-4 ${
                  feedState === "following"
                    ? "text-accentColor border-b-2  border-b-accentColor"
                    : ""
                }`}
                onClick={() => {
                  if (feedState !== "following") setFeedState("following");
                }}
              >
                Your Feed
              </button>
            )}
            <button
              className={`ml-4 font-bold pb-4 ${
                feedState === "global"
                  ? "text-accentColor border-b-2  border-b-accentColor"
                  : ""
              }`}
              onClick={() => {
                if (feedState !== "global") setFeedState("global");
              }}
            >
              Global Feed
            </button>
            {selectedTag && (
              <button
                className={`ml-4 font-bold pb-4  ${
                  feedState === "tagged"
                    ? "text-accentColor border-b-2  border-b-accentColor"
                    : ""
                }`}
                onClick={() => {
                  if (feedState !== "tagged") setFeedState("tagged");
                }}
              >
                # {selectedTag}
              </button>
            )}
          </nav>
          <div>
            <ArticlesForm
              feedState={feedState}
              tag={selectedTag}
            ></ArticlesForm>
          </div>
        </div>
        <div className="bg-slate-700 pt-1 px-2 pb-2 rounded-md flex flex-col gap-1 w-1/4 h-min">
          <p>Popular tags</p>
          <div className="flex flex-row gap-2 flex-wrap">
            {tagsLoading ? (
              <p>Loading tags.....</p>
            ) : tagsIsError ? (
              <ErrorComponent error={tagsError} />
            ) : (
              tags.tags.map((tag, index) => (
                <button
                  key={index}
                  className={`${
                    tag === selectedTag
                      ? "bg-slate-500 underline text-slate-400"
                      : "bg-slate-300 text-slate-800"
                  }  hover:bg-slate-500  rounded-full px-2  text-xs`}
                  onClick={() => {
                    if (selectedTag === tag) {
                      setSelectedTag(null);
                      setFeedState("global");
                    } else {
                      setSelectedTag(tag);
                      setFeedState("tagged");
                    }
                  }}
                >
                  {tag}
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
