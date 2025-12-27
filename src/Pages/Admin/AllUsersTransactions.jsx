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
import ConfirmationModal from "../../Components/Credits/TransactionConfirmationModal";

export default function AllUsersTransactions() {
  const dropDownValues = useDropdownContext();

  const [loadingTable, setLoadingTable] = useState(true);

  const ToastSuccess = (str) => {
    toast.success(str);
  };
  const ToastError = (str) => {
    toast.error(str);
  };
  const pageNumber = async (pageNum) => {
    fetchData(pageNum);
  };

  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const openConfirmationModalHandler = () => {
    setOpenConfirmationModal(true);
  };
  const closeConfirmationModalHandler = () => {
    setOpenConfirmationModal(false);
  };

  const [selectedStatus, setSelectedStatus] = useState();
  const [selectedRecordId, setSelectedRecordId] = useState();
  const [selectedCreditValue, setSelectedCreditValue] = useState();

  const handleStatusChange = (e, id, credit_value) => {
    setSelectedStatus(e.target.value);
    setSelectedRecordId(id);
    setSelectedCreditValue(credit_value);
    openConfirmationModalHandler();

    // console.log("selectedStatus: ", selectedStatus);
  };

  const [allUsersTransactionsData, setAllUsersTransactionsData] = useState();

  const fetchData = async (pageNum) => {
    setLoadingTable(true);
    await axiosInstance
      .get(`/api/transactions?page_size=10&page=${pageNum}`)
      .then((res) => {
        setAllUsersTransactionsData(res?.data?.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
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
  }, [openConfirmationModal]);

  // const handleStatusChange = async (e, id, credit_value) => {
  //   const newStatusId = e.target.value;

  //   const payload = {
  //     status: newStatusId,
  //     credit_value: credit_value,
  //   };
  //   console.log("payload: ", payload);

  //   await axiosInstance
  //     .post(`/api/transactions/update/${id}`, payload)
  //     .then((res) => {
  //       ToastSuccess("Transaction status updated Successfully");
  //     })
  //     .catch((error) => {
  //       ToastError("Error in updating Transaction Status: " + error);
  //       console.error("Error fetching data:", error);
  //     })
  //     .finally(() => {
  //       fetchData(1);
  //       setLoadingTable(false);
  //     });
  // };

  // console.log("all trans: ", allUsersTransactionsData?.data);

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
                    User
                  </th>
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
                    Status
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
                {allUsersTransactionsData?.data.map((item) => (
                  <tr key={item?.id}>
                    <td className="whitespace-nowrap pl-6 px-3 py-4 md:text-pretty font-bold uppercase sm:text-sm text-indigo-700 ">
                      {item?.user_id?.name || "Missing"}
                    </td>
                    <td className="whitespace-nowrap pl-6 px-3 py-4 text-pretty sm:text-sm text-gray-700">
                      <span
                        className={` px-2 rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                          item?.transaction_type === 1
                            ? "bg-green-200 ring-1 ring-inset ring-green-400"
                            : item?.transaction_type === 2
                            ? "bg-red-200 ring-1 ring-inset ring-red-400"
                            : "bg-gray-200"
                        }`}
                      >
                        {item?.transaction_type === 1
                          ? "Credit"
                          : item?.transaction_type === 2
                          ? "Debit"
                          : "Missing"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap pl-6 px-3 py-4 text-pretty sm:text-sm text-gray-900">
                      {item?.amount || "Missing"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-xs sm:text-sm text-gray-900">
                      {item?.credit_value || "Missing"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-xs sm:text-sm text-gray-900">
                      {item?.current_balance || "Missing"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-xs sm:text-sm text-gray-900">
                      {item?.status?.id === 1 ? (
                        <select
                          value={item?.status?.id}
                          onChange={(e) =>
                            handleStatusChange(e, item?.id, item?.credit_value)
                          }
                          // onChange={handleStatusChange}
                          className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                        >
                          <option value="">Select Status</option>
                          {dropDownValues?.data?.transaction_status.map(
                            (status) => (
                              <option key={status.id} value={status.id}>
                                {status.name}
                              </option>
                            )
                          )}
                        </select>
                      ) : (
                        <span
                          className={`px-2 py-1 rounded-full font-semibold   ${
                            item?.status?.id === 2
                              ? "bg-green-100 text-green-800"
                              : item?.status?.id === 3
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-200"
                          }`}
                        >
                          {item?.status?.name}
                        </span>
                      )}
                    </td>
                    <td className="flex gap-x-2 relative whitespace-nowrap px-5 py-4 text-xs sm:text-sm font-medium">
                      {item?.transaction_type === 1 && (
                        <a
                          href={functions.imageUrlGenerator(item?.image_url)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Tippy
                            content="View Reciept"
                            placement="right"
                            className="bg-gray-100 rounded-md shadow-xl ease-in-out"
                            arrow={true}
                          >
                            <ReceiptOutlinedIcon
                              className="block h-5 w-5 text-orange-500 hover:text-orange-800"
                              aria-hidden="true"
                            />
                          </Tippy>
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Pagination
        page={pageNumber}
        count={
          allUsersTransactionsData?.total / allUsersTransactionsData?.per_page
        }
      />
      <ConfirmationModal
        isOpen={openConfirmationModal}
        onClose={closeConfirmationModalHandler}
        status={selectedStatus}
        id={selectedRecordId}
        creditValue={selectedCreditValue}
        success={ToastSuccess}
        error={ToastError}
      />
    </div>
  );
}
