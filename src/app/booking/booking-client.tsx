'use client'

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
} from '@mui/material'
import DateReserve from '@/components/DateReserve'
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

export default function BookingClient({ profile }: any) {
  const createdAt = new Date(profile.data.createdAt)
  
  return (
    <ThemeProvider theme={theme}>
      <main className='bg-slate-100 min-h-screen'>
        <div className='max-w-7xl mx-auto px-5 py-8'>
          <div className='bg-white shadow-md rounded-lg p-6 border-l-4 border-amber-300'>
            <div className='text-2xl font-semibold text-amber-800 mb-4'>{profile.data.name}</div>
            <table className='table-auto border-separate border-spacing-y-2'>
              <tbody>
                <tr>
                  <td className='font-medium text-gray-600 pr-4'>Email</td>
                  <td className='text-gray-800'>{profile.data.email}</td>
                </tr>
                <tr>
                  <td className='font-medium text-gray-600 pr-4'>Tel.</td>
                  <td className='text-gray-800'>{profile.data.tel}</td>
                </tr>
                <tr>
                  <td className='font-medium text-gray-600 pr-4'>Member Since</td>
                  <td className='text-gray-800'>{createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                </tr>
              </tbody>
            </table>
          </div>

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
                Campgrounds Booking
              </Typography>

              <Box component="form" sx={{ marginTop: 3, position: 'relative', zIndex: 1 }}>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="standard"
                  name="Name-Lastname"
                  label="Name-Lastname"
                  defaultValue={profile.data.name}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  variant="standard"
                  name="Contact-Number"
                  label="Contact-Number"
                  defaultValue={profile.data.tel}
                />

                <FormControl fullWidth margin="normal" variant="standard">
                  <InputLabel id="campground-label">Campground</InputLabel>
                  <Select
                    labelId="campground-label"
                    id="campground"
                    name="campground"
                    label="Campground"
                  >
                    <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
                    <MenuItem value="Spark">Spark Space</MenuItem>
                    <MenuItem value="GrandTable">The Grand Table</MenuItem>
                  </Select>
                </FormControl>

                <Box sx={{ marginTop: 3, marginBottom: 3 }}>
                  <DateReserve />
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