import {
  ArrowUpTrayIcon,
  PlusCircleIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  LocalShippingOutlinedIcon,
  PaperClipIcon,
  ArrowPathIcon,
} from "../../utils/icons";

import { Button } from "../../Components/common/Button";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Tippy from "@tippyjs/react";
import { Toaster, toast } from "sonner";
import axiosInstance from "../../api/axiosinstance";
import Pagination from "../../Components/common/Pagination";
import TableLoader from "../../Components/common/TableLoader";
import { useDropdownContext } from "../../DropdownProvider/DropdownProvider";
import ChangeBookStatusModal from "../../Components/Books/ChangeBookStatusModal";
import ChangeBookForSaleStatusModal from "../../Components/BookForSale/ChangeBookForSaleStatusModal";

export default function IndexBulkLookup() {
  const [loadingTable, setLoadingTable] = useState(true);
  const [selectedBookData, setSelectedBookData] = useState();

  const [openChangeBookForSaleStatusModal, setOpenChangeBookForSaleModal] =
    useState(false);

  const openChangeBookForSaleStatusModalHandler = (item) => {
    setSelectedBookData(item);
    setOpenChangeBookForSaleModal(true);
  };
  const closeChangeBookForSaleStatusModalHandler = () => {
    setOpenChangeBookForSaleModal(false);
  };

  const ToastSuccess = (str) => {
    toast.success(str);
  };
  const ToastError = (str) => {
    toast.error(str);
  };
  const pageNumber = async (pageNum) => {
    fetchData(pageNum);
  };

  const [booksData, setBooksData] = useState();

  const fetchData = async (pageNum) => {
    setLoadingTable(true);
    await axiosInstance
      .get(`/api/bookforsale?page_size=10&page=${pageNum}`)
      .then((res) => {
        setBooksData(res?.data?.data);
      })
      .catch((error) => {
        toast.error("Error: " + error);
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoadingTable(false);
      });
  };

  useEffect(() => {
    fetchData(1);
  }, [openChangeBookForSaleStatusModal]);

  console.log("Books for sale data", booksData?.data);

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-0">
      <Toaster richColors />
      <div className="mt-4">
        <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          {loadingTable ? (
            <TableLoader />
          ) : (
            <table className="min-w-full table-fixed divide-y divide-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm lg:text-base font-semibold text-gray-900 sm:pl-6"
                  >
                    Book Title
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm lg:text-base font-semibold text-gray-900 sm:pl-6"
                  >
                    Class
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm lg:text-base font-semibold text-gray-900"
                  >
                    Condition
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm lg:text-base font-semibold text-gray-900"
                  >
                    Credit Value
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm lg:text-base font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm lg:text-base font-semibold text-gray-900"
                  >
                    Change Book Status
                  </th>
                  {/* <th
                    scope="col"
                    className="pl-5 py-3.5 text-left text-sm lg:text-base font-semibold text-gray-900"
                  >
                    Action
                  </th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {booksData?.data.map((item) => (
                  <tr key={item?.id}>
                    <td className="whitespace-nowrap pl-6 px-3 py-4 text-pretty sm:text-sm text-gray-900">
                      {item?.subject?.subject +
                        (item?.subject?.type === 1
                          ? " (Original)"
                          : item?.subject?.type === 2
                          ? " (Pirated)"
                          : "") || "Missing"}
                    </td>
                    <td className="whitespace-nowrap pl-6 px-3 py-4 text-pretty sm:text-sm text-gray-900">
                      {item?.book_id?.class?.name || "Missing"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-xs sm:text-sm text-gray-900">
                      {item?.condition?.name || "Missing"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-xs sm:text-sm text-gray-900">
                      {item?.price || "Missing"}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 text-xs sm:text-sm text-gray-900">
                      <div className="flex gap-x-2">
                        <h2
                          className={`block px-2 rounded-md border-0 py-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                            item?.status?.id === 1
                              ? "bg-gray-200 ring-1 ring-inset ring-gray-400"
                              : item?.status?.id === 2
                              ? "bg-green-200 ring-1 ring-inset ring-green-400"
                              : item?.status?.id === 3
                              ? "bg-red-200 ring-1 ring-inset ring-red-400"
                              : "bg-gray-200"
                          }`}
                        >
                          {item?.status?.name}
                        </h2>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 text-xs sm:text-sm text-gray-700">
                      {item?.status?.id != 2 ? (
                        <Button
                          type="submit"
                          color="green"
                          variant="solid"
                          className="h-7 mt-2 px-2"
                          onClick={() =>
                            openChangeBookForSaleStatusModalHandler(item)
                          }
                        >
                          Change Book Status
                        </Button>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-pretty font-medium text-blue-700 cursor-not-allowed">
                          Status Changed
                        </span>
                      )}
                    </td>

                    {/* <td className="flex gap-x-2 relative whitespace-nowrap px-5 py-4 text-xs sm:text-sm font-medium">
                      <Tippy
                        content="delete"
                        placement="right"
                        className="bg-gray-100 rounded-md shadow-xl ease-in-out px-1 ring-1 ring-gray-300"
                        arrow={true}
                      >
                        <TrashIcon
                          className="block h-5 w-5 hover:cursor-pointer text-red-600 hover:text-red-800"
                          aria-hidden="true"
                          //   onClick={() => openViewBookModalHandler(item)}
                        />
                      </Tippy>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Pagination
        page={pageNumber}
        count={booksData?.total / booksData?.per_page}
      />
      <ChangeBookForSaleStatusModal
        isOpen={openChangeBookForSaleStatusModal}
        onClose={closeChangeBookForSaleStatusModalHandler}
        data={selectedBookData}
        success={ToastSuccess}
        error={ToastError}
      />
    </div>
  );
}
