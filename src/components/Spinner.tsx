// Spinner.tsx
import React from 'react';
import '../static/css/spinner.scss';

const Spinner: React.FC = () => {
  return (
    <div className="spinner-container">
      <div className="spinner" />
    </div>
  );
};

export default Spinner;
