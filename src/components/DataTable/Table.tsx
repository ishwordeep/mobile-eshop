import {
  Flex,
  Icon,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ArrowDown, ArrowUp } from "@phosphor-icons/react";
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import Pagination from "./Pagination";

interface IDataTable {
  data: Record<string, any>[];
  count?: number;
  columns: ColumnDef<any, any>[];
  isLoading?: boolean;
  pagination?: {
    manual?: boolean;
    pageCount?: number;
    totalRows?: number;
    pageParams?: {
      pageSize: number;
      pageIndex: number;
    };
  };
  filter?: {
    globalFilter: string;
    setGlobalFilter: Dispatch<SetStateAction<string>>;
  };
  searchText?: string;
  setSearchText?: Dispatch<SetStateAction<string>>;
  handlePageSize?: (pageSize: number) => void;
}

const filterFunction: FilterFn<any> = (rows, id, filters) => {
  const rowValue = String(rows.original[id]).toLowerCase();
  const filterValue = String(filters[id]).toLowerCase();
  return rowValue.includes(filterValue);
};

const DataTable: React.FC<IDataTable> = ({
  data,
  count,
  columns,
  isLoading,
  pagination,
  filter,
  // searchText,
  // setSearchText,
}) => {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [pageIndex, setPageIndex] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  // const handlePageSize = (pageSize: number) => {
  //   setPageSize(pageSize);
  // };

  useEffect(() => {
    if (pagination?.manual) {
      setPageIndex(pagination.pageParams?.pageIndex ?? 1);
      setPageSize(pagination.pageParams?.pageSize ?? 10);
    }
  }, [pagination]);

  const table = useReactTable({
    columns,
    data,
    manualPagination: pagination?.manual,
    state: {
      columnFilters,
      globalFilter: filter?.globalFilter?.trim(),
      pagination: pagination?.manual
        ? pagination?.pageParams
        : {
            pageIndex,
            pageSize,
          },
    },
    enableRowSelection: true,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: filterFunction,
    onGlobalFilterChange: filter?.setGlobalFilter,
  });

  return (
    <Flex flexDir={"column"} gap={4}>
      <TableContainer
        border={"1px solid var(--chakra-colors-gray-200)"}
        borderRadius={10}
        bg={"white"}
        transition={"all 0.3s"}
      >
        <Table transition={"all 0.3s"}>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <Tr bg={"gray.100"} borderRadius={10} key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <Th
                        colSpan={header.colSpan}
                        key={header.id}
                        textTransform="capitalize"
                        whiteSpace="nowrap"
                        style={{
                          textAlign: "center",
                          padding: "20px",
                          fontWeight: 600,
                        }}
                        cursor={
                          header.column.getCanSort() ? "pointer" : "default"
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <Flex gap={2} justify={"center"} align={"center"}>
                          <Text
                            textAlign={"center"}
                            fontSize={{
                              base: "sm",
                              lg: "md",
                            }}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </Text>
                          {header.column.getCanSort() ? (
                            header.column.getIsSorted().valueOf() === "desc" ? (
                              <Icon as={ArrowUp} boxSize={4} weight="bold" />
                            ) : header.column.getIsSorted().valueOf() ===
                              "asc" ? (
                              <Icon as={ArrowDown} boxSize={4} weight="bold" />
                            ) : null
                          ) : null}
                        </Flex>
                      </Th>
                    );
                  })}
                </Tr>
              );
            })}
          </Thead>
          <Tbody>
            {isLoading ? (
              <>
                {[...Array(5)].map((_, rowIndex) => (
                  <Tr key={rowIndex}>
                    {columns.map((_, columnIndex) => (
                      <Td key={columnIndex}>
                        <Skeleton height="10px" w={"full"} />
                      </Td>
                    ))}
                  </Tr>
                ))}
              </>
            ) : count === 0 ? (
              <Tr>
                <Td colSpan={columns.length} textAlign="center">
                  No data found
                </Td>
              </Tr>
            ) : (
              table.getRowModel().rows.map((row) => {
                return (
                  <Tr
                    _hover={{
                      bg: "primary.50",
                    }}
                    verticalAlign={"middle"}
                    key={row.id}
                  >
                    {row.getVisibleCells()?.map((cell, index) => {
                      return (
                        <Td
                          borderBottom={
                            index === row.getVisibleCells().length
                              ? "none"
                              : "1px solid var(--chakra-colors-gray-200)"
                          }
                          style={{
                            width: `${columns[index]?.size}%`,
                            textAlign: "center",
                            padding: "20px",
                          }}
                          borderLeft={index === 0 ? "none" : ""}
                          borderRight={
                            index === row.getVisibleCells().length - 1
                              ? "none"
                              : ""
                          }
                          colSpan={1}
                          key={cell.id}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <Stack align={"center"}>
        <Pagination
          pageIndex={
            pagination?.manual
              ? pagination?.pageParams?.pageIndex ?? 1
              : pageIndex
          }
          setPageIndex={setPageIndex}
          totalPage={
            pagination?.manual
              ? pagination?.pageCount ?? 1
              : table.getPageCount()
          }
        />
      </Stack>
    </Flex>
  );
};

export default DataTable;
