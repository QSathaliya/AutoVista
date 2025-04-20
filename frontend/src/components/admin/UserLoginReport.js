import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Tooltip
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { format } from 'date-fns';

// Static user login data
const userLogins = [
  { username: 'Qusai Sathaliya', email: 'qusaisathaliya12345@gmail.com', lastLogin: '2024-04-18T14:32:00Z', loginCount: 85 },
  { username: 'Qusai Sathaliya', email: 'qusaisathaliya@gmail.com', lastLogin: '2024-04-17T09:15:00Z', loginCount: 42 },
  { username: 'moviesabc', email: 'moviesabc@gmail.com', lastLogin: '2024-04-16T16:45:00Z', loginCount: 28 },
  { username: '210020107080 Sathaliya', email: '210020107080@aitindia.in', lastLogin: '2024-04-15T11:20:00Z', loginCount: 35 },
  { username: 'aein sindhi', email: 'aeinsindhi245@gmail.com', lastLogin: '2024-04-14T13:10:00Z', loginCount: 19 },
  { username: 'Ankit Srivastav', email: 'srivastavankit1987@gmail.com', lastLogin: '2024-04-13T10:05:00Z', loginCount: 31 },
  { username: 'Dhruv Gandhi', email: 'dgandhi1640@gmail.com', lastLogin: '2024-04-12T08:30:00Z', loginCount: 25 },
  { username: 'Bhavik Giri', email: 'bhavikgauswami1664@gmail.com', lastLogin: '2024-04-11T15:40:00Z', loginCount: 47 },
  { username: 'Om Patel', email: 'ompatel@gmail.com', lastLogin: '2024-04-10T12:25:00Z', loginCount: 33 }
];

const UserLoginReport = () => {
  const [data, setData] = useState(userLogins);

  const handleRefresh = () => {
    // In a real application, this would fetch fresh data from the API
    setData([...userLogins]);
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM d, yyyy h:mm a');
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="div">
            User Login Report
          </Typography>
          <Tooltip title="Refresh Data">
            <IconButton onClick={handleRefresh}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Last Login</TableCell>
                <TableCell align="right">Login Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((user) => (
                <TableRow key={user.username}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{formatDate(user.lastLogin)}</TableCell>
                  <TableCell align="right">{user.loginCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default UserLoginReport; 