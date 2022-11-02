import {createStackNavigator} from '@react-navigation/stack';

import {Screens} from '../../constants';
import {
  SplashScreen,
  HomeScreen,
  AuthorScreen,
  AuthorsListScreen,
  SpeakerScreen,
  SpeakersListScreen,
  StoryScreen,
  StoriesListScreen,
  TranslatorScreen,
  TranslatorsListScreen,
} from '../../screens';

const Stack = createStackNavigator();
const defaultScreenOption = {
  headerShown: false,
};

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Screens.SPLASH}
        component={SplashScreen}
        options={defaultScreenOption}
      />
      <Stack.Screen
        name={Screens.HOME}
        component={HomeScreen}
        options={defaultScreenOption}
      />
      <Stack.Screen
        name={Screens.STORY}
        component={StoryScreen}
        options={defaultScreenOption}
      />
      <Stack.Screen
        name={Screens.STORIES_LIST}
        component={StoriesListScreen}
        options={defaultScreenOption}
      />
      <Stack.Screen
        name={Screens.AUTHOR}
        component={AuthorScreen}
        options={defaultScreenOption}
      />
      <Stack.Screen
        name={Screens.AUTHORS_LIST}
        component={AuthorsListScreen}
        options={defaultScreenOption}
      />
      <Stack.Screen
        name={Screens.TRANSLATOR}
        component={TranslatorScreen}
        options={defaultScreenOption}
      />
      <Stack.Screen
        name={Screens.TRANSLATORS_LIST}
        component={TranslatorsListScreen}
        options={defaultScreenOption}
      />
      <Stack.Screen
        name={Screens.SPEAKER}
        component={SpeakerScreen}
        options={defaultScreenOption}
      />
      <Stack.Screen
        name={Screens.SPEAKERS_LIST}
        component={SpeakersListScreen}
        options={defaultScreenOption}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
