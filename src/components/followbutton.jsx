function FollowButton({ following, handleFollowing, username, margin = true }) {
  return (
    <button
      className={`${margin ? "mt-3" : ""} border-2 rounded-md px-2 self-end ${
        margin ? "mr-[15%]" : ""
      }   flex items-center ${
        following
          ? "border-green-600 text-green-600 hover:bg-accentColor font-bold "
          : "justify-center border-slate-600 text-slate-600 hover:bg-slate-500"
      }`}
      onClick={() => handleFollowing()}
    >
      {!following ? (
        <div className="whitespace-nowrap flex items-center">
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
          Follow {username}
        </div>
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
  );
}

export default FollowButton;
