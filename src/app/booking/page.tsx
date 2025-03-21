'use client'

import { useState } from 'react'
import { 
  Box, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Typography,
  Container,
  Paper,
  Snackbar,
  Alert,
  SelectChangeEvent
} from '@mui/material'
import { useDispatch } from 'react-redux'
import DateReserve from '@/components/DateReserve'
import { AppDispatch } from '@/redux/store'
import { Dayjs } from 'dayjs'
import { useSearchParams } from 'next/navigation'
import dayjs from 'dayjs'
import { addBooking } from '@/redux/features/bookSlice'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#B45309',
      light: '#D97706',
    },
    secondary: {
      main: '#FEF3C7',
    },
    background: {
      default: '#F9FAFB',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: '#B45309',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: '#B45309',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#B45309',
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: '#B45309',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#B45309',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
        containedPrimary: {
          backgroundColor: '#B45309',
          '&:hover': {
            backgroundColor: '#D97706',
          },
        },
      },
    },
  },
})

export default function Booking() {
  const urlParams = useSearchParams();
  const cid = urlParams.get('id');
  const model = urlParams.get('model');

  const dispatch = useDispatch<AppDispatch>()

  const makeBooking = () => {
    if(bookDate) {
      const item:BookingItem = {
        nameLastname: nameLastname,
        tel: contact,
        campground: selectCampground,
        bookDate: dayjs(bookDate).format("YYYY/MM/DD"),
      }
      dispatch(addBooking(item))
    }
  }

  const [nameLastname, setNameLastname] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [selectCampground, setSelectCampground] = useState<string>('');
  const [bookDate, setBookDate] = useState<Dayjs | null>(null);

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    
    if (name === "nameLastname") {
      setNameLastname(value);
    } else if (name === "tel") {
      setContact(value);
    }
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectCampground(event.target.value);
  };

  const handleDateChange = (date: Dayjs | null) => {
    setBookDate(date);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    makeBooking();
  };

  return (
    <ThemeProvider theme={theme}>
      <main className='bg-slate-100 min-h-screen'>
        <div className='max-w-7xl mx-auto px-5 py-8'>
          <Container maxWidth="md" sx={{ mt: 4, mb: 8, px: 0 }}>
            <Paper 
              elevation={3} 
              sx={{ 
                padding: 4, 
                borderRadius: 2,
                borderLeft: '4px solid #FCD34D',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '100px',
                  height: '100px',
                  backgroundColor: 'rgba(254, 243, 199, 0.5)',
                  borderBottomLeftRadius: '100%',
                }
              }}
            >
              <Typography variant="h4" component="h1" gutterBottom>
                Book a Campground
              </Typography>
              
              <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: 3, position: 'relative', zIndex: 1 }}>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="standard"
                  name="nameLastname"
                  label="Full Name"
                  value={nameLastname}
                  onChange={handleTextFieldChange}
                  required
                />
                
                <TextField
                  fullWidth
                  margin="normal"
                  variant="standard"
                  name="tel"
                  label="Phone Number"
                  value={contact}
                  onChange={handleTextFieldChange}
                  required
                />
                
                <FormControl fullWidth margin="normal" variant="standard" required>
                  <InputLabel id="campground-label">Campground</InputLabel>
                  <Select
                    labelId="campground-label"
                    id="campground"
                    name="campground"
                    label="Campground"
                    value={selectCampground}
                    onChange={handleSelectChange}
                  >
                    {/** แก้เป็นดึง campground data มาทำ menu item */}
                    <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
                    <MenuItem value="Spark">Spark Space</MenuItem>
                    <MenuItem value="GrandTable">The Grand Table</MenuItem>
                  </Select>
                </FormControl>
                
                <Box sx={{ marginTop: 3, marginBottom: 3 }}>
                  <DateReserve onDateChange={handleDateChange} />
                </Box>
                
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  name="Book Campground" 
                  sx={{ 
                    marginTop: 3,
                    paddingY: 1,
                    paddingX: 4,
                    borderRadius: 1,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: 0,
                      height: '2px',
                      backgroundColor: '#FFFFFF',
                      transition: 'width 0.3s ease-in-out',
                    },
                    '&:hover::after': {
                      width: '100%',
                    }
                  }}
                >
                  Book Campground
                </Button>
              </Box>
            </Paper>
          </Container>
        </div>
      </main>
    </ThemeProvider>
  )
}