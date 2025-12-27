import {
  PlusCircleIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { Button } from "../../Components/common/Button";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Tippy from "@tippyjs/react";
import AddBookImageURLModal from "../../Components/BookImage/AddBookImageURLModal";
import EditBookImageURLModal from "../../Components/BookImage/EditBookImageURLModal";
import DeleteBookImageURLModal from "../../Components/BookImage/DeleteBookImageURLModal";
import ViewBookImageURLModal from "../../Components/BookImage/ViewBookImageURLModal";

export default function IndexBookImage() {
  const data = [
    {
      id: 1,
      asset_type: { name: "Behind the truth" },
      asset_name: "12/05/2024",
      value_of_asset: "J'K Rowling",
      registration_number: "ABC-123",
    },
    {
      id: 2,
      asset_type: { name: "Lies" },
      asset_name: "03/08/2024",
      value_of_asset: "J'K Rowling",
      registration_number: "FDS-23",
    },
    {
      id: 3,
      asset_type: { name: "Equipment" },
      asset_name: "23/02/2024",
      value_of_asset: "J'K Rowling",
      registration_number: "EQUIP-456",
    },
  ];

  const [openAddBookImageURLModal, setOpenAddBookImageURLModal] =
    useState(false);
  const [openEditBookImageURLModal, setOpenEditBookImageURLModal] =
    useState(false);
  const [openViewBookImageURLModal, setOpenViewBookImageURLModal] =
    useState(false);
  const [openDeleteBookImageURLModal, setOpenDeleteBookImageURLModal] =
    useState(false);

  const openAddBookImageURLModalHandler = () => {
    setOpenAddBookImageURLModal(true);
  };
  const closeAddBookImageURLModalHandler = () => {
    setOpenAddBookImageURLModal(false);
  };

  const openEditBookImageURLModalHandler = () => {
    setOpenEditBookImageURLModal(true);
  };
  const closeEditBookImageURLModalHandler = () => {
    setOpenEditBookImageURLModal(false);
  };
  const openViewBookImageURLModalHandler = () => {
    setOpenViewBookImageURLModal(true);
  };
  const closeViewBookImageURLModalHandler = () => {
    setOpenViewBookImageURLModal(false);
  };
  const openDeleteBookImageURLModalHandler = () => {
    setOpenDeleteBookImageURLModal(true);
  };
  const closeDeleteBookImageURLModalHandler = () => {
    setOpenDeleteBookImageURLModal(false);
  };

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-0">
      <div className="mt-4">
        <div className="flex items-center justify-between gap-x-6 pb-6">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <div className="mt-2">
                <Button
                  variant="solid"
                  color="orange"
                  onClick={openAddBookImageURLModalHandler}
                >
                  <PlusCircleIcon
                    className="-ml-0.5 h-5 w-5 mr-1"
                    aria-hidden="true"
                  />
                  Upload Book Image
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
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
                  Image URL
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
              {data.map((item) => (
                <tr key={item?.id}>
                  <td className="whitespace-nowrap pl-6 px-3 py-4 text-xs sm:text-sm text-gray-500">
                    {item?.asset_type?.name || "N/A"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-xs sm:text-sm text-gray-500">
                    {item?.asset_name || "N/A"}
                  </td>

                  <td className="flex gap-x-2 relative whitespace-nowrap px-5 py-4 text-xs sm:text-sm font-medium">
                    <Tippy
                      content="View Book"
                      placement="left"
                      className="bg-gray-100 rounded-md shadow-xl ease-in-out"
                      arrow={true}
                    >
                      <EyeIcon
                        className="block h-5 w-5 hover:cursor-pointer"
                        aria-hidden="true"
                        onClick={openViewBookImageURLModalHandler}
                      />
                    </Tippy>

                    <Tippy
                      content="Edit Book"
                      placement="right"
                      className="bg-gray-100 rounded-md shadow-xl ease-in-out"
                      arrow={true}
                    >
                      <PencilIcon
                        className="block h-5 w-5 text-indigo-600 hover:text-indigo-800"
                        aria-hidden="true"
                        onClick={openEditBookImageURLModalHandler}
                      />
                    </Tippy>

                    <Tippy
                      content="Delete Book"
                      placement="right"
                      className="bg-gray-100 rounded-md shadow-xl ease-in-out"
                      arrow={true}
                    >
                      <TrashIcon
                        className="block h-5 w-5 text-red-600 hover:text-red-800"
                        aria-hidden="true"
                        onClick={openDeleteBookImageURLModalHandler}
                      />
                    </Tippy>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <AddBookImageURLModal
        isOpen={openAddBookImageURLModal}
        onClose={closeAddBookImageURLModalHandler}
      />
      <EditBookImageURLModal
        isOpen={openEditBookImageURLModal}
        onClose={closeEditBookImageURLModalHandler}
      />
      <ViewBookImageURLModal
        isOpen={openViewBookImageURLModal}
        onClose={closeViewBookImageURLModalHandler}
      />
      <DeleteBookImageURLModal
        isOpen={openDeleteBookImageURLModal}
        onClose={closeDeleteBookImageURLModalHandler}
      /> */}
    </div>
  );
}
