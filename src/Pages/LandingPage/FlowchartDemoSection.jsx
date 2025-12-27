import React from "react";
import { Stepper, Step } from "react-form-stepper";

export const FlowchartDemoSection = () => {
  return (
    <section className="py-12 bg-gray-300">
      <div className=" mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Book Portal Workflow Overview
        </h2>
        <p className="text-lg text-gray-600 text-center mb-6">
          Follow the steps below to understand the different stages of Book
          Portal workflow.
        </p>

        {/* Stepper Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Stepper 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-center font-semibold">
              Purchase Credits for Book Purchasing
            </h1>
            <div className="overflow-x-auto">
              <Stepper
                activeStep={5}
                styleConfig={{
                  activeBgColor: "#008000",
                  completedBgColor: "#FF7B00",
                  inactiveBgColor: "#E2E8F0",
                  activeTextColor: "#FFF",
                  completedTextColor: "#FFF",
                  inactiveTextColor: "#4A5568",
                }}
              >
                <Step label="Sign up" />
                <Step label="Login" />
                <Step label="Go to Profile" />
                <Step label="Click Purchase Credits" />
                <Step label="Enter amount & Transfer the amount online" />
                <Step label="Wait for approval" />
              </Stepper>
            </div>
          </div>

          {/* Stepper 2 */}
          <div className="bg-orange-100 p-6 rounded-lg shadow-lg">
            <h1 className="text-center font-semibold">Book Purchase</h1>
            <div className="overflow-x-auto">
              <Stepper
                activeStep={5}
                styleConfig={{
                  activeBgColor: "#008000",
                  completedBgColor: "#FF7B00",
                  inactiveBgColor: "#E2E8F0",
                  activeTextColor: "#FFF",
                  completedTextColor: "#FFF",
                  inactiveTextColor: "#4A5568",
                }}
              >
                <Step label="Login" />
                <Step label="Go to Shop" />
                <Step label="Select a Book" />
                <Step label="Click Purchase" />
                <Step label="Provide Address" />
                <Step label="Check Order Status" />
              </Stepper>
            </div>
          </div>

          {/* Stepper 3 */}
          <div className="bg-orange-100 p-6 rounded-lg shadow-lg">
            <h1 className="text-center font-semibold">Sell a Book</h1>
            <div className="overflow-x-auto">
              <Stepper
                activeStep={5}
                styleConfig={{
                  activeBgColor: "#008000",
                  completedBgColor: "#FF7B00",
                  inactiveBgColor: "#E2E8F0",
                  activeTextColor: "#FFF",
                  completedTextColor: "#FFF",
                  inactiveTextColor: "#4A5568",
                }}
              >
                <Step label="Login" />
                <Step label="Go to Books tab" />
                <Step label="Click Add Book" />
                <Step label="Upload Book Image" />
                <Step label="Dispatch the Book" />
                <Step label="Wait for Approval" />
              </Stepper>
            </div>
          </div>

          {/* Stepper 4 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-center font-semibold">Transactions Status</h1>
            <div className="overflow-x-auto">
              <Stepper
                activeStep={3}
                styleConfig={{
                  activeBgColor: "#008000",
                  completedBgColor: "#FF7B00",
                  inactiveBgColor: "#E2E8F0",
                  activeTextColor: "#FFF",
                  completedTextColor: "#FFF",
                  inactiveTextColor: "#4A5568",
                }}
              >
                <Step label="Login" />
                <Step label="Go to Transactions" />
                <Step label="Check Status" />
                <Step label="View Receipt" />
              </Stepper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
