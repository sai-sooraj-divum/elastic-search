import React, { useState } from 'react';
import { uploadFileAPI } from '../../actions/upload/action';
import Toaster from '../toaster';
import './index.scss';

export const Upload = () => {

  const [isShowToaster, setIsShowToaster] = useState(false);
  const [toastData, setToastData] = useState({ 
    toastType: '', 
    toastText: '' 
  });

  const handleUploadFileFunc = (event) => {
    debugger;

    const file = event.target.files[0];
    let formData = new FormData();
    formData.append('file', file);

    uploadFileAPI((res) => {
      // setIsShowToaster(true);
      setToastData({
        toastType: 'success',
        toastText: res.response
      })
    }, formData)
  }

  return (
    <div className='upload'>
      <p className='upload__phrase'>Upload a file !</p>
      <div className='upload__subDiv'>
        <input 
          type="file" 
          accept='.pdf, .xlsx'
          className='upload__file'
          onChange={(e) => handleUploadFileFunc(e)}
        />
        {/* {isShowToaster && 
          <Toaster 
            toastType={toastData.toastType}
            toastText={toastData.toastText}
            closeToast={() => setIsShowToaster(false)}
          />
        } */}
      </div>
    </div>
  )
}
