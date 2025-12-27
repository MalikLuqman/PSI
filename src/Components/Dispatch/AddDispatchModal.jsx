import { Button } from "../../Components/common/Button";
import { useState, useEffect, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import Tippy from "@tippyjs/react";
import Select from "react-select";
import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import axiosInstance from "../../api/axiosinstance";
import * as Yup from "yup";
import { PlusCircleIcon, LocalShippingOutlinedIcon } from "../../utils/icons";
import Pagination from "../common/Pagination";

export default function AddDispatchModal({ isOpen, onClose, success, error }) {
  const [booksData, setBooksData] = useState(null);
  const [search, setSearch] = useState("");

  const getData = async (pageNum, search_query) => {
    await axiosInstance
      .get(`/api/books?page_size=10&page=${pageNum}`)
      .then((res) => {
        setBooksData(res?.data?.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  useEffect(() => {
    getData(1, "");
  }, [isOpen]);

  const DispatchConfimation = async (selectedBookData) => {
    onClose(selectedBookData);
  };
  const updateQueryParams = (value) => {
    getData(1, value);
    setSearch(value);
  };
  const pageNumber = async (pageNum) => {
    getData(pageNum, search);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-50 px-4 pb-4 pt-5 text-left shadow-xl transition-all w-full max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto">
                <div className="mx-auto max-w-7xl">
                  <div className="rounded-md bg-gray-700 h-12 flex items-center justify-center">
                    <h2 className="text-center text-lg sm:text-xl md:text-2xl tracking-widest leading-7 text-[#FFFBF5] sm:truncate sm:tracking-tight">
                      Dispatch Book
                    </h2>
                  </div>
                  <div className="flex w-full sm:w-[20rem] h-[2.2rem] justify-start mt-2">
                    <label
                      htmlFor="search"
                      className="block text-sm font-medium leading-6 text-gray-900 sr-only"
                    >
                      Search
                    </label>
                    <div className="flex w-full">
                      <input
                        type="text"
                        name="search"
                        id="search"
                        autoComplete="search"
                        placeholder="Search"
                        className="w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="mt-2 shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <div className="overflow-x-auto sm:h-[20rem] lg:h-[25rem]">
                      <div className="inline-block min-w-full py-2 align-middle">
                        <div className="overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="py-2 pl-4 pr-3 text-left text-xs sm:text-sm font-semibold text-gray-900 sm:pl-6">
                                  Title
                                </th>
                                <th className="px-3 py-3.5 text-left text-xs sm:text-sm font-semibold text-gray-900">
                                  Condition
                                </th>
                                <th className="px-3 py-3.5 text-left text-xs sm:text-sm font-semibold text-gray-900">
                                  Credit Value
                                </th>
                                <th className="px-3 py-3.5 text-left text-xs sm:text-sm font-semibold text-gray-900">
                                  Status
                                </th>
                                <th className="px-3 py-3.5 text-right text-xs sm:text-sm font-semibold text-gray-900">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              {booksData?.data?.map((item) => (
                                <tr key={item?.id}>
                                  <td className="whitespace-nowrap py-1 pr-3 text-xs sm:text-sm text-gray-900 sm:pl-6">
                                    {item?.title ? item?.title : "N/A"}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-1 text-xs sm:text-sm text-gray-500">
                                    {item?.condition?.name
                                      ? item?.condition?.name
                                      : "N/A"}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-1 text-xs sm:text-sm text-gray-500">
                                    {item?.credit_value
                                      ? item?.credit_value
                                      : "N/A"}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-1 text-xs sm:text-sm text-gray-500">
                                    {item?.status?.name
                                      ? item?.status?.name
                                      : "N/A"}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-right text-xs sm:text-sm font-medium">
                                    <a
                                      onClick={() => DispatchConfimation(item)}
                                      className="text-orange-500 hover:text-orange-600 cursor-pointer"
                                    >
                                      <LocalShippingOutlinedIcon className="block h-6 w-6 transition ease-in-out delay-100 duration-300" />
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Pagination
                    page={pageNumber}
                    count={Math.ceil(booksData?.total / booksData?.per_page)}
                    className="mt-4"
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
