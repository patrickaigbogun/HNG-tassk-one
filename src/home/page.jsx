import  { useState, useEffect} from 'react';
import '../index.css';

const ColorGuessingGame = () => {
  const [targetColor, setTargetColor] = useState('');
  const [colorOptions, setColorOptions] = useState([]);
  const [showAnimation, setShowAnimation] = useState(false);


  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5',
    '#9B59B6', '#3498DB', '#E74C3C', '#2ECC71', '#F1C40F', '#1ABC9C',
    '#E67E22', '#95A5A6', '#D35400', '#27AE60', '#8E44AD', '#2980B9'
  ];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const generateColorOptions = (target) => {
    const options = [target];
    while (options.length < 6) {
      const color = getRandomColor();
      if (!options.includes(color)) {
        options.push(color);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  };

 
  const handleColorGuess = (color) => {
    setShowAnimation(true);
    setIsCorrect(color === targetColor);
    
    if (color === targetColor) {
      setScore(prevScore => prevScore + 1);
      setGameStatus('Correct! 🎉');
    } else {
      setGameStatus('Wrong guess! Try again 😅');
    }

    setTimeout(() => {
      setShowAnimation(false);
      if (color === targetColor) {
        startNewGame();
      }
    }, 1500);
  };

  useEffect(() => {
    startNewGame();
  }, []);

//     setShowAnimation(true);
//     setIsCorrect(color === targetColor);
    
//     if (color === targetColor) {
//       setScore(prevScore => prevScore + 1);
//       setGameStatus('Correct! 🎉');
//     } else {
//       setGameStatus('Wrong guess! Try again 😅');
//     }

//     setTimeout(() => {
//       setShowAnimation(false);
//       if (color === targetColor) {
//         startNewGame();
//       }
//     }, 1500);
//   }

  return (
    <div className="game-container">
      <div className="game-wrapper">
        <div className="target-container">
          <div
            data-testid="colorBox"
            className="color-display"
            style={{ backgroundColor: targetColor }}
          />
        </div>
        <div className="color-options">
          {colorOptions.map((color, index) => (
            <button
              key={index}
              data-testid="colorOption"
              onClick={() => handleColorGuess(color)}
              className="color-option"
              style={{ backgroundColor: color }}
              disabled={showAnimation}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorGuessingGame;