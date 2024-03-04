import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import createEditArticleHook from "../api/articles/createEditArticleHook";

function Editor() {
  const location = useLocation();

  const navigate = useNavigate();
  const {
    register,
    watch,
    setValue,
    getValues,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      article: {
        title: location.state?.title,
        description: location.state?.description,
        body: location.state?.body,
        tagList: location.state?.tagList.join(" "),
      },
    },
  });
  const watchTags = watch("article.tagList");

  const { mutate: EditCreateArticle } = createEditArticleHook({
    state: location.state,
    setError: setError,
    navigate: navigate,
  });
  function onSubmit(data) {
    const modifiedData = { ...data };
    //turning my tags string into a tags list and removing empty tags
    modifiedData.article.tagList = data.article.tagList
      .split(" ")
      .filter((str) => str.trim() !== "");
    if (location.state) {
      EditCreateArticle({
        data: { article: { ...location.state, ...modifiedData.article } },
      });
    } else {
      EditCreateArticle({ data: modifiedData });
    }
  }
  function deleteTag(e, tag) {
    //idk why but it submits on any click so i must prevent default
    e.preventDefault();
    const tagsListString = getValues("article.tagList");
    //this just changes first encounter
    const newString = tagsListString.replace(tag, "");
    setValue("article.tagList", newString);
  }

  return (
    <form
      className="flex flex-col mx-auto justify-center  gap-4 h-full mt-12 w-[90%] sm:w-[50%]"
      onSubmit={handleSubmit(onSubmit)}
    >
      {errors.root &&
        errors.root.message.map((error, index) => (
          <p key={index} className=" text-red-500">
            {error}
          </p>
        ))}
      {(errors.article?.title?.type === "required" ||
        errors.article?.body?.type == "required") && (
        <p className="text-red-500">Cant Leave Either body or title Blank</p>
      )}
      <input
        type="text"
        {...register("article.title", {
          required: true,
        })}
        placeholder="Article title"
        className="p-4 rounded-md self-stretch bg-[#3B3B3B]"
      />
      <input
        type="text"
        {...register("article.description")}
        placeholder="What's this article about"
        className="p-4 rounded-md self-stretch bg-[#3B3B3B]"
      />
      <textarea
        type="text"
        rows="5"
        {...register("article.body", {
          required: true,
        })}
        placeholder="Write your aricle (in Markdown)"
        className="p-4 rounded-md self-stretch bg-[#3B3B3B]"
      />
      <input
        type="text"
        {...register("article.tagList")}
        placeholder="Enter tags"
        className="p-4 rounded-md self-stretch bg-[#3B3B3B]"
      />
      {watchTags && (
        <div className="flex gap-2 flex-wrap">
          {watchTags
            .split(" ")
            .filter((str) => str.trim() !== "")
            .map((tag, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center gap-1 py-1 bg-slate-500 text-sm rounded-full px-3 text-slate-200"
                >
                  <button
                    className="text-slate-200"
                    onClick={(e) => {
                      deleteTag(e, tag);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </button>

                  {tag}
                </div>
              );
            })}
        </div>
      )}
      <button
        className="self-end px-6 py-3 disabled:opacity-50 bg-accentColor rounded-md text-xl"
        disabled={isSubmitting}
      >
        {location.state ? "UpdateArticle" : "AddArticle"}
      </button>
    </form>
  );
}

export default Editor;
