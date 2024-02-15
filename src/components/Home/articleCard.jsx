function ArticleCard() {
  return (
    <div className="py-8 w-full border-t-2 border-t-slate-300">
      <div className="flex flex-row justify-between mb-2">
        <div className="flex items-center">
          <img
            src="https://api.realworld.io/images/smiley-cyrus.jpeg"
            alt="x"
            className="rounded-full w-8 h-8  inline-block mr-1 "
          />
          <div className="inline-block">
            <p className="text-accentColor font-semibold">Maksim Esteban</p>
            <p className="text-xs text-slate-400">January 4,2024</p>
          </div>
        </div>
        <button className="bg-accentColor text-sm px-2 py-1 rounded-[0.2rem] hover:bg-[#449d44] flex items-center h-min">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="fill-white w-4 h-4 inline-block mr-1 self-center"
          >
            <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
          </svg>
          <span>75</span>
        </button>
      </div>
      <div>
        <p className="text-2xl text-slate-300">
          Ill quantify the redundant TCP bus, that should hard drive the ADP
          bandwidth!
        </p>
        <p className="mb-4 text-slate-500">
          Aut facilis qui. Cupiditate sit ratione eum sunt rerum impedit. Qui
          suscipit debitis et et voluptates voluptatem voluptatibus. Quas
          voluptatum quae corporis corporis possimus.
        </p>
      </div>
    </div>
  );
}

export default ArticleCard;
