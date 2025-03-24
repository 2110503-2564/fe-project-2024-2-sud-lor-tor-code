'use client'
import { useRouter } from "next/navigation";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import { TextField, Button, Typography, Box, Paper, Container } from "@mui/material";
import userRegister from "@/libs/authFunction/userRegister";

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

export default function UserRegister() {
    
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        tel: "",
        email: "",
        password: "",
    });
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
    
        setFormData((prevData) => ({
            ...prevData, 
            [name]: value
        }));
    };
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return;

        try {
            await userRegister(formData.name,formData.tel,formData.email,formData.password);
            alert("Campground updated successfully!");
            router.push("/");
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
                Register
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
                        label="Tel"
                        name="tel"
                        value={formData.tel}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Register
                    </Button>
                </form>
            ) : (
                <p>Loading...</p>
            )}
            </Box>
            </Paper>
          </Container>
        </div>
      </main>
      </ThemeProvider>
    );
}


