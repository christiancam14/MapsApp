import {PropsWithChildren, useEffect} from 'react';
import {AppState, View} from 'react-native';
import {usePermissionStore} from '../store/permissions/usePermissionStore';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../navigation/StackNavigator';
export const PermissionChecker = ({children}: PropsWithChildren) => {
  const {locationStatus, checkLocationPermission} = usePermissionStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  useEffect(() => {
    if (locationStatus === 'granted') {
      navigation.reset({
        routes: [
          {
            name: 'MapScreen',
          },
        ],
      });
    } else if (locationStatus != 'undetermined') {
      navigation.reset({
        routes: [
          {
            name: 'PermissionScreen',
          },
        ],
      });
    }
  }, []);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  useEffect(() => {
    const suscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        checkLocationPermission();
      }
    });

    return () => {
      suscription.remove();
    };
  }, []);

  return <>{children}</>;
};
