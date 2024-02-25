import { useForm } from "react-hook-form";
import useAuthStore from "../stores/auth";
import { editUser } from "../api/authenticationApi";
import { useQueryClient } from "@tanstack/react-query";
import { errorListFormatting } from "../lib/axios";
import { useNavigate } from "react-router-dom";

function Settings() {
  const identification = useAuthStore((state) => state.identification);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      user: {
        email: identification.email,
        username: identification.username,
        image: identification.image,
        bio: identification.bio,
      },
    },
  });
  async function onSubmit(data) {
    try {
      await editUser(data);
      queryClient.invalidateQueries({
        queryKey: ["global"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["your"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["tagged"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["my"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["favorited"],
        refetchType: "active",
      });
      navigate("/");
    } catch (error) {
      //The error came back wierd and i cant parse it and its their fault and i wotn work around it
      const errorList = errorListFormatting(error);

      setError("root", {
        message: errorList,
      });
    }
  }
  return (
    <form
      className="flex flex-col mx-auto justify-center  gap-4 h-full mt-12 w-[50%]"
      onSubmit={handleSubmit(onSubmit)}
    >
      {errors.root &&
        errors.root.message.map((error, index) => (
          <p key={index} className=" text-red-500">
            {error}
          </p>
        ))}
      {(errors.user?.image?.type === "required" ||
        errors.user?.username?.type == "required" ||
        errors.user?.email?.type == "required") && (
        <p className="text-red-500">
          Cant Leave Either Email or username nor Image Blank
        </p>
      )}
      <input
        type="text"
        {...register("user.image", { required: true })}
        placeholder="Url of Profile Picture"
        className="p-4 rounded-md self-stretch"
      />
      <input
        type="text"
        {...register("user.username", { required: true })}
        placeholder="Your Name"
        className="p-4 rounded-md self-stretch"
      />
      <textarea
        type="text"
        rows="5"
        {...register("user.bio")}
        placeholder="Write a short bio about yourself"
        className="p-4 rounded-md self-stretch"
      />
      <input
        type="text"
        {...register("user.email", { required: true })}
        placeholder="Email"
        className="p-4 rounded-md self-stretch"
      />
      <input
        type="text"
        {...register("user.password")}
        placeholder="Password"
        className="p-4 rounded-md self-stretch"
      />
      <button
        className="self-end px-6 py-3 disabled:opacity-50 bg-accentColor rounded-md text-xl"
        disabled={isSubmitting}
      >
        Update Settings
      </button>
    </form>
  );
}

export default Settings;
