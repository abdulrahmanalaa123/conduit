import { NavLink } from "react-router-dom";
import axiosInterface from "../lib/axios";
import ArticlesForm from "../components/Home/articleForm";
function Home() {
  async function unauthorized() {
    await axiosInterface.get("/user");
  }
  return (
    <div>
      <div className="bg-accentColor p-8 mb-8 shadow-inner flex flex-col items-center  shadow-black">
        <p className="text-[56px] font-bold drop-shadow-md">conduit</p>
        <p className="text-2xl mt-2">A place to share your knowledge</p>
      </div>
      <button
        className="bg-red-500 rounded-full px-8 py-4 ml-8"
        onClick={unauthorized}
      >
        Testing
      </button>
      <div className="w-[70%] mx-auto flex flex-row gap-8 flex-wrap">
        <div className="w-[69%]">
          <nav className="border-b-2  pb-4">
            <NavLink
              to="your"
              className={({ isActive }) =>
                `ml-4 ${isActive ? "text-accentColor font-bold" : ""}`
              }
            >
              Your Feed
            </NavLink>
            <NavLink
              to="global"
              className={({ isActive }) =>
                `ml-4 ${isActive ? "text-accentColor font-bold" : ""}`
              }
            >
              Global Feed
            </NavLink>
          </nav>
          <div>
            <ArticlesForm></ArticlesForm>
          </div>
        </div>
        <div className="bg-slate-700 py-8 px-4 flex flex-col gap-4 w-1/4">
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
