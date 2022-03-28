import React from "react";
import ReactPaginate from "react-paginate";
import "./PaginationStyle.css";
const ReactPagination = (props) => {
  return (
    <>
      <ReactPaginate
        nextLabel={<i className="fa fa-angle-right"></i>}
        previousLabel={<i className="fa fa-angle-left"></i>}
        pageCount={props.pageCount}
        onPageChange={props.handleClickPage}
        marginPagesDisplayed={props.marginPagesDisplayed}
        pageRangeDisplayed={props.pageRangeDisplayed}
        breakLabel="..."
        containerClassName="manage-paginationContent"
        pageClassName="manage-paginationItem"
        pageLinkClassName="manage-paginationLink"
        previousClassName="manage-paginationItem"
        previousLinkClassName="manage-paginationLink manage-paginationLinkPrev"
        nextClassName="manage-paginationItem"
        nextLinkClassName="manage-paginationLink manage-paginationLinkNext"
        breakClassName="manage-paginationItem"
        breakLinkClassName="manage-paginationLink"
        activeClassName="active"
        disabledLinkClassName="manage-disabled"
        forcePage={props.page}
      />
    </>
  );
};

export default ReactPagination;
