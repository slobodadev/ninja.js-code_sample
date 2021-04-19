import React, { useState, useEffect } from 'react'
import Pagination from './Pagination'
import Row from './Row'
import Search from './Search'

const DataTable = ({ rowsPerPage = 40, ...props }) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(0)
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0)
  const [rows, setRows] = useState([])

  const calculateTotalNumberOfPages = (rows) => {
    if (rowsPerPage === 0) return 0
    return Math.ceil(rows.length / rowsPerPage)
  }

  const search = (event, rows) => {
    const text = event.target.value
    let rowsFound = rows

    if (text) {
      const textFormatted = text.toLowerCase()
      rowsFound = rows.filter((row) =>
        row.name1.toLowerCase().search(textFormatted) > -1 ||
         row.email?.toLowerCase().search(textFormatted) > -1
      )
    }

    setCurrentPageNumber(0)
    setRows(rowsFound)
    setTotalNumberOfPages(calculateTotalNumberOfPages(rowsFound))
  }

  const rowsInPageNumber = (pageNumber) => {
    const startIndex = pageNumber * rowsPerPage
    return [startIndex, startIndex + rowsPerPage]
  }

  const rowsToRender = rows.slice(...rowsInPageNumber(currentPageNumber))

  useEffect(() => {
    setRows(props.rows)
  }, [props.rows])

  useEffect(() => {
    setTotalNumberOfPages(calculateTotalNumberOfPages(rows))
  }, [rows])

  return(
    <div>
      <Search onSearch={e => search(e, props.rows)} />
      <table>
        <tbody>
        {
          rowsToRender.map(row => <Row key={row.per_id} row={row} />)
        }
        </tbody>
      </table>
      <Pagination
        currentPageNumber={currentPageNumber}
        totalNumberOfPages={totalNumberOfPages}
        onChange={setCurrentPageNumber} />
    </div>
  )
}

export default DataTable
