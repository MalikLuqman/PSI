import { Button } from "../../Components/common/Button";
import { useState, useEffect, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import Tippy from "@tippyjs/react";
import Select from "react-select";
import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import axiosInstance from "../../api/axiosinstance";
import * as Yup from "yup";

export default function ViewBooksModal({
  isOpen,
  onClose,
  data,
  success,
  error,
}) {
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg px-4 pb-4 pt-5 text-left transition-all sm:my-8 sm:w-full sm:max-w-[50rem] sm:p-6">
                <form>
                  <div className="space-y-12">
                    <div className=" border-gray-900/10 ">
                      <section aria-labelledby="basic-information-title">
                        <div className="bg-white divide-y-2 shadow ring-1 ring-black ring-opacity-10 rounded-lg">
                          <div className="px-5 py-5">
                            <h1
                              id="basic-information-title"
                              className="text-xl font-medium leading-6 text-black"
                            >
                              View Book Details
                            </h1>
                          </div>
                          <div className=" flex">
                            <div className="border-gray-200 px-4 py-5 sm:px-6 w-full">
                              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
                                <div className="sm:col-span-1">
                                  <dt className="text-pretty font-medium text-gray-700">
                                    Book
                                  </dt>
                                  <dd className="mt-1 text-sm text-black">
                                    {data?.subject?.subject
                                      ? data?.subject?.subject
                                      : "Missing"}
                                  </dd>
                                </div>
                                <div className="sm:col-span-1">
                                  <dt className="text-pretty font-medium text-gray-700">
                                    Book Type
                                  </dt>
                                  <dd className="mt-1 text-sm text-black">
                                    {data?.type === 1 ? "Original" : "Pirated"}
                                  </dd>
                                </div>
                                <div className="sm:col-span-1">
                                  <dt className="text-pretty font-medium text-gray-700">
                                    Class
                                  </dt>
                                  <dd className="mt-1 text-sm text-black">
                                    {data?.class?.name
                                      ? data?.class?.name
                                      : "Missing"}
                                  </dd>
                                </div>
                                <div className="sm:col-span-1">
                                  <dt className="text-pretty font-medium text-gray-700">
                                    Category
                                  </dt>
                                  <dd className="mt-1 text-sm text-black">
                                    {data?.category?.name
                                      ? data?.category?.name
                                      : "Missing"}
                                  </dd>
                                </div>
                                <div className="sm:col-span-1">
                                  <dt className="text-pretty font-medium text-gray-700">
                                    Book Condition
                                  </dt>
                                  <dd className="mt-1 text-sm text-black">
                                    {data?.condition?.name
                                      ? data?.condition?.name
                                      : "missing"}
                                  </dd>
                                </div>
                                <div className="sm:col-span-1">
                                  <dt className="text-pretty font-medium text-gray-700">
                                    Credit Value
                                  </dt>
                                  <dd className="mt-1 text-sm text-black">
                                    {data?.credit_value
                                      ? data?.credit_value
                                      : "missing"}
                                  </dd>
                                </div>
                                <div className="sm:col-span-1">
                                  <dt className="text-pretty font-medium text-gray-700">
                                    Status
                                  </dt>
                                  <dd className="mt-1 text-sm text-black">
                                    {data?.status?.name
                                      ? data?.status?.name
                                      : "missing"}
                                  </dd>
                                </div>
                                <div className="sm:col-span-3">
                                  <dt className="text-pretty font-medium text-gray-700">
                                    description
                                  </dt>
                                  <dd className="mt-1 text-sm text-black">
                                    {data?.description
                                      ? data?.description
                                      : "missing"}
                                  </dd>
                                </div>
                              </dl>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
