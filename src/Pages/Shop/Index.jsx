import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useDropdownContext } from "../../DropdownProvider/DropdownProvider";
import { useFormik } from "formik";
import axiosInstance from "../../api/axiosinstance";
import { Toaster, toast } from "sonner";
import Pagination from "../../Components/common/Pagination";
import functions from "../../utils/GlobalFunctions";
import BookGridSkeleton from "../../Components/common/BookGridSkeleton";
import ImageNotFound from "../../../public/images/ImageNotFound.png";
export default function ShopIndex() {
  const filterOptions = [
    {
      id: "class",
      name: "Class",
      options: [
        { value: 2, label: "O Level" },
        { value: 1, label: "A Level" },
      ],
    },
    {
      id: "category",
      name: "Category",
      options: [
        {
          value: 1,
          label: "Science",
        },
        {
          value: 2,
          label: "Arts",
        },
        {
          value: 3,
          label: "Math",
        },
        {
          value: 4,
          label: "Computer Science",
        },
      ],
    },
    {
      id: "condition",
      name: "Condition",
      options: [
        { value: 1, label: "New" },
        { value: 2, label: "Good" },
        { value: 3, label: "Fair" },
      ],
    },
  ];

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [loadingBooks, setLoadingBooks] = useState(true);

  const [booksData, setBooksData] = useState();
  const [filters, setFilters] = useState({
    class: [],
    category: [],
    condition: [],
  });

  //appending filter query params in URL

  // const queryParams = new URLSearchParams();
  // Object.entries(filters).forEach(([key, values]) => {
  //   values.forEach((value) => {
  //     queryParams.append(key, value);
  //   });
  // });

  const handleCheckboxChange = (sectionId, value) => {
    setFilters((prevFilters) => {
      const sectionValues = prevFilters[sectionId];
      const updatedValues = sectionValues.includes(value)
        ? sectionValues.filter((v) => v !== value)
        : [...sectionValues, value];

      return { ...prevFilters, [sectionId]: updatedValues };
    });
  };

  const fetchData = async (pageNum) => {
    setLoadingBooks(true);

    //Creating array of filter params
    let queryString = ``;
    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        queryString += `&${key}=[${values.join(",")}]`;
      }
    });

    await axiosInstance
      .get(
        `/api/bookforsale/showpublicbooks?page_size=10&page=${pageNum}&${queryString}`
      )
      .then((res) => {
        setBooksData(res?.data?.data);
      })
      .catch((error) => {
        ToastError("Error: " + error?.response?.data?.message);
        console.error("Error fetching data:", error?.response?.data?.message);
      })
      .finally(() => {
        setLoadingBooks(false);
      });
  };

  useEffect(() => {
    fetchData(1);
  }, [filters]);

  const ToastSuccess = (str) => {
    toast.success(str);
  };
  const ToastError = (str) => {
    toast.error(str);
  };
  const pageNumber = async (pageNum) => {
    fetchData(pageNum);
  };

  console.log("books for sale: ", booksData?.data);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="relative -mr-2 flex size-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4">
                {filterOptions.map((section) => (
                  <Disclosure
                    key={section.name}
                    as="div"
                    className="border-t border-gray-200 pb-4 pt-4"
                  >
                    <fieldset>
                      <legend className="w-full px-2">
                        <DisclosureButton className="group flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                          <span className="text-sm font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex h-7 items-center">
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="size-5 rotate-0 transform group-data-[open]:-rotate-180"
                            />
                          </span>
                        </DisclosureButton>
                      </legend>
                      <DisclosurePanel className="px-4 pb-2 pt-4">
                        <div className="space-y-6">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                value={option.value}
                                id={`${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type="checkbox"
                                checked={filters[section.id].includes(
                                  option.value
                                )}
                                onChange={() =>
                                  handleCheckboxChange(section.id, option.value)
                                }
                                className="size-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                              />
                              <label
                                htmlFor={`${section.id}-${optionIdx}-mobile`}
                                className="ml-3 text-sm text-gray-500"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </fieldset>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
          <div className="border-b border-gray-200 pb-10 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              All Books
            </h1>

            <p className="mt-4 text-base text-gray-600">
              Explore the latest collection of books, available in various
              conditions to suit your needs!
            </p>
          </div>

          <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <aside>
              <h2 className="sr-only">Filters</h2>

              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="inline-flex items-center lg:hidden"
              >
                <span className="text-sm font-medium text-gray-700">
                  Filters
                </span>
                <PlusIcon
                  aria-hidden="true"
                  className="ml-1 size-5 shrink-0 text-gray-400"
                />
              </button>

              <div className="hidden lg:block shadow-lg">
                <form className="space-y-10 divide-y divide-gray-300 bg-gray-100 p-4 rounded-lg ring-1 ring-inset ring-gray-200">
                  {filterOptions.map((section, sectionIdx) => (
                    <div
                      key={section.name}
                      className={sectionIdx === 0 ? null : "pt-10"}
                    >
                      <fieldset>
                        <legend className="block text-base  font-medium text-gray-900">
                          {section.name}
                        </legend>
                        <div className="space-y-3 pt-6">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center group hover:bg-gray-50 rounded-md transition"
                            >
                              <input
                                value={option.value}
                                id={`${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type="checkbox"
                                checked={filters[section.id].includes(
                                  option.value
                                )}
                                onChange={() =>
                                  handleCheckboxChange(section.id, option.value)
                                }
                                className="size-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                              />
                              <label
                                htmlFor={`${section.id}-${optionIdx}`}
                                className="ml-3 text-sm font-medium text-gray-700 group-hover:text-orange-600 transition"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  ))}
                </form>
              </div>
            </aside>

            <section
              aria-labelledby="product-heading"
              className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3"
            >
              <h2 id="product-heading" className="sr-only">
                Products
              </h2>

              {loadingBooks ? (
                <BookGridSkeleton />
              ) : (
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 lg:gap-x-8 xl:grid-cols-3 bg-gray-200 rounded-md px-6 py-6">
                  {booksData?.data.map((book) => (
                    <div
                      key={book.id}
                      className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white ring-1 ring-gray-400 shadow-md transition-transform transform hover:scale-105 hover:shadow-md hover:ring-orange-500 hover:ring-1"
                    >
                      {/* Image Section */}
                      <div className="aspect-w-4 aspect-h-3 bg-gray-200 sm:aspect-none sm:h-64">
                        {book?.image_url ? (
                          <img
                            alt={book.imageAlt}
                            src={functions.imageUrlGenerator(book?.image_url)}
                            className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                          />
                        ) : book?.book_id?.image_url ? (
                          <img
                            alt={book.imageAlt}
                            src={functions.imageUrlGenerator(
                              book?.book_id?.image_url
                            )}
                            className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                          />
                        ) : (
                          <img
                            alt="Profile Image"
                            src={ImageNotFound}
                            className="size-full object-cover object-center sm:size-full"
                          />
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="flex flex-1 flex-col space-y-2 p-4">
                        {/* Title */}
                        <h3 className="text-lg font-semibold text-gray-800">
                          <Link to={`/product-detail/${book?.id}`}>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {book?.subject?.subject}
                            <span className="text-xs font-normal">
                              {" "}
                              {book?.subject?.type === 1
                                ? "(Original)"
                                : book?.subject?.type === 2
                                ? "(Pirated)"
                                : "Missing"}
                            </span>
                          </Link>
                        </h3>

                        {/* Description */}
                        <div className="flex gap-x-2">
                          <p className="text-sm text-gray-700 line-clamp-2 before:content-['•'] before:mr-2 before:text-black before:text-lg">
                            {book?.class?.name || "Missing"}
                          </p>
                          <p className="text-sm text-gray-700 line-clamp-2 before:content-['•'] before:mr-2 before:text-black before:text-lg">
                            {book?.category?.name || "Missing"}
                          </p>
                        </div>

                        {/* Book Condition Badge */}
                        <div className="flex items-center">
                          Condition
                          <span
                            className={`ml-2 inline-block px-4 py-0 text-sm font-medium rounded-full uppercase ${
                              book?.condition?.id === 1
                                ? "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                                : book?.condition?.id === 2
                                ? "inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                                : book?.condition?.id === 3
                                ? "inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-700/10"
                                : ""
                            }`}
                          >
                            {book?.condition?.name || "Missing"}
                          </span>
                        </div>

                        {/* Footer Section */}
                        <div className="flex flex-1 flex-col justify-end">
                          <p className="text-pretty font-semibold text-orange-600">
                            {book.price} credits
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Pagination
                page={pageNumber}
                count={booksData?.total / booksData?.per_page}
              />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
