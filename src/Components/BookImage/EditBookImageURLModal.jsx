import { Button } from "../common/Button";
import { useState, useEffect, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import Tippy from "@tippyjs/react";
import Select from "react-select";
import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import axiosInstance from "../../api/axiosinstance";
import * as Yup from "yup";
import { PhotoIcon } from "../../utils/icons";

export default function EditBookImageURLModal({
  isOpen,
  onClose,
  success,
  error,
}) {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      condition: "",
      credit_value: "",
      status: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
    }),
    handleChange: (event) => {},
    onSubmit: async (values) => {
      // console.log(("values", values));

      await axiosInstance
        .post("/api/books/store", values)
        .then((res) => {
          success("Book added Successfully");
        })
        .catch((err) => {
          // error("Error");
        })
        .finally(() => {
          setTimeout(() => {
            // closeSpinner();
          }, 1000);
        });

      formik.resetForm();
      onClose();
    },
  });

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
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-50 px-5 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[45rem]">
                <div className="mx-auto max-w-7xl">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="space-y-8">
                      <div className=" border-gray-900/10 pb-4">
                        <div className="rounded-md bg-gray-800 h-12 flex items-center justify-center">
                          <h2 className="text-center text-2xl tracking-widest leading-7 text-[#FFFBF5] sm:truncate sm:text-xl sm:tracking-tight">
                            Edit Book Image
                          </h2>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="dispatched_by"
                              className="block text-sm/6 font-medium text-gray-900"
                            >
                              Dispatched By
                              <span className="text-red-900 text-lg"> *</span>
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                id="dispatched_by"
                                name="dispatched_by"
                                required
                                onChange={formik.handleChange}
                                value={formik.values.dispatched_by}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div className="col-span-full">
                            <label
                              htmlFor="cover-photo"
                              className="block text-sm/6 font-medium text-gray-900"
                            >
                              Upload Book Image
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                              <div className="text-center">
                                <PhotoIcon
                                  aria-hidden="true"
                                  className="mx-auto size-12 text-gray-300"
                                />
                                <div className="mt-4 flex text-sm/6 text-gray-600">
                                  <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                  >
                                    <span>Upload a file</span>
                                    <input
                                      id="file-upload"
                                      name="file-upload"
                                      type="file"
                                      className="sr-only"
                                    />
                                  </label>
                                  <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs/5 text-gray-600">
                                  PNG, JPG, GIF up to 10MB
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-end gap-x-4">
                      <Button
                        type="button"
                        color="slate"
                        variant="outline"
                        onClick={onClose}
                      >
                        Cancel
                      </Button>

                      <Button type="submit" color="orange" variant="solid">
                        Add
                      </Button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
