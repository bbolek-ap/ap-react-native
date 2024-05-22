import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProjectList from './pages/project-list.tsx';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {createStackNavigator} from '@react-navigation/stack';
import ProjectDetails from './pages/project-details.tsx';
import ProjectForm from './pages/project-form.tsx';
import Toast from 'react-native-toast-message';
import PhotosScreen from './pages/photos-screen.tsx';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function App(): React.JSX.Element {
  const queryClient = new QueryClient();
  const Settings = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: '#000000'}}>Settings!</Text>
      </View>
    );
  };

  const ProjectsStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="ProjectList"
          component={ProjectList}
          options={{title: 'Projects'}}
        />
        <Stack.Screen
          name="ProjectDetails"
          component={ProjectDetails}
          options={{title: 'Project Details'}}
        />
        <Stack.Screen
          name="ProjectForm"
          component={ProjectForm}
          options={{title: 'Edit Project'}}
        />
      </Stack.Navigator>
    );
  };

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Tab.Navigator
            barStyle={{
              backgroundColor: '#2d2d2d',
              borderTopWidth: 1,
              borderTopColor: '#444',
              height: 120,
              paddingTop: 5,
            }}
            labeled={false}
            activeColor="#f0edf6"
            inactiveColor="#929292">
            <Tab.Screen
              name="Projects"
              component={ProjectsStack}
              options={{
                tabBarLabel: 'Projects',
                tabBarIcon: ({color, focused}) => (
                  <MaterialCommunityIcons
                    name="home"
                    color={focused ? '#000000' : color}
                    size={28}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Photos"
              component={PhotosScreen}
              options={{
                tabBarLabel: 'Settings',
                tabBarIcon: ({color, focused}) => (
                  <MaterialCommunityIcons
                    name="cog"
                    color={focused ? '#000000' : color}
                    size={28}
                  />
                ),
              }}
            />
          </Tab.Navigator>
          <Toast />
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
export default App;
