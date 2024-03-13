import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { routeConstants } from '../../routes/constants';
import { motion } from 'framer-motion';

const OptionWrapper = ({ name, img }: { name: string; img: string }) => {
  return (
    <Fragment>
      <Link to={routeConstants.homeRoute}>
        <motion.div
          className='flex flex-col rounded-2xl bg-[#6C614B] p-2 cursor-pointer'
          whileHover={{ scale: 1.1 }}
          transition={{ transition: { duration: 1 } }}
        >
          <img
            className='rounded-2xl h-40 2xl:h-60 object-contain m-0 p-0'
            src={img}
            alt='img'
          />
          <h1 className='justify-self-center font-bold text-2xl '>{name}</h1>
        </motion.div>
      </Link>
    </Fragment>
  );
};

export default OptionWrapper;
