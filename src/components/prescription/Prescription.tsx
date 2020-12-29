import React from 'react';
import { connect } from 'react-redux';

import { Row } from './Row';
import {
  MiddleColumn,
  NotesColumn,
  SerialColumn,
  Table,
  HeaderRow,
} from './Table';

import { RootStateType } from '../../slices/index';

import {
  setPrescription,
  setDosage,
  addPrescription,
  removePrescription,
  addDosage,
  removeDosage,
  PrescriptionTextType,
  DosageStateType,
} from '../../slices/sheet';

const PrescriptionComponent = ({
  prescriptions,
  setPrescription,
  setDosage,
  addPrescription,
  removePrescription,
  addDosage,
  removeDosage,
}: ReturnType<typeof mapState> & typeof mapDispatch) => {
  return (
    <Table>
      <HeaderRow>
        <SerialColumn>No.</SerialColumn>
        <MiddleColumn>Medicine and Dosage</MiddleColumn>
        <NotesColumn>Notes</NotesColumn>
      </HeaderRow>
      {prescriptions.map((_, index) => {
        const onChange = ({
          target: { name, value },
        }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          setPrescription({
            index,
            name: name as keyof PrescriptionTextType,
            value,
          });
        };
        const onChangeMedicineName = (value: string) => {
          setPrescription({ index, name: 'medicineName', value });
        };

        const entered = ({
          target: { value },
        }: React.ChangeEvent<HTMLInputElement>) => {
          if (index === prescriptions.length - 1 && value.length !== 0) {
            addPrescription();
          }
        };

        const removed = ({
          target: { value },
        }: React.ChangeEvent<HTMLInputElement>) => {
          if (
            index !== 0 &&
            index === prescriptions.length - 2 &&
            value.length === 0
          ) {
            removePrescription();
          }
        };

        const onDosageChange = (
          dosageIndex: number,
          name: string,
          value: string
        ) => {
          setDosage({
            pIndex: index,
            index: dosageIndex,
            name: name as keyof DosageStateType,
            value,
          });
        };

        const RowProps = {
          index,
          size: prescriptions.length,
          entered,
          removed,
          ...prescriptions[index],
          onChange,
          onChangeMedicineName,
          onDosageChange,
          addDosage: () => addDosage({ index }),
          removeDosage: () => removeDosage({ index }),
        };
        return <Row key={`row-key-${index}`} {...RowProps} />;
      })}
    </Table>
  );
};

const mapState = ({ sheet: { prescriptions } }: RootStateType) => ({
  prescriptions,
});

const mapDispatch = {
  setPrescription,
  addPrescription,
  removePrescription,
  setDosage,
  addDosage,
  removeDosage,
};

export const Prescription = connect(
  mapState,
  mapDispatch
)(PrescriptionComponent);
