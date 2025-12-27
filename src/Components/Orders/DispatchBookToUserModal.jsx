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

export default function DispatchBookToUserModal({
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
      status: false,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({}),
    handleChange: (event) => {},
    onSubmit: async (values) => {
      //   StartLoading();

      const payload = {
        ...values,
        status: values.status ? 2 : null,
      };

      try {
        if (file) {
          formData.append("image_url", file);
        }
        for (let key in values) {
          if (key !== "status") {
            formData.append(key, values[key]);
          }
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
      formData.append("status", payload.status);

      //   for (const pair of formData.entries()) {
      //     console.log(pair[0], pair[1]);
      //   }

      await axiosInstance
        .post(`/api/bookorders/update/${data?.id}`, formData)
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
                      Disptach Book
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
                          Dispatch Book
                        </Dialog.Title>
                        <div className="mt-1">
                          <p className="text-pretty text-gray-500">
                            Are you sure you want to dispatch this Book{" "}
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
                          <div className="sm:col-span-full">
                            <label
                              htmlFor="address"
                              className="block text-sm/6 font-medium text-gray-900"
                            >
                              Address
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                id="address"
                                name="address"
                                required
                                onChange={formik.handleChange}
                                value={data?.address || ""}
                                disabled
                                className="block w-full rounded-md border-0 py-1.5  text-gray-900 bg-gray-200 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-not-allowed"
                              />
                            </div>
                          </div>
                          <div className="col-span-full">
                            <label
                              htmlFor="status"
                              className="block text-sm/6 font-medium text-gray-900"
                            >
                              Book Status{" "}
                              <span className="text-gray-900 text-sm font-light">
                                (Please click the checkbox)
                              </span>
                            </label>
                            <div className="mt-2 bg-gray-200 rounded-md px-2 py-2">
                              {" "}
                              <input
                                type="checkbox"
                                id="status"
                                name="status"
                                className="mr-2 text-orange-500 focus:ring-orange-500 rounded-md"
                                onChange={formik.handleChange}
                                checked={formik.values.status}
                                required
                              />
                              Dispatch Book
                            </div>
                          </div>
                          <div className="sm:col-span-6">
                            <label
                              htmlFor="image_url"
                              className="block text-sm sm:leading-6 font-medium leading-6 text-gray-900 "
                            >
                              Upload Receipt
                            </label>
                            <input
                              className="mt-2 relative sm:text-sm sm:leading-6 m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-1 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-200 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none    dark:file:text-neutral-700 dark:focus:border-primary"
                              type="file"
                              id="image_url"
                              onChange={handleFileChange}
                              // required
                            />
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
                        {loadingState ? "Dispatching..." : "Dispatch"}
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
