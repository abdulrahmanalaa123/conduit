import useAuthStore from "../../stores/auth";
import ErrorComponent from "../errorComponent";
import { Link, useNavigate } from "react-router-dom";
import AddComment from "./addComment";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteComment, getComments } from "../../api/commentsApi";

// could add the comments query call directly here since all the loader did was intiialize the hook for the query
//so wherever i call it wouldnt matter and it would make more sense to make the comments component contains the commentsHookCall
const commentsQuery = (slug) => ({
  queryKey: ["comments", slug],
  queryFn: () => getComments({ slug }),
});
function Comments() {
  const params = useParams();
  const identification = useAuthStore((state) => state.identification);
  //removed because its invoked by rerenders while calling articles to call it twice
  //fact checked it doesnt so its better to leave it here to make this as a component of its own
  //turns out the api doesnt return any comments if its not logged in
  const { data, isLoading, isError, error } = useQuery(
    commentsQuery(params.slug)
  );

  const queryClient = useQueryClient();
  // for ease of access
  //could use set state but i feel like its better to only use invalidating queries for it like
  //the comments posting
  const navigate = useNavigate();

  const removeComment = useMutation({
    mutationFn: deleteComment,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["comments", params.slug],
        exact: true,
      });
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
    return <ErrorComponent error={error}></ErrorComponent>;
  }

  function handleDeletion(id) {
    removeComment.mutate({ slug: params.slug, id: id });
  }
  return (
    <div className="w-[70%] mx-auto self-start">
      {identification ? (
        <AddComment></AddComment>
      ) : (
        <div className="flex justify-center text-start mt-8 gap-2 self-center">
          <Link to="/login" className="text-accentColor hover:underline">
            SignIn
          </Link>
          or
          <Link to="/register" className="text-accentColor hover:underline">
            SignUp
          </Link>
          to add comments to this article
        </div>
      )}
      {data.comments.map((comment) => {
        return (
          <div key={comment.id} className=" flex flex-col my-4">
            <div className="bg-[#3B3B3B] text-slate-200 p-4 rounded-t-md md:text-base text-sm ">
              {comment.body}
            </div>
            <div className="bg-slate-200 rounded-b-md flex justify-between md:p-4 p-2 text-slate-700">
              <div className="flex gap-1 items-center">
                <img
                  src={comment.author.image}
                  alt=""
                  className="size-8 rounded-full mr-1 inline-block"
                />
                <p
                  className="text-slate-700 md:text-base text-sm  truncate text-ellipsis md:w-[20ch] w-[10ch] hover:underline cursor-pointer "
                  onClick={() => {
                    navigate(`/profile/${comment.author.username}`);
                  }}
                >
                  {comment.author.username}
                </p>
              </div>
              <div className="flex items-center">
                <span className="text-slate-700 md:mr-2 md:text-base text-sm ">
                  {new Date(comment.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                {comment.author.username === identification.username ? (
                  <button
                    className="group text-slate-700 hover:text-slate-900"
                    onClick={() => {
                      handleDeletion(comment.id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 group-hover:stroke-2 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Comments;
