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

import {
  IPrescription,
  IDailyDosage,
  StateInterface,
} from '../../interfaces/index';

import {
  setPrescription,
  setDosage,
  addPrescription,
  removePrescription,
  addDosage,
  removeDosage,
} from '../../actions/index';

const PrescriptionComponent = ({
  prescriptions,
  setPrescription,
  setDosage,
  addPrescription,
  removePrescription,
  addDosage,
  removeDosage,
}: ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps) => {
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
          setPrescription(index, name as keyof IPrescription, value);
        };
        const onChangeMedicineName = (value: string) => {
          setPrescription(index, 'medicineName', value);
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
          setDosage(index, dosageIndex, name as keyof IDailyDosage, value);
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
          addDosage: () => addDosage(index),
          removeDosage: () => removeDosage(index),
        };
        return <Row key={`row-key-${index}`} {...RowProps} />;
      })}
    </Table>
  );
};

const mapStateToProps = ({ sheet: { prescriptions } }: StateInterface) => ({
  prescriptions,
});

const mapDispatchToProps = {
  setPrescription,
  addPrescription,
  removePrescription,
  setDosage,
  addDosage,
  removeDosage,
};

export const Prescription = connect(
  mapStateToProps,
  mapDispatchToProps
)(PrescriptionComponent);
