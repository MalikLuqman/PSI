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
import { InformationCircleIcon } from "../../utils/icons";

export default function ChangeBookStatusModal({
  isOpen,
  onClose,
  success,
  error,
  data,
}) {
  const dropDownValues = useDropdownContext();
  const [loadingState, setLoadingState] = useState(false);

  const StartLoading = () => {
    setLoadingState(true);
  };
  const EndLoading = () => {
    setLoadingState(false);
  };

  const handleCondition = (e) => {
    var conditionId = e.target.value;
    var creditValue = data?.subject?.price;

    var credit_value = 0;

    if (conditionId == 1) {
      credit_value = creditValue * 0.9;
    } else if (conditionId == 2) {
      credit_value = creditValue * 0.8;
    } else if (conditionId == 3) {
      credit_value = creditValue * 0.7;
    }

    credit_value = Math.round(credit_value * 100) / 100;

    formik.setFieldValue("condition", conditionId);
    formik.setFieldValue("credit_value", credit_value);
  };

  const formik = useFormik({
    initialValues: {
      subject: data?.subject?.id || "",
      condition: data?.condition?.id || "",
      class: data?.class?.id || "",
      category: data?.category?.id || "",
      status_changed_by: data?.user_id || "",
      credit_value: data?.credit_value || "",
      type: data?.type || "",
      status: false,
      details: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({}),
    handleChange: (event) => {},
    onSubmit: async (values) => {
      StartLoading();

      const payload = {
        ...values,
        status: values.status ? 1 : null,
      };
      // console.log(("values", payload));

      await axiosInstance
        .post(`/api/books/update/${data?.id}`, payload)
        .then((res) => {
          success("Book Status Changed Successfully");
          onClose(true);
        })
        .catch((err) => {
          error("Error while Updating Book Status: ", err.message);
        })
        .finally(() => {
          setTimeout(() => {
            EndLoading();
          }, 1000);
        });
      formik.resetForm();
      onClose(false);
    },
  });

  // console.log("Change status: ", data);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => onClose(false)}>
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
                            Change Book Status
                          </h2>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                          <div className="sm:col-span-full flex items-start p-4 rounded-md bg-blue-50 border border-blue-200">
                            <InformationCircleIcon className="w-6 h-6 text-blue-800 flex-shrink-0" />
                            <div className="ml-3">
                              <h3 className="text-md font-semibold text-blue-800">
                                Important Information
                              </h3>
                              <p className="mt-1 text-sm text-blue-700">
                                You can change the book condition and the
                                credits against that book will auto update.
                              </p>
                            </div>
                          </div>
                          <div className="col-span-full bg-gray-200 p-2 rounded-md">
                            <label
                              htmlFor="status"
                              className="block text-lg font-bold  text-gray-900"
                            >
                              Book Status{" "}
                              <span className="italic font-normal text-xs text-black">
                                (Please check the box)
                              </span>
                            </label>
                            <div className="mt-2">
                              {" "}
                              <input
                                type="checkbox"
                                id="status"
                                name="status"
                                className="mr-2 text-orange-500 focus:ring-orange-500"
                                onChange={formik.handleChange}
                                checked={formik.values.status}
                                required
                              />
                              Received at Warehouse
                            </div>
                          </div>
                          {/* <div className="sm:col-span-2">
                            <label
                              htmlFor="type"
                              className="block text-sm/6 font-medium text-gray-900"
                            >
                              Book Type
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                              <select
                                id="type"
                                name="type"
                                autoComplete="subject"
                                placeholder="Select"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 bg-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-not-allowed"
                                onChange={formik.handleChange}
                                value={formik.values.type}
                                disabled
                              >
                                <option value="" disabled>
                                  Select
                                </option>
                                {book_type?.map((value) => {
                                  return (
                                    <option value={value?.id}>
                                      {value?.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div> */}
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
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 bg-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-not-allowed"
                                onChange={formik.handleChange}
                                value={formik.values.subject}
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
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 bg-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-not-allowed"
                                onChange={formik.handleChange}
                                value={formik.values.class}
                                disabled
                              >
                                <option value="" disabled>
                                  Select
                                </option>
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
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 bg-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-not-allowed"
                                onChange={formik.handleChange}
                                value={formik.values.category}
                                disabled
                              >
                                <option value="" disabled>
                                  Select
                                </option>
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
                                placeholder="Select"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                // onChange={formik.handleChange}
                                onChange={handleCondition}
                                value={formik.values.condition}
                              >
                                <option value="">select</option>
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
                              Credits
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                id="credit_value"
                                name="credit_value"
                                onChange={formik.handleChange}
                                value={formik.values.credit_value}
                                disabled
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 bg-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-not-allowed"
                              />
                            </div>
                          </div>
                          <div className="col-span-full">
                            <label
                              htmlFor="details"
                              className="block text-sm/6 font-medium text-gray-900"
                            >
                              Details
                            </label>
                            <div className="mt-2">
                              <textarea
                                id="details"
                                name="details"
                                rows={4}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={formik.handleChange}
                                value={formik.values.details}
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
                        onClick={() => onClose(false)}
                      >
                        Cancel
                      </Button>

                      <Button
                        type="submit"
                        color="orange"
                        variant="solid"
                        disabled={loadingState}
                      >
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
