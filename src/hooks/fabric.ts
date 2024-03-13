import { useCallback, useContext, useRef } from 'react';
import { fabric } from 'fabric';
import { CanvasCTX } from '../components/Home/Grid/CanvasContext';

export const useFabric = () => {
  const canvas = useRef<fabric.Canvas>();
  const { setCanvas } = useContext(CanvasCTX);

  const fabricRef = useCallback((element: HTMLCanvasElement | null) => {
    if (!element) return canvas.current?.dispose();

    canvas.current = new fabric.Canvas(element, {
      height: document.getElementById('gridContainer')?.offsetHeight,
      width: document.getElementById('gridContainer')?.offsetWidth,
      selection: false,
      renderOnAddRemove: true,
    });
    setCanvas(canvas.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return fabricRef;
};
