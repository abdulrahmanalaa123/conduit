import { useRef } from "react";
import useAuthStore from "../../stores/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "../../api/commentsApi";
import { useParams } from "react-router-dom";
//used query lcient as an input as a thought of reducing load of not calling the same object inseveral places
//since it is called in the main component idk which is better to call in each component on its own or
//changed the idiom since it means as a better solution for seperation of concerns to have each component has its own
//hooks and function calls where it would take a b it mroe resources but we have alot of those to spare
function AddComment() {
  const slug = useParams().slug;
  const queryClient = useQueryClient();
  const identification = useAuthStore((state) => state.identification);
  const commentBody = useRef();

  const postComment = useMutation({
    mutationFn: addComment,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["comments", slug],
        exact: true,
      });
      commentBody.current.value = "";
    },
  });

  function handlePosting() {
    postComment.mutate({
      slug: slug,
      comment: { comment: { body: commentBody.current.value } },
    });
  }
  return (
    <div className="mt-8 flex flex-col ">
      <textarea
        name="comment"
        rows="5"
        placeholder="write an article"
        required
        className="p-4 resize-y w-full rounded-t-md"
        ref={commentBody}
      ></textarea>
      <div className="p-4 flex justify-between bg-slate-200 rounded-b-md">
        <img
          src={identification.image}
          alt="profile-image"
          className="size-8 rounded-full"
        />
        <button
          className="bg-accentColor text-slate-200 text-sm px-2 rounded-md font-bold"
          onClick={() => {
            handlePosting();
          }}
        >
          Post Comment
        </button>
      </div>
    </div>
  );
}

export default AddComment;
