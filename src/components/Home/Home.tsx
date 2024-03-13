import React, { useState } from 'react';
import SideBar from './SideBar/SideBar';
import { Grid } from './Grid/Grid';
import MAC from '../Graphs/MAC';
import { fabric } from 'fabric';
import { CanvasCTX } from './Grid/CanvasContext';
import { ObjectView } from './dataDisplay/ObjectView';

const Home = () => {
  const [canvasRef, setCanvasRef] = useState<fabric.Canvas>();
  const setCanvas = (canvas: fabric.Canvas) => {
    setCanvasRef(canvas);
  };

  return (
    <CanvasCTX.Provider
      value={{
        canvas: canvasRef,
        setCanvas,
      }}
    >
      <div>
        <div className='bg-[#fafafa] flex flex-row'>
          <SideBar />
          <div className='w-4/6'>
            <Grid />
            <div className='flex flex-row'>
              <MAC />
              <ObjectView />
            </div>
          </div>
          <div className='w-1/6 bg-[#303030]'></div>
        </div>
      </div>
    </CanvasCTX.Provider>
  );
};

const HomeWithforwardedRef = React.forwardRef(Home);
export default HomeWithforwardedRef;
