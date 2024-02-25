import { useParams, useLocation } from "react-router-dom";

function Editor() {
  const params = useParams();
  const location = useLocation();
  console.log(params);
  console.log(location.state);
  return <div>Editor</div>;
}

export default Editor;
