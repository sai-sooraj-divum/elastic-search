import React from 'react';
import { TOAST_TYPE_CONSTANTS } from '../../constants/app-constants';

const Toaster = (props) => {
  const {
    toastType, toastText, closeToast, className,timeout = 3000
  } = props;
  setTimeout(() => { closeToast(); }, timeout);

  return (
    <>
      <span className={`toaster
      ${toastType === TOAST_TYPE_CONSTANTS.SUCCESS && `toaster__success`}
      ${toastType === TOAST_TYPE_CONSTANTS.ERROR && `toaster__error`} ${className}`}
      >
        {toastText}
      </span>
    </>
  );
};

export default Toaster;
