import React from "react";

const Pagination = ({
  totalEmployees,
  employeesPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalEmployees / employeesPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={i === currentPage ? "active" : ""}
          style={{ display: "inline-block", margin: "0 5px" }}
        >
          <button
            onClick={() => onPageChange(i)}
            style={{
              backgroundColor: i === currentPage ? "rgb(99, 151, 254)" : "",
            }}
          >
            {i}
          </button>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="pagination">
      <ul>{renderPageNumbers()}</ul>
    </div>
  );
};

export default Pagination;
