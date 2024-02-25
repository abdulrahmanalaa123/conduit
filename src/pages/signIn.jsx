import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/authenticationApi";
import { useForm } from "react-hook-form";
import { errorListFormatting } from "../lib/axios";

function SignIn() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });
  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      await login(data);
      navigate("/");
    } catch (error) {
      const errorList = errorListFormatting(error);

      setError("root", {
        message: errorList,
      });
    }
  }

  //i couldve not used the login object but ill keep it for educational purposes i couldve named my email user.email and password
  // user.password in react hook form and wouldve achieved the same results
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4 p-8 ">
      <p className="text-slate-300 text-3xl font-bold">SignIn</p>
      <Link to="/register" className="text-accentColor hover:underline">
        Need an Account?
      </Link>

      <form
        action="register "
        className="flex flex-col gap-4 w-[30%] "
        onSubmit={handleSubmit(onSubmit)}
      >
        {errors.root &&
          errors.root.message.map((error, index) => (
            <p key={index} className=" text-red-500">
              {error}
            </p>
          ))}
        {(errors.user?.email?.type === "required" ||
          errors.user?.password?.type == "required") && (
          <p className="text-red-500">
            Cant Leave Either email or Password Blank
          </p>
        )}
        {errors.user?.email && errors.user?.email.type !== "required" && (
          <p className="text-red-500">{errors.user?.email.message}</p>
        )}
        {errors.user?.password && errors.user?.password.type !== "required" && (
          <p className="text-red-500">{errors.user?.password.message}</p>
        )}
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
          className="self-end text-xl disabled:opacity-50 bg-accentColor text-slate-500 font-bold px-6 py-3 rounded-md"
        >
          SignIn
        </button>
      </form>
    </div>
  );
}

export default SignIn;
