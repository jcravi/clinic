import React from 'react';

export const Common = () => {
  const date = new Date().toLocaleDateString('en-IN');
  return (
    <>
      <div style={{ textAlign: 'right' }}>Date: {date}</div>
    </>
  );
};
