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
import { CheckCircleIcon, CheckBadgeIcon, CheckIcon } from "../../utils/icons";

export default function CompleteOrderModal({
  isOpen,
  onClose,
  success,
  error,
  data,
}) {
  const dropDownValues = useDropdownContext();
  const [loadingState, setLoadingState] = useState(false);
  const [file, setFile] = useState();

  const formData = new FormData();
  const todayDate = new Date().toISOString().split("T")[0];
  const user_id = localStorage.getItem("user_id");

  const StartLoading = () => {
    setLoadingState(true);
  };
  const EndLoading = () => {
    setLoadingState(false);
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const formik = useFormik({
    initialValues: {
      id: data?.id || "",
      status: 3,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({}),
    handleChange: (event) => {},
    onSubmit: async (values) => {
      //   console.log("data", values);

      StartLoading();
      await axiosInstance
        .post(`/api/bookorders/update/${data?.id}`, values)
        .then((res) => {
          success("Book dispatched Successfully");
        })
        .catch((err) => {
          error("Error: " + err);
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

  //   console.log("order data: ", data);

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
                  <div className="rounded-md bg-gray-800 h-12 flex items-center justify-center">
                    <h2 className="text-center text-2xl tracking-widest leading-7 text-[#FFFBF5] sm:truncate sm:text-xl sm:tracking-tight">
                      Complete Order{" "}
                    </h2>
                  </div>
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-4 sm:pb-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                        <CheckCircleIcon
                          className="h-14 w-14 text-green-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-2 text-center sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-semibold leading-6 text-gray-900"
                        >
                          Complete This Order
                        </Dialog.Title>
                        <div className="mt-1">
                          <p className="text-pretty text-gray-500">
                            Are you sure you want to complete this order{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="space-y-8">
                      <div className=" border-gray-900/10 pb-4">
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                          <div className="sm:col-span-3">
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
                                className="block w-full rounded-md border-0 py-1.5  text-gray-900 bg-gray-200 shadow-sm ring-2 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-not-allowed"
                                onChange={formik.handleChange}
                                value={data?.subject?.id}
                                disabled
                              >
                                <option value="" disabled>
                                  Select
                                </option>
                                {dropDownValues?.data?.book_subject?.map(
                                  (value) => {
                                    const typeLabel =
                                      value?.type === 1
                                        ? "(Original)"
                                        : value?.type === 2
                                        ? "(Pirated)"
                                        : "";
                                    return (
                                      <option value={value?.id}>
                                        {`${value?.subject} ${typeLabel}`}
                                      </option>
                                    );
                                  }
                                )}
                              </select>
                            </div>
                          </div>
                          <div className="sm:col-span-3">
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
                                required
                                onChange={formik.handleChange}
                                value={data?.price || ""}
                                disabled
                                className="block w-full rounded-md border-0 py-1.5  text-gray-900 bg-gray-200 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-not-allowed"
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <label
                              htmlFor=""
                              className="block text-sm/6 font-medium text-gray-900"
                            >
                              Purchased By
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                id=""
                                name=""
                                required
                                onChange={formik.handleChange}
                                value={data?.purchased_by?.name || ""}
                                disabled
                                className="block w-full rounded-md border-0 py-1.5  text-gray-900 bg-gray-200 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-not-allowed"
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <label
                              htmlFor=""
                              className="block text-sm/6 font-medium text-gray-900"
                            >
                              Purchaser Email
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                id=""
                                name=""
                                required
                                onChange={formik.handleChange}
                                value={data?.purchased_by?.email || ""}
                                disabled
                                className="block w-full rounded-md border-0 py-1.5  text-gray-900 bg-gray-200 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-not-allowed"
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

                      <Button
                        type="submit"
                        color="orange"
                        variant="solid"
                        disabled={loadingState}
                      >
                        {loadingState ? "Completing..." : "Complete"}
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
