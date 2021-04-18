import { useEffect, useState } from "react";

function PaginationPage({ page, changePage, style }) {
  return (
    <div
      onClick={() => changePage(page)}
      className="pagination_page"
      style={{ ...style }}
    >
      {page}
    </div>
  );
}

/**
 * @function calculateNumOfPages - calculates the total number of pages 
 * @param {number} count - total posts count
 * @param {number} maxPerPage - number of posts per page
 * @param {number} maxPagesToDisplay - the max number of pages for the pagination display
 * @returns number of pages
 */
export function calculateNumOfPages(count, maxPerPage, maxPagesToDisplay) {
  let pagesCount = Math.ceil(count / maxPerPage);
  let numOfPages;
  if (pagesCount === 1) {
    return 0;
  }
  numOfPages = pagesCount > maxPagesToDisplay ? maxPagesToDisplay : pagesCount;
  return numOfPages;
}

/**
 * @function limitTheArray - orginized and limit the pages array
 * @param {Array} pagesArray - the array of the pages
 * @param {number} pagesCount - the total number of pages 
 * @param {number} maxPages - max pages to be displayed
 * @param {number} currentPage - the current page
 */
export function limitTheArray(pagesArray, pagesCount, maxPages,currentPage) {
  let lastIndex = pagesArray.length - 1;

  if (!pagesArray.includes(1)) {
    pagesArray.splice(lastIndex, 1);
    pagesArray.unshift(1);
  }

  while (pagesArray[lastIndex] > pagesCount) {
    pagesArray.splice(lastIndex, 1);
    pagesArray.splice(1, 0, pagesArray[1] - 1);
  }

  if (pagesArray[1] !== 2) {
    pagesArray.splice(1, 0, pagesArray[1] - 1);
    lastIndex++;

    while ((pagesArray[1] < currentPage  - 1) && (pagesArray.length > maxPages)) {
      pagesArray.splice(1, 1);
    }

    while(pagesArray.length > maxPages){
      pagesArray.splice(lastIndex, 1);
    }
  }
}

export function Pagination({
  currentPage,
  changePage,
  activeStyle,
  count,
  maxPerPage,
  maxPagesToDisplay,
}) {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    let numOfPages = calculateNumOfPages(
      count,
      maxPerPage,
      maxPagesToDisplay,
      currentPage
    );

    if (!numOfPages) {
      setPages([]);
      return;
    }
    let newPages = [];
    for (let i = currentPage; i < numOfPages + currentPage; i++) {
      newPages.push(i);
    }

    limitTheArray(newPages, Math.ceil(count / maxPerPage), maxPagesToDisplay,currentPage);

    setPages(newPages);
  }, [currentPage, count]);

  if (!pages.length) {
    return null;
  }

  return (
    <div className="pagination_wrapper">
      {pages.map((page) => (
        <PaginationPage
          key={page}
          page={page}
          changePage={changePage}
          style={currentPage === page ? activeStyle : {}}
        />
      ))}
    </div>
  );
}
