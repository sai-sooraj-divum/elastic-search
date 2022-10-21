import React from 'react';
import './index.scss';

const Loader = (props) => {
  const { isSmallLoader, className, isLargeLoader } = props;

  return (
    <div
      className={`${'loaderWrapper'} ${
        !isSmallLoader && 'loaderWrapperHeight'
      } ${className}`}
    >
      <div
        className={`${'loaderWrapper__loader'} ${
          isSmallLoader && 'loaderWrapper__smallLoader'
        } ${isLargeLoader && 'loaderWrapper__largeLoader'} `}
      />
    </div>
  );
};

export default Loader;
