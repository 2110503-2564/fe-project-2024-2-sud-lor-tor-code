'use client'
import { useRouter } from "next/navigation";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import { putCampground } from "@/libs/campgroundFunction/putCampground";
import { TextField, Button, Typography, Box, Paper, Container } from "@mui/material";

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
  });

export default function UpdateCampground({cid,token,campground}:{cid:string,token:string,campground:CampgroundItem}) {
    
    const router = useRouter();
    const [formData, setFormData] = useState<CampgroundItem | null>(()=> campground);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) =>
            prevData
                ? {
                    ...prevData,
                    [name]: name === "dailyrate" ? Number(value) || 0 : value, // 
                }
                : null
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return;

        try {
            await putCampground(cid, formData, token);
            alert("Campground updated successfully!");
            router.push("/campground");
        } catch (error) {
            console.error("Error updating campground:", error);
        }
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
                Update Campground
              </Typography>
              <Box sx={{ marginTop: 3, position: 'relative', zIndex: 1 }}>

            {formData ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="District"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Province"
                        name="province"
                        value={formData.province}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Postal Code"
                        name="postalcode"
                        value={formData.postalcode}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Telephone"
                        name="tel"
                        value={formData.tel}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Region"
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Picture URL"
                        name="picture"
                        value={formData.picture}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Daily Rate"
                        name="dailyrate"
                        type="number"
                        value={formData.dailyrate}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Update
                    </Button>
                </form>
            ) : (
                <p>Loading campground data...</p>
            )}
            </Box>
            </Paper>
          </Container>
        </div>
      </main>
      </ThemeProvider>
    );
}


