import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosinstance";
import functions from "../../utils/GlobalFunctions";
import { FallingLines, Circles } from "react-loader-spinner";
import ImageNotFound from "../../../public/images/ImageNotFound.png";
import { Button } from "../../Components/common/Button";
import BookPurchaseModal from "../../Components/BookPurchase/BookPurchaseModal";
import { Toaster, toast } from "sonner";
import ProductDetailLoaderSkeleton from "../../Components/common/ProductDetailLoaderSkeleton";

export default function ProductDetail() {
  const id = useParams();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");
  const role = localStorage.getItem("role_id");

  const [imageLoading, setImageLoading] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [openBookPurchaseModal, setOpenBookPurchaseModal] = useState(false);
  const [bookData, setBookData] = useState();

  const openBookPurchaseModalHandler = () => {
    setOpenBookPurchaseModal(true);
  };
  const closeBookPurchaseModalHandler = () => {
    setOpenBookPurchaseModal(false);
  };
  const handleBookPurchase = () => {
    if (isLoggedIn) {
      openBookPurchaseModalHandler();
    } else {
      navigate("/login");
    }
  };

  const fetchData = async () => {
    setImageLoading(true);
    setIsLoading(true);
    await axiosInstance
      .get(`/api/bookforsale/showsinglebookpublic/${id?.id}`)
      .then((res) => {
        setBookData(res?.data?.data);
      })
      .catch((error) => {
        ToastError("Error: " + error);
        console.error("Error fetching data:", error);
        if (error.response.data.message === "Record not Found") {
          navigate("/no-permission");
        }
      })
      .finally(() => {
        setImageLoading(false);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const ToastSuccess = (str) => {
    toast.success(str);
  };
  const ToastError = (str) => {
    toast.error(str);
  };
  const ToastInfo = (str) => {
    toast.info(str);
  };

  // console.log("public book data: ", bookData);

  return (
    <>
      <div className="mx-auto shadow rounded-lg p-4 sm:p-8  bg-orange-100/10">
        <h2 className="text-4xl font-bold text-center text-orange-500">
          Book Details
        </h2>
      </div>
      <div className="bg-gray-200 py-8 px-4 min-h-screen">
        <Toaster richColors />

        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 max-w-screen-xl">
          {/* Left Section - Book Gallery */}
          <div className="rounded-lg">
            {bookData?.image_url ? (
              <img
                // alt={bookData.imageAlt}
                src={functions.imageUrlGenerator(bookData?.image_url)}
                className="h-full w-full object-cover object-center sm:h-full sm:w-full"
              />
            ) : bookData?.book_id?.image_url ? (
              <img
                // alt={bookData.imageAlt}
                src={functions.imageUrlGenerator(bookData?.book_id?.image_url)}
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

          {/* Right Section - Book Info */}
          <div className="bg-white shadow rounded-lg p-4 sm:p-6">
            {isLoading ? (
              <ProductDetailLoaderSkeleton />
            ) : (
              <>
                <h1 class="flex items-center text-5xl font-extrabold dark:text-white">
                  <span class="bg-blue-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                    {bookData?.subject?.subject}
                    <span className="text-xs">
                      {bookData?.type === 1
                        ? " (Original)"
                        : bookData?.type === 2
                        ? " (Pirated)"
                        : "Missing"}
                    </span>
                  </span>
                </h1>
                <div className="mt-2 shadow-lg rounded-lg p-4 bg-gray-200 border border-gray-300">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Book Details
                  </h3>
                  <div className="space-y-1">
                    <p className="text-sm sm:text-base text-gray-900">
                      Class:{" "}
                      <span className="font-medium text-indigo-600">
                        {bookData?.class?.name || "N/A"}
                      </span>
                    </p>
                    <p className="text-sm sm:text-base text-gray-900 flex items-center">
                      Condition:{" "}
                      <span
                        className={`px-2 py-1 ml-2 text-sm uppercase rounded-md font-semibold ${
                          bookData?.condition?.id === 1
                            ? "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                            : bookData?.condition?.id === 2
                            ? "inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                            : bookData?.condition?.id === 3
                            ? "inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-700/10"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {bookData?.condition?.name || "Missing"}
                      </span>
                    </p>
                    <p className="text-sm sm:text-base text-gray-900">
                      Category:{" "}
                      <span className="font-medium text-pink-800">
                        {bookData?.category?.name || "N/A"}
                      </span>
                    </p>
                  </div>
                  <p className="text-xl font-bold text-gray-900 mt-2">
                    Credits:{" "}
                    <span className="text-lg sm:text-xl font-bold text-orange-500 mt-4">
                      {bookData?.price || ""}
                    </span>
                  </p>
                </div>
                <div className="mt-4">
                  <p className="font-semibold text-gray-800">Highlights</p>
                  <ul className="list-disc list-inside mt-2 text-sm sm:text-base text-gray-600">
                    <li>{bookData?.details || "missing"}</li>
                  </ul>
                </div>
              </>
            )}

            {role == 2 && bookData && (
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Button
                  variant="solid"
                  color="orange"
                  onClick={handleBookPurchase}
                >
                  Purchase
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info Section */}
        {/* <div className="container mx-auto bg-white shadow rounded-lg p-4 sm:p-6 mt-4 max-w-screen-xl">
          <h2 className="text-lg font-semibold text-gray-800">Description</h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            {bookData?.description || "Not Available"}
          </p>
        </div> */}

        {/* Author Section */}
        {/* <div className="container mx-auto bg-white shadow rounded-lg p-4 sm:p-6 mt-4 max-w-screen-xl">
        <h2 className="text-lg font-semibold text-gray-800">
          About the Author
        </h2>
        <div className="mt-4 flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <img
            src="https://shorturl.at/n5TsJ"
            alt="Author"
            className="w-16 h-16 object-cover rounded-full"
          />
          <div>
            <p className="font-medium text-gray-800">Malik Luqman</p>
          </div>
        </div>
        <p className="text-sm sm:text-base text-gray-600 mt-4">
          Malik Luqman is a motivational speaker, writer, and author of multiple
          best-sellers. He has been recognized for his impact in writing.
        </p>
      </div> */}

        <BookPurchaseModal
          isOpen={openBookPurchaseModal}
          onClose={closeBookPurchaseModalHandler}
          success={ToastSuccess}
          error={ToastError}
          info={ToastInfo}
          data={bookData}
        />
      </div>
    </>
  );
}
