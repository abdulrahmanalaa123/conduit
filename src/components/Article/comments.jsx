import { useState } from "react";
import useAuthStore from "../../stores/auth";
import ErrorComponent from "../errorComponent";
function Comments({ commentsQuery }) {
  console.log(commentsQuery);
  const profileImg = useAuthStore((state) => state.identification.image);
  const [comments, setComments] = useState(commentsQuery.data.comments);
  if (commentsQuery.isLoading) {
    return (
      <div className="flex justify-center py-12 text-4xl text-accentColor font-bold">
        Data is isLoading
      </div>
    );
  }

  if (commentsQuery.isError) {
    return <ErrorComponent error={commentsQuery.error}></ErrorComponent>;
  }
  return (
    <div className="w-[70%] mx-auto self-start">
      <div className="mt-8 flex flex-col ">
        <textarea
          name="comment"
          rows="5"
          placeholder="write an article"
          required
          className="p-4 resize-y w-full rounded-t-md"
        ></textarea>
        <div className="p-4 flex justify-between bg-slate-200 rounded-b-md">
          <img
            src={profileImg}
            alt="profile-image"
            className="size-8 rounded-full"
          />
          <button className="bg-accentColor text-slate-200 text-sm px-2 rounded-md font-bold">
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Comments;
