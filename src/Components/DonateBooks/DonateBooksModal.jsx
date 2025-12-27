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
import {
  BanknotesIcon,
  PaperAirplaneIcon,
  ArrowUpTrayIcon,
  ClipboardDocumentCheckIcon,
  SendIcon,
  BuildingLibraryIcon,
  PinDropOutlinedIcon,
} from "../../utils/icons";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function DonateBooksModal({ isOpen, onClose, success, error }) {
  const dropDownValues = useDropdownContext();
  const [loadingState, setLoadingState] = useState(false);
  const [file, setFile] = useState();
  const formData = new FormData();

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
      user_id: user_id,
      amount: "",
      credit_value: "",
      transaction_type: 1,
    },
    validationSchema: Yup.object({
      // title: Yup.string().required("Title is required"),
    }),
    handleChange: (event) => {},
    onSubmit: async (values) => {
      StartLoading();
      values.credit_value = values.amount / 100;
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
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      await axiosInstance
        .post("/api/transactions/store", formData)
        .then((res) => {
          success("Transaction details submitted Successfully");
          onClose(true);
        })
        .catch((err) => {
          error("Error while submitting transaction details: ", err.message);
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
                            Donate Books
                          </h2>
                        </div>

                        <div className="shadow sm:rounded-lg mt-2 bg-gray-200">
                          <div className="px-4 py-4 sm:p-4">
                            <h3 className="text-base font-semibold text-gray-900">
                              Books Donation
                            </h3>
                            <div className="mt-2 max-w-2xl text-sm text-gray-900 bg-white px-4 py-4 rounded-md">
                              <ul className="list-disc space-y-2">
                                <li className="flex items-start">
                                  <span className="mr-2 text-indigo-500">
                                    <SendIcon
                                      aria-hidden="true"
                                      className="size-5 shrink-0 text-orange-500"
                                    />
                                  </span>
                                  Help others by donating books. You can
                                  dispatch your books to the following address.
                                </li>

                                <div className="mt-3 bg-gray-200 border border-gray-300 rounded-lg shadow-md p-4">
                                  <div className="flex items-center mb-2">
                                    <span className="text-blue-500 mr-2">
                                      <BuildingLibraryIcon className="size-5 shrink-0 text-orange-500" />
                                    </span>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                      Address
                                    </h3>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex items-center">
                                      <p className="ml-8 text-gray-700">
                                        {" "}
                                        ABC Charity Organization, 123 Book
                                        Street, Knowledge City <br />
                                        Rawalpindi, Punjab, Pakistan
                                      </p>
                                    </div>
                                    <div className="flex items-center">
                                      {/* <span className="mr-2 text-gray-500">
                                        <PinDropOutlinedIcon className="size-5 shrink-0 text-orange-500" />
                                      </span> */}
                                      <p className="ml-8 text-gray-700">
                                        <span className="font-medium">
                                          Postal Code:
                                        </span>{" "}
                                        Saddar (46000)
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </ul>
                            </div>

                            <p className="mt-2 italic text-orange-500 text-center font-medium bg-orange-50 px-2 py-1 rounded-md">
                              Thank You for Your Generosity!
                            </p>
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

                      {/* <Button
                        type="submit"
                        color="orange"
                        variant="solid"
                        disabled={loadingState}
                      >
                        {loadingState ? "Submitting..." : "Submit"}
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
                      )} */}
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
