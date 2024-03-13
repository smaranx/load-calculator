import React, { useEffect } from 'react';
import JXG from 'jsxgraph';
import './Graphs.css';
import { useSelector } from 'react-redux';
import { State } from '../../redux/store';
import { CalcService } from '../../services/CalcService';

function Secondary() {
  const objectsData = useSelector((state: State) => state.objectsData);
  const basicData = useSelector((state: State) => state.basicData);

  const calcService = new CalcService();

  useEffect(() => {
    const point = {
      x: calcService.zeroFuelWeight(basicData, objectsData.cargoList),
      y: calcService.fuelWeightForFlight(basicData),
    };

    const board = JXG.JSXGraph.initBoard('jxgbox2', {
      boundingbox: [-5, 162, 36, 87],
      grid: true,
      axis: true,
      showNavigation: false,
    });

    board.create(
      'axis',
      [
        [0, 90],
        [36, 90],
      ],
      { ticks: { visible: true } }
    );

    board.create(
      'polygon',
      [
        [0, 90],
        [0, 99],
        [13, 124],
        [33, 153],
        [33, 90],
      ],
      {
        name: 'green',
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
        [0, 99],
        [13, 124],
        [33, 153],
        [33, 155],
        [25, 155],
        [2, 112],
        [0, 110],
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
        [0, 118],
        [0, 160],
        [35, 160],
        [35, 90],
        [33, 90],
        [33, 155],
        [25, 155],
      ],
      {
        fillColor: 'red',
        fillOpacity: 0.5,
        borders: { strokeWidth: 0 },
        vertices: { visible: false },
        highlightFillColor: 'red',
        highlightFillOpacity: 0.5,
        tabindex: null,
      }
    );

    // console.log(`point Secondary: (${point.x}, ${point.y})`)
    board.create('point', [point.x, point.y], {
      name: 'Point',
      size: 3,
      fixed: true,
    });

    const areaA = board.create('text', [20, 100, 'AREA A'], {
      fontSize: 12,
      anchorX: 'left',
      anchorY: 'bottom',
    });
    areaA.setPosition(JXG.COORDS_BY_USER, [0, 92]);
  }, []);

  return (
    <div className='bigwrapper'>
      <div className='wrapper'>
        <div className='content'>
          <h2 className='title'>Weight Limitation Chart (Secondary)</h2>
          <div id='jxgbox2' style={{ width: '250px', height: '480px' }} />
          <p className='subtitle'>Outboard Fuel + Inbord Fuel - 1,000 Lbs</p>
        </div>
        <div className='titleWrapper'>
          <p className='tiltedText'>Gross Weight - 1,000 Lbs</p>
        </div>
      </div>
    </div>
  );
}

export default Secondary;
