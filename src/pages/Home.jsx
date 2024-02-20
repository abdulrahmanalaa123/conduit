import axiosInterface from "../lib/axios";
import ArticlesForm from "../components/Home/articleForm";
import { useState } from "react";
import useAuthStore from "../stores/auth";

function Home() {
  const [feedState, setFeedState] = useState("global");
  const logged = useAuthStore((state) => state.identification);
  const currentState = feedState !== "global";

  async function unauthorized() {
    await axiosInterface.get("/user");
  }
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
                  currentState
                    ? "text-accentColor border-b-2  border-b-accentColor"
                    : ""
                }`}
                onClick={() => {
                  setFeedState("your");
                }}
              >
                Your Feed
              </button>
            )}
            <button
              className={`ml-4 font-bold pb-4 ${
                !currentState
                  ? "text-accentColor border-b-2  border-b-accentColor"
                  : ""
              }`}
              onClick={() => {
                setFeedState("global");
              }}
            >
              Global Feed
            </button>
          </nav>
          <div>
            <ArticlesForm feedState={feedState}></ArticlesForm>
          </div>
        </div>
        <div className="bg-slate-700 py-8 px-4 flex flex-col gap-4 w-1/4 h-min">
          <p>Popular tags</p>
          <div className="flex flex-row gap-2 flex-wrap">
            <button className="bg-slate-300 rounded-full px-4 py-2 text-black">
              queries
            </button>
            <button className="bg-slate-300 rounded-full px-4 py-2 text-black">
              queries
            </button>
            <button className="bg-slate-300 rounded-full px-4 py-2 text-black">
              queries
            </button>
            <button className="bg-slate-300 rounded-full px-4 py-2 text-black">
              queries
            </button>
            <button className="bg-slate-300 rounded-full px-4 py-2 text-black">
              queries
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
