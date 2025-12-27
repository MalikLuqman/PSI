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
  CheckIcon,
  CheckBadgeIcon,
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
import ChangeBookForSaleStatusModal from "../../Components/BookForSale/ChangeBookForSaleStatusModal";
import EditOrderModal from "../../Components/Orders/EditOrderModal";
import DispatchBookToUserModal from "../../Components/Orders/DispatchBookToUserModal";
import CompleteOrderModal from "../../Components/Orders/CompleteOrderModal";

export default function IndexOrders() {
  const role = parseInt(localStorage.getItem("role_id"));
  const user_id = localStorage.getItem("user_id");
  const dropDownValues = useDropdownContext();

  const [loadingTable, setLoadingTable] = useState(true);
  const [openEditOrderModal, setOpenEditOrderModal] = useState(false);
  const [openDispatchToUserModal, setOpenDispatchToUserModal] = useState(false);
  const [selectedOrderData, setSelectedOrderData] = useState();
  const [openCompleteOrderModal, setOpenCompleteOrderModal] = useState(false);

  const openEditOrderModalHandler = (item) => {
    setSelectedOrderData(item);
    setOpenEditOrderModal(true);
  };
  const closeEditOrderModalHandler = () => {
    setOpenEditOrderModal(false);
  };
  const openDispatchToUserModalHandler = (item) => {
    setSelectedOrderData(item);
    setOpenDispatchToUserModal(true);
  };
  const closeDispatchToUserModalHandler = () => {
    setOpenDispatchToUserModal(false);
  };
  const openCompleteOrderModalHandler = (item) => {
    setSelectedOrderData(item);
    setOpenCompleteOrderModal(true);
  };
  const closeCompleteOrderModalHandler = () => {
    setOpenCompleteOrderModal(false);
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

  const [ordersData, setOrdersData] = useState();

  const fetchData = async (pageNum) => {
    setLoadingTable(true);
    await axiosInstance
      .get(`/api/bookorders?page_size=10&page=${pageNum}`)
      .then((res) => {
        setOrdersData(res?.data?.data);
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
  }, [openDispatchToUserModal, openCompleteOrderModal]);

  // console.log("orders data", ordersData);

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-0">
      <Toaster richColors />
      <div className="mt-4">
        <div className="shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          {loadingTable ? (
            <TableLoader />
          ) : (
            <table className="min-w-full table-fixed divide-y divide-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  {role === 1 && (
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm lg:text-base font-semibold text-gray-900 sm:pl-6"
                    >
                      User
                    </th>
                  )}
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm lg:text-base font-semibold text-gray-900 sm:pl-6"
                  >
                    Book
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
                    Credits
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm lg:text-base font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  {role === 1 && (
                    <th
                      scope="col"
                      className="pl-5 py-3.5 text-left text-sm lg:text-base font-semibold text-gray-900"
                    >
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {ordersData?.data.map((item) => (
                  <tr key={item?.id}>
                    {role === 1 && (
                      <td className="whitespace-nowrap pl-6 px-3 py-4 md:text-pretty uppercase font-bold sm:text-sm text-indigo-700 ">
                        {item?.purchased_by?.name || "Missing"}
                      </td>
                    )}
                    <td className="whitespace-nowrap pl-6 px-3 py-4 text-pretty sm:text-sm text-gray-900">
                      {item?.subject?.subject || "Missing"}
                    </td>
                    <td className="whitespace-nowrap pl-6 px-3 py-4 text-pretty sm:text-sm text-gray-900">
                      {item?.class?.name || "Missing"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-xs sm:text-sm text-gray-900">
                      {item?.price || "Missing"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-xs sm:text-sm text-gray-900">
                      <span
                        className={`px-2 rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset sm:text-sm sm:leading-6 ${
                          item?.status?.id === 1
                            ? "bg-zinc-200 ring-1 ring-inset ring-zinc-400"
                            : item?.status?.id === 2
                            ? "bg-blue-200 ring-1 ring-inset ring-blue-400"
                            : item?.status?.id === 3
                            ? "bg-green-200 ring-1 ring-inset ring-green-400"
                            : "bg-gray-200"
                        }`}
                      >
                        {item?.status?.name}
                      </span>
                    </td>
                    {/* <td className="whitespace-nowrap px-2 py-2 text-xs sm:text-sm text-gray-700">
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
                    </td> */}

                    <td className="flex gap-x-2 relative whitespace-nowrap px-5 py-4 text-xs sm:text-sm font-medium">
                      {role === 1 &&
                        item?.status?.id !== 2 &&
                        item?.status?.id !== 3 && (
                          <Tippy
                            content="Dispatch"
                            placement="right"
                            className="bg-gray-100 rounded-md shadow-xl ease-in-out px-1 ring-1 ring-gray-300"
                            arrow={true}
                          >
                            <LocalShippingOutlinedIcon
                              className="block h-5 w-5 text-yellow-500 hover:text-yellow-700 "
                              aria-hidden="true"
                              onClick={() =>
                                openDispatchToUserModalHandler(item)
                              }
                            />
                          </Tippy>
                        )}
                      {role === 1 &&
                        item?.status?.id !== 1 &&
                        item?.status?.id !== 3 && (
                          <Tippy
                            content="Complete order"
                            placement="right"
                            className="bg-gray-100 rounded-md shadow-xl ease-in-out px-1 ring-1 ring-gray-300"
                            arrow={true}
                          >
                            <CheckBadgeIcon
                              className="block h-6 w-6 text-blue-500 hover:text-blue-700 "
                              aria-hidden="true"
                              onClick={() =>
                                openCompleteOrderModalHandler(item)
                              }
                            />
                          </Tippy>
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
        count={ordersData?.total / ordersData?.per_page}
      />
      {/* <EditOrderModal
        isOpen={openEditOrderModal}
        onClose={closeEditOrderModalHandler}
        success={ToastSuccess}
        error={ToastError}
        data={selectedOrderData}
      /> */}
      <DispatchBookToUserModal
        isOpen={openDispatchToUserModal}
        onClose={closeDispatchToUserModalHandler}
        success={ToastSuccess}
        error={ToastError}
        data={selectedOrderData}
      />
      <CompleteOrderModal
        isOpen={openCompleteOrderModal}
        onClose={closeCompleteOrderModalHandler}
        success={ToastSuccess}
        error={ToastError}
        data={selectedOrderData}
      />
    </div>
  );
}
