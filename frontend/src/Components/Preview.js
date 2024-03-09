import { useParams } from "react-router-dom";
import PreviewTopBar from "./PreviewTopBar";
import PreviewPage from "./PreviewPage";

const Preview = () => {
  const { userId } = useParams();
  if (
    !JSON.parse(localStorage.getItem("userInfo")) ||
    !JSON.parse(localStorage.getItem("userInfo"))._id ||
    JSON.parse(localStorage.getItem("userInfo"))._id !== userId
  ) {
    return (
      <>
        {" "}
        <PreviewPage />
      </>
    );
  } else {
    return (
      <div className="Preview-Container">
        <div className="Preview-PreviewTopBar">
          <PreviewTopBar />
        </div>
        <div className="Preview-PreviewPage">
          <PreviewPage />
        </div>
      </div>
    );
  }
};

export default Preview;
