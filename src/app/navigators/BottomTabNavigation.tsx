import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../theme/variables';
import Home from '../screens/Home';
import paths from '../constants/routePaths';
import Movies from '../screens/Movies';

const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarActiveTintColor: colors.white[100],
  tabBarInactiveTintColor: colors.black[100],
  tabBarActiveBackgroundColor: colors.main[100],
  tabBarStyle: {
    elevation: 20,
    backgroundColor: colors.white[100],
    height: Platform.OS === 'android' ? 80 : 90,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: -15 },
    shadowColor: Platform.OS === 'android' ? '#000' : 'rgba(0, 0, 0, 0.05)',
    shadowOpacity: 24,
    shadowRadius: 24,
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 0,
  },
  tabBarItemStyle: {
    height: 50,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 30,
  },
  tabBarIconStyle: {
    width: 30,
    height: 30,
    color: colors.white[100],
  },
};

const BottomTabNavigation = () => {
  const tabScreens = [
    {
      name: paths.HOME,
      component: Home,
      options: {
        tabBarIcon: ({ color }: any) => (
          <Feather color={color} name="home" size={24} />
        ),
      },
    },
    {
      name: paths.MOVIES,
      component: Movies,
      options: {
        tabBarIcon: ({ color }: any) => (
          <Feather color={color} name="film" size={24} />
        ),
      },
    },
  ];

  return (
    <Tab.Navigator initialRouteName={paths.HOME} screenOptions={screenOptions}>
      {tabScreens.map(tab => (
        <Tab.Screen
          name={tab.name}
          component={tab.component}
          options={tab.options}
          key={tab.name}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;