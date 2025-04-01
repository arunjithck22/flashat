/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReactDOM from "react-dom";

interface ConfirmationAlertProps {
  confirmDelete: any;
  setConfirmDelete: (confirmDelete: boolean) => void;
  onOk: () => void;
  isManager?: boolean;
  huddleName?: any;
  promptMessage?: any;
  title: any;
  showCheckbox?: boolean;
  checkboxLabel?: string;
  isCheckboxChecked?: boolean;
  handleCheckboxChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ConfirmationAlert: React.FC<ConfirmationAlertProps> = ({
  confirmDelete,
  setConfirmDelete,
  onOk,
  promptMessage,
  title,
  showCheckbox,
  checkboxLabel,
  isCheckboxChecked,
  handleCheckboxChange,
}) => {
  if (!confirmDelete) return null;

  const modalContent = (
    <>
      <div className="fixed inset-0  bg-black z-50 opacity-50 "></div>
      <div className="fixed inset-0 flex items-center justify-center  z-[2147483647]">
        <div className="p-4 w-full max-w-md md:h-auto">
          <div className="relative p-4 bg-white shadow-lg text-center bg-bgray rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <header>
              <h1 className="font-bold text-lg mb-3">{title}</h1>
            </header>
            <p className="mb-4 dark:text-gray-300">{promptMessage}</p>
            {showCheckbox && (
              <div className="mb-4 flex justify-center items-center space-x-2">
                <input
                  type="checkbox"
                  id="confirmationCheckbox"
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                  checked={isCheckboxChecked}
                  onChange={handleCheckboxChange}
                />
                <label
                  htmlFor="confirmationCheckbox"
                  className="text-sm text-gray-500 dark:text-gray-300"
                >
                  {checkboxLabel}
                </label>
              </div>
            )}
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={() => setConfirmDelete(false)}
                type="button"
                className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                CANCEL
              </button>
              <button
                onClick={() => {
                  onOk();
                  setConfirmDelete(false);
                }}
                type="submit"
                className="py-2 px-3 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default ConfirmationAlert;
