import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

export function useKeyboardHeight() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      event => {
        const {height} = event.endCoordinates;
        setKeyboardHeight(height);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  return {
    keyboardHeight,
    setKeyboardHeight,
  };
}
