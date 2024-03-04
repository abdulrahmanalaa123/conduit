import { getArticle } from "../api/articles/getArticle";

const articleQuery = (slug) => ({
  queryKey: ["article", slug],
  queryFn: () => getArticle({ slug }),
});
export default articleQuery;
