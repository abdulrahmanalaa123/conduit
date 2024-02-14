import axiosInterface from "../lib/axios";

function Home() {
  async function unauthorized() {
    await axiosInterface.get("/user");
  }
  return (
    <div className="p-11">
      <button
        className="bg-red-500 rounded-full px-8 py-4"
        onClick={unauthorized}
      >
        Testing
      </button>
    </div>
  );
}

export default Home;
