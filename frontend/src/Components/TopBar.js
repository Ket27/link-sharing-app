import { FaLink } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const TopBar = ({ state, setState }) => {
  const {userId} = useParams();

  const navigate = useNavigate()
  const handleClick = (state) => {
    setState(state);
  };

  const PreviewClick = () => {
    navigate(`/links/preview/${userId}`)
  }
  return (
    <div className="TopBar-Container">
      <div className="TopBar-Logo">YourLinks</div>
      <div className="TopBar-Main">
        <div
          className={`TopBar-Links ${state === "Links" && "active"}`}
          onClick={(e) => handleClick("Links")}
        >
          <FaLink />
          <span>Links</span>
        </div>

        <div
          className={`TopBar-Links ${state === "Details" && "active"}`}
          onClick={(e) => handleClick("Details")}
        >
          <CgProfile /> <span>Profile Details</span>
        </div>
      </div>
      <div className="TopBar-Preview" onClick={PreviewClick}>Preview</div>
    </div>
  );
};

export default TopBar;
