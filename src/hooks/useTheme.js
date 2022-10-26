import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import LightTheme from '../theme/light-theme';
import DarkTheme from '../theme/dark-theme';
import {THEMES} from '../constants';

const useTheme = () => {
  const layoutState = useSelector(state => state.layoutReducer);
  const [selectedTheme, setSetlectedTheme] = useState(LightTheme);

  useEffect(() => {
    setSetlectedTheme(
      layoutState?.theme === THEMES.Light ? LightTheme : DarkTheme,
    );
  }, [layoutState]);

  return selectedTheme;
};

export default useTheme;
