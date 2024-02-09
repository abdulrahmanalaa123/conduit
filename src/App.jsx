import axiosInterface from "./api/axios";

function App() {
  async function getArticles() {
    const articles = await axiosInterface.normalInterface.get("/articles");
    console.log(articles.data);
  }

  return (
    <>
      <div className="bg-blue-500 w-full h-full flex items-center justify-center">
        <button
          className="bg-slate-600 rounded-full py-4 px-6 text-3xl hover:bg-red-950 "
          onClick={() => {
            getArticles();
          }}
        >
          Auth
        </button>
      </div>
    </>
  );
}

export default App;
