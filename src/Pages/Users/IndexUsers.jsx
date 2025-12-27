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
import { Switch } from "@headlessui/react";

export default function IndexUsers() {
  const [loadingTable, setLoadingTable] = useState(true);

  const pageNumber = async (pageNum) => {
    fetchData(pageNum);
  };

  const [allUsersData, setAllUsersData] = useState();
  const [toggleStates, setToggleStates] = useState({});

  const fetchData = async (pageNum) => {
    setLoadingTable(true);
    await axiosInstance
      .get(`api/auth/user_index?page_size=10&page=${pageNum}`)
      .then((res) => {
        const data = res?.data?.data;
        setAllUsersData(data);
        // console.log("data: ", data);

        // Set initial toggle states from API data (assuming 'status' field exists)
        const initialToggleStates = {};
        data?.data?.forEach((item) => {
          initialToggleStates[item.id] = item?.status === 1;
        });
        setToggleStates(initialToggleStates);
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
  }, []);

  const handleToggle = async (id) => {
    const newValue = !toggleStates[id]; // Toggle the current value
    console.log("value: ", newValue);
    try {
      await axiosInstance.post(`/api/auth/update_user/${id}`, {
        status: newValue ? "1" : "2",
      });
      toast.success("Status updated successfully");
      setTimeout(() => {
        fetchData(1);
      }, 400);

      // Update local state
      setToggleStates((prev) => ({
        ...prev,
        [id]: newValue,
      }));
    } catch (error) {
      toast.error("Error updating status: " + error);
    }
  };

  console.log("users data: ", allUsersData?.data);

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
                    User Name
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm lg:text-base font-semibold text-gray-900 sm:pl-6"
                  >
                    Email
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
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm lg:text-base font-semibold text-gray-900"
                  >
                    Active
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {allUsersData?.data.map((item) => (
                  <tr key={item?.id}>
                    <td className="whitespace-nowrap pl-6 px-3 py-4 md:text-pretty font-bold uppercase sm:text-sm text-indigo-700 ">
                      {item?.name || "Missing"}
                    </td>
                    <td className="whitespace-nowrap pl-6 px-3 py-4 md:text-pretty font-semibold sm:text-sm text-gray-700 ">
                      {item?.email || "Missing"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-xs sm:text-sm text-gray-900">
                      {item?.credit_value || "Missing"}
                    </td>
                    <td className="whitespace-nowrap pl-6 px-3 py-4 text-pretty sm:text-sm text-gray-700">
                      <span
                        className={` px-2 rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                          item?.status === 1
                            ? "bg-green-200 ring-1 ring-inset ring-green-400"
                            : item?.status === 2
                            ? "bg-red-200 ring-1 ring-inset ring-red-400"
                            : "bg-gray-200"
                        }`}
                      >
                        {item?.status === 1
                          ? "Active"
                          : item?.status === 2
                          ? "Blocked"
                          : "Missing"}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-3 py-4 text-xs sm:text-sm text-gray-900">
                      <Switch
                        checked={toggleStates[item.id] || false}
                        onChange={() => handleToggle(item.id)}
                        className={`relative inline-flex h-5 w-11 items-center rounded-full 
                                    border-2 border-transparent bg-gray-200 transition 
                                     ${
                                       toggleStates[item.id]
                                         ? "bg-orange-500"
                                         : "bg-gray-200"
                                     }`}
                      >
                        <span className="sr-only">Use setting</span>
                        <span
                          aria-hidden="true"
                          className={`inline-block h-4 w-4 transform rounded-full 
                                     bg-white shadow transition 
                                    ${
                                      toggleStates[item.id]
                                        ? "translate-x-6"
                                        : "translate-x-1"
                                    }`}
                        />
                      </Switch>
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
        count={allUsersData?.total / allUsersData?.per_page}
      />
    </div>
  );
}
