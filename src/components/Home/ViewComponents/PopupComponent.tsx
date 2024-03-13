import React, { PropsWithChildren } from 'react';
import { Dialog } from '@mui/material';
import { useSelector } from 'react-redux';
import { State } from '../../../redux/store';
import './styles.css';

type Props = {
  popupId?: string;
  width: string;
  height: string;
};

export function PopupComponent({
  popupId,
  children,
}: PropsWithChildren<Props>) {
  const isOpen = useSelector(
    (state: State) =>
      state.popupData.popupList.find(({ id }) => id === popupId)?.isOpen ??
      false
  );

  return (
    <Dialog
      open={isOpen}
      PaperProps={{ className: 'w-full' }}
      sx={{
        '& .MuiDialog-container': {
          '& .MuiPaper-root': {
            borderRadius: '1rem',
            overflow: 'hidden',
          },
        },
      }}
    >
      {children}
    </Dialog>
  );
}
