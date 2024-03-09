import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userActions } from "../store/userSlice";
import { useEffect } from "react";

const Display = ({ plat }) => {
  const { userDetails } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(userActions.setUserDetails(parsedUser));
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
                  src={`../../../uploads/${userDetails.photo}`}
                  alt="Profile"
                />
              </div>
              {userDetails.name}
              <br />
              {userDetails.email}
            </div>
            <div
              className="Display-Links"
              style={{
                justifyContent:
                  plat.length <= 3 ? "flex-start" : "space-between",
              }}
            >
              {plat.length > 0 &&
                plat.map((links) => (
                  <div key={links._id} className="Display-Single-Link">
                    <Link
                      to={`${links.url}`}
                      style={{
                        textDecoration: "none",
                        fontFamily: "Arial, Helvetica, sans-serif",
                        color: "black",
                      }}
                    >
                      {links.platform}-
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
