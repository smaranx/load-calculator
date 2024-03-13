import React from 'react';
import { useSelector } from 'react-redux';
import { Cargo } from '../../../models/ObjectItem';
import { State } from '../../../redux/store';

const ObjectList = () => {
  const itemList = useSelector((state: State) => state.objectsData.cargoList);

  return (
    <div className='flex content-center bg-[#f7f7f7] absolute right-0 bottom-0 w-[25vw] h-[50vh]'>
      <div className='flex flex-col bg-[#fffae1] w-full rounded-tl-lg  overflow-hidden'>
        <h1 className='text-[#000000] text-2xl font-bold text-center my-2'>
          Objects
        </h1>
        <div className='flex flex-col mt-2 h-5/6'>
          <div className='flex mb-2 text-center'>
            <p className='w-1/5 text-[#000000] font-semibold'>ID</p>
            <p className='w-1/5 text-[#000000] font-semibold'>Name</p>
            <p className='w-1/5 text-[#000000] font-semibold'>Weight</p>
            <p className='w-1/5 text-[#000000] font-semibold'>FS</p>
            <p className='w-1/5 text-[#000000] font-semibold'>cell</p>
          </div>
          <div className='flex flex-col text-right py-3 rounded-b-lg overflow-auto h-full hide-scroll-bar'>
            {itemList?.map((item: Cargo, index: number) => (
              <div key={index} className='flex flex-col'>
                <div className='flex mb-2'>
                  {/* onClick={setPopUp} What is this? */}
                  <p className='w-1/5 my-auto text-center cursor-pointer text-[#000000] font-medium'>
                    {index}
                  </p>
                  <p className='w-1/5 my-auto text-center text-[#000000] font-medium'>
                    {item.type}
                  </p>
                  <input
                    name='item'
                    className='w-1/5 bg-[#ffffff] text-center text-[#000000] pl-[10px] border-[#424242] border rounded'
                    placeholder={`${item.weight}`}
                    type='number'
                    min='0'
                  />
                  <input
                    className='w-1/5 bg-[#ffffff] text-center text-[#000000] pl-[10px] border-[#424242] border rounded'
                    placeholder={`${item.fs}`}
                    type='number'
                    min='0'
                  />
                  <p className='w-1/5 my-auto text-center text-[#000000] font-medium'>
                    {index}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ObjectListWithforwardedRef = React.forwardRef(ObjectList);
export default ObjectListWithforwardedRef;
