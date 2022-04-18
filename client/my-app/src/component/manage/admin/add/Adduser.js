import React, { useEffect, useRef, useState } from "react";
import axios from "../../../../api/axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./Adduser.css";

const AddUser = (props) => {
  const [category, setCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [typeRole, setTypeRole] = useState("staff");
  const [typeDepartment, setTypeDepartment] = useState();
  const nodeMainRef = useRef();
  const handleChangeType = (e) => {
    setTypeRole(e.target.value);
    if (e.target.value === "coordinator" || e.target.value === "staff") {
      setCategory(true);
      if (categories) {
        setTypeDepartment(categories[0]._id);
      }
    } else {
      setCategory(false);
      setTypeDepartment(null);
    }
  };
  const handleChangeRole = (e) => {
    setTypeDepartment(e.target.value);
  };
  const handleSubmit = (values) => {
    const valuesSubmit = {
      ...values,
      role: typeRole,
      category: typeDepartment,
    };
    async function addUser() {
      try {
        await axios({
          method: "post",
          url: `/user`,
          data: valuesSubmit,
        });
        props.setNewUser(false);
        props.setStatusSuccess(!props.statusSuccess);
      } catch (error) {
        console.log(error);
      }
    }
    addUser();
  };

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (props.newUser && !nodeMainRef.current?.contains(e.target)) {
        document.body.classList.remove("active");
        props.setNewUser(false);
      }
    };
    if (props.newUser) {
      document.addEventListener("click", handleClickOutSide);
    }
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, [props]);
  useEffect(() => {
    async function GetCategory() {
      try {
        const response = await axios({
          method: "get",
          url: `/category`,
        });
        if (response) {
          setCategories(response.data);
          setTypeDepartment(response.data[0]._id);
        }
      } catch (error) {
        console.log(error);
      }
    }
    GetCategory();
  }, []);
  return (
    <div className="addUser" ref={nodeMainRef}>
      <div className="addUser-delete" onClick={() => props.setNewUser(false)}>
        <i className="fa fa-times"></i>
      </div>
      <div className="addUser-main">
        <div className="addUser-title">
          <span>
            <i className="fa fa-user"></i>
          </span>
          <span>New User</span>
        </div>
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            address: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(6, "Must be 6 characters or more")
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
            <div className="addUser-form">
              <div className="addUserInput">
                <div className="addUser-input">
                  <Field
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="formField1"
                    required
                  />
                  <span>
                    <ErrorMessage name="name" />
                  </span>
                </div>
                <div className="addUser-input">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="formField2"
                    required
                  />
                  <span>
                    <ErrorMessage name="email" />
                  </span>
                </div>
                <div className="addUser-input">
                  <Field
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="formField1"
                    required
                  />
                  <span>
                    <ErrorMessage name="address" />
                  </span>
                </div>
                <div className="addUser-input">
                  <Field
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    className="formField2"
                    required
                  />
                  <span>
                    <ErrorMessage name="phone" />
                  </span>
                </div>
                <div className="addUser-input">
                  <select className="role" onChange={handleChangeType}>
                    <option value="staff">Staff</option>
                    <option value="manager">Manager</option>
                    <option value="coordinator">Coordinator</option>
                  </select>
                </div>
                {(typeRole === "staff" || typeRole === "coordinator") && (
                  <div className="addUser-input">
                    <select className="role" onChange={handleChangeRole}>
                      {categories.length > 0 &&
                        categories.map((category) => (
                          <option
                            value={category._id}
                            key={category._id}
                            selected={category._id === typeDepartment}
                          >
                            {category.name}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="addUser-buttonAdd">
                <button type="submit">Add</button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddUser;
