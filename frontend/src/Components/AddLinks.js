import { useEffect, useState } from "react";
import logo from "../assets/illustration-empty.svg";
import Link from "./Link";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { linksActions } from "../store/linkSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddLinks = ({ plat, setPlat }) => {
  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const dispatch = useDispatch();

  const handleClickAction = async (action, index) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      if (action === "add") {
        try {
          if (!platform || !url) {
            toast.warning("Entries not filled");
            return;
          }
          plat.platform = platform;
          plat.url = url;

          const newLink = { platform, url };
          setPlat([...plat.slice(0, index), newLink, ...plat.slice(index + 1)]);
          dispatch(
            linksActions.setLinksDetails([
              ...plat.slice(0, index),
              newLink,
              ...plat.slice(index + 1),
            ])
          );
          const { data } = await axios.post(
            `https://link-sharing-app-kohl.vercel.app/api/links/create/${userId}`,
            { platform, url },
            config
          );
          toast.success("Link added successfully");
        } catch (err) {
          console.log(err);
        }
      }

      if (action === "remove") {
        try {
          const { data } = await axios.delete(
            `https://link-sharing-app-kohl.vercel.app/api/links/delete/${userId}`,
            { data: { url: plat[index].url }, headers: config.headers }
          );
          setPlat([...plat.slice(0, index), ...plat.slice(index + 1)]);
          dispatch(
            linksActions.setLinksDetails([
              ...plat.slice(0, index),
              ...plat.slice(index + 1),
            ])
          );
          toast.success("Link removed successfully");
        } catch (error) {
          console.error("Error deleting:", error);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const UrlsShown = async () => {
      try {
        const { data } = await axios.get(
          `https://link-sharing-app-kohl.vercel.app/api/links/get/${userId}`
        );
        setPlat([...data.data.links]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    UrlsShown();
  }, [userId, setPlat]);

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  const handleClick = (platform) => {
    const newPlat = platform;
    setPlat([...plat, newPlat]);
  };

  return (
    <div className="AddLinks-Container">
      <div className="AddLinks-text">
        <h2>Customize your links</h2>
        <p>
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
      </div>
      <div className="AddLinks-Links">
        <div className="Add-New-Link" onClick={(e) => handleClick({})}>
          + Add New Link
        </div>

        {plat.length > 0 && (
          <div className="Links">
            {plat.map((Platform, index) => (
              <Link
                key={index}
                handleClickAction={handleClickAction}
                index={index}
                setPlatform={setPlatform}
                url={url}
                setUrl={setUrl}
                Platform={Platform}
              />
            ))}
          </div>
        )}
        {plat.length === 0 && (
          <div className="No-Links">
            <img src={logo} alt="img" className="empty" />
            <h2>Let's get you started</h2>
            <p>
              Use the “Add new link” button to get started. Once you have more{" "}
              <br />
              than one link, you can reorder and edit them. We're here to help{" "}
              <br />
              you share your profiles with everyone!
            </p>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddLinks;
