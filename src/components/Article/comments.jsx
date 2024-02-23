import ErrorComponent from "../errorComponent";

function Comments(commentsQuery) {
  if (commentsQuery.isLoading) {
    return (
      <div className="flex justify-center py-12 text-4xl text-accentColor font-bold">
        Data is isLoading
      </div>
    );
  }

  if (commentsQuery.isError) {
    return <ErrorComponent error={commentsQuery.error}></ErrorComponent>;
  }
  return <></>;
}

export default Comments;
