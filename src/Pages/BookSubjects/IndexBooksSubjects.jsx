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
import AddBooksModal from "../../Components/Books/AddBooksModal";
import EditBooksModal from "../../Components/Books/EditBooksModal";
import ViewBooksModal from "../../Components/Books/ViewBooksModal";
import DeleteBookModal from "../../Components/Books/DeleteBookModal";
import { Toaster, toast } from "sonner";
import axiosInstance from "../../api/axiosinstance";
import Pagination from "../../Components/common/Pagination";
import TableLoader from "../../Components/common/TableLoader";
import AddBookImageURLModal from "../../Components/BookImage/AddBookImageURLModal";
import DispatchConfirmationModal from "../../Components/Dispatch/DispatchConfirmationModal";
import functions from "../../utils/GlobalFunctions";
import { useDropdownContext } from "../../DropdownProvider/DropdownProvider";
import ChangeBookStatusModal from "../../Components/Books/ChangeBookStatusModal";
import AddBookSubjectModal from "../../Components/BooksSubjects/AddBookSubjectModal";
import EditBookSubjectModal from "../../Components/BooksSubjects/EditBookSubjectModal";

export default function IndexBooksSubjects() {
  const role = parseInt(localStorage.getItem("role_id"));
  const user_id = localStorage.getItem("user_id");
  const dropDownValues = useDropdownContext();

  const [openAddBookModal, setOpenAddBookModal] = useState(false);
  const [openEditBookModal, setOpenEditBookModal] = useState(false);
  const [openViewBookModal, setOpenViewBookModal] = useState(false);
  const [openDeleteBookModal, setOpenDeleteBookModal] = useState(false);

  const [loadingTable, setLoadingTable] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [selectedBookData, setSelectedBookData] = useState();

  const openAddBookModalHandler = () => {
    setOpenAddBookModal(true);
  };
  const closeAddBookModalHandler = (item) => {
    if (item) {
      setAlertVisible(true);
    }
    setOpenAddBookModal(false);
  };

  const openEditBookModalHandler = (data) => {
    setSelectedBookData(data);
    setOpenEditBookModal(true);
  };
  const closeEditBookModalHandler = () => {
    setOpenEditBookModal(false);
  };
  const openViewBookModalHandler = (data) => {
    setSelectedBookData(data);
    setOpenViewBookModal(true);
  };
  const closeViewBookModalHandler = () => {
    setOpenViewBookModal(false);
  };

  const openDeleteBookModalHandler = () => {
    setOpenDeleteBookModal(true);
  };
  const closeDeleteBookModalHandler = () => {
    setOpenDeleteBookModal(false);
  };

  const dismissAlert = () => {
    setAlertVisible(false);
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

  const [booksSubjectsData, setBooksSubjectsData] = useState();

  const fetchData = async (pageNum) => {
    setLoadingTable(true);
    await axiosInstance
      .get(`/api/booksubject?page_size=10&page=${pageNum}`)
      .then((res) => {
        setBooksSubjectsData(res?.data?.data);
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
  }, [openAddBookModal, openEditBookModal, openDeleteBookModal]);

  // console.log("Books data", booksData?.data);
  // console.log("role: ", role);

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-0">
      <Toaster richColors />
      <div className="mt-4">
        <div className="flex items-center justify-between gap-x-6 pb-2">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <div className="mt-2">
                <Button
                  variant="solid"
                  color="orange"
                  onClick={openAddBookModalHandler}
                >
                  <PlusCircleIcon
                    className="-ml-0.5 h-5 w-5 mr-1"
                    aria-hidden="true"
                  />
                  Add Subject
                </Button>
              </div>
            </div>
          </div>
        </div>

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
                    Subject
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm lg:text-base font-semibold text-gray-900 sm:pl-6"
                  >
                    Book Type
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm lg:text-base font-semibold text-gray-900"
                  >
                    Class
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm lg:text-base font-semibold text-gray-900"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm lg:text-base font-semibold text-gray-900"
                  >
                    Credits
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
                {booksSubjectsData?.data.map((item) => (
                  <tr key={item?.id}>
                    <td className="whitespace-nowrap pl-6 px-3 py-4 text-pretty sm:text-sm text-gray-900">
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-pretty font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        {item?.subject || "Missing"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap pl-6 px-3 py-4 text-pretty sm:text-sm text-gray-900">
                      {item?.type === 1
                        ? "Original"
                        : item?.type === 2
                        ? "Pirated"
                        : "Missing"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-xs sm:text-sm text-gray-900">
                      {item?.class?.name || "Missing"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-xs sm:text-sm text-gray-900">
                      {item?.category?.name || "Missing"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-xs sm:text-sm text-gray-900">
                      {item?.price || "Missing"}
                    </td>

                    <td className="flex gap-x-2 relative whitespace-nowrap px-5 py-4 text-xs sm:text-sm font-medium">
                      <Tippy
                        content="Edit Book Subject"
                        placement="right"
                        className="bg-gray-100 rounded-md shadow-xl ease-in-out px-1 ring-1 ring-gray-300"
                        arrow={true}
                      >
                        <PencilIcon
                          className="block h-5 w-5 text-indigo-600 hover:text-indigo-800"
                          aria-hidden="true"
                          onClick={() => openEditBookModalHandler(item)}
                        />
                      </Tippy>

                      {/* <Tippy
                        content="Delete Book"
                        placement="right"
                        className="bg-gray-100 rounded-md shadow-xl ease-in-out px-1 ring-1 ring-gray-300"
                        arrow={true}
                      >
                        <TrashIcon
                          className="block h-5 w-5 text-red-600 hover:text-red-800"
                          aria-hidden="true"
                          onClick={openDeleteBookModalHandler}
                        />
                      </Tippy> */}
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
        count={booksSubjectsData?.total / booksSubjectsData?.per_page}
      />
      <AddBookSubjectModal
        isOpen={openAddBookModal}
        onClose={closeAddBookModalHandler}
        success={ToastSuccess}
        error={ToastError}
      />
      <EditBookSubjectModal
        isOpen={openEditBookModal}
        onClose={closeEditBookModalHandler}
        data={selectedBookData}
        success={ToastSuccess}
        error={ToastError}
      />
      <DeleteBookModal
        isOpen={openDeleteBookModal}
        onClose={closeDeleteBookModalHandler}
      />
    </div>
  );
}
