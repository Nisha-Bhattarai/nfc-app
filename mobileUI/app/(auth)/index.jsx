import * as React from 'react';
import { getSession } from '../../utils/sessionStorage'; 

import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import { TabView } from 'react-native-tab-view';
import Login from './login';
import CreateAccount from './create-account';
import Colors from '../../constants/Colors';

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
  const [index, setIndex] = React.useState(1);

  React.useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session?.isSecondLogin) {
        setIndex(0); 
      }
    };
    checkSession();
  }, []);

  const renderTabBar = (props) => {
    const { navigationState, position, jumpTo } = props;

    return (
      <View style={styles.tabBarContainer}>
        {navigationState.routes.map((route, i) => {
          const isActive = index === i;
          const inputRange = navigationState.routes.map((_, idx) => idx);
          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) => (inputIndex === i ? 1 : 0.6)),
          });

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => jumpTo(route.key)}
              style={[styles.tabItem, isActive && styles.activeTabItem]}
            >
              <Animated.Text style={[styles.tabText, isActive && styles.activeTabText, { opacity }]}>
                {route.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  // Dynamic text based on selected tab
  const titleText = index === 0 ? 'Welcome Back' : 'Get Started Now';
  const subtitleText =
    index === 0
      ? 'Sign In to access your account'
      : 'Create an account or Sign In to explore our app';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{titleText}</Text>
      <Text style={styles.subtitle}>{subtitleText}</Text>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Poppins_700Bold'
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Poppins_400Regular'
  },
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.secondary,
    marginHorizontal: 16,
    borderRadius: 30,
    height: 65,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    marginHorizontal: 4,
    borderRadius: 30,
  },
  activeTabItem: {
    backgroundColor: Colors.accent,
  },
  tabText: {
    fontSize: 16,
    color: Colors.textPrimary,
    fontFamily: 'Lato_400Regular'
  },
  activeTabText: {
    color: Colors.white,
    fontWeight: '600',
  },
});
