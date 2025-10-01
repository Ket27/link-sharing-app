import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userActions } from "../store/userSlice";
import { useEffect } from "react";

const colors = [
  '#FF6B9D', // Hot Pink
  '#C44569', // Dark Pink
  '#FFA502', // Orange
  '#F79F1F', // Amber
  '#54A0FF', // Blue
  '#5F27CD', // Purple
  '#00D2D3', // Cyan
  '#1DD1A1'  // Emerald
];

const Display = ({ plat }) => {
  const { userDetails } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        dispatch(userActions.setUserDetails(parsedUser));
      } catch (err) {
        console.error("Failed to parse userInfo from localStorage", err);
        // Optionally clear invalid data
        localStorage.removeItem("userInfo");
      }
    }
  }, [dispatch]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Display-Container">
      <div className="Outer-Layer">
        <div className="Inner-Layer">
          <div className="Inner-Top-Layer"></div>
          <div className="Inner-Bottom-Layer">
            <div className="Display-User">
              <div className="Display-UserImage">
                <img
                  src={`https://your-links-k2kb.onrender.com/uploads/${
                    userDetails.photo || "default.jpg"
                  }`}
                  alt="Profile"
                  onError={(e) => (e.target.src = "default.jpg")}
                />
              </div>
              <div>
                {userDetails.name}
                <br />
                {userDetails.email}
              </div>
            </div>
            <div
              className="Display-Links"
              style={{
                justifyContent:
                  plat && plat.length <= 3 ? "flex-start" : "space-between",
              }}
            >
              {plat &&
                plat.length > 0 &&
                plat.map((links) => (
                  <div key={links._id} className="Display-Single-Link" style={{backgroundColor: colors[Math.floor(Math.random() * colors.length)]}}>
                    <Link
                      to={links.url}
                      style={{
                        textDecoration: "none",
                        fontFamily: "Arial, Helvetica, sans-serif",
                        color: "black",
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>
                        {links.platform}{" "}
                        <img
                          src={require("../assets/link arrow.png")}
                          alt="Link"
                          className="dis-links"
                        />
                      </span>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
