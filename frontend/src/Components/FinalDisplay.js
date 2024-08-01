import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const FinalDisplay = () => {
  const { userId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(
          `http://localhost:8080/api/auth/getUserById/${userId}`
        );
        setName(userResponse.data.data.name);
        setEmail(userResponse.data.data.email);
        setPhoto(userResponse.data.data.photo);

        const linksResponse = await axios.get(
          `http://localhost:8080/api/links/get/${userId}`
        );
        setLinks(linksResponse.data.data.links);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <div className="FinalDisplay-Container">
      {loading ? (
        <AiOutlineLoading3Quarters className="Loading-Spinner" />
      ) : (
        <>
          <div className="FinalDisplay-Image">
            <img src={`/uploads/${photo}`} alt="Profile" />
          </div>
          <div className="FinalDisplay-Text">
            {name} <br />
            {email}
          </div>
          <div className="FinalDisplay-Links">
            {links.map((link) => (
              <div key={link._id} className="FinalDisplay-Link">
                <Link
                  to={link.url}
                  style={{
                    textDecoration: "none",
                    fontFamily: "Arial, Helvetica, sans-serif",
                    color: "black",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{link.platform} <img src = {require("../assets/link arrow.png")} alt="Link" className= "fin-dis-links"/></span>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FinalDisplay;
