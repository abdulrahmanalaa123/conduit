import { errorListFormatting } from "../lib/axios";

function ErrorComponent(error) {
  const errorList = errorListFormatting(error);
  return (
    <div className="flex justify-center">
      {errorList.map((errorString) => (
        <p className="text-red-500 font-bold text-2xl">{errorString}</p>
      ))}
    </div>
  );
}

export default ErrorComponent;
