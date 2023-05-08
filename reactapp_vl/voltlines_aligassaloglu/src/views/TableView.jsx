/* eslint-disable react/jsx-props-no-spreading */
// import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import tw from "twin.macro";
import { GlobalFilter } from "./globalFilter";
import { useStateContext } from "../contexts/ContextProvider";

const Table = tw.table`
  table-fixed
  text-base
  text-gray-900
`;

const TableHead = tw.thead`
  p-2
`;

const TableRow = tw.tr`
border
border-green-500
`;

const TableHeader = tw.th`
border
border-green-500
p-2
`;

const TableBody = tw.tbody`

`;

const TableData = tw.td`
border
border-green-500
p-5
`;

const TableView = (props) => {

	const {passengers, enrichedPassengers} = useStateContext()

  const data = useMemo(
    () => enrichedPassengers,
    [enrichedPassengers]
  );

  const columns = useMemo(
    () => [
    //   {
    //     Header: "Pickup Order",
    //     accessor: "pickupOrder",
    //   },
      {
        Header: "Name",
        accessor: "name",
      },
    //   {
    //     Header: "pickUpPoint",
    //     accessor: "pickUpPoint",
    //   },
    ],
    []
  );


  const productsData = useMemo(() => data, []);

  const productsColumns = useMemo(
    () =>
	data[0]
        ? Object.keys(data[0])
            .filter((key) => key !== "pickUpPoint")
            .map((key) => {
              return { Header: key, accessor: key };
            })
        : [],
    [data]
  );

//   const tableHooks = (hooks) => {
//     hooks.visibleColumns.push((cols) => [
//       ...cols,
//     //   {
//     //     id: "Edit",
//     //     Header: "Edit",
//     //     Cell: ({ row }) => (
//     //       <Button onClick={() => alert("Editing: " + row.values.price)}>
//     //         Edit
//     //       </Button>
//     //     ),
//     //   },
//     ]);
//   };

  const tableInstance = useTable(
    {
      columns: productsColumns,
      data: productsData,
    },
    useGlobalFilter,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance;

  return (
    <>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
      />
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableHeader
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  {(column.isSortedDesc ? " ▼" : " ▲")}
                </TableHeader>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row);

            return (
              <TableRow
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => (
                  <TableData {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableData>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

export default TableView