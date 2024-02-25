import { useQuery } from "@tanstack/react-query";
import { getArticle } from "../api/articleApi";
import { useParams } from "react-router-dom";
import { getComments } from "../api/commentsApi";
import AuthorComponent from "../components/Article/authorComponent";
import Comments from "../components/Article/comments";
import { useState } from "react";
import OwnAuthorComponent from "../components/Article/ownAuthorComponent";
import useAuthStore from "../stores/auth";

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
  const logged = useAuthStore((state) => state.identification);

  const {
    data: article,
    isLoading: articleIsLoading,
    isError: articleIsError,
  } = useQuery(articleQuery(params.slug));

  const [articleData, setArticleData] = useState(article.article);
  const [following, setFollowing] = useState(articleData.author.following);

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
    //adding it would follow the style but i dont want to
    <>
      <div className="bg-slate-200">
        <div className="w-[70%] mx-auto flex flex-col gap-2 py-8 mb-8">
          <p className="text-[44px] font-bold text-slate-700">
            {articleData.title}
          </p>
          {/* the extraction of this component made me declare 2 hooks and 2 states for each although they can share both */}
          {articleData.author.username === logged?.username ? (
            <OwnAuthorComponent articleData={articleData}></OwnAuthorComponent>
          ) : (
            <AuthorComponent
              articleData={articleData}
              setArticleData={setArticleData}
              following={following}
              setFollowing={setFollowing}
            ></AuthorComponent>
          )}
        </div>
      </div>
      <div className="w-[70%] mx-auto">
        <div className="border-b border-greyShade">
          <p className="text-slate-200 text-lg mb-8">{articleData.body}</p>
          <div className="mb-8 flex flex-row text-greyShade gap-1">
            {articleData.tagList.map((tag, index) => {
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
        <div className="flex flex-col items-center mt-8">
          {articleData.author.username !== logged?.username ? (
            <AuthorComponent
              articleData={articleData}
              setArticleData={setArticleData}
              following={following}
              setFollowing={setFollowing}
            ></AuthorComponent>
          ) : (
            <OwnAuthorComponent articleData={articleData}></OwnAuthorComponent>
          )}
          <Comments></Comments>
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
