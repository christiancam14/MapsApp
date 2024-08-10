import {Pressable, Text, View} from 'react-native';
import {styles} from '../../../config/theme/styles';
import {usePermissionStore} from '../../store/permissions/usePermissionStore';

export const PermissionScreen = () => {
  const {locationStatus, requestLocationPermission} = usePermissionStore();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Habilitar Hubicación</Text>

      <Pressable style={styles.btnPrimary} onPress={requestLocationPermission}>
        <Text style={{color: 'white'}}>Habilitar localización</Text>
      </Pressable>

      <Text>Estado actual: {locationStatus}</Text>
    </View>
  );
};
