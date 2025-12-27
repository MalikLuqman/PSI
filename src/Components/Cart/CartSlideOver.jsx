import {
  Fragment,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { useDropdownContext } from "../../DropdownProvider/DropdownProvider";
import {
  XMarkIcon,
  Bars3Icon,
  ShoppingCartOutlinedIcon,
  ImportContactsOutlinedIcon,
  LocalShippingOutlinedIcon,
  TrashIcon,
} from "../../utils/icons";

function CartSlideOver({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onCheckout,
}) {
  const formik = useFormik({
    initialValues: {},
    validationSchema: Yup.object({}),
    handleChange: (event) => {},
    onSubmit: async (values) => {},
  });

  // console.log("Cart data: ", cartItems);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-gray-100 py-6 shadow-xl">
                    {/* Header */}
                    <div className="px-4">
                      <div className="flex items-center justify-between bg-gray-800 h-12 px-3 rounded-md">
                        <Dialog.Title className="text-base font-semibold text-white">
                          Shopping Cart
                        </Dialog.Title>
                        <button
                          type="button"
                          onClick={() => onClose(false)}
                          className="text-white hover:scale-110 transition transform duration-200"
                        >
                          <XMarkIcon className="h-6 w-6" />
                        </button>
                      </div>
                    </div>

                    {/* Cart Items */}
                    <div className="relative mt-8 px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Your Items
                      </h2>
                      <ul className="mt-4 divide-y divide-gray-200">
                        {cartItems &&
                          cartItems?.map((item, index) => (
                            <li
                              key={index}
                              className="py-4 px-4 m-2 flex justify-between items-center rounded-md bg-gray-200"
                            >
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {item?.name ? item?.name : "Missing"}
                                </p>
                                <p className="text-sm font-medium text-gray-900">
                                  {item?.price}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {item?.condition}
                                </p>
                              </div>
                              <div className="flex items-center">
                                <p className="text-sm font-medium text-gray-900 mr-4">
                                  {/* ${item.price.toFixed(2)} */}
                                </p>
                                <TrashIcon
                                  className="block h-5 w-5 text-red-500 hover:text-orange-800"
                                  aria-hidden="true"
                                />
                              </div>
                            </li>
                          ))}
                      </ul>

                      {/* Total */}
                      <div className="mt-6 border-t border-gray-200 pt-4">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Total</p>
                          {/* <p>${total.toFixed(2)}</p> */}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-8 flex justify-between">
                        <button
                          onClick={onClose}
                          className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700"
                        >
                          Continue Shopping
                        </button>
                        <button
                          onClick={onCheckout}
                          className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-400"
                        >
                          Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default forwardRef(CartSlideOver);
