import React from 'react'

import Page from './Page'

const Pagination = ({ currentPageNumber, totalNumberOfPages, onChange }) => {
  const totalPageArray = Array.from(Array(totalNumberOfPages).keys())

  if (totalNumberOfPages <= 1) return null

  return (
    <ul className="pagination">
      {
        totalPageArray.map(pageNumber =>
          <Page
            key={pageNumber}
            currentPageNumber={currentPageNumber}
            pageNumber={pageNumber}
            onChange={onChange} />
        )
      }
    </ul>
  )
}

export default Pagination
