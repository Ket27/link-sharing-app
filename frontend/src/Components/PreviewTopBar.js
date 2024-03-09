import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PreviewTopBar = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const handleEvent = () => {
    navigate(`/yourlinks/addLinks+profiledetails/${userId}`);
  };

  const handleCopyEvent = () => {
    const currentUrl = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(currentUrl)
        .then(() => {
          console.log("URL copied to clipboard!");
          toast.success("Link Copied!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    } else {
      console.error("Clipboard API not supported in this browser.");
    }
  };

  return (
    <>
      <div className="PreviewTopBar-Container">
        <button className="Back-To-Editor" onClick={handleEvent}>
          Back To Editor
        </button>
        <button className="Copy-Link" onClick={handleCopyEvent}>
          Copy Link
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default PreviewTopBar;
