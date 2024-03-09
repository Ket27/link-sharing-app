import FinalDisplay from "./FinalDisplay";

const PreviewPage = () => {
  return (
    <div className="PreviewPage-Container">
      <div className="PreviewPage-Top"></div>
      <div className="PreviewPage-Bottom"></div>
      <div className="PreviewPage-Display">
        <FinalDisplay />
      </div>
    </div>
  );
};

export default PreviewPage;
