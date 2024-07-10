import React, { useState, useEffect } from 'react';
import Registration from './components/registration';
import Quiz from './components/quiz';
import Score from './components/score';

// Could introduce Typescript for greater control over typings
const App = () => {
  const [user, setUser] = useState(null);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleRegister = (userData) => {
    setUser(userData);
  };

  const handleQuizComplete = (finalScore) => {
    setScore(finalScore);
  };

  return (
    <div>
      {/* Perhaps using react router to navigate from one page to the next */}
      {!user ? (
        <Registration onRegister={handleRegister} />
      ) : score === null ? (
        <Quiz onQuizComplete={handleQuizComplete} />
      ) : (
        <Score score={score} />
      )}
    </div>
  );
}

export default App;
