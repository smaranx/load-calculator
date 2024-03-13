import React, { useEffect } from 'react';
import JXG from 'jsxgraph';
import './Graphs.css';

import { useSelector } from 'react-redux';
import { State } from '../../redux/store';
import { CalcService } from '../../services/CalcService';

export function Primary() {
  const objectsData = useSelector((state: State) => state.objectsData);
  const basicData = useSelector((state: State) => state.basicData);

  const calcService = new CalcService();

  useEffect(() => {
    const point = {
      x: calcService.fuelWeightForFlight(basicData) / 1000,
      y: calcService.zeroFuelWeight(basicData, objectsData.cargoList) / 1000,
    };
    const board = JXG.JSXGraph.initBoard('jxgbox1', {
      boundingbox: [-5, 137, 71, 68],
      grid: true,
      axis: true,
      showNavigation: false,
    });

    board.create(
      'axis',
      [
        [0, 70],
        [68, 70],
      ],
      { ticks: { visible: true } }
    );

    board.create(
      'polygon',
      [
        [0, 70],
        [0, 98],
        [3, 98],
        [15, 112],
        [34, 120],
        [45, 108],
        [55, 100],
        [65, 90],
        [65, 70],
      ],
      {
        fillColor: 'green',
        fillOpacity: 0.5,
        borders: { strokeWidth: 0 },
        vertices: { visible: false },
        highlightFillColor: 'green',
        highlightFillOpacity: 0.5,
        tabindex: null,
      }
    );
    board.create(
      'polygon',
      [
        [0, 98],
        [0, 110],
        [2, 108],
        [25, 130],
        [35, 120],
        [65, 90],
        [55, 100],
        [45, 108],
        [34, 120],
        [15, 112],
        [3, 98],
      ],
      {
        fillColor: 'blue',
        fillOpacity: 0.5,
        borders: { strokeWidth: 0 },
        vertices: { visible: false },
        highlightFillColor: 'blue',
        highlightFillOpacity: 0.5,
        tabindex: null,
      }
    );
    board.create(
      'polygon',
      [
        [25, 130],
        [44, 130],
        [65, 110],
        [65, 90],
      ],
      {
        fillColor: 'yellow',
        fillOpacity: 0.5,
        borders: { strokeWidth: 0 },
        vertices: { visible: false },
        highlightFillColor: 'yellow',
        highlightFillOpacity: 0.5,
        tabindex: null,
      }
    );
    board.create(
      'polygon',
      [
        [0, 119],
        [0, 135],
        [68, 135],
        [68, 70],
        [65, 70],
        [65, 110],
        [44, 130],
        [25, 130],
        [10, 125],
        [2, 119],
      ],
      {
        name: 'area red',
        fillColor: 'red',
        fillOpacity: 0.5,
        borders: { strokeWidth: 0 },
        vertices: { visible: false },
        highlightFillColor: 'red',
        highlightFillOpacity: 0.5,
        tabindex: null,
      }
    );

    board.create('point', [point.x, point.y], {
      fixed: true,
      name: 'Point',
      size: 3,
    });
  }, []);

  return (
    <div className='bigwrapper'>
      <div className='wrapper'>
        <div className='content'>
          <h2 className='title'>Weight Limitation Chart (Primary)</h2>
          <div id='jxgbox1' style={{ width: '400px', height: '400px' }} />
          <p className='subtitle'>total Fuel - 1,000 Lbs</p>
        </div>
        <div className='titleWrapper'>
          <p className='tiltedText'>Basic Weight + cargo Weight - 1,000 Lbs</p>
        </div>
      </div>
    </div>
  );
}

export default Primary;
