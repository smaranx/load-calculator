import React from 'react';
import { IconType } from 'react-icons/lib';

interface SideBarItemProps {
  Icon: IconType;
  buttonText: string;
}

const SideBarItem = ({ Icon, buttonText }: SideBarItemProps) => {
  return (
    <div className='flex justify-start gap-2 items-center truncate hover:bg-white cursor-pointer text-[#000000]'>
      <button className='text-lg font-bold'>{buttonText}</button>
      <Icon size={18} className='' />
    </div>
  );
};

export default SideBarItem;
