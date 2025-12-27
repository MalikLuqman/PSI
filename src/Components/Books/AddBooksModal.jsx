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

export default function AddBooksModal({ isOpen, onClose, success, error }) {
  const dropDownValues = useDropdownContext();
  const [loadingState, setLoadingState] = useState(false);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedBookType, setSelectedBookType] = useState();

  const book_type = [
    { id: 1, name: "Original" },
    {
      id: 2,
      name: "Pirated",
    },
  ];
  const StartLoading = () => {
    setLoadingState(true);
  };
  const EndLoading = () => {
    setLoadingState(false);
  };
  const [creditValue, setCreditValue] = useState();

  const handleSubjectChange = (event) => {
    const selectedSubjectId = parseInt(event.target.value);

    const selectedSubject = dropDownValues?.data?.book_subject?.find(
      (subject) => subject.id === selectedSubjectId
    );
    console.log("selected subject: ", selectedSubject);
    if (selectedSubject) {
      formik.setFieldValue("type", selectedSubject.type || ""); // Sending type (default to empty if null)
    }
    formik.setFieldValue("condition", null);
    setCreditValue(selectedSubject?.price);

    if (selectedSubject) {
      setFilteredClasses(
        dropDownValues?.data?.book_class?.filter(
          (cls) => cls.id === selectedSubject.class
        ) || []
      );
      setFilteredCategories(
        dropDownValues?.data?.book_category?.filter(
          (cat) => cat.id === selectedSubject.category
        ) || []
      );
    } else {
      setFilteredClasses([]);
      setFilteredCategories([]);
    }
    formik.setFieldValue("subject", selectedSubjectId);
  };

  const handleBookTypeChange = (event) => {
    const selectedTypeId = parseInt(event.target.value);
    setSelectedBookType(selectedTypeId);
  };
  const conditionHandler = (event) => {
    const conditionId = parseInt(event.target.value);
    let credit_value = creditValue;

    if (selectedBookType === 2) {
      // If book type is 2, apply 50% reduction first
      console.log("book type: ", selectedBookType);
      credit_value *= 0.5;
    }

    if (conditionId === 1) {
      credit_value *= 0.9;
    } else if (conditionId === 2) {
      credit_value *= 0.8;
    } else if (conditionId === 3) {
      credit_value *= 0.7;
    }

    credit_value = Math.round(credit_value * 100) / 100;
    formik.setFieldValue("credit_value", credit_value);
  };

  const formik = useFormik({
    initialValues: {
      type: "",
      description: "",
      condition: "",
      credit_value: "",
      subject: "",
      class: "",
      category: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({}),
    handleChange: (event) => {},
    onSubmit: async (values) => {
      StartLoading();
      // console.log(("values", values));
      await axiosInstance
        .post("/api/books/store", values)
        .then((res) => {
          success("Book added Successfully");
          onClose(true);
        })
        .catch((err) => {
          error("Error while adding Book: ", err.message);
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

  useEffect(() => {
    // Reset condition dropdown whenever selectedBookType changes
    formik.setFieldValue("condition", "");
    formik.setFieldValue("credit_value", "");
  }, [selectedBookType]);

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
                            Add Book
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
                                onChange={handleSubjectChange}
                                required
                              >
                                <option value="">Select</option>
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
                                autoComplete="class"
                                placeholder="Select"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => {
                                  formik.handleChange(e);
                                  handleBookTypeChange(e);
                                }}
                              >
                                <option value="">Select</option>
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
                                value={formik.values.class}
                                onChange={formik.handleChange}
                                disabled={!filteredClasses.length}
                              >
                                <option value="">Select</option>
                                {filteredClasses.map((cls) => (
                                  <option key={cls.id} value={cls.id}>
                                    {cls.name}
                                  </option>
                                ))}
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
                                value={formik.values.category}
                                onChange={formik.handleChange}
                                disabled={!filteredCategories.length}
                              >
                                <option value="">Select</option>
                                {filteredCategories.map((cat) => (
                                  <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                  </option>
                                ))}
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
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    "condition",
                                    e.target.value
                                  );
                                  conditionHandler(e);
                                }}
                                required
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
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 bg-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-not-allowed"
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
                        {loadingState ? "Adding..." : "Add"}
                      </Button>
                      {loadingState ? (
                        <div>
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
