import TopBar from "./TopBar";
import Display from "./Display";
import AddLinks from "./AddLinks";
import { useState } from "react";
import UserProfile from "./UserProfile";
import { useParams } from "react-router-dom";

const Links = () => {
  const [plat, setPlat] = useState([]);
  const [state, setState] = useState("Links");
  const { userId } = useParams();

  if (
    !JSON.parse(localStorage.getItem("userInfo")) ||
    !JSON.parse(localStorage.getItem("userInfo"))._id ||
    JSON.parse(localStorage.getItem("userInfo"))._id !== userId
  ) {
    return <div>No page</div>;
  } else {
    return (
      <>
        <TopBar setState={setState} state={state} />
        <div className="First">
          <Display plat={plat} />
          {state === "Links" && <AddLinks plat={plat} setPlat={setPlat} />}
          {state === "Details" && <UserProfile />}
        </div>
      </>
    );
  }
};

export default Links;
