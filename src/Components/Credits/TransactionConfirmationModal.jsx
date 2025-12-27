import { Button } from "../common/Button";
import { useState, useEffect, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import Tippy from "@tippyjs/react";
import Select from "react-select";
import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import axiosInstance from "../../api/axiosinstance";
import * as Yup from "yup";
import { ExclamationTriangleIcon, CheckCircleIcon } from "../../utils/icons";
import { FallingLines } from "react-loader-spinner";

export default function ConfirmationModal({
  isOpen,
  onClose,
  success,
  error,
  status,
  id,
  creditValue,
}) {
  const [loadingState, setLoadingState] = useState(false);

  var status_label;
  if (status == 2) {
    status_label = "Approve";
  } else if (status == 3) {
    status_label = "Deny";
  } else {
    status_label = "Status Missing";
  }

  // console.log("status: ", status);

  const Post = async () => {
    const payload = {
      status: status,
      credit_value: creditValue,
    };
    // console.log("payload: ", payload);
    setLoadingState(true);
    await axiosInstance
      .post(`/api/transactions/update/${id}`, payload)
      .then((res) => {
        success("Transaction status updated Successfully");
      })
      .catch((error) => {
        error("Error in updating Transaction Status: " + error);
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoadingState(false);
        onClose(false);
      });
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-20 w-20 items-center justify-center rounded-full ${
                        status == 2 ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      {status == 2 ? (
                        <CheckCircleIcon
                          className="h-12 w-12 text-green-600 "
                          aria-hidden="true"
                        />
                      ) : (
                        <ExclamationTriangleIcon
                          className="h-12 w-12 text-red-600"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold leading-6 text-gray-900"
                      >
                        {status_label} Transaction
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-pretty text-gray-500">
                          Are you sure you want to{" "}
                          <span className="font-bold ">{status_label}</span>{" "}
                          this Transaction{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-end gap-x-4">
                  <button
                    type="button"
                    data-autofocus
                    onClick={onClose}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:col-start-1 sm:mt-0"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => Post()}
                    className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ${
                      status == 2
                        ? "bg-green-500 hover:bg-green-600 focus-visible:outline-green-600"
                        : "bg-red-600 hover:bg-red-700 focus-visible:outline-red-600"
                    }  sm:col-start-2`}
                    disabled={loadingState}
                  >
                    {loadingState ? "Submitting..." : "Submit"}
                  </button>
                  {loadingState ? (
                    <div>
                      {" "}
                      {status == 2 ? (
                        <FallingLines
                          color="#2E8B57"
                          width="50"
                          visible={true}
                          ariaLabel="falling-circles-loading"
                        />
                      ) : (
                        <FallingLines
                          color="#C70039"
                          width="50"
                          visible={true}
                          ariaLabel="falling-circles-loading"
                        />
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
