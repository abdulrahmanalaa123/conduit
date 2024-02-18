import axiosInterface from "../lib/axios";
// the code is shit for catching each error on each request but when i added the error throwing to the interceptor it doesnt automatically nullify anything after the request if an error occurs it
//treats it as a normal next line of code and it seems like it ingests the error it needs to be fixed but fixing it broke the whole thing so i need to check it in the end
//TODO
//handle errors efficiently either using interceptors or not by using a catch block on every request doing the exact same thing in both authentication or article fetching
function pageParamsFormatter(page) {
  return { offset: page * 20, limit: 20 };
}
export async function getArticlesByPage(page, tag, author, favorited) {
  console.log("here in global page");
  const params = {
    ...pageParamsFormatter(page),
    ...(tag && { tag }),
    ...(author && { author }),
    ...(favorited && { favorited }),
  };
  console.log(params);
  try {
    const response = await axiosInterface.get("/articles", {
      params: params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function getYourFeed({ page }) {
  try {
    const response = await axiosInterface.get("/articles/feed", {
      params: pageParamsFormatter(page),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function createArticle({ data }) {
  // can be handled with catch since there are no dependent lines of code
  await axiosInterface.post("/articles", data).catch(function (error) {
    throw error;
  });
}
