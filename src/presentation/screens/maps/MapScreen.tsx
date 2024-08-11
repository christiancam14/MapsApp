import {StyleSheet, View} from 'react-native';
import {useLocationStore} from '../../store/location/useLocationStore';
import {LoadingScreen} from '../loading/LoadingScreen';
import {useEffect} from 'react';
import {Map} from '../../components/maps/Map';

export const MapScreen = () => {
  const {lastKnownLocation, getLocation} = useLocationStore();

  useEffect(() => {
    if (lastKnownLocation === null) {
      getLocation();
    }
  }, []);

  if (lastKnownLocation === null) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Map showsUserLocation initialLocation={lastKnownLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
