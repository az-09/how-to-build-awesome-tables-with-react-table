import "./App.css";
import useData from "./useData";
import useColumns from "./useColumns";
import { usePagination, useSortBy, useTable } from "react-table";
import { FaCaretSquareUp, FaCaretSquareDown } from "react-icons/fa";

function App() {
  const data = useData();
  const columns = useColumns();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // pagination props
    page,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data, initialState: { pageSize: 10 } },
    useSortBy,
    usePagination
  );
  return (
    <div className="container">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FaCaretSquareDown />
                      ) : (
                        <FaCaretSquareUp />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")} </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button disabled={!canPreviousPage} onClick={() => previousPage()}>
          Previous Page
        </button>
        <button disabled={!canNextPage} onClick={() => nextPage()}>
          Next Page
        </button>
      </div>
      <div>
        <span>
          Page {pageIndex + 1} of {pageOptions.length}
        </span>
      </div>
    </div>
  );
}

export default App;
