import { useState } from "react";
import useAuthStore from "../../stores/auth";
import { useParams } from "react-router-dom";
import addCommentHook from "../../api/comments/addComments";

//used query lcient as an input as a thought of reducing load of not calling the same object inseveral places
//since it is called in the main component idk which is better to call in each component on its own or
//changed the idiom since it means as a better solution for seperation of concerns to have each component has its own
//hooks and function calls where it would take a b it mroe resources but we have alot of those to spare
function AddComment() {
  const slug = useParams().slug;
  const identification = useAuthStore((state) => state.identification);
  const [commentBody, setCommentBody] = useState("");

  const { mutate: addComment } = addCommentHook({
    slug: slug,
    emptyBody: emptyBody,
  });

  function handleAddingComment() {
    addComment({
      slug: slug,
      comment: { comment: { body: commentBody } },
    });
  }

  function emptyBody() {
    setCommentBody("");
  }
  return (
    <div className="mt-8 flex flex-col ">
      <textarea
        name="comment"
        rows="5"
        placeholder="write a comment"
        required
        className="p-4 resize-y w-full rounded-t-md bg-[#3B3B3B]"
        value={commentBody}
        onChange={(e) => {
          setCommentBody(e.target.value);
        }}
      ></textarea>
      <div className="md:p-4 p-2 flex justify-between bg-slate-200 rounded-b-md">
        <img
          src={identification.image}
          alt="profile-image"
          className="size-8 rounded-full"
        />
        <button
          className="bg-accentColor text-slate-200 md:text-base text-sm px-2 rounded-md font-bold"
          onClick={() => {
            if (commentBody) {
              handleAddingComment();
            }
          }}
        >
          Post Comment
        </button>
      </div>
    </div>
  );
}

export default AddComment;
