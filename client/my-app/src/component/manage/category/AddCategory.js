import React, { useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./AddCategory.css";
import axios from "../../../api/axios";

const AddCategory = (props) => {
  const nodeMainRef = useRef();
  const handleSubmit = (values) => {
    async function Post() {
      try {
        await axios({
          method: "post",
          url: `/category`,
          data: values,
        });
        props.setNewCategory(false);
        props.setStatusSuccess(!props.statusSuccess);
      } catch (error) {
        console.log(error);
      }
    }
    Post();
  };
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (props.newCategory && !nodeMainRef.current?.contains(e.target)) {
        document.body.classList.remove("active");
        props.setNewCategory(false);
      }
    };
    if (props.newCategory) {
      document.addEventListener("click", handleClickOutSide);
    }
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, [props]);
  return (
    <div className="addCategory" ref={nodeMainRef}>
      <div
        className="addCategory-delete"
        onClick={() => props.setNewCategory(false)}
      >
        <i className="fa fa-times"></i>
      </div>
      <div className="addCategory-main">
        <div className="addCategory-title">
          <span>
            <i className="fa fa-calendar"></i>
          </span>
          <span>New Category</span>
        </div>
        <Formik
          initialValues={{
            name: "",
            description: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(2, "Must be 2 characters or more")
              .required("Required"),
            description: Yup.string().required("Required"),
          })}
          onSubmit={handleSubmit}
        >
          <Form method="post">
            <div className="addCategory-form">
              <div className="addCategory-input">
                <Field
                  type="text"
                  name="name"
                  placeholder="Enter your category..."
                  required
                />
                <span>
                  <ErrorMessage name="name" />
                </span>
              </div>
              <div className="addCategory-input">
                <Field
                  type="text"
                  name="description"
                  placeholder="Enter your description category..."
                  required
                />
                <span>
                  <ErrorMessage name="description" />
                </span>
              </div>

              <div className="addCategory-buttonAdd">
                <button>Add</button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddCategory;
