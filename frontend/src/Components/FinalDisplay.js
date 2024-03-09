import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const FinalDisplay = () => {
  const { userId } = useParams();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [photo, setPhoto] = useState();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const copyData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/auth/getUserById/${userId}`
        );
        setName(data.data.name);
        setEmail(data.data.email);
        setPhoto(data.data.photo);
      } catch (err) {
        console.log(err);
      }
    };
    copyData();
  }, [userId]);


  useEffect(() => {
    const copyLink = async () => {
        try {
        const {data} = await axios.get(
            `http://localhost:8080/api/links/get/${userId}`
          );
          if(data){
            setLinks(data.data.links);
          }
        }

        catch(err){
            console.log(err);
        }

        finally{
          setLoading(false);
        }
    };
    copyLink();
  }, [userId])


  return (
    <div className="FinalDisplay-Container">
      {loading && <AiOutlineLoading3Quarters />}
      <div className="FinalDisplay-Image">
        <img src={`../../../uploads/${photo}`} alt="pic" />
      </div>
      <div className="FinalDisplay-Text">
        {name} <br />
        {email}
      </div>
      {links.length > 0 && <div className="FinalDisplay-Links">
         {links.map((link) => (
            <div key={link._id} className="FinalDisplay-Link">
            <Link
              to={`${link.url}`}
              style={{
                textDecoration: "none",
                fontFamily: "Arial, Helvetica, sans-serif",
                color: "black",
              }}
            >
              {link.platform}-
            </Link>
          </div>
         ))}
      </div>}
    </div>
  );
};

export default FinalDisplay;
