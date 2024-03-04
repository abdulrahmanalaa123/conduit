import { getComments } from "../api/comments/getComments";

const commentsQuery = (slug) => ({
  queryKey: ["comments", slug],
  queryFn: () => getComments({ slug }),
});
export default commentsQuery;
