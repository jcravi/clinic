import React from 'react';
import { connect } from 'react-redux';

import { RootStateType } from '../../slices';
import { Label } from '../common/Label';
import { Prescription } from './Prescription';
import { setSheetInput, SheetTextType } from '../../slices/sheet';

const SheetComponent = ({
  diagnosis,
  procedureDone,
  instructions,
  setSheetInput,
}: ReturnType<typeof mapState> & typeof mapDispatch) => {
  const onChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSheetInput({ name: name as keyof SheetTextType, value });
  };

  return (
    <>
      <div>
        <Label
          name={'Diagnosis'}
          inputName='diagnosis'
          value={diagnosis}
          onChange={onChange}
        />
        <Label
          name={'Procedure\u202fdone'}
          inputName='procedureDone'
          value={procedureDone}
          onChange={onChange}
        />
      </div>
      <div style={{ fontSize: '50px' }}>{'\u211E'}</div>
      <div>
        <Prescription />
      </div>
      <div style={{ paddingTop: '50px' }}>
        <Label
          name='Instructions'
          inputName='instructions'
          value={instructions}
          onChange={onChange}
        />
      </div>
    </>
  );
};

const mapState = ({
  sheet: { diagnosis, procedureDone, instructions },
}: RootStateType) => ({ diagnosis, procedureDone, instructions });

const mapDispatch = {
  setSheetInput,
};

export const Sheet = connect(mapState, mapDispatch)(SheetComponent);
