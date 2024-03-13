import React, { useEffect } from 'react';
import JXG from 'jsxgraph';

import { useSelector } from 'react-redux';
import { State } from '../../redux/store';
import { CalcService } from '../../services/CalcService';

export function MAC() {
  const objectsData = useSelector((state: State) => state.objectsData);
  const basicData = useSelector((state: State) => state.basicData);

  const calcService = new CalcService();

  useEffect(() => {
    const point = {
      x: calcService.meanAerodynamicChord(basicData, objectsData.cargoList),
      y:
        calcService.totalAircraftWeight(basicData, objectsData.cargoList) /
        1000,
    };

    const board = JXG.JSXGraph.initBoard('jxgbox3', {
      boundingbox: [13.5, 180, 32, 70],
      grid: true,
      axis: true,
      showNavigation: false,
    });

    board.create(
      'axis',
      [
        [14, 75],
        [32, 75],
      ],
      { ticks: { visible: true, frequency: 1 } }
    );
    board.create(
      'axis',
      [
        [14, 75],
        [14, 180],
      ],
      { ticks: { visible: true } }
    );

    board.create(
      'polygon',
      [
        [14, 76],
        [15, 76],
        [15, 101.5],
        [18.4, 118.5],
        [25.2, 175],
        [25.2, 175],
        [30, 175],
        [30, 115],
        [25.8, 76],
        [31.5, 76],
        [31.5, 180],
        [14, 180],
      ],
      {
        fillColor: 'white',
        fillOpacity: 0.5,
        borders: { strokeWidth: 1.25, strokeColor: 'black' },
        vertices: { visible: false },
        highlightFillColor: 'white',
        highlightStrokeColor: 'black',
        highlight: false,
        highlightFillOpacity: 0.5,
        tabindex: null,
      }
    );
    board.create(
      'polygon',
      [
        [18.4, 118.5],
        [25.2, 175],
        [26.8, 175],
        [20.4, 125],
        [18.8, 120],
      ],
      {
        fillColor: 'white',
        fillOpacity: 0.5,
        borders: { strokeWidth: 1.25, strokeColor: 'black' },
        vertices: { visible: false },
        highlightFillColor: 'white',
        highlightStrokeColor: 'black',
        highlight: false,
        highlightFillOpacity: 0.5,
        tabindex: null,
      }
    );
    board.create(
      'polygon',
      [
        [29.2, 175],
        [30, 175],
        [30, 130],
        [29.2, 133],
      ],
      {
        fillColor: 'white',
        fillOpacity: 0.5,
        borders: { strokeWidth: 1.25, strokeColor: 'black' },
        vertices: { visible: false },
        highlightFillColor: 'white',
        highlightStrokeColor: 'black',
        highlight: false,
        highlightFillOpacity: 0.5,
        tabindex: null,
      }
    );
    board.create(
      'polygon',
      [
        [15, 76],
        [15, 101.5],
        [18.4, 118.5],
        [18.8, 120],
        [20.4, 125],
        [26.8, 175],
        [29.2, 175],
        [29.2, 133],
        [30, 130],
        [30, 115],
        [25.8, 76],
      ],
      {
        fillColor: 'white',
        fillOpacity: 0.5,
        borders: { strokeWidth: 1.25, strokeColor: 'black' },
        vertices: { visible: false },
        highlightFillColor: 'white',
        highlightStrokeColor: 'black',
        highlight: false,
        highlightFillOpacity: 0.5,
        tabindex: null,
      }
    );

    board.create('point', [point.x, point.y], {
      name: 'Point',
      size: 3,
      fixed: true,
    });

    const text_x_axis = board.create(
      'text',
      [35, 105, 'total fuel - 1,000 lbs'],
      { fontSize: 12, anchorY: 'middle' }
    );
    text_x_axis.setPosition(JXG.COORDS_BY_USER, [35, 72]);

    const text_y_axis = board.create(
      'text',
      [-3, 105, 'basic weight + cargo weight - 1,000 lbs'],
      { display: 'internal', rotate: 90, anchorX: 'middle', anchorY: 'bottom' }
    );
    text_y_axis.setPosition(JXG.COORDS_BY_USER, [-1, 105]);
  }, [basicData, objectsData]);

  return (
    <div className='bigwrapper'>
      <div className='wrapper'>
        <div className='content'>
          <h2 className='title'>Center Of Gravity Limitation By %MAC</h2>
          <div id='jxgbox3' style={{ width: '300px', height: '300px' }} />
          <p className='subtitle'>CG Location - % MAC</p>
        </div>
        <div className='titleWrapper'>
          <p className='tiltedText'>AIRPLANE GROSS WEIGHT - 1,000 POUNDS</p>
        </div>
      </div>
    </div>
  );
}

export default MAC;
