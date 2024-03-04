import { useForm } from "react-hook-form";
import useAuthStore from "../stores/auth";
import { editUser } from "../api/auth/updateUser";
import { errorListFormatting } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import invalidateFetches from "../lib/invalidateFetches";

function Settings() {
  const identification = useAuthStore((state) => state.identification);
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
      invalidateFetches();
      navigate("/");
      navigate(0);
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
      className="flex flex-col mx-auto justify-center  gap-4 h-full mt-12 w-[90%] sm:w-[50%]"
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
        className="p-4 rounded-md self-stretch bg-[#3B3B3B]"
      />
      <input
        type="text"
        {...register("user.username", { required: true })}
        placeholder="Your Name"
        className="p-4 rounded-md self-stretch bg-[#3B3B3B]"
      />
      <textarea
        type="text"
        rows="5"
        {...register("user.bio")}
        placeholder="Write a short bio about yourself"
        className="p-4 rounded-md self-stretch bg-[#3B3B3B]"
      />
      <input
        type="text"
        {...register("user.email", { required: true })}
        placeholder="Email"
        className="p-4 rounded-md self-stretch bg-[#3B3B3B]"
      />
      <input
        type="text"
        {...register("user.password")}
        placeholder="Password"
        className="p-4 rounded-md self-stretch bg-[#3B3B3B]"
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
