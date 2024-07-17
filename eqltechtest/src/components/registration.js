import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

// Add tests for this component to ensure validation of fields when registering
export const Registration = ({ onRegister }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  
  // Better error handling in case setting to local storage has unforseen issues or fails
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { firstName, lastName, email };
    const lastLogin = new Date().toISOString();
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('lastLogin', lastLogin);
    onRegister(user, lastLogin);
  };

  return (
    <Container maxWidth="sm">
      {/* Add aria attributes to form to make more accessible */}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        {/* Make strings dynamic values for future internationlisation/translation */}
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        {/* Enact form validation to ensure minimum of 3 characters used for first and last name */}
        <TextField
          label="First Name"
          fullWidth
          margin="normal"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <TextField
          label="Last Name"
          fullWidth
          margin="normal"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Register
        </Button>
      </Box>
    </Container>
  );
}
