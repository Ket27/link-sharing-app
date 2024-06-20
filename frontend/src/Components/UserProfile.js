import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userActions } from "../store/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const { userDetails } = useSelector((store) => store.user);
  const [name, setName] = useState(userDetails.name);
  const [email, setEmail] = useState(userDetails.email);
  const [photo, setPhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(userDetails.photo);
  const dispatch = useDispatch();
  const { userId } = useParams();

  const submitHandler = async () => {
    if (!name || !email) {
      toast.error("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (photo) formData.append("photo", photo);

    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const { data } = await axios.put(
        `http://localhost:8080/api/auth/updateUser/${userId}`,
        formData,
        config
      );

      if (data.message === "user Updated") {
        dispatch(userActions.setUserDetails(data.data));
        localStorage.setItem("userInfo", JSON.stringify(data.data));
        toast.success("User Updated");
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/png", "image/jpeg", "image/bmp"].includes(file.type)) {
        toast.error("Invalid file format. Only png, jpg, or bmp are allowed.");
        return;
      }

      if (file.size > 1024 * 1024) {
        toast.error("File size should be less than 1MB.");
        return;
      }

      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="UserProfile-Container">
      <div className="UserProfile-Text">
        <h2>Profile Details</h2>
        <p>Add your details to create a personal touch to your profile</p>
      </div>
      <div className="UserProfile-Details">
        <div className="UserProfile-Image-Section">
          <p>Profile Picture</p>
          <input
            type="file"
            className="Image-Box"
            accept="image/png, image/jpeg, image/bmp"
            onChange={handlePhotoChange}
          />
          {previewPhoto && (
            <img
              src={previewPhoto}
              alt=""
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                marginTop: "10px",
              }}
            />
          )}
          <p>
            Image must be below 1024x1024px.
            <br />
            Use png, jpg or bmp format.
          </p>
        </div>
        <div className="UserProfile">
          <div className="UserProfile-Name">
            <p>Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div className="UserProfile-Email">
            <p>Email</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
        </div>
        <button className="Save" onClick={submitHandler}>
          Save
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserProfile;
