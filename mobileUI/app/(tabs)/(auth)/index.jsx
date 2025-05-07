import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Login from './login';
import CreateAccount from './create-account';

const renderScene = ({ route }) => {
    switch (route.key) {
      case 'login':
        return <Login />;
      case 'create-account':
        return <CreateAccount />;
      default:
        return null;
    }
  };
  

const routes = [
  { key: 'login', title: 'Sign In' },
  { key: 'create-account', title: 'Create an Account' },
];

export default function AuthTabView() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}