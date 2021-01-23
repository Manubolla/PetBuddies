/* import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; */
import { StackNavigationProp } from '@react-navigation/stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';

export type RootStackParamList = {
    WalkerCard: undefined;
    Prueba: undefined;
    UserPannel: undefined;
    UserFormScreen:undefined;
    HomeScreen: undefined;
    Home: undefined;
    Drawer: undefined;
  };

export type RouteStackParamList<T extends keyof RootStackParamList> = {
  navigation:  DrawerNavigationProp<RootStackParamList, T>
}