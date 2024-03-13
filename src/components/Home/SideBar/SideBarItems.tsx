import React, { useContext, useState } from 'react';
import {
  FaCaretDown,
  FaTrash,
  FaPlaneDeparture,
  FaChartLine,
  FaFileExport,
} from 'react-icons/fa';
import { GiCargoCrate } from 'react-icons/gi';
import { addItem, deleteAll } from '../../../redux/ObjectsDataSlice';
import randomColor from 'randomcolor';
import { v4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { openPopup, closePopup } from '../../../redux/PopupSlice';
import { BasicDataForm, basicDataId } from '../BasicData/BasicDataForm';
import UnitsService from '../../../services/UnitsService';
import { State } from '../../../redux/store';
import { Cargo } from '../../../models/ObjectItem';
import SiderBarItem from './SiderBarItem';
import { PopupComponent } from '../ViewComponents';
import DropDown from './DropDown';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import { CanvasCTX } from '../Grid/CanvasContext';
import { fabric } from 'fabric';
import filePath from '../../../assets/excelSheet/excelSheet.xlsx';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { routeConstants } from '../../../routes/constants';

const SideBarItems = () => {
  const objectListItems = useSelector((state: State) => state.objectsData);
  const basicData = useSelector((state: State) => state.basicData);
  const generalData = useSelector((state: State) => state.generalData);
  const grid = useContext(CanvasCTX).canvas;
  const unitsService = new UnitsService();
  const [jsonData] = useState({
    name: 'Yuval',
    age: '19',
  } as { [x: string]: string; name: string; age: string });
  const [showDropDown, setShowDropDown] = useState(false);

  const dispatch = useDispatch();

  const dispatchOpenPopup = (id: string) => {
    dispatch(openPopup(id));
  };

  const dispatchClosePopup = (id: string) => {
    dispatch(closePopup(id));
  };

  const addItemToObjectList = (item: Cargo) => {
    dispatch(addItem(item));
  };

  const dispatchDeleteAll = () => {
    grid?.remove(...grid?.getObjects());
    dispatch(deleteAll());
  };

  const addRectangle = () => {
    let color = randomColor();
    const id = v4();
    addItemToObjectList({
      type: 'Object',
      name: '',
      id: id,
      weight: 0,
      fs: 0,
      width: unitsService.ONE_UNIT_IN_INCHES,
      length: unitsService.ONE_UNIT_IN_INCHES,
      index: 0,
      fill: color,
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      centerOfGravity: {
        x: 10,
        y: 10,
      },
    });

    if (grid) {
      const oneUnitInPixels = unitsService.oneUnitInPixels(grid.width!);
      const startingPosition = unitsService.startingPosition(
        grid.width!,
        grid.height!
      );

      const cargo = new fabric.Rect({
        name: id,
        strokeWidth: 0,
        width: oneUnitInPixels,
        height: oneUnitInPixels,
        scaleX: 1,
        scaleY: 1,
        fill: color,
        ...startingPosition,
      });

      grid.add(cargo);
      grid.setActiveObject(cargo);
    }
  };

  const togglePopup = () => {
    fillExcelWithData();
    if (true) {
      Swal.fire({
        icon: 'success',
        title: 'כל הכבוד עכשיו אפשר לייצא קובץ pdf',
        text: `${generalData.fuel}${' '}${generalData.MAC}{" "}${
          generalData.MACRange
        }{" "}${generalData.ZFW}{" "}${generalData.fuel}{" "}${
          generalData.areaGraph
        }{" "}${generalData.index}{"inside the objectListItems"}${
          objectListItems.cargoList[0]?.fill
        }{" "}${generalData.fuel}{" "}${generalData.fuel}{" "}${
          generalData.fuel
        }{" "}${basicData}`,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'המתמטיקה שלך לא משהו חשבת להשלים בגרויות?',
        text: 'ניסית אולי בני גורן?',
      });
    }
  };
  function fillExcelWithData() {
    const workbook = new ExcelJS.Workbook();

    fetch(filePath)
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const uint8Array = new Uint8Array(buffer);
        return workbook.xlsx.load(uint8Array);
      })
      .then(() => {
        workbook.eachSheet((worksheet) => {
          worksheet.eachRow((row) => {
            row.eachCell((cell) => {
              if (cell.value && typeof cell.value === 'string') {
                const matches = cell.value.match(/\{(.+?)\}/g);
                if (matches) {
                  matches.forEach((match) => {
                    const field = match.substring(1, match.length - 1);
                    if (jsonData[field]) {
                      cell.value = `${cell.value}`.replace(
                        match,
                        jsonData[field]
                      );
                    }
                  });
                }
              }
            });
          });
        });

        return workbook.xlsx.writeBuffer();
      })
      .then((buffer) => {
        const blob = new Blob([buffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        saveAs(blob, 'data.xlsx');
      })
      .catch((error) => {
        console.error('Error reading the Excel file:', error);
      });
  }

  return (
    <div className='min-h-full flex flex-col justify-between'>
      <div className='flex flex-col gap-5'>
        <div className='flex'>
          <div className='flex items-center gap-3 '>
            <h2 className='text-xl font-bold text-[#000000]'>Cargo Planner</h2>
          </div>
        </div>
        <hr className='border-[#000000]' />
        <div onClick={addRectangle}>
          <SiderBarItem Icon={GiCargoCrate} buttonText='New Cargo' />
        </div>
        <div onClick={dispatchDeleteAll}>
          <SiderBarItem Icon={FaTrash} buttonText='Erase All' />
        </div>
        <div
          onClick={() => {
            dispatchOpenPopup(basicDataId);
          }}
        >
          <SiderBarItem Icon={FaPlaneDeparture} buttonText='Basic Data' />
        </div>
        {
          <PopupComponent popupId={basicDataId} width='auto' height='auto'>
            <BasicDataForm close={dispatchClosePopup} />
          </PopupComponent>
        }

        <Link to={routeConstants.GraphsRoute}>
          <div>
            <SiderBarItem Icon={FaChartLine} buttonText='Show Graphs' />
          </div>
        </Link>

        <div onClick={togglePopup}>
          <SiderBarItem Icon={FaFileExport} buttonText='Export To Loadsheet' />
        </div>
        <hr className='border-[#000000]' />
        <div onClick={() => setShowDropDown((prev) => !prev)}>
          <SiderBarItem Icon={FaCaretDown} buttonText='Existing Objects' />
        </div>
        {showDropDown && <DropDown />}
      </div>
      <div className='flex flex-row text-white'>
        <SettingsIcon className='spinningSettingsIcons cursor-pointer' />
      </div>
    </div>
  );
};

const SideBarItemsWithforwardedRef = React.forwardRef(SideBarItems);
export default SideBarItemsWithforwardedRef;
