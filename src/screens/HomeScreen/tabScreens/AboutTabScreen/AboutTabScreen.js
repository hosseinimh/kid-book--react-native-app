import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';

import {THEMES} from 'constants';

const AboutTabScreen = () => {
  const [theme, setTheme] = useState(THEMES.Light);
  const layoutState = useSelector(state => state.layoutReducer);

  useEffect(() => {
    setTheme(layoutState?.theme);
  }, [layoutState]);

  return (
    <>
      <Text style={{color: theme === THEMES.Light ? '#000' : '#fff'}}>
        Mahmoud Hosseini
      </Text>
    </>
  );
};

export default AboutTabScreen;
