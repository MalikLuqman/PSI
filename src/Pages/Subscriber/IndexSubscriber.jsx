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
  PinDropOutlinedIcon,
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

export default function IndexSubscriber() {
  const role = parseInt(localStorage.getItem("role_id"));
  const user_id = localStorage.getItem("user_id");
  const dropDownValues = useDropdownContext();

  const [openAddBookModal, setOpenAddBookModal] = useState(false);
  const [openEditBookModal, setOpenEditBookModal] = useState(false);
  const [openViewBookModal, setOpenViewBookModal] = useState(false);
  const [openDeleteBookModal, setOpenDeleteBookModal] = useState(false);
  const [openAddBookImageURLModal, setOpenAddBookImageURLModal] =
    useState(false);
  const [openDispatchConfirmationModal, setOpenDispatchConfirmationModal] =
    useState(false);
  const [openChangeBookStatusModal, setOpenChangeBookStatusModal] =
    useState(false);

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
  const openAddBookImageURLModalHandler = (data) => {
    setSelectedBookData(data);
    setOpenAddBookImageURLModal(true);
  };
  const closeAddBookImageURLModalHandler = () => {
    setOpenAddBookImageURLModal(false);
  };
  const openDeleteBookModalHandler = () => {
    setOpenDeleteBookModal(true);
  };
  const closeDeleteBookModalHandler = () => {
    setOpenDeleteBookModal(false);
  };
  const openDispatchConfirmationModalHandler = (data) => {
    setSelectedBookData(data);
    setOpenDispatchConfirmationModal(true);
  };
  const closeDispatchConfirmationModalHandler = () => {
    setOpenDispatchConfirmationModal(false);
  };
  const openChangeBookStatusModalHandler = (data) => {
    setSelectedBookData(data);
    setOpenChangeBookStatusModal(true);
  };
  const closeChangeBookStatusModalHandler = () => {
    setOpenChangeBookStatusModal(false);
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

  const [booksData, setBooksData] = useState();

  const fetchData = async (pageNum) => {
    setLoadingTable(true);
    await axiosInstance
      .get(`/api/books?page_size=10&page=${pageNum}`)
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
  }, [
    openAddBookModal,
    openEditBookModal,
    openDeleteBookModal,
    openDispatchConfirmationModal,
    openChangeBookStatusModal,
  ]);

  console.log("Books data", booksData?.data);

  return (
    <>
      {" "}
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
                    Add Books
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {alertVisible && (
            <div className="rounded-md bg-green-100  border border-green-300 p-4 m-2">
              <div className="flex">
                <div className="shrink-0">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="size-5 text-green-600"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-pretty font-bold text-green-800">
                    Book added
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <ul className="list-disc pl-5">
                      <li>Your book has been added successfully.</li>
                      <li>
                        Please upload the book thumbnail/image by clicking on
                        the upload icon against that book.
                      </li>
                      <li>
                        Kindly <b>dispatch</b> your book. And after that click
                        on dispatch icon{" "}
                        <LocalShippingOutlinedIcon
                          className="m-1 block size-2 text-yellow-500"
                          fontSize="small"
                          aria-hidden="true"
                        />
                        to upload the TCS/POST Office receipt.
                      </li>
                      <li>
                        <PinDropOutlinedIcon
                          className="m-1 ml-0 mr-0 block size-2 text-green-700"
                          fontSize="small"
                          aria-hidden="true"
                        />
                        <b>Address :</b> XYZ.
                      </li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <div className="-mx-2 -my-1.5 flex">
                      <button
                        type="button"
                        className="ml-3 rounded-md text-black bg-red-400 px-2 py-1 text-sm font-medium hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                        onClick={dismissAlert}
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

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
                      Book
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
                    {role === 1 && (
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm lg:text-base font-semibold text-gray-900"
                      >
                        Change Book Status
                      </th>
                    )}
                    <th
                      scope="col"
                      className="pl-5 py-3.5 text-left text-sm lg:text-base font-semibold text-gray-900"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {booksData?.data.map((item) => (
                    <tr key={item?.id}>
                      <td className="whitespace-nowrap pl-6 px-3 py-4 text-pretty sm:text-sm text-gray-700">
                        {item?.subject?.subject +
                          (item?.subject?.type === 1
                            ? " (Original)"
                            : item?.subject?.type === 2
                            ? " (Pirated)"
                            : "") || "Missing"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-xs sm:text-sm text-gray-700">
                        {item?.condition?.name || "Missing"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-xs sm:text-sm text-gray-700">
                        {item?.credit_value || "Missing"}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-xs sm:text-sm text-gray-700">
                        {role === 1 ? (
                          <div className="flex gap-x-2">
                            {" "}
                            <h1
                              className="block px-2 rounded-md border-0 py-1.5 text-gray-900 bg-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              disabled
                            >
                              {item?.status?.name}
                            </h1>
                            {/* {item?.status?.id != 1 && (
                            <Button
                              type="submit"
                              color="slate"
                              variant="solid"
                              className="h-7 mt-2 px-2"
                              onClick={() =>
                                openChangeBookStatusModalHandler(item)
                              }
                            >
                              Change Status
                            </Button>
                          )} */}
                          </div> // Admin
                        ) : role === 2 ? ( // User
                          <span
                            className={`px-2 py-1 rounded-full font-semibold ${
                              item?.status?.id === 1
                                ? "bg-indigo-100 text-indigo-800"
                                : item?.status?.id === 2
                                ? "bg-green-100 text-green-700"
                                : item?.status?.id === 3
                                ? "bg-red-200 text-red-800"
                                : item?.status?.id === 4
                                ? "bg-gray-200 text-gray-800"
                                : item?.status?.id === 5
                                ? "bg-pink-100 text-pink-800"
                                : "bg-gray-200 text-gray-800"
                            }`}
                          >
                            {item?.status?.name || "Missing"}
                          </span>
                        ) : (
                          <span className="text-red-500 font-medium">
                            Invalid Role
                          </span> // Fallback for unknown roles
                        )}
                      </td>
                      {role === 1 && (
                        <td className="whitespace-nowrap px-3 py-4 text-xs sm:text-sm text-gray-700">
                          {item?.status?.id != 1 ? (
                            <Button
                              type="submit"
                              color="green"
                              variant="solid"
                              className="h-7 mt-2 px-2"
                              onClick={() =>
                                openChangeBookStatusModalHandler(item)
                              }
                            >
                              Change Status
                            </Button>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-pretty font-medium text-blue-700 cursor-not-allowed">
                              Status Changed
                            </span>
                          )}
                        </td>
                      )}
                      <td className="flex gap-x-2 relative whitespace-nowrap px-5 py-4 text-xs sm:text-sm font-medium">
                        <Tippy
                          content="View Book"
                          placement="left"
                          className="bg-gray-100 rounded-md shadow-xl ease-in-out px-1 ring-1 ring-gray-300"
                          arrow={true}
                        >
                          <EyeIcon
                            className="block h-5 w-5 hover:cursor-pointer"
                            aria-hidden="true"
                            onClick={() => openViewBookModalHandler(item)}
                          />
                        </Tippy>
                        <Tippy
                          content="Edit Book"
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
                        {role === 2 && item?.image_url == null && (
                          <div className="flex gap-x-2">
                            {" "}
                            <Tippy
                              content="Upload Images"
                              placement="right"
                              className="bg-gray-100 rounded-md shadow-xl ease-in-out px-1 ring-1 ring-gray-300"
                              arrow={true}
                            >
                              <ArrowUpTrayIcon
                                className="block h-5 w-5 text-green-500 hover:text-green-800"
                                aria-hidden="true"
                                onClick={() =>
                                  openAddBookImageURLModalHandler(item)
                                }
                              />
                            </Tippy>
                            {item?.status?.id === 4 && (
                              <Tippy
                                content="Dispatch"
                                placement="right"
                                className="bg-gray-100 rounded-md shadow-xl ease-in-out px-1 ring-1 ring-gray-300"
                                arrow={true}
                              >
                                <LocalShippingOutlinedIcon
                                  className="block h-5 w-5 text-yellow-500 hover:text-yellow-700"
                                  aria-hidden="true"
                                  onClick={() =>
                                    openDispatchConfirmationModalHandler(item)
                                  }
                                />
                              </Tippy>
                            )}
                          </div>
                        )}

                        {item?.image_url && (
                          <a
                            href={functions.imageUrlGenerator(item?.image_url)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Tippy
                              content="Vew Dispatch Reciept"
                              placement="right"
                              className="bg-gray-100 rounded-md shadow-xl ease-in-out px-1 ring-1 ring-gray-300"
                              arrow={true}
                            >
                              <ReceiptOutlinedIcon
                                className="block h-5 w-5 text-orange-500 hover:text-orange-800"
                                aria-hidden="true"
                              />
                            </Tippy>
                          </a>
                        )}
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
          count={booksData?.total / booksData?.per_page}
        />
        <AddBooksModal
          isOpen={openAddBookModal}
          onClose={closeAddBookModalHandler}
          success={ToastSuccess}
          error={ToastError}
        />
        <EditBooksModal
          isOpen={openEditBookModal}
          onClose={closeEditBookModalHandler}
          data={selectedBookData}
          success={ToastSuccess}
          error={ToastError}
        />
        <ViewBooksModal
          isOpen={openViewBookModal}
          onClose={closeViewBookModalHandler}
          data={selectedBookData}
          success={ToastSuccess}
          error={ToastError}
        />
        <DeleteBookModal
          isOpen={openDeleteBookModal}
          onClose={closeDeleteBookModalHandler}
        />
        <AddBookImageURLModal
          isOpen={openAddBookImageURLModal}
          onClose={closeAddBookImageURLModalHandler}
          success={ToastSuccess}
          error={ToastError}
          data={selectedBookData}
        />
        <DispatchConfirmationModal
          isOpen={openDispatchConfirmationModal}
          onClose={closeDispatchConfirmationModalHandler}
          success={ToastSuccess}
          error={ToastError}
          data={selectedBookData}
        />
        <ChangeBookStatusModal
          isOpen={openChangeBookStatusModal}
          onClose={closeChangeBookStatusModalHandler}
          success={ToastSuccess}
          error={ToastError}
          data={selectedBookData}
        />
      </div>
    </>
  );
}
