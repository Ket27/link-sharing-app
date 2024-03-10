import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userActions } from "../store/userSlice";
import { ToastContainer, toast } from "react-toastify";

const UserProfile = () => {
  const { userDetails } = useSelector((store) => store.user);
  const [name, setName] = useState(userDetails.name);
  const [email, setEmail] = useState(userDetails.email);
  const [photo, setPhoto] = useState(userDetails.photo);
  const dispatch = useDispatch();
  const { userId } = useParams();

  const submitHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("photo", photo);

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    const { data } = await axios.put(
      `http://link-sharing-app-sigma.vercel.app/api/auth/updateUser/${userId}`,
      formData,
      config
    );

    if (data.message === "user Updated") {
      dispatch(
        userActions.setUserDetails({ name, email, photo: data.data.photo })
      );
      localStorage.setItem("userInfo", JSON.stringify(data.data));
      toast.success("User Updated");
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
            onChange={(e) => {
              setPhoto(e.target.files[0]);
            }}
            style={{ backgroundImage: `url('../../../uploads/${photo}')` }}
           />
          <p>
            Image must be below 1024x1024px.
            <br />
            Use png, jpg or bmp format
          </p>
        </div>
        <div className="UserProfile">
          <div className="UserProfile-Name">
            <p>Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="UserProfile-Email">
            <p>Email</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
