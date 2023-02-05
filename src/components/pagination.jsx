import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { primaryColor } from "../colors";
import { devices } from "./helpers";

const PaginationWrapper = styled.div`
  margin-bottom: 64px;
  padding: 16px 0 0 0;
  text-align: center;
`;

const PaginationItem = styled(Link)`
  display: inline-block;
  font-size: 14px;
  line-height: 56px;
  margin: 2px 0;
  text-decoration: none;
  width: 100%;

  @media ${devices.tablet} {
    margin: 0 8px;
    padding: 0 24px;
    width: auto;

    &:first-child,
    &:last-child {
      margin: 0;
    }

    span {
      display: none;
    }
  }
`;

const PaginationLink = styled(PaginationItem)`
  border: 1px solid ${primaryColor};
  border-radius: 6px;
  color: ${primaryColor};

  &:hover {
    border-color: ${primaryColor};
  }
`;

const PaginationNumbers = styled.div`
  display: none;

  @media ${devices.tablet} {
    margin: 0 16px;
    display: inline-block;
  }
`;

function Pagination({ currentPage, numPages, prefix }) {
  const resolveUrl = (page) => {
    const formattedPrefix = prefix === "index" ? `/` : `/${prefix}.html`;

    return page > 1 ? `/${prefix}${page}.html` : formattedPrefix;
  };

  const pages = Array.from({ length: numPages }).map((_, i) => {
    const page = i + 1;

    if (page === 1 || page === numPages) {
      return page;
    }

    if (page >= currentPage - 1 && page <= currentPage + 1) {
      return page;
    }

    const upperbound = numPages - 4;
    if (currentPage > upperbound && page > upperbound) {
      return page;
    }

    const lowerbound = 4;
    if (currentPage < lowerbound && page < lowerbound) {
      return page;
    }

    return null;
  });

  if (numPages < 2) {
    return <div />;
  }

  return (
    <PaginationWrapper>
      {currentPage > 1 && (
        <PaginationLink to={resolveUrl(currentPage - 1)}>
          «<span> Página anterior</span>
        </PaginationLink>
      )}

      <PaginationNumbers>
        {pages
          .filter((page) => page !== null)
          .map((page) =>
            page === currentPage ? (
              <PaginationItem to={resolveUrl(page)} key={page}>
                {page}
              </PaginationItem>
            ) : (
              <PaginationLink to={resolveUrl(page)} key={page}>
                {page}
              </PaginationLink>
            )
          )}
      </PaginationNumbers>

      {currentPage < numPages && (
        <PaginationLink to={resolveUrl(currentPage + 1)}>
          <span>Próxima página </span>»
        </PaginationLink>
      )}
    </PaginationWrapper>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  numPages: PropTypes.number.isRequired,
  prefix: PropTypes.number.isRequired,
};

export default Pagination;
