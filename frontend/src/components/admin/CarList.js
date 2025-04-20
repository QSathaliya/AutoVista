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
  TablePagination,
  IconButton,
  Tooltip,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Chip
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Import the static car data
const staticCars = [
  {
    id: 1,
    make: "Toyota",
    model: "Camry",
    year: 2022,
    price: 3500000,
    mileage: 15000,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "Sedan",
    color: "Silver",
    condition: "New",
    features: ["Sunroof", "Navigation", "Leather Seats", "Bluetooth"]
  },
  {
    id: 2,
    make: "Honda",
    model: "City",
    year: 2021,
    price: 1200000,
    mileage: 25000,
    fuelType: "Petrol",
    transmission: "Manual",
    bodyType: "Sedan",
    color: "White",
    condition: "Used",
    features: ["AC", "Power Windows", "Central Locking"]
  },
  {
    id: 3,
    make: "Hyundai",
    model: "Creta",
    year: 2023,
    price: 1800000,
    mileage: 5000,
    fuelType: "Diesel",
    transmission: "Automatic",
    bodyType: "SUV",
    color: "Black",
    condition: "New",
    features: ["Panoramic Sunroof", "360 Camera", "Wireless Charging"]
  },
  {
    id: 4,
    make: "Maruti Suzuki",
    model: "Swift",
    year: 2022,
    price: 800000,
    mileage: 20000,
    fuelType: "Petrol",
    transmission: "Manual",
    bodyType: "Hatchback",
    color: "Red",
    condition: "Used",
    features: ["AC", "Power Steering", "Airbags"]
  },
  {
    id: 5,
    make: "Tata",
    model: "Nexon",
    year: 2023,
    price: 1500000,
    mileage: 10000,
    fuelType: "Electric",
    transmission: "Automatic",
    bodyType: "SUV",
    color: "Blue",
    condition: "New",
    features: ["Connected Car Tech", "Air Purifier", "Electric Sunroof"]
  },
  {
    id: 6,
    make: "Mahindra",
    model: "XUV700",
    year: 2023,
    price: 2500000,
    mileage: 8000,
    fuelType: "Diesel",
    transmission: "Automatic",
    bodyType: "SUV",
    color: "Grey",
    condition: "New",
    features: ["ADAS", "Panoramic Sunroof", "Premium Sound System"]
  },
  {
    id: 7,
    make: "Kia",
    model: "Seltos",
    year: 2022,
    price: 1600000,
    mileage: 18000,
    fuelType: "Petrol",
    transmission: "Manual",
    bodyType: "SUV",
    color: "White",
    condition: "Used",
    features: ["Ventilated Seats", "LED Headlamps", "UVO Connect"]
  },
  {
    id: 8,
    make: "Volkswagen",
    model: "Taigun",
    year: 2023,
    price: 1700000,
    mileage: 12000,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "SUV",
    color: "Yellow",
    condition: "New",
    features: ["Digital Cockpit", "Ventilated Seats", "6 Airbags"]
  },
  {
    id: 9,
    make: "MG",
    model: "Astor",
    year: 2022,
    price: 1400000,
    mileage: 15000,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "SUV",
    color: "Red",
    condition: "Used",
    features: ["AI Assistant", "Panoramic Sunroof", "ADAS"]
  },
  {
    id: 10,
    make: "Skoda",
    model: "Slavia",
    year: 2023,
    price: 1300000,
    mileage: 9000,
    fuelType: "Petrol",
    transmission: "Manual",
    bodyType: "Sedan",
    color: "Blue",
    condition: "New",
    features: ["Ventilated Seats", "Electric Sunroof", "6 Airbags"]
  },
  {
    id: 11,
    make: "Toyota",
    model: "Fortuner",
    year: 2022,
    price: 4000000,
    mileage: 20000,
    fuelType: "Diesel",
    transmission: "Automatic",
    bodyType: "SUV",
    color: "White",
    condition: "Used",
    features: ["4x4", "Leather Seats", "Power Tailgate"]
  },
  {
    id: 12,
    make: "Honda",
    model: "Civic",
    year: 2023,
    price: 2200000,
    mileage: 5000,
    fuelType: "Hybrid",
    transmission: "Automatic",
    bodyType: "Sedan",
    color: "Silver",
    condition: "New",
    features: ["Honda Sensing", "Digital Cluster", "Wireless CarPlay"]
  },
  {
    id: 13,
    make: "Hyundai",
    model: "i20",
    year: 2022,
    price: 900000,
    mileage: 15000,
    fuelType: "Petrol",
    transmission: "Manual",
    bodyType: "Hatchback",
    color: "Black",
    condition: "Used",
    features: ["Sunroof", "BlueLink", "Wireless Charging"]
  },
  {
    id: 14,
    make: "Tata",
    model: "Harrier",
    year: 2023,
    price: 2300000,
    mileage: 10000,
    fuelType: "Diesel",
    transmission: "Automatic",
    bodyType: "SUV",
    color: "Green",
    condition: "New",
    features: ["Panoramic Sunroof", "JBL Sound System", "ADAS"]
  },
  {
    id: 15,
    make: "Mahindra",
    model: "Thar",
    year: 2022,
    price: 1600000,
    mileage: 18000,
    fuelType: "Petrol",
    transmission: "Manual",
    bodyType: "SUV",
    color: "Red",
    condition: "Used",
    features: ["4x4", "Convertible Top", "Adventure Statistics"]
  },
  {
    id: 16,
    make: "Kia",
    model: "EV6",
    year: 2023,
    price: 6000000,
    mileage: 5000,
    fuelType: "Electric",
    transmission: "Automatic",
    bodyType: "Crossover",
    color: "White",
    condition: "New",
    features: ["AR HUD", "Vehicle-to-Load", "Advanced ADAS"]
  },
  {
    id: 17,
    make: "MG",
    model: "Hector",
    year: 2022,
    price: 1800000,
    mileage: 20000,
    fuelType: "Diesel",
    transmission: "Manual",
    bodyType: "SUV",
    color: "Burgundy",
    condition: "Used",
    features: ["Panoramic Sunroof", "Connected Car", "Power Tailgate"]
  },
  {
    id: 18,
    make: "Volkswagen",
    model: "Virtus",
    year: 2023,
    price: 1500000,
    mileage: 8000,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "Sedan",
    color: "Blue",
    condition: "New",
    features: ["Ventilated Seats", "Digital Cockpit", "Electric Sunroof"]
  },
  {
    id: 19,
    make: "Skoda",
    model: "Kushaq",
    year: 2022,
    price: 1400000,
    mileage: 15000,
    fuelType: "Petrol",
    transmission: "Manual",
    bodyType: "SUV",
    color: "Grey",
    condition: "Used",
    features: ["Sunroof", "Wireless SmartLink", "6 Airbags"]
  },
  {
    id: 20,
    make: "Maruti Suzuki",
    model: "Baleno",
    year: 2023,
    price: 900000,
    mileage: 10000,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "Hatchback",
    color: "Silver",
    condition: "New",
    features: ["HUD", "360 Camera", "Connected Car Tech"]
  },
  {
    id: 21,
    make: "Toyota",
    model: "Innova Crysta",
    year: 2022,
    price: 2500000,
    mileage: 25000,
    fuelType: "Diesel",
    transmission: "Manual",
    bodyType: "MPV",
    color: "White",
    condition: "Used",
    features: ["Captain Seats", "Climate Control", "Push Button Start"]
  },
  {
    id: 22,
    make: "Honda",
    model: "WR-V",
    year: 2023,
    price: 1200000,
    mileage: 8000,
    fuelType: "Petrol",
    transmission: "Manual",
    bodyType: "Crossover",
    color: "Brown",
    condition: "New",
    features: ["Sunroof", "LED Headlamps", "Cruise Control"]
  },
  {
    id: 23,
    make: "Hyundai",
    model: "Venue",
    year: 2022,
    price: 1100000,
    mileage: 18000,
    fuelType: "Petrol",
    transmission: "DCT",
    bodyType: "SUV",
    color: "Denim Blue",
    condition: "Used",
    features: ["BlueLink", "Air Purifier", "Wireless Charging"]
  },
  {
    id: 24,
    make: "Tata",
    model: "Punch",
    year: 2023,
    price: 800000,
    mileage: 5000,
    fuelType: "Petrol",
    transmission: "AMT",
    bodyType: "Micro SUV",
    color: "Orange",
    condition: "New",
    features: ["iRA Connected Car", "Terrain Modes", "Semi-Digital Cluster"]
  },
  {
    id: 25,
    make: "Mahindra",
    model: "Scorpio-N",
    year: 2023,
    price: 2200000,
    mileage: 12000,
    fuelType: "Diesel",
    transmission: "Automatic",
    bodyType: "SUV",
    color: "Black",
    condition: "New",
    features: ["AdrenoX", "Sony Sound System", "Terrain Modes"]
  },
  {
    id: 26,
    make: "Kia",
    model: "Carens",
    year: 2022,
    price: 1500000,
    mileage: 20000,
    fuelType: "Petrol",
    transmission: "DCT",
    bodyType: "MPV",
    color: "Imperial Blue",
    condition: "Used",
    features: ["Ventilated Seats", "UVO Connect", "One-Touch Tumble"]
  },
  {
    id: 27,
    make: "MG",
    model: "ZS EV",
    year: 2023,
    price: 2500000,
    mileage: 8000,
    fuelType: "Electric",
    transmission: "Automatic",
    bodyType: "SUV",
    color: "White",
    condition: "New",
    features: ["Panoramic Sunroof", "PM 2.5 Filter", "iSMART"]
  },
  {
    id: 28,
    make: "Volkswagen",
    model: "Polo",
    year: 2022,
    price: 850000,
    mileage: 25000,
    fuelType: "Petrol",
    transmission: "Manual",
    bodyType: "Hatchback",
    color: "Red",
    condition: "Used",
    features: ["Touchscreen Infotainment", "Cruise Control", "Rain Sensing Wipers"]
  },
  {
    id: 29,
    make: "Skoda",
    model: "Octavia",
    year: 2023,
    price: 3500000,
    mileage: 5000,
    fuelType: "Petrol",
    transmission: "DSG",
    bodyType: "Sedan",
    color: "Silver",
    condition: "New",
    features: ["Virtual Cockpit", "Canton Sound System", "ADAS"]
  },
  {
    id: 30,
    make: "Maruti Suzuki",
    model: "Brezza",
    year: 2022,
    price: 1100000,
    mileage: 15000,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "SUV",
    color: "Blue",
    condition: "Used",
    features: ["Sunroof", "Suzuki Connect", "Cruise Control"]
  },
  {
    id: 31,
    make: "Toyota",
    model: "Glanza",
    year: 2023,
    price: 950000,
    mileage: 8000,
    fuelType: "Hybrid",
    transmission: "Manual",
    bodyType: "Hatchback",
    color: "Silver",
    condition: "New",
    features: ["HUD", "360 View Camera", "Connected Car Features"]
  },
  {
    id: 32,
    make: "Honda",
    model: "Amaze",
    year: 2022,
    price: 800000,
    mileage: 20000,
    fuelType: "Petrol",
    transmission: "CVT",
    bodyType: "Sedan",
    color: "Golden Brown",
    condition: "Used",
    features: ["Cruise Control", "Paddle Shifters", "Android Auto"]
  },
  {
    id: 33,
    make: "Hyundai",
    model: "Alcazar",
    year: 2023,
    price: 2000000,
    mileage: 10000,
    fuelType: "Diesel",
    transmission: "Automatic",
    bodyType: "SUV",
    color: "White",
    condition: "New",
    features: ["Panoramic Sunroof", "360 Camera", "Bose Sound System"]
  },
  {
    id: 34,
    make: "Tata",
    model: "Altroz",
    year: 2022,
    price: 850000,
    mileage: 18000,
    fuelType: "Petrol",
    transmission: "Manual",
    bodyType: "Hatchback",
    color: "High Street Gold",
    condition: "Used",
    features: ["iRA Connect", "Automatic Climate Control", "Projector Headlamps"]
  },
  {
    id: 35,
    make: "Mahindra",
    model: "XUV300",
    year: 2023,
    price: 1300000,
    mileage: 5000,
    fuelType: "Petrol",
    transmission: "AMT",
    bodyType: "SUV",
    color: "Red Rage",
    condition: "New",
    features: ["Sunroof", "BlueSense Plus", "Dual Zone Climate Control"]
  },
  {
    id: 36,
    make: "Kia",
    model: "Sonet",
    year: 2022,
    price: 1100000,
    mileage: 15000,
    fuelType: "Diesel",
    transmission: "DCT",
    bodyType: "SUV",
    color: "Galaxy Blue",
    condition: "Used",
    features: ["Ventilated Seats", "UVO Connect", "Sound Mood Lamp"]
  },
  {
    id: 37,
    make: "MG",
    model: "Comet EV",
    year: 2023,
    price: 800000,
    mileage: 2000,
    fuelType: "Electric",
    transmission: "Automatic",
    bodyType: "Hatchback",
    color: "Green",
    condition: "New",
    features: ["iSMART", "Digital Key", "Connected Car Tech"]
  },
  {
    id: 38,
    make: "Volkswagen",
    model: "Vento",
    year: 2022,
    price: 1200000,
    mileage: 22000,
    fuelType: "Petrol",
    transmission: "Manual",
    bodyType: "Sedan",
    color: "Carbon Steel",
    condition: "Used",
    features: ["LED Headlamps", "Rain Sensing Wipers", "Cruise Control"]
  },
  {
    id: 39,
    make: "Skoda",
    model: "Superb",
    year: 2023,
    price: 4000000,
    mileage: 5000,
    fuelType: "Petrol",
    transmission: "DSG",
    bodyType: "Sedan",
    color: "Business Grey",
    condition: "New",
    features: ["Virtual Cockpit", "Matrix LED", "Park Assist"]
  },
  {
    id: 40,
    make: "Maruti Suzuki",
    model: "Ertiga",
    year: 2022,
    price: 1100000,
    mileage: 25000,
    fuelType: "CNG",
    transmission: "Automatic",
    bodyType: "MPV",
    color: "Pearl Arctic White",
    condition: "Used",
    features: ["Smart Hybrid", "Suzuki Connect", "Cruise Control"]
  },
  {
    id: 41,
    make: "Tata",
    model: "Tigor EV",
    year: 2023,
    price: 1400000,
    mileage: 8000,
    fuelType: "Electric",
    transmission: "Automatic",
    bodyType: "Sedan",
    color: "Teal Blue",
    condition: "New",
    features: ["Connected Car Tech", "Multi-Mode Regen", "ZConnect"]
  }
];

const CarList = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState(staticCars);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCars = cars.filter(car => 
    car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.fuelType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (carId) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      setCars(cars.filter(car => car.id !== carId));
      toast.success('Car deleted successfully');
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="div">
            Cars Management
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              size="small"
              placeholder="Search cars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/admin/cars/new')}
            >
              Add New Car
            </Button>
          </Box>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Make</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Fuel Type</TableCell>
                <TableCell>Transmission</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCars
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((car) => (
                  <TableRow key={car.id}>
                    <TableCell>{car.make}</TableCell>
                    <TableCell>{car.model}</TableCell>
                    <TableCell>{car.year}</TableCell>
                    <TableCell>₹{car.price.toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip 
                        label={car.fuelType}
                        color={
                          car.fuelType === 'Electric' ? 'success' :
                          car.fuelType === 'Hybrid' ? 'info' :
                          'default'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{car.transmission}</TableCell>
                    <TableCell>{car.color}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => navigate(`/admin/cars/edit/${car.id}`)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(car.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredCars.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default CarList; 