import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./changepass.css";
import useAuth from "../../hook/useAuth";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const ChangePassword = () => {
  const [message, setMessage] = useState();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setAuth(user);
  }, []);
  const handleSubmit = (values) => {
    async function ChangePassword() {
      try {
        await axios({
          method: "put",
          url: "/user/changepassword",
          data: values,
        });
        navigate("/logout");
      } catch (error) {
        console.log(error);
        setMessage("password is incorrect");
      }
    }
    ChangePassword();
  };
  return (
    <div className="changePassword">
      <Sidebar></Sidebar>
      <div className="changePassword-navbar">
        <Navbar></Navbar>
      </div>
      <div className="changePassword-main">
        <div className="changePassword-content">
          <div className="changePassword-title">
            <h3>Change password</h3>
            <p>
              Strong password required. Enter 8-30 characters. Do not include
              common words or names. Combine uppercase letters, lowercase
              letters, numbers, and symbols.
            </p>
          </div>
          <div className="changePassword-username">
            <h4>Username</h4>
            <span>{auth.email}</span>
          </div>
          <Formik
            initialValues={{
              password: "",
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={Yup.object({
              password: Yup.string()
                .min(6, "Must be 6 characters or more")
                .required("Required"),
              newPassword: Yup.string()
                .min(6, "Must be 6 characters or more")
                .required("Required"),
              confirmPassword: Yup.string()
                .oneOf(
                  [Yup.ref("newPassword"), null],
                  "New passwords must match"
                )
                .required("Required"),
            })}
            onSubmit={handleSubmit}
          >
            <Form method="post">
              <div className="changePassword-input">
                <div className="changePassword-inputItem">
                  <label htmlFor="password">Old Password</label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter old password..."
                  />
                  <span>{message || <ErrorMessage name="password" />}</span>
                </div>
                <div className="changePassword-inputItem">
                  <label htmlFor="newPassword">New Password</label>
                  <Field
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    placeholder="Enter new password..."
                  />
                  <span>
                    <ErrorMessage name="newPassword" />
                  </span>
                </div>
                <div className="changePassword-inputItem">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm password..."
                  />
                  <span>
                    <ErrorMessage name="confirmPassword" />
                  </span>
                </div>
              </div>
              <div className="changePassword-button">
                <button type="submit">Save</button>
                <span
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Cancel
                </span>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
