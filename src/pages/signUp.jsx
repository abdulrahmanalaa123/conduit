import { Link } from "react-router-dom";
import { signUp } from "../api/authenticationApi";
import { useForm } from "react-hook-form";

function SignUp() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ mode: onSubmit, reValidateMode: onSubmit });

  async function onSubmit(data) {
    try {
      await signUp(data);
    } catch (error) {
      const errorList = [];
      for (const errorType in error.errors) {
        errorList.push(`${errorType} ${error.errors[errorType][0]}`);
      }

      setError("root", {
        message: errorList,
      });
    }
  }

  //i couldve not used the login object but ill keep it for educational purposes i couldve named my email user.email and password
  // user.password in react hook form and wouldve achieved the same results
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4 p-8 ">
      <p className="text-slate-300 text-3xl font-bold">SignUp</p>
      <Link to="/login" className="text-accentColor hover:underline">
        Have an Account?
      </Link>

      <form
        action="register "
        className="flex flex-col gap-4 w-[30%] "
        onSubmit={handleSubmit(onSubmit)}
      >
        {errors.root &&
          errors.root.message.map((error, index) => (
            <p key={index} className=" text-accentColor">
              {error}
            </p>
          ))}
        {(errors.user?.email?.type === "required" ||
          errors.user?.password?.type == "required" ||
          errors.user?.username?.type == "required") && (
          <p className="text-accentColor">Cant Leave any of the fields Blank</p>
        )}
        {errors.user?.email && errors.user?.email.type !== "required" && (
          <p className="text-accentColor">{errors.user?.email.message}</p>
        )}
        {errors.user?.password && errors.user?.password.type !== "required" && (
          <p className="text-accentColor">{errors.user?.password.message}</p>
        )}

        <input
          type="text"
          {...register("user.username", { required: true })}
          placeholder="Username"
          className="border-2 border-accentColor w-full rounded-md px-4 h-14"
        />
        <input
          type="text"
          {...register("user.email", {
            required: true,
            validate: (value) => {
              if (!value.includes("@")) {
                return "emails must include @";
              }
              return true;
            },
          })}
          placeholder="Email"
          className="border-2 border-accentColor w-full rounded-md px-4 h-14"
        />
        <input
          type="password"
          {...register("user.password", {
            required: true,
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
          })}
          placeholder="Password"
          className="border-2 border-accentColor w-full rounded-md px-4 h-14"
        />

        <button
          disabled={isSubmitting}
          className="self-end text-xl disabled:bg-blue-500 bg-accentColor text-slate-500 font-bold px-6 py-3 rounded-md"
        >
          SignUp
        </button>
      </form>
    </div>
  );
}

export default SignUp;
