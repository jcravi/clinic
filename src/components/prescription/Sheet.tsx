import React from 'react';
import { connect } from 'react-redux';

import { ISheetInputs, StateInterface } from '../../interfaces';
import { Label } from '../common/Label';
import { Prescription } from './Prescription';
import { setSheetInput } from '../../actions/sheets';

const SheetComponent = ({
  diagnosis,
  procedureDone,
  instructions,
  setSheetInput,
}: ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps) => {
  const onChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSheetInput(name as keyof ISheetInputs, value);
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

const mapStateToProps = ({
  sheet: { diagnosis, procedureDone, instructions },
}: StateInterface) => ({ diagnosis, procedureDone, instructions });

const mapDispatchToProps = {
  setSheetInput,
};

export const Sheet = connect(
  mapStateToProps,
  mapDispatchToProps
)(SheetComponent);
