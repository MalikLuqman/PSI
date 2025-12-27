import {
  ArrowUpTrayIcon,
  PlusCircleIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  LocalShippingOutlinedIcon,
  PaperClipIcon,
  ReceiptOutlinedIcon,
} from "../../utils/icons";

import { Button } from "../../Components/common/Button";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Tippy from "@tippyjs/react";
import { Toaster, toast } from "sonner";
import axiosInstance from "../../api/axiosinstance";
import Pagination from "../../Components/common/Pagination";
import TableLoader from "../../Components/common/TableLoader";
import functions from "../../utils/GlobalFunctions";
import { useDropdownContext } from "../../DropdownProvider/DropdownProvider";

export default function IndexUserCreditTransactions() {
  const role = parseInt(localStorage.getItem("role_id"));
  const user_id = localStorage.getItem("user_id");
  const dropDownValues = useDropdownContext();

  const [loadingTable, setLoadingTable] = useState(true);

  const [selectedBookData, setSelectedBookData] = useState();
  const [notFound404, setNotFound404] = useState(false);

  const ToastSuccess = (str) => {
    toast.success(str);
  };
  const ToastError = (str) => {
    toast.error(str);
  };
  const pageNumber = async (pageNum) => {
    fetchData(pageNum);
  };

  const [userTransactionsData, setUserTransactionsData] = useState();

  const fetchData = async (pageNum) => {
    setLoadingTable(true);
    await axiosInstance
      .get(`/api/transactions/show/${user_id}?page_size=10&page=${pageNum}`)
      .then((res) => {
        setUserTransactionsData(res?.data?.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setNotFound404(true);
          return;
        }
        toast.error("Error: " + error);
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoadingTable(false);
      });
  };

  useEffect(() => {
    fetchData(1);
  }, []);

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
                    Transaction Type
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm lg:text-base font-semibold text-gray-900 sm:pl-6"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm lg:text-base font-semibold text-gray-900"
                  >
                    Credits
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm lg:text-base font-semibold text-gray-900"
                  >
                    Available Credits
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm lg:text-base font-semibold text-gray-900"
                  >
                    Transaction Status
                  </th>

                  <th
                    scope="col"
                    className="pl-5 py-3.5 text-left text-sm lg:text-base font-semibold text-gray-900"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {!notFound404 ? (
                  userTransactionsData?.data?.map((item) => (
                    <tr key={item?.id}>
                      <td className="whitespace-nowrap pl-6 px-4 py-4 text-pretty sm:text-sm text-gray-700">
                        <span
                          className={`px-4 py-1 rounded-full font-semibold ring-1 ring-inset ring-gray-700/10 ${
                            item?.transaction_type === 1
                              ? "bg-green-100 text-green-800"
                              : item?.transaction_type === 2
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          {item?.transaction_type === 1
                            ? "Credit"
                            : item?.transaction_type === 2
                            ? "Debit"
                            : "Missing"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap pl-6 px-3 py-4 text-pretty sm:text-sm text-gray-700">
                        {item?.amount || "Missing"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-xs sm:text-sm text-gray-700">
                        {item?.credit_value || "Missing"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-xs sm:text-sm text-gray-700">
                        {item?.current_balance || "Missing"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-xs sm:text-sm text-gray-700">
                        <span
                          className={`px-4 py-1 rounded-full font-semibold ring-1 ring-inset ring-gray-700/10 ${
                            item?.status?.id === 2
                              ? "bg-green-100 text-green-800"
                              : item?.status?.id === 3
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          {item?.status?.name}
                        </span>
                      </td>
                      <td className="flex gap-x-2 relative whitespace-nowrap px-5 py-4 text-xs sm:text-sm font-medium">
                        {item?.transaction_type === 1 && (
                          <a
                            href={functions.imageUrlGenerator(item?.image_url)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Tippy
                              content="View Receipt"
                              placement="right"
                              className="bg-gray-100 rounded-md shadow-xl ease-in-out"
                              arrow={true}
                            >
                              <ReceiptOutlinedIcon
                                className="block h-5 w-5 text-blue-500 hover:text-blue-800"
                                aria-hidden="true"
                              />
                            </Tippy>
                          </a>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      <span className="inline-flex text-xl items-center rounded-md bg-pink-50 px-2 py-1 font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">
                        No Transactions Found
                      </span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Pagination
        page={pageNumber}
        count={userTransactionsData?.total / userTransactionsData?.per_page}
      />
    </div>
  );
}
