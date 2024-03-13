import React, { useState } from 'react';
import {
  CargoContainer,
  CargoInputNumber,
  CargoInputSelect,
  CargoInput,
  labelPositionEnum,
  CargoInputRadio,
} from '../ViewComponents';
import { useDispatch, useSelector } from 'react-redux';
import { updateBasicData } from '../../../redux/BasicDataSlice';
import { State } from '../../../redux/store';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';

type Props = {
  close: (id: string) => void;
};

export const basicDataId = 'BASIC_DATA';

export const BasicDataForm = ({ close }: Props) => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState({
    emptyWeight: '',
    index: '',
    Configuration: '',
    cockpitCrew: '',
    loadmasters: '',
    fuelPod: false,
    outboard: 0,
    inboard: 0,
    Auxiliary: 0,
    external: 0,
  });

  function handleClose() {
    close(basicDataId);
  }

  const dispatchChangeBasicData = (data: { key: string; value: any }): void => {
    dispatch(updateBasicData({ changes: { [data.key]: data.value } }));
  };

  const basicData = useSelector((state: State) => state.basicData);

  const sendBasicData = () => {
    dispatchChangeBasicData({
      key: 'emptyWeight',
      value: formFields.emptyWeight,
    });
    dispatchChangeBasicData({
      key: 'index',
      value: formFields.index,
    });
    dispatchChangeBasicData({
      key: 'Configuration',
      value: formFields.Configuration,
    });
    dispatchChangeBasicData({
      key: 'cockpitCrew',
      value: formFields.cockpitCrew,
    });
    dispatchChangeBasicData({
      key: 'loadmasters',
      value: formFields.loadmasters,
    });
    dispatchChangeBasicData({
      key: 'fuelPod',
      value: formFields.fuelPod,
    });
    dispatchChangeBasicData({
      key: 'outboard',
      value: formFields.outboard,
    });
    dispatchChangeBasicData({
      key: 'inboard',
      value: formFields.inboard,
    });
    dispatchChangeBasicData({
      key: 'Auxiliary',
      value: formFields.Auxiliary,
    });
    dispatchChangeBasicData({
      key: 'external',
      value: formFields.external,
    });

    console.log('form fields are', formFields);
    Swal.fire({
      icon: 'success',
      title: 'הנתונים נשלחו בהצלחה',
    });
  };

  const handleChange = (key: string, newValue: string | boolean | number) => {
    let updatedFormFields = { ...formFields, [key]: newValue };
    setFormFields(updatedFormFields);
  };

  return (
    <CargoContainer close={handleClose}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div className='flex justify-center'>
          <h1 className='text-center text-5xl font-bold'>Basic Data</h1>
        </div>

        <CargoInput
          label='Aircraft:'
          labelPosition={labelPositionEnum.TOP}
          labelSize={1.75}
        >
          <div className='w-3/5'>
            <CargoInputNumber
              placeholder={basicData.emptyWeight}
              label='Empty Weight:'
              onChange={(value) => handleChange('emptyWeight', value)}
              // onChange={(value) =>
              //   dispatchChangeBasicData({ key: 'index', value: value })
              // }
            />
          </div>
          <div className='w-3/5'>
            <CargoInputNumber
              placeholder={basicData.index}
              label='Aircraft Index:'
              onChange={(value) => handleChange('index', value)}
              // onChange={(value) =>
              //   dispatchChangeBasicData({ key: 'index', value: value })
              // }
            />
          </div>
          <div className='w-3/5'>
            <CargoInputSelect
              options={['Option1', 'Option2', 'Option3']}
              label='Configuration:'
              onChange={(value) => handleChange('Configuration', value)}
              // onChange={(value) =>
              //   dispatchChangeBasicData({ key: 'config', value: value })
              // }
            />
          </div>
        </CargoInput>

        <CargoInput
          label='Crew:'
          labelPosition={labelPositionEnum.TOP}
          labelSize={1.75}
        >
          <div className='w-3/5'>
            <CargoInputNumber
              minValue={0}
              placeholder={basicData.cockpitCrew}
              label='Cockpit Crew:'
              onChange={(value) => handleChange('cockpitCrew', value)}

              // onChange={(value) =>
              //   dispatchChangeBasicData({ key: 'cockpitCrew', value: value })
              // }
            />
          </div>
          <div className='w-3/5'>
            <CargoInputNumber
              minValue={0}
              placeholder={basicData.loadmasters}
              label='Loadmasters:'
              onChange={(value) => handleChange('loadmasters', value)}
              // onChange={(value) =>
              //   dispatchChangeBasicData({
              //     key: 'loadmasters',
              //     value: value,
              //   })
              // }
            />
          </div>
        </CargoInput>

        <CargoInput
          label='Fuel Distribution:'
          labelPosition={labelPositionEnum.TOP}
          labelSize={1.75}
        >
          <div className='w-3/5'>
            <CargoInputRadio
              label='Pod/No Pod:'
              onChange={(value) => handleChange('fuelPod', value)}
              // onChange={(value) =>
              //   dispatchChangeBasicData({ key: 'fuelPod', value: value })
              // }
            />
          </div>
          <div className='w-3/5'>
            <CargoInputNumber
              label='Outboard:'
              placeholder={basicData.outboard}
              onChange={(value) => handleChange('outboard', value)}
              // onChange={(value) =>
              //   dispatchChangeBasicData({ key: 'outboard', value: value })
              // }
            />
          </div>
          <div className='w-3/5'>
            <CargoInputNumber
              placeholder={basicData.inboard}
              label='Inboard:'
              onChange={(value) => handleChange('inboard', value)}
              // onChange={(value) =>
              //   dispatchChangeBasicData({ key: 'inboard', value: value })
              // }
            />
          </div>
          <div className='w-3/5'>
            <CargoInputNumber
              label='Auxiliary:'
              placeholder={basicData.auxiliary}
              onChange={(value) => handleChange('auxiliary', value)}
              // onChange={(value) =>
              //   dispatchChangeBasicData({ key: 'auxiliary', value: value })
              // }
            />
          </div>
          <div className='w-3/5'>
            <CargoInputNumber
              label='External:'
              placeholder={basicData.external}
              onChange={(value) => handleChange('external', value)}
              // onChange={(value) =>
              //   dispatchChangeBasicData({ key: 'external', value: value })
              // }
            />
          </div>
        </CargoInput>
        <Button className='basicDataSendButton' onClick={sendBasicData}>
          Send Data ✔️
        </Button>
      </div>
    </CargoContainer>
  );
};
