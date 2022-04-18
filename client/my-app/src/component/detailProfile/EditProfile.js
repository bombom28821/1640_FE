import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useAuth from "../../hook/useAuth";
import Sidebar from "../sidebar/Sidebar";
import "./editprofile.css";
import Navbar from "../navbar/Navbar";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { auth, setAuth } = useAuth();
  const [file, setFile] = useState();
  const inputRef = useRef();
  const navigate = useNavigate();
  const handleClickImage = () => {
    inputRef.current.click();
  };
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    file.img = URL.createObjectURL(e.target.files[0]);
    setFile(file);
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setAuth(user);
  }, []);
  useEffect(() => {
    return () => {
      file && URL.revokeObjectURL(file.img);
    };
  }, [file]);
  const handleSubmit = (values) => {
    console.log(file);
    const formData = new FormData();
    formData.append("avatar", file ? file : null);
    formData.append("name", values.name);
    formData.append("phone", values.phone);
    formData.append("address", values.address);

    async function EditProfile() {
      try {
        const response = await axios({
          method: "put",
          url: "/user",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        response.data.url = auth.url;
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/view-profile");
      } catch (error) {
        console.log(error);
      }
    }
    EditProfile();
  };
  return (
    <div className="editProfile">
      <Sidebar></Sidebar>
      <div className="editProfile-navbar">
        <Navbar></Navbar>
      </div>
      <div className="editProfile-main">
        <div className="editProfile-mainContent">
          <h4>Edit Profile</h4>
          <span>{`Hi ${auth.name}, welcome to edit profile`}</span>

          <Formik
            initialValues={{
              name: auth.name,
              email: auth.email,
              phone: auth.phone,
              address: auth.address,
            }}
            validationSchema={Yup.object({
              name: Yup.string()
                .min(2, "Must be 2 characters or more")
                .required("Required"),
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
              phone: Yup.number()
                .integer("A phone number can't include a decimal point")
                .min(9, "Must be 9 characters or more")
                .required("Required"),
              address: Yup.string().required("Required"),
            })}
            onSubmit={handleSubmit}
          >
            <Form method="post">
              <div className="editProfile-content">
                <div className="editProfile-img" onClick={handleClickImage}>
                  {file?.img ? (
                    <img src={file.img} alt="avatar-user" />
                  ) : (
                    <img src={`${auth.url}/${auth.avatar}`} alt="avatar-user" />
                  )}
                  <div className="editProfile-overflay">
                    <i className="fa fa-camera-retro"></i>
                  </div>
                  <input
                    type="file"
                    hidden
                    ref={inputRef}
                    onChange={handleUploadImage}
                  />
                </div>

                <div className="editProfile-info">
                  <div className="editProfile-infoItem">
                    <label htmlFor="email">Email</label>
                    <Field type="text" id="email" name="email" readOnly />
                    <span>
                      <ErrorMessage name="email" />
                    </span>
                  </div>
                  <div className="editProfile-infoItem">
                    <label htmlFor="name">Name</label>
                    <Field type="text" id="name" name="name" />
                    <span>
                      <ErrorMessage name="name" />
                    </span>
                  </div>
                  <div className="editProfile-infoItem">
                    <label htmlFor="phone">Phone</label>
                    <Field type="text" id="phone" name="phone" />
                    <span>
                      <ErrorMessage name="phone" />
                    </span>
                  </div>
                  <div className="editProfile-infoItem">
                    <label htmlFor="address">Address</label>
                    <Field type="text" id="address" name="address" />
                    <span>
                      <ErrorMessage name="address" />
                    </span>
                  </div>
                </div>
                <div className="editProfile-update">
                  <button type="submit">Save</button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
