import { useState } from "react";
import { LikeHook, followHook } from "../../hooks/booleanInteractionsHooks";
import FollowButton from "../followbutton";
import { useNavigate } from "react-router-dom";

//i included hook calls here because all components need to share the same state
//the problem is here now there are 2 function calls and 2 query invalidation but it works and ill leave it at that fuck it

function AuthorComponent({
  articleData,
  setArticleData,
  following,
  setFollowing,
}) {
  const navigate = useNavigate();

  //need to know why for real its wierd
  // idk how its 3 articles where 2 was working in the when the component was in article Page
  //   3 article.article.article

  const followAuthor = followHook({
    following,
    setFollowing,
    username: articleData.author.username,
  });
  const favoriteArticle = LikeHook({
    currentArticle: articleData,
    setCurrentArticle: setArticleData,
  });

  const formattedDate = new Date(articleData.updatedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
  function handleFollowing() {
    followAuthor.mutate(articleData.author.username);
  }
  function handleFavoriteArticle() {
    favoriteArticle.mutate({ slug: articleData.slug });
  }
  return (
    <div className="flex items-center">
      <img
        src={articleData.author.image}
        alt="x"
        className="rounded-full w-8 h-8  inline-block mr-1   cursor-pointer"
        onClick={() => {
          navigate(`/profile/${articleData.author.username}`);
        }}
      />
      <div className="inline-block">
        <p
          className="text-slate-700 font-semibold hover:underline cursor-pointer"
          onClick={() => {
            navigate(`/profile/${articleData.author.username}`);
          }}
        >
          {articleData.author.username}
        </p>
        <p className="text-xs text-slate-400">{formattedDate}</p>
      </div>
      <div className="ml-4 flex place-items-center gap-1">
        <FollowButton
          following={following}
          handleFollowing={handleFollowing}
          username={articleData.author.username}
          margin={false}
        ></FollowButton>
        <button
          className={` text-sm px-2  rounded-md group border-2 border-accentColor whitespace-nowrap ${
            articleData.favorited
              ? "hover:bg-[#449d44] bg-accentColor  text-white"
              : " hover:bg-accentColor text-accentColor hover:text-white "
          }  flex items-center h-min`}
          onClick={() => handleFavoriteArticle()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className={`${
              articleData.favorited
                ? "fill-white"
                : "fill-accentColor group-hover:fill-white"
            }  w-4 h-4 inline-block mr-1 self-center`}
          >
            <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
          </svg>
          {`${
            articleData.favorited ? "UnFavorite Article" : "Favorite Article"
          } (${articleData.favoritesCount})`}
        </button>
      </div>
    </div>
  );
}

export default AuthorComponent;
