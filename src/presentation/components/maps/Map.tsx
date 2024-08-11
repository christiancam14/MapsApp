import {Platform} from 'react-native';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {Location} from '../../../infraestructure/interfaces/location';
import {FAB} from '../ui/FAB';
import {useEffect, useRef, useState} from 'react';
import {useLocationStore} from '../../store/location/useLocationStore';

interface Props {
  showsUserLocation?: boolean;
  initialLocation: Location;
}

export const Map = ({showsUserLocation = true, initialLocation}: Props) => {
  const mapRef = useRef<MapView>();

  const cameraLocation = useRef<Location>(initialLocation);
  const [isFollowingUser, setIsFollowingUser] = useState(true);
  const [isShowingPolyline, setIsShowingPolyline] = useState(true);

  const {
    getLocation,
    lastKnownLocation,
    watchLocation,
    clearWatchLocation,
    userLocationsList,
  } = useLocationStore();

  const moveCamaraToLocation = (location: Location) => {
    if (!mapRef.current) return;

    mapRef.current.animateCamera({
      center: location,
    });
  };

  const moveToCurrentLocation = async () => {
    if (!lastKnownLocation) {
      moveCamaraToLocation(initialLocation);
    }

    const location = await getLocation();

    if (!location) return;

    moveCamaraToLocation(location);
  };

  useEffect(() => {
    watchLocation();

    return () => {
      clearWatchLocation();
    };
  }, []);

  useEffect(() => {
    if (lastKnownLocation && isFollowingUser) {
      moveCamaraToLocation(lastKnownLocation);
    }
  }, [lastKnownLocation, isFollowingUser]);

  return (
    <>
      <MapView
        ref={map => (mapRef.current = map!)}
        showsUserLocation={showsUserLocation}
        provider={Platform.OS === 'ios' ? undefined : PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{flex: 1}}
        onTouchStart={() => setIsFollowingUser(false)}
        region={{
          latitude: cameraLocation.current.latitude,
          longitude: cameraLocation.current.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {/* <Marker coordinate={{
                latitude: 5.937977881635626, 
                longitude: -73.61025647938278
            }}
            image={require('../../../assets/custom-marker.png')}
            title='Test' 
            description='Test'
            /> */}
        {isShowingPolyline && (
          <Polyline
            coordinates={userLocationsList}
            strokeColor="black"
            strokeWidth={5}
          />
        )}
      </MapView>
      <FAB
        onPress={() => setIsShowingPolyline(!isShowingPolyline)}
        iconName={isShowingPolyline ? 'eye-outline' : 'eye-off-outline'}
        style={{
          bottom: 140,
          right: 20,
        }}
      />
      <FAB
        onPress={() => setIsFollowingUser(!isFollowingUser)}
        iconName={isFollowingUser ? 'walk-outline' : 'accessibility-outline'}
        style={{
          bottom: 80,
          right: 20,
        }}
      />
      <FAB
        onPress={moveToCurrentLocation}
        iconName="compass-outline"
        style={{
          bottom: 20,
          right: 20,
        }}
      />
    </>
  );
};
