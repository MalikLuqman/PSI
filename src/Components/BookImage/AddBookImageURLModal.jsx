import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  PlusCircleIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { FallingLines, InfinitySpin } from "react-loader-spinner";
import { Button } from "../common/Button";
import { useState } from "react";
import { useDropdownContext } from "../../DropdownProvider/DropdownProvider";
import axiosInstance from "../../api/axiosinstance";
const AddBookImageURLModal = ({ isOpen, onClose, data, success, error }) => {
  const dropDownValues = useDropdownContext();
  const [loadingState, setLoadingState] = useState(false);
  const [file, setFile] = useState();
  // const [selectedImage, setSelectedImage] = useState(null);
  // const [images, setImages] = useState([{ image_url: "" }]);

  const StartLoading = () => {
    setLoadingState(true);
  };
  const EndLoading = () => {
    setLoadingState(false);
  };
  const formData = new FormData();

  const formik = useFormik({
    initialValues: {
      book_id: data?.id,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({}),
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
      // for (const pair of formData.entries()) {
      //   console.log(pair[0], pair[1]);
      // }

      await axiosInstance
        .post(`/api/bookimage/store`, formData)
        .then((res) => {
          success("Book Image Uploaded Successfully");
        })
        .catch((err) => {
          error("Error in Uplaoding bokk image", err);
        })
        .finally(() => {
          setTimeout(() => {
            EndLoading();
          }, 1000);
        });
      formik.resetForm();
      onClose();
    },
  });
  // Add a new image row
  const addImage = () => {
    setImages([...images, { image_url: "" }]);
  };

  // Remove a image row
  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];

    // Check for file size (e.g., limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should not exceed 5MB.");
      return;
    }

    // Check for image file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    const updatedImages = [...images];
    updatedImages[index].image_url = file; // Store the actual file object
    setImages(updatedImages);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => onClose(false)}
      className="relative z-10"
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75" />
      <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
        <DialogPanel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl sm:w-full sm:max-w-3xl sm:p-6">
          {/* <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div> */}
          <div className="rounded-md bg-gray-800 h-12 flex items-center justify-center">
            <h2 className="text-center text-2xl tracking-widest leading-7 text-[#FFFBF5] sm:truncate sm:text-xl sm:tracking-tight">
              Upload Book Image
            </h2>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
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
                  required
                />
              </div>
            </div>
            <div className="mt-8 flex items-center justify-end gap-x-4">
              <Button
                type="button"
                color="slate"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                color="orange"
                variant="solid"
                disabled={loadingState}
              >
                {loadingState ? "Uploading..." : "Upload"}
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
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default AddBookImageURLModal;
