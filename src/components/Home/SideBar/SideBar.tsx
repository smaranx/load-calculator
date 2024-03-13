import React, { Fragment } from 'react';
import SideBarItems from './SideBarItems';

const SideBar = () => {
  return (
    <Fragment>
      <div className='flex flex-col items-center justify-center h-screen w-1/6 bg-[#f9d63a]'>
        <SideBarItems />
      </div>
    </Fragment>
  );
};

const SideBarWithforwardedRef = React.forwardRef(SideBar);
export default SideBarWithforwardedRef;
