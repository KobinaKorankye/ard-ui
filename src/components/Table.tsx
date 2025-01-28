import { FaSearch, FaSort } from "react-icons/fa";
import React, { useState } from "react";
import { BiChevronLeftCircle, BiChevronLeftSquare, BiChevronRightCircle, BiChevronRightSquare } from "react-icons/bi";

interface TableProps {
    columns?: string[];
    columnNames?: string[];
    rows: any[]; // Rows are now an array of arrays
    className?: string;
    linksTo?: string;
    setSelectedItem?: (item: any) => void;
    profilePhoto?: boolean;
    numPerPage: number;
    searchColumnName?: string;
}

export default function Table({
    columns,
    columnNames,
    rows,
    className,
    linksTo,
    setSelectedItem,
    profilePhoto,
    numPerPage,
    searchColumnName
}: TableProps) {
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");
    const [rowItemArray, setRowItemArray] = useState<any[]>([]);
    const [sortColumn, setSortColumn] = useState<number | null>(null); // Now we work with column index
    const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const numOfPages = Math.ceil(rows?.length / numPerPage);
    const searchCol = searchColumnName ? columnNames?.indexOf(searchColumnName) : 0; // Search by column name or default to the first column

    const filterBySearch = (rows: any[]) => {
        return rows?.filter((row) => {
            const value = row[searchCol || 0]; // Use searchCol index to filter the correct column
            return value ? String(value).toLowerCase().includes(searchText.toLowerCase()) : false;
        });
    };

    const handleSort = (index: number) => {
        const direction = sortColumn === index && sortDirection === "asc" ? "desc" : "asc";
        setSortColumn(index);
        setSortDirection(direction);

        rows.sort((a, b) => {
            const valueA = a[index];
            const valueB = b[index];

            // Check if both values are numeric
            const isNumeric = !isNaN(Number(valueA)) && !isNaN(Number(valueB));

            if (isNumeric) {
                // Convert to numbers for comparison if they are numeric
                return direction === "asc" ? Number(valueA) - Number(valueB) : Number(valueB) - Number(valueA);
            } else {
                // For non-numeric values, sort alphabetically
                return direction === "asc"
                    ? valueA > valueB
                        ? 1
                        : valueA < valueB
                            ? -1
                            : 0
                    : valueB > valueA
                        ? 1
                        : valueB < valueA
                            ? -1
                            : 0;
            }
        });

        setRowItemArray([...rows]); // Update rows after sorting
    };

    const handlePagination = (page: number) => {
        setCurrentPage(page);
    };

    const getCurrentPageRows = () => {
        const startIndex = (currentPage - 1) * numPerPage;
        const endIndex = startIndex + numPerPage;
        return rows.slice(startIndex, endIndex);
    };

    console.log(getCurrentPageRows())

    return (
        <>
            {/* <div className="flex bg-[#EEEFF4] pb-1">
                <div className={`flex items-center ${isSearchOpen ? 'gap-[1.5] rounded-t' : 'rounded-t-lg'} bg-white whitespace-nowrap duration-300 shadow border-t border-x border-gray-300 py-2`}>
                    <FaSearch
                        onClick={() => { setIsSearchOpen((prev) => !prev); }}
                        className={`text-cyan-600 text-xs duration-300 ${isSearchOpen ? 'px-2' : 'px-3'}`}
                    />
                    <input
                        value={searchText}
                        onChange={(e) => { setSearchText(e.target.value); }}
                        placeholder="Search by item name...."
                        className={`text-xs ${isSearchOpen ? 'w-[10rem]' : 'w-[0rem]'} duration-300 appearance-none focus:border-none focus:outline-none`}
                    />
                </div>
            </div> */}
            {/* The bordr classes here wont work, you have to put them in thead or tbody. Table itself doesn't have those properties */}
            <table className={`table-auto shadow border border-b-0 border-white/10 rounded-t-lg overflow-hidden w-full text-xs ${className}`}>
                <thead className="capitalize">
                    <tr className="border-b border-white/5">
                        {columnNames && columnNames?.length > 0
                            && columnNames?.map((column, index) => (
                                <th className="px-4 py-2 text-left flex items-center gap-1" key={column}>
                                    {column}
                                    <FaSort
                                        onClick={() => handleSort(index)} // Use the column index for sorting
                                        className="cursor-pointer text-gray-400"
                                    />
                                </th>
                            ))}
                    </tr>
                </thead>
                <tbody>
                    {getCurrentPageRows()?.map((row, index) => (
                        <tr
                            onClick={() => { if (setSelectedItem) setSelectedItem(row); }}
                            className={`hover:bg-gray-900 border-b border-white/5 ${index % 2 !== 0 ? "bg-gray-800" : "bg-gray-900"} cursor-pointer flex-col`}
                            key={index}
                        >
                            {row && row?.length > 0 &&
                                row.map((rowItem: any, index: any) =>

                                (
                                    <td className="border px-4 py-2 text-left" key={index}>
                                        {rowItem}
                                    </td>
                                )
                                )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination */}
            <div className="flex justify-end gap-5 items-center px-4">
                <button
                    onClick={() => handlePagination(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="text-white/50 text-lg cursor-pointer"
                >
                    <BiChevronLeftCircle />
                </button>
                <span className="text-xs text-white/50 font-bold">{`Page ${currentPage} of ${numOfPages}`}</span>
                <button
                    onClick={() => handlePagination(currentPage + 1)}
                    disabled={currentPage === numOfPages}
                    className="text-white/50 text-lg cursor-pointer"
                >
                    <BiChevronRightCircle />
                </button>
            </div>
        </>
    );
}
