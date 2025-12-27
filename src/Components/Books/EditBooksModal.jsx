import { Button } from "../../Components/common/Button";
import { useState, useEffect, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import Tippy from "@tippyjs/react";
import Select from "react-select";
import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import axiosInstance from "../../api/axiosinstance";
import * as Yup from "yup";
import { FallingLines } from "react-loader-spinner";
import { useDropdownContext } from "../../DropdownProvider/DropdownProvider";
import { Category } from "@mui/icons-material";

export default function EditBooksModal({
  isOpen,
  onClose,
  data,
  success,
  error,
}) {
  const dropDownValues = useDropdownContext();

  const [loadingState, setLoadingState] = useState(false);

  const StartLoading = () => {
    setLoadingState(true);
  };
  const EndLoading = () => {
    setLoadingState(false);
  };

  const formik = useFormik({
    initialValues: {
      id: data?.id,
      subject: data?.subject?.id || "",
      description: data?.description || "",
      condition: data?.condition?.id || "",
      credit_value: data?.credit_value || "",
      status: data?.status?.id || "",

      class: data?.class?.id || "",
      category: data?.category?.id || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      // title: Yup.string().required("Title is required"),
    }),
    handleChange: (event) => {},
    onSubmit: async (values) => {
      StartLoading();

      await axiosInstance
        .post(`/api/books/update/${data?.id}`, values)
        .then((res) => {
          success("Book Updated Successfully");
        })
        .catch((err) => {
          error("Error", err.message);
        })
        .finally(() => {
          setTimeout(() => {
            EndLoading();
          }, 1000);
        });

      formik.resetForm();
      onClose();
    },
  });

  // console.log("Book data for edit: ", data);

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
                            Edit Book
                          </h2>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                          <div className="sm:col-span-2">
                            <label
                              htmlFor="subject"
                              className="block text-sm/6 font-medium text-gray-900"
                            >
                              Subject
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                              <select
                                id="subject"
                                name="subject"
                                autoComplete="subject"
                                placeholder="Select"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={formik.handleChange}
                                value={formik.values.subject}
                              >
                                <option value="">Select</option>
                                {dropDownValues?.data?.book_subject?.map(
                                  (value) => {
                                    return (
                                      <option value={value?.id}>
                                        {value?.subject}
                                      </option>
                                    );
                                  }
                                )}
                              </select>
                            </div>
                          </div>
                          <div className="sm:col-span-2">
                            <label
                              htmlFor="class"
                              className="block text-sm/6 font-medium text-gray-900"
                            >
                              Class
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                              <select
                                id="class"
                                name="class"
                                autoComplete="class"
                                placeholder="Select"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={formik.handleChange}
                                value={formik.values.class}
                              >
                                <option value="">Select</option>
                                {dropDownValues?.data?.book_class?.map(
                                  (value) => {
                                    return (
                                      <option value={value?.id}>
                                        {value?.name}
                                      </option>
                                    );
                                  }
                                )}
                              </select>
                            </div>
                          </div>
                          <div className="sm:col-span-2">
                            <label
                              htmlFor="category"
                              className="block text-sm/6 font-medium text-gray-900"
                            >
                              Category
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                              <select
                                id="category"
                                name="category"
                                autoComplete="category"
                                placeholder="Select"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={formik.handleChange}
                                value={formik.values.category}
                              >
                                <option value="">Select</option>
                                {dropDownValues?.data?.book_category?.map(
                                  (value) => {
                                    return (
                                      <option value={value?.id}>
                                        {value?.name}
                                      </option>
                                    );
                                  }
                                )}
                              </select>
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="condition"
                              className="block text-sm/6 font-medium text-gray-900"
                            >
                              Condition
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                              <select
                                id="condition"
                                name="condition"
                                autoComplete="status"
                                placeholder="Select"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 bg-gray-200 cursor-not-allowed shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={formik.handleChange}
                                value={formik.values.condition}
                                disabled
                              >
                                <option value="">Select</option>
                                {dropDownValues?.data?.book_condition?.map(
                                  (value) => {
                                    return (
                                      <option value={value?.id}>
                                        {value?.name}
                                      </option>
                                    );
                                  }
                                )}
                              </select>
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="credit_value"
                              className="block text-sm/6 font-medium text-gray-900"
                            >
                              Credit Value
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                id="credit_value"
                                name="credit_value"
                                onChange={formik.handleChange}
                                value={formik.values.credit_value}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 bg-gray-200 cursor-not-allowed shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                disabled
                              />
                            </div>
                          </div>

                          <div className="col-span-full">
                            <label
                              htmlFor="description"
                              className="block text-sm/6 font-medium text-gray-900"
                            >
                              Description
                            </label>
                            <div className="mt-2">
                              <textarea
                                id="description"
                                name="description"
                                rows={3}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                              />
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
                        {loadingState ? "Updating..." : "Update"}
                      </Button>
                      {loadingState ? (
                        <div>
                          {" "}
                          <FallingLines
                            color="#FF7B00"
                            width="50"
                            visible={true}
                            ariaLabel="falling-circles-loading"
                          />
                        </div>
                      ) : (
                        ""
                      )}
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
