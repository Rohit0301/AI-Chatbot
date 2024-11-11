import { useState, useEffect, Fragment, FC } from 'react';

interface Props {
  message: string;
  typingSpeed?: number;
  onComplete?: () => void; 
}

const LiveTypingEffect: FC<Props> = ({
  message,
  onComplete,
  typingSpeed = 50,
}): JSX.Element => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setDisplayedText((prev) => prev + message[currentIndex]);
      setCurrentIndex((prevIndex) => prevIndex + 1);

      if (currentIndex >= message.length - 1) {
        clearInterval(typingInterval);
        if (onComplete) onComplete(); 
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [message, typingSpeed, onComplete, currentIndex]);

  return <Fragment>{displayedText}</Fragment>;
};

export default LiveTypingEffect;
