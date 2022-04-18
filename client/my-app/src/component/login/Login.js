import React, { useEffect, useState } from "react";
import "./styleLogin.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
const URL = "https://back-end-1640.herokuapp.com";
const Login = () => {
  const [openEye, setOpenEye] = useState(false);
  const navigate = useNavigate();
  const handleOpenEye = () => {
    setOpenEye(!openEye);
  };
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("/login", values);
      console.log(response.data.token);
      if (response?.data?.token) {
        localStorage.setItem("token", response.data.token);
        response.data.user.url = URL;
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.log(`The error happend ${error}`);
    }
  };
  return (
    <div style={{ position: "relative" }}>
      <div className="logoLogin">
        <img
          className="logoLogin__img"
          src="./images/bg-login.png"
          alt="logo"
        />
      </div>
      <div className="bg-login">
        <div className="login">
          <div className="login-title">
            <h3>Greenwich University</h3>
            <p className="title">
              Learning is the shortest path to success
              <i className="fa fa-heart"></i>
            </p>
          </div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
              password: Yup.string()
                .min(6, "Must be 6 characters or more")
                .required("Required"),
            })}
            onSubmit={handleSubmit}
          >
            <Form
              action="/login"
              method="post"
              className="form"
              id="form1"
              // autoComplete="off"
            >
              <p>Login</p>
              <div className="form-group">
                <Field
                  name="email"
                  type="text"
                  placeholder="Email"
                  className="form-control"
                />
                <div className="form-message">
                  <ErrorMessage name="email" />
                </div>
              </div>
              <div className="form-group form-password">
                <Field
                  name="password"
                  type={openEye ? "text" : "password"}
                  placeholder="Password"
                  className="form-control"
                />
                <div className="form-message">
                  <ErrorMessage name="password" />
                </div>
                <div className="eye">
                  <i
                    className={`fa ${openEye ? "fa-eye" : "fa-eye-slash"}`}
                    onClick={handleOpenEye}
                  ></i>
                </div>
                <div className="forgot-password">
                  <a href="#">Forgot Password</a>
                </div>
              </div>
              <button className="form-submit btn-login">Login</button>
              <div className="line">
                <p>OR</p>
              </div>
              <div className="login-socials">
                <button className="btn btn-fb">
                  <div className="logo">
                    <i className="fab fa-facebook"></i>
                  </div>
                  <div className="text">Facebook</div>
                </button>
                <button className="btn btn-google">
                  <div className="logo">
                    <img src="./images/google.png" alt="" />
                  </div>
                  <div className="text">Google</div>
                </button>
                <button className="btn btn-github">
                  <div className="logo">
                    <i className="fab fa-github"></i>
                  </div>
                  <div className="text">Github</div>
                </button>
              </div>
              <div className="login-new">
                <span className="new-text">Do you have an account yet?</span>
              </div>
            </Form>
          </Formik>
        </div>
        {/* <div className="text-login">
          <p>Welcome to</p>
          <h2>University of Greenwich in Vietnam</h2>
          <div className="line"></div>
          <p>Joint training with FPT University</p>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
