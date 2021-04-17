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

export function calculateNumOfPages(count, maxPerPage, maxPagesToDisplay) {
  let pagesCount = Math.ceil(count / maxPerPage);
  let numOfPages;
  if (pagesCount === 1) {
    return 0;
  }
  numOfPages = pagesCount > maxPagesToDisplay ? maxPagesToDisplay : pagesCount;
  return numOfPages;
}

export function limitTheArray(pagesArray, pagesCount) {
  let lastIndex = pagesArray.length - 1;

  if (!pagesArray.includes(1)) {
    pagesArray.splice(lastIndex, 1);
    pagesArray.unshift(1);
  }
  while (pagesArray[lastIndex] > pagesCount) {
    pagesArray.splice(lastIndex, 1);
    pagesArray.splice(1, 0, pagesArray[1] - 1);
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

    limitTheArray(newPages, Math.ceil(count / maxPerPage));
    setPages(newPages);
  }, [currentPage, count]);

  if(!pages.length){
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

