import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {PropsWithChildren} from 'react';
import {StackNavigator} from './presentation/navigation/StackNavigator';
import {PermissionChecker} from './presentation/providers/PermissionsChecker';

export const MapsApp = () => {
  return (
    <NavigationContainer>
      <PermissionChecker>
        <StackNavigator />
      </PermissionChecker>
    </NavigationContainer>
  );
};
