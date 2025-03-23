'use client'

import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { 
    Box, 
    TextField, 
    Button, 
    Typography,
    Container,
    Paper,
    Snackbar,
    Alert
} from '@mui/material';
import { createCampground } from '@/libs/campgroundFunction/postCampground';

const theme = createTheme({
  // Theme configuration remains the same
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
});

interface FormData {
  cname: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  region: string;
  picture: string;
  dailyrate: string;
}

export default function CreateCampground({profile}:{profile:any}){
  const [formData, setFormData] = useState<FormData>({
    cname: '',
    address: '',
    district: '',
    province: '',
    postalcode: '',
    tel: '',
    region: '',
    picture: '',
    dailyrate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');
  
  // Handle the date formatting on client-side only to avoid hydration errors
  useEffect(() => {
    if (profile?.data?.createAt) {
      // Use a specific format to ensure consistency
      setFormattedDate((new Date(profile.data.createAt).toLocaleDateString('en-US'), 'MM/dd/yyyy'));
    }
  }, [profile?.data?.createAt]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Format the data for the API
      const campgroundData = {
        name: formData.cname,
        location: `${formData.address}, ${formData.district}, ${formData.province}, ${formData.postalcode}`,
        description: `Region: ${formData.region}, Contact: ${formData.tel}, Daily Rate: ${formData.dailyrate}`,
        picture: formData.picture
      };

      // Get the token - This should come from your authentication system
      // For this example, I'll assume it's stored in localStorage or a similar mechanism
      const token = localStorage.getItem('authToken') || '';
      
      // If you're using a state management solution like Redux, you might get it from there
      // const token = useSelector(state => state.auth.token);

      // Call the API function with the token
      const result = await createCampground(campgroundData, token);
      
      console.log("Campground created:", result);
      setSuccess(true);
      
      // Reset form
      setFormData({
        cname: '',
        address: '',
        district: '',
        province: '',
        postalcode: '',
        tel: '',
        region: '',
        picture: '',
        dailyrate: ''
      });
    } catch (err) {
      setError("Failed to create campground. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
  };

  return(
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
                Create a Campground
              </Typography>
              
              <Box sx={{ marginTop: 3, position: 'relative', zIndex: 1 }}>
                <div className="text-2xl">{profile?.data?.name}</div>
                <table className="table-auto border-separate border-spacing-2"><tbody>
                    <tr><td>Email</td><td>{profile?.data?.email}</td></tr>
                    <tr><td>Tel.</td><td>{profile?.data?.tel}</td></tr>
                    <tr><td>Member Since</td><td>{formattedDate}</td></tr>
                </tbody></table>

                {
                  (profile?.data?.role=="admin") ?
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="standard"
                      name="cname"
                      label="Campground Name"
                      value={formData.cname}
                      onChange={handleChange}
                      required
                    />
                    
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="standard"
                      name="address"
                      label="Campground Address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                    
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="standard"
                      name="district"
                      label="District"
                      value={formData.district}
                      onChange={handleChange}
                      required
                    />

                    <TextField
                      fullWidth
                      margin="normal"
                      variant="standard"
                      name="province"
                      label="Province"
                      value={formData.province}
                      onChange={handleChange}
                      required
                    />

                    <TextField
                      fullWidth
                      margin="normal"
                      variant="standard"
                      name="postalcode"
                      label="Postal Code"
                      value={formData.postalcode}
                      onChange={handleChange}
                      required
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="standard"
                      name="tel"
                      label="Phone Number"
                      value={formData.tel}
                      onChange={handleChange}
                      required
                    /> 
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="standard"
                      name="region"
                      label="Region"
                      value={formData.region}
                      onChange={handleChange}
                      required
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="standard"
                      name="picture"
                      label="Picture"
                      value={formData.picture}
                      onChange={handleChange}
                      required
                    />

                    <TextField
                      fullWidth
                      margin="normal"
                      variant="standard"
                      name="dailyrate"
                      label="Daily Rate"
                      value={formData.dailyrate}
                      onChange={handleChange}
                      required
                    />
                    <Button 
                      type="submit" 
                      variant="contained" 
                      color="primary" 
                      disabled={isSubmitting}
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
                      {isSubmitting ? "Creating..." : "Add New Campground"}
                    </Button>
                  </form>
                  : null
                }
              </Box>
            </Paper>
          </Container>
        </div>
      </main>
      
      {/* Success message */}
      <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Campground created successfully!
        </Alert>
      </Snackbar>
      
      {/* Error message */}
      {error && (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </ThemeProvider>
  );
}