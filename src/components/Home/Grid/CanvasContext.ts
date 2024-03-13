import { createContext } from 'react';
import { fabric } from 'fabric';

type CanvasContext = {
  canvas: fabric.Canvas | undefined;
  setCanvas: (canvas: fabric.Canvas) => void;
};

export const CanvasCTX = createContext<CanvasContext>({
  canvas: undefined,
  setCanvas: () => {},
});
