import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./editCategoryStyle.css";
import axios from "../../../api/axios";

const EditCategory = (props) => {
  const [category, setCategory] = useState();
  const nodeMainRef = useRef();
  const handleSubmit = (values) => {
    async function EditCategory() {
      try {
        await axios({
          method: "put",
          url: `/category?id=${props.id}`,
          data: values,
        });
        props.setEditCategory(false);
        props.setStatusSuccess(!props.statusSuccess);
      } catch (error) {
        console.log(error);
      }
    }
    EditCategory();
  };
  useEffect(() => {
    async function GetCategory() {
      try {
        const response = await axios({
          method: "get",
          url: `/category/detail?id=${props.id}`,
        });
        setCategory(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    GetCategory();
  }, []);
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (props.editCategory && !nodeMainRef.current?.contains(e.target)) {
        document.body.classList.remove("active");
        props.setEditCategory(false);
      }
    };
    if (props.editCategory) {
      document.addEventListener("click", handleClickOutSide);
    }
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, [props]);
  return (
    <div className="editCategory" ref={nodeMainRef}>
      <div
        className="editCategory-delete"
        onClick={() => props.setEditCategory(false)}
      >
        <i className="fa fa-times"></i>
      </div>
      <div className="editCategory-main">
        <div className="editCategory-title">
          <span>
            <i className="fa fa-calendar"></i>
          </span>
          <span>Edit Category</span>
        </div>
        {category && (
          <Formik
            initialValues={{
              name: category?.name,
              description: category?.description,
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
              <div className="editCategory-form">
                <div className="editCategory-input">
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
                <div className="editCategory-input">
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

                <div className="editCategory-buttonAdd">
                  <button type="submit">Save</button>
                </div>
              </div>
            </Form>
          </Formik>
        )}
      </div>
    </div>
  );
};

export default EditCategory;
