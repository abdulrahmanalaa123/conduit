import { useQuery } from "@tanstack/react-query";
import { getArticle } from "../api/articleFetchingApi";
import { useNavigate, useParams } from "react-router-dom";
import { getComments } from "../api/commentsApi";
import { useState } from "react";
import { followHook } from "../hooks/booleanInteractionsHooks";
import FollowButton from "../components/followbutton";
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

  const [following, setFollowing] = useState(article.article.author.following);

  const follow = followHook({
    following,
    setFollowing,
    username: article.article.author.username,
  });

  const formattedDate = new Date(article.article.updatedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  function handleFollowing() {
    follow.mutate(article.article.author.username);
  }
  return (
    <>
      <div className="bg-slate-200">
        <div className="w-[70%] mx-auto flex flex-col p-8 mb-8">
          <p className="text-[44px] font-bold text-slate-700">
            {article.article.title}
          </p>
          <div className="flex items-center">
            <img
              src={article.article.author.image}
              alt="x"
              className="rounded-full w-8 h-8  inline-block mr-1   cursor-pointer"
              onClick={() => {
                navigate(`/profile/${article.article.author.username}`);
              }}
            />
            <div className="inline-block">
              <p
                className="text-slate-700 font-semibold hover:underline cursor-pointer"
                onClick={() => {
                  navigate(`/profile/${article.article.author.username}`);
                }}
              >
                {article.article.author.username}
              </p>
              <p className="text-xs text-slate-400">{formattedDate}</p>
            </div>
            <div className="ml-4 flex place-items-center gap-1">
              <FollowButton
                following={following}
                handleFollowing={handleFollowing}
                username={article.article.author.username}
                margin={false}
              ></FollowButton>
              <button
                className={` text-sm px-2 py-[0.125rem] rounded-md group border-2 border-accentColor whitespace-nowrap ${
                  article.article.favorited
                    ? "hover:bg-[#449d44] bg-accentColor  text-white"
                    : " hover:bg-accentColor text-accentColor hover:text-white "
                }  flex items-center h-min`}
                onClick={() => handleFavoriteClick()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className={`${
                    article.article.favorited
                      ? "fill-white"
                      : "fill-accentColor group-hover:fill-white"
                  }  w-4 h-4 inline-block mr-1 self-center`}
                >
                  <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                </svg>
                {`${
                  article.article.favorited
                    ? "UnFavorite Article"
                    : "Favorite Article"
                } (${article.article.favoritesCount})`}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[70%] mx-auto">
        <div className="border-b border-greyShade">
          <p className="text-slate-200 text-2xl mb-8">{article.article.body}</p>
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
