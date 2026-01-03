import { UserCircleIcon, PencilSquareIcon } from "../../utils/icons";
import { Button } from "../../Components/common/Button";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Tippy from "@tippyjs/react";
import { Toaster, toast } from "sonner";
import axiosInstance from "../../api/axiosinstance";
import functions from "../../utils/GlobalFunctions";
import { useDropdownContext } from "../../DropdownProvider/DropdownProvider";
import PurchaseCreditModal from "../../Components/Credits/PurchaseCreditModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import UserProfileSkeleton from "../../Components/common/UserProfileSkeleton";
import { FallingLines, Circles } from "react-loader-spinner";
import ImageNotFound from "../../../public/images/ImageNotFound.png";
import {
  BanknotesIcon,
  PaperAirplaneIcon,
  ArrowUpTrayIcon,
  ClipboardDocumentCheckIcon,
  SendIcon,
  BuildingLibraryIcon,
  CurrencyDollarIcon,
  ArrowsRightLeftIcon,
} from "../../utils/icons";

export default function IndexProfile() {
  const role = parseInt(localStorage.getItem("role_id"));
  const user_id = localStorage.getItem("user_id");

  const dropDownValues = useDropdownContext();

  const [isEditing, setIsEditing] = useState(false);
  const [openPurchaseCreditModal, setOpenPurchaseCreditModal] = useState(false);
  const [userData, setUserData] = useState();
  const [loadingUserProfile, setLoadingUserProfile] = useState(true);
  const [loadingState, setLoadingState] = useState(false);
  const toggleEdit = () => setIsEditing((prev) => !prev);

  const onClose = () => {
    setIsEditing(false);
  };

  const openPurchaseCreditModalHandler = () => {
    setOpenPurchaseCreditModal(true);
  };
  const closePurchaseCreditModalHandler = () => {
    setOpenPurchaseCreditModal(false);
  };
  const ToastSuccess = (str) => {
    toast.success(str);
  };
  const ToastError = (str) => {
    toast.error(str);
  };

  const fetchData = async () => {
    setLoadingUserProfile(true);
    await axiosInstance
      .get(`/api/auth/show_user/${user_id}`)
      .then((res) => {
        setUserData(res?.data?.data);
        setIsEditing(false);
      })
      .catch((error) => {
        toast.error("Error: " + error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoadingUserProfile(false);
        }, 100);
      });
  };

  useEffect(() => {
    fetchData();
  }, [user_id]);

  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const [hovered, setHovered] = useState(false);

  const formData = new FormData();

  const handleImageUpload = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Update image preview
      };
      reader.readAsDataURL(selectedFile);

      setFile(selectedFile); // Save the file for FormData

      try {
        if (selectedFile) {
          formData.append("image_url", selectedFile);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
      setLoadingUserProfile(true);
      await axiosInstance
        .post(`/api/auth/update_user/${user_id}`, formData)
        .then((res) => {
          ToastSuccess("User Profile updated Successfully");
          onClose(true);
          fetchData();
        })
        .catch((err) => {
          ToastError("Error while Updating User Profile: ", err.message);
        })
        .finally(() => {
          setTimeout(() => {
            setLoadingUserProfile(false);
          }, 1000);
        });
    }
  };

  const formik = useFormik({
    initialValues: {
      name: userData?.name || "",
      email: userData?.email || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({}),
    handleChange: (event) => {},
    onSubmit: async (values) => {
      setLoadingState(true);
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
        .post(`/api/auth/update_user/${user_id}`, formData)
        .then((res) => {
          ToastSuccess("User Profile updated Successfully");
          onClose(true);
          fetchData();
        })
        .catch((err) => {
          ToastError("Error while Updating User Profile: ", err.message);
        })
        .finally(() => {
          setTimeout(() => {
            setLoadingState(false);
          }, 1000);
        });
      // formik.resetForm();
    },
  });

  // console.log("User image: ", userData?.image_url);

  return (
    <>
      <div className="bg-gray-100 px-6 py-8 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
        <Toaster richColors />
        <div className="space-y-12">
          <div className="">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base/7 font-semibold text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                 Please use correct information.
                </p>
              </div>
              {!isEditing && (
                <PencilSquareIcon
                  className="block h-6 w-6 text-lime-600 hover:text-lime-700"
                  aria-hidden="true"
                  onClick={() => toggleEdit()}
                />
              )}
            </div>
            {isEditing ? (
              <form onSubmit={formik.handleSubmit}>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
                  <div className="col-span-full">
                    <div
                      className="relative w-32 h-32 rounded-full overflow-hidden "
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                    >
                      {userData?.image_url ? (
                        loadingUserProfile ? (
                          <div>
                            {" "}
                            <Circles
                              color="#FF7B00"
                              visible={true}
                              ariaLabel="falling-circles-loading"
                              width="full"
                              height="90"
                            />
                          </div>
                        ) : (
                          <img
                            src={functions.imageUrlGenerator(
                              userData?.image_url
                            )}
                            alt="Profile Image"
                            className="w-full h-full object-cover"
                          />
                        )
                      ) : (
                        <img
                          alt="Profile Image"
                          src={ImageNotFound}
                          className="size-full object-cover object-center sm:size-full"
                        />
                      )}

                      {/* Hover Effect with Edit Icon */}
                      {hovered && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center cursor-pointer">
                          <label className="text-white flex flex-col items-center cursor-pointer">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.232 5.232l3.536 3.536M9 13.5l2.121-2.121a1.5 1.5 0 112.122 2.121L9 13.5zm3 3l6-6a2.121 2.121 0 00-3-3l-6 6v3h3z"
                              />
                            </svg>
                            <span className="text-sm">Edit</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Full name
                    </label>
                    <div className="mt-2">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="email"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-2">
                  {isEditing && (
                    <div>
                      <Button
                        type="button"
                        color="slate"
                        variant="outline"
                        onClick={() => onClose()}
                      >
                        Cancel
                      </Button>{" "}
                      <Button
                        type="submit"
                        color="#4D7C0F"
                        variant="solid"
                        disabled={loadingState}
                        className={'bg-lime-700 text-white hover:bg-lime-600'}
                      >
                        {loadingState ? (
                          <>
                            Updating
                            <span className="ml-2">
                              <FallingLines
                                color="#4D7C0F"
                                width="20"
                                visible={true}
                                ariaLabel="falling-circles-loading"
                              />
                            </span>
                          </>
                        ) : (
                          "Update"
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </form>
            ) : loadingUserProfile ? (
              <UserProfileSkeleton />
            ) : (
              <div>
                <div className="flex border-b border-gray-900/10 pb-6 space-y-2 py-4">
                  <div className="border-gray-200 px-4 py-5 sm:px-6 w-full">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
                      <div className="col-span-full">
                        <div
                          className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300"
                          onMouseEnter={() => setHovered(true)}
                          onMouseLeave={() => setHovered(false)}
                        >
                          {/* Profile Image */}
                          {userData?.image_url ? (
                            <img
                              src={functions.imageUrlGenerator(
                                userData?.image_url
                              )}
                              alt="Profile Image"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <img
                              alt="Profile Image"
                              src={ImageNotFound}
                              className="size-full object-cover object-center sm:size-full"
                            />
                          )}
                        </div>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-900">
                          Full Name
                        </dt>
                        <dd className="mt-1 text-sm text-black">
                          {userData?.name ? userData?.name : "Missing"}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-900">
                          Email Address
                        </dt>
                        <dd className="mt-1 text-sm text-black">
                          {userData?.email ? userData?.email : "Missing"}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            )}
            {role === 2 && (
              <div className="mt-4">
                <h2 className="text-base/7 font-semibold text-gray-900">
                  Credits
                </h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                  Please refer to the information below for details on
                  purchasing credits.
                </p>
                <div className="sm:rounded-lg mt-2">
                  <div className="px-4 py-0 sm:p-2">
                    <h3 className="text-base font-semibold text-gray-900">
                      <span className="bg-gray-200 px-2 py-1 rounded">
                        How to Purchase Credits.
                      </span>
                    </h3>
                  </div>
                </div>
                <div className="text-sm text-gray-900 bg-white px-4 py-4 rounded-md">
                  <ul className="list-disc space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 text-indigo-500">
                        <BanknotesIcon
                          aria-hidden="true"
                          className="size-5 shrink-0 text-orange-500"
                        />
                      </span>
                      1 Credit = 100 PKR.
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-indigo-500">
                        <ArrowsRightLeftIcon
                          aria-hidden="true"
                          className="size-5 shrink-0 text-orange-500"
                        />
                      </span>
                      Books purchasing and selling take place in credits.
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-indigo-500">
                        <CurrencyDollarIcon
                          aria-hidden="true"
                          className="size-5 shrink-0 text-orange-500"
                        />
                      </span>
                      To purchase credits, please click on Purchase Credits
                      button below.
                    </li>
                  </ul>
                </div>
                <div className="flex items-center gap-4">
                  {" "}
                  <div>
                    <label
                      htmlFor="postal-code"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Total Available Credits
                    </label>
                    <div className="mt-2">
                      <input
                        id="postal-code"
                        name="postal-code"
                        type="text"
                        autoComplete="postal-code"
                        value={userData?.credit_value || "0"}
                        disabled
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 bg-gray-200 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mt-6 gap-2">
                      <Button
                        type="button"
                        color="orange"
                        variant="solid"
                        onClick={openPurchaseCreditModalHandler}
                      >
                        <BuildingLibraryIcon
                          className="-ml-0.5 h-5 w-5 mr-1"
                          aria-hidden="true"
                        />
                        Purchase Credits
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <PurchaseCreditModal
          isOpen={openPurchaseCreditModal}
          onClose={closePurchaseCreditModalHandler}
          success={ToastSuccess}
          error={ToastError}
        />
      </div>
    </>
  );
}
