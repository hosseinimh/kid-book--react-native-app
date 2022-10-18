import {createStackNavigator} from '@react-navigation/stack';

import {
  HomeScreen,
  SpeakerScreen,
  SplashScreen,
  StoryScreen,
} from '../../screens';

const Stack = createStackNavigator();
const defaultScreenOption = {
  headerShown: false,
};

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={defaultScreenOption}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={defaultScreenOption}
      />
      <Stack.Screen
        name="Story"
        component={StoryScreen}
        options={defaultScreenOption}
      />
      <Stack.Screen
        name="Speaker"
        component={SpeakerScreen}
        options={defaultScreenOption}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
