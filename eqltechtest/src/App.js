import React, { useState, useEffect } from 'react';
import { Registration } from './components/registration';
import { Quiz }from './components/quiz';
import { Score } from './components/score';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

// Introduce typescript to ensure stricter typings
const App = () => {
  const [user, setUser] = useState(null);
  const [score, setScore] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [lastLogin, setLastLogin] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedLastLogin = localStorage.getItem('lastLogin');
    if (storedUser) {
      setUser(storedUser);
    }
    if (storedLastLogin) {
      setLastLogin(storedLastLogin);
    }
  }, []);

  const handleRegister = (userData, loginTime) => {
    setUser(userData);
    setLastLogin(loginTime);
  };

  const handleQuizComplete = (finalScore, answers) => {
    setScore(finalScore);
    setUserAnswers(answers);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            EQL Quiz App
          </Typography>
          {user && (
            <Typography variant="body1">
              Welcome, {user.firstName}
            </Typography>
          )}
          {lastLogin && (
            <Typography variant="body1" sx={{ ml: 2 }}>
              Last Logged In: {new Date(lastLogin).toLocaleString()}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 4 }}>
        {!user ? (
          <Registration onRegister={handleRegister} />
        ) : score === null ? (
          <Quiz onQuizComplete={handleQuizComplete} />
        ) : (
          <Score score={score} userAnswers={userAnswers} />
        )}
      </Box>
    </div>
  );
}

export default App;
