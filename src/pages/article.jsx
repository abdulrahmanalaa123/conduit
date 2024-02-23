import { useQuery } from "@tanstack/react-query";
import { getArticle } from "../api/articleFetchingApi";
import { useNavigate, useParams } from "react-router-dom";
import { getComments } from "../api/commentsApi";
import AuthorComponent from "../components/Article/authorComponent";
//TODO
//could optimize this whole page sicne loading it will be after loading results from a feed
//instead of loading and passing a mutation function and everything
//although the consequences would be cringe the first is props hell
//second is probably a bunch of inconsistencies and would be hell to solve rather than this method

const articleQuery = (slug) => ({
  queryKey: ["article", slug],
  queryFn: () => getArticle({ slug }),
});
const commentsQuery = (slug) => ({
  queryKey: ["comments", slug],
  queryFn: () => getComments({ slug }),
});

function Article() {
  const params = useParams();
  const navigate = useNavigate();
  const {
    data: article,
    isLoading: articleIsLoading,
    isError: articleIsError,
  } = useQuery(articleQuery(params.slug));
  const {
    data: comments,
    isLoading: commentsAreLoading,
    isError: commentsIsError,
  } = useQuery(commentsQuery(params.slug));

  if (articleIsLoading) {
    return (
      <div className="flex justify-center py-12 text-4xl text-accentColor font-bold">
        Data is isLoading
      </div>
    );
  }

  if (articleIsError) {
    return <ProfileError error={error}></ProfileError>;
  }
  return (
    // className="font-sans"
    <>
      <div className="bg-slate-200">
        <div className="w-[70%] mx-auto flex flex-col py-8 mb-8">
          <p className="text-[44px] font-bold text-slate-700">
            {article.article.title}
          </p>
          {/* the extraction of this component made me declare 2 hooks and 2 states for each although they can share both */}
          <AuthorComponent article={article}></AuthorComponent>
        </div>
      </div>
      <div className="w-[70%] mx-auto">
        <div className="border-b border-greyShade">
          <p className="text-slate-200 text-2xl mb-8">{article.article.body}</p>
          <div className="mb-8 flex flex-row text-greyShade gap-1">
            {article.article.tagList.map((tag, index) => {
              return (
                <div
                  key={index}
                  className="border-2 border-greyShade rounded-full px-2 cursor-pointer text-sm"
                >
                  {tag}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <AuthorComponent article={article}></AuthorComponent>
        </div>
      </div>
    </>
  );
}

export default Article;

export const articlesLoader =
  (queryClient) =>
  async ({ params }) => {
    const articQuery = articleQuery(params.slug);
    const commenQuery = commentsQuery(params.slug);
    const response1 = await queryClient.ensureQueryData(articQuery);
    const response2 = await queryClient.ensureQueryData(commenQuery);
    return { response1, response2 };
  };
