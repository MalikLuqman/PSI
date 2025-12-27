import { Button } from "../../Components/common/Button";
import { useState, useEffect, Fragment } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react";
import Select from "react-select";
import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import axiosInstance from "../../api/axiosinstance";
import * as Yup from "yup";
import { FallingLines } from "react-loader-spinner";
import { useDropdownContext } from "../../DropdownProvider/DropdownProvider";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

export default function BookPurchaseModal({
  isOpen,
  onClose,
  success,
  error,
  info,
  data,
}) {
  const dropDownValues = useDropdownContext();
  const [loadingState, setLoadingState] = useState(false);
  const navigate = useNavigate();

  const StartLoading = () => {
    setLoadingState(true);
  };
  const EndLoading = () => {
    setLoadingState(false);
  };

  const formik = useFormik({
    initialValues: {
      book_id: data?.book_id?.id,
      subject: data?.subject?.id || "",
      class: data?.class?.id || "",
      price: data?.price || "",
      address: "",
      status: 1,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      // title: Yup.string().required("Title is required"),
    }),
    handleChange: (event) => {},
    onSubmit: async (values) => {
      StartLoading();

      await axiosInstance
        .post("/api/bookorders/store", values)
        .then((res) => {
          success("Order placed Successfully");
          onClose(true);
          navigate("/dashboard/books-orders");
        })
        .catch((err) => {
          if (err.response.status === 400) {
            info(err.response.data.message);
          } else {
            error(err.response.data.message);
          }
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

  console.log("purcahse : ", data);

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
                            Purchase Book
                          </h2>
                        </div>

                        <div className="shadow sm:rounded-lg mt-3 bg-gray-200">
                          <div className="px-4 py-4 sm:p-4">
                            <h3 className="text-lg font-bold text-gray-900">
                              Book:
                              <span className="text-orange-500  font-bold ml-2">
                                {data?.subject?.subject}
                              </span>
                            </h3>
                          </div>
                        </div>

                        <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
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
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 bg-gray-200 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-not-allowed"
                                onChange={formik.handleChange}
                                value={formik.values.class}
                                disabled
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
                                disabled
                                onChange={formik.handleChange}
                                value={formik.values.price}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 bg-gray-200 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-not-allowed"
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-full rounded-md bg-yellow-50 p-4">
                            <div className="flex">
                              <div className="shrink-0">
                                <ExclamationTriangleIcon
                                  aria-hidden="true"
                                  className="size-5 text-yellow-400"
                                />
                              </div>
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-yellow-800">
                                  Attention needed
                                </h3>
                                <div className="mt-2 text-sm text-yellow-700">
                                  <ul className="list-disc pl-5">
                                    <li>
                                      Please provide the accurate address where
                                      you want to get your book dispatched.
                                    </li>
                                    <li>
                                      Ensure your contact number is correct for
                                      smooth delivery.
                                    </li>
                                    <li>
                                      Double-check the postal code to avoid any
                                      delays.
                                    </li>
                                    <li>
                                      Use a permanent address to prevent
                                      delivery issues.
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-full">
                            <label
                              htmlFor="address"
                              className="block text-sm/6 font-medium text-gray-900"
                            >
                              Address
                            </label>
                            <div className="mt-2">
                              <textarea
                                id="address"
                                name="address"
                                rows={2}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={formik.handleChange}
                                value={formik.values.address}
                                required
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
                        {loadingState ? "Order Placing..." : "Place Order"}
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
