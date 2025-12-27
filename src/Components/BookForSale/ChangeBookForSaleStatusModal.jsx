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

export default function ChangeBookForSaleStatusModal({
  isOpen,
  onClose,
  success,
  error,
  data,
}) {
  const dropDownValues = useDropdownContext();
  const [loadingState, setLoadingState] = useState(false);
  const user_id = localStorage.getItem("user_id");
  const [file, setFile] = useState();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleCondition = (e) => {
    var conditionId = e?.target?.value;
    var subjectCreditValue = data?.subject?.price;

    var credit_value = 0;

    if (conditionId == 1) {
      credit_value = subjectCreditValue * 0.9;
    } else if (conditionId == 2) {
      credit_value = subjectCreditValue * 0.8;
    } else if (conditionId == 3) {
      credit_value = subjectCreditValue * 0.7;
    }

    credit_value = Math.round(credit_value * 100) / 100;

    formik.setFieldValue("condition", conditionId);
    formik.setFieldValue("price", credit_value);
  };

  const StartLoading = () => {
    setLoadingState(true);
  };
  const EndLoading = () => {
    setLoadingState(false);
  };

  const formData = new FormData();

  const formik = useFormik({
    initialValues: {
      subject: data?.subject?.id || "",
      condition: data?.book_id?.condition?.id || "",
      class: data?.book_id?.class?.id || "",
      category: data?.book_id?.category?.id || "",
      active_for_puchased_by: user_id || "",
      price: data?.book_id?.credit_value || "",
      status: false,
      details: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({}),
    handleChange: (event) => {},
    onSubmit: async (values) => {
      StartLoading();
      try {
        if (file) {
          formData.append("image_url", file);
        }
        for (let key in values) {
          formData.append(key, values[key]);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
      formData.set("status", values.status ? 2 : null);

      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      await axiosInstance
        .post(`/api/bookforsale/update/${data?.id}`, formData)
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

                        <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
                          <div className="sm:col-span-full flex items-start p-4 rounded-md bg-blue-50 border border-blue-200">
                            <InformationCircleIcon className="w-6 h-6 text-blue-800 flex-shrink-0" />
                            <div className="ml-3">
                              <h3 className="text-md font-semibold text-blue-800">
                                Important Information
                              </h3>
                              <ul className="mt-1 text-sm text-blue-700 list-disc pl-5">
                                <li>
                                  You can change the book condition below.
                                </li>
                                <li>
                                  The credits against that book will
                                  auto-update.
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="col-span-full bg-gray-200 p-2 rounded-md">
                            <label
                              htmlFor="status"
                              className="block text-lg font-bold text-gray-900"
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
                              Active For Purchase
                            </div>
                          </div>
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
                                autoComplete="status"
                                placeholder="Select"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                              htmlFor="price"
                              className="block text-sm/6 font-medium text-gray-900"
                            >
                              Credits
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                id="price"
                                name="price"
                                onChange={formik.handleChange}
                                value={formik.values.price}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 bg-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                disabled
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-6">
                            <label
                              htmlFor="image_url"
                              className="block text-sm sm:leading-6 font-medium leading-6 text-gray-900 "
                            >
                              Upload Book Image
                            </label>
                            <input
                              className="mt-2 relative sm:text-sm sm:leading-6 m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-1 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-200 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none    dark:file:text-neutral-700 dark:focus:border-primary"
                              type="file"
                              id="image_url"
                              onChange={handleFileChange}
                              // required
                            />
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
                                rows={3}
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
