import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import './CompareTable.css';

const CompareTable = ({ cars, onRemove }) => {
  const specifications = [
    { label: 'Make', key: 'make' },
    { label: 'Model', key: 'model' },
    { label: 'Year', key: 'year' },
    { label: 'Price', key: 'price', format: (value) => `₹${value.toLocaleString('en-IN')}` },
    { label: 'Fuel Type', key: 'fuelType' },
    { label: 'Transmission', key: 'transmission' },
    { label: 'Mileage', key: 'mileage', format: (value) => `${value} km` },
    { label: 'Engine Type', key: 'engine_type' },
    { label: 'Displacement', key: 'displacement' },
  ];

  const getValue = (car, key) => {
    if (key.includes('.')) {
      const [obj, prop] = key.split('.');
      return car[obj]?.[prop] || '-';
    }
    return car[key] || '-';
  };

  return (
    <TableContainer component={Paper} className="compare-table-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="spec-header">Specifications</TableCell>
            {cars.map((car, index) => (
              <TableCell key={car.id} align="center" className="car-column">
                <div className="car-header">
                  <img
                    src={car.image}
                    alt={`${car.make} ${car.model}`}
                    className="car-image"
                  />
                  <IconButton
                    className="remove-car-button"
                    size="small"
                    onClick={() => onRemove(index)}
                  >
                    <Close />
                  </IconButton>
                  <div className="car-name">{car.make} {car.model}</div>
                  <div className="car-year">{car.year}</div>
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {specifications.map(({ label, key, format }) => (
            <TableRow key={key} className="spec-row">
              <TableCell component="th" scope="row" className="spec-label">
                {label}
              </TableCell>
              {cars.map((car) => {
                const value = getValue(car, key);
                const formattedValue = format ? format(value) : value;
                
                return (
                  <TableCell key={car.id} align="center" className="spec-value">
                    {formattedValue}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CompareTable;
