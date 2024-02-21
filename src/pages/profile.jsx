import { Link, useParams } from "react-router-dom";
import { getProfile, followUser, unfollowUser } from "../api/profileApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ProfileError from "../components/Profile/profileErrorPage";
import useAuthStore from "../stores/auth";
import { useState } from "react";
import ArticlesForm from "../components/articleForm";

const profileQuery = (username) => ({
  queryKey: ["profile", username],
  queryFn: () => getProfile(username),
});

function Profile() {
  const params = useParams();
  const logged = useAuthStore((state) => state.identification);
  const queryClient = useQueryClient();

  const {
    data: dataObject,
    isLoading,
    isError,
    error,
  } = useQuery(profileQuery(params.username));
  console.log(dataObject);
  const [currentUser, setCurrentUser] = useState(dataObject.data.profile);
  const [feedState, setFeedState] = useState("my");
  //this can be done as a custom hook but im a bit too lazy and woudl derail me a ton
  const followSelectedUser = useMutation({
    //reversed because onmutate changes it before using the function
    mutationFn: currentUser.following ? followUser : unfollowUser,
    onMutate() {
      const oldUser = currentUser;
      const newUser = { ...currentUser, following: !currentUser.following };
      setCurrentUser(newUser);
      return oldUser;
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["profile", currentUser.username],
        exact: true,
      });
    },
    onError(context) {
      setCurrentUser(context);
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12 text-4xl text-accentColor font-bold">
        Data is isLoading
      </div>
    );
  }

  if (isError) {
    return <ProfileError error={error}></ProfileError>;
  }

  function handleFollowing() {
    followSelectedUser.mutate(currentUser.username);
  }

  return (
    <>
      <div className="bg-slate-400 pt-8 pb-4 mb-8 shadow-inner flex flex-col items-center  shadow-black">
        <img
          src={dataObject.data.profile.image}
          alt="big-profile-picture"
          className="w-24 rounded-full"
        />
        <p className="text-2xl mt-2 text-slate-600">{params.username}</p>
        {logged.username === params.username ? (
          <Link
            to="/settings"
            className="mt-3 border-2 border-slate-600 text-slate-600 rounded-md px-2 self-end mr-[15%] hover:bg-slate-500 cursor-pointer flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            Edit Profile Settings
          </Link>
        ) : (
          <button
            className={`mt-3 border-2 rounded-md px-2 self-end mr-[15%]  cursor-pointer flex items-center ${
              currentUser.following
                ? "border-green-600 text-green-600 hover:bg-accentColor font-bold "
                : "justify-center border-slate-600 text-slate-600 hover:bg-slate-500"
            }`}
            onClick={() => handleFollowing()}
          >
            {!currentUser.following ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Follow {currentUser.username}
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
                Unfollow
              </>
            )}
          </button>
        )}
      </div>
      <div className="w-[70%] mx-auto ">
        <nav>
          <button
            className={`ml-4 font-bold pb-4 ${
              feedState === "my"
                ? "text-accentColor border-b-2  border-b-accentColor"
                : ""
            }`}
            onClick={() => {
              if (feedState !== "my") setFeedState("my");
            }}
          >
            My Articles
          </button>
          <button
            className={`ml-4 font-bold pb-4 ${
              feedState === "favorited"
                ? "text-accentColor border-b-2  border-b-accentColor"
                : ""
            }`}
            onClick={() => {
              if (feedState !== "favorited") setFeedState("favorited");
            }}
          >
            Favorited Articles
          </button>
        </nav>
        <ArticlesForm
          feedState={feedState}
          author={currentUser.username}
        ></ArticlesForm>
      </div>
    </>
  );
}

// const profileArticlesQuery

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const query = profileQuery(params.username);
    return await queryClient.ensureQueryData(query);
  };
export default Profile;
