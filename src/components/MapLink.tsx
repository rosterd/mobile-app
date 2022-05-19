import React from 'react';
import {Linking, Platform, TouchableOpacity} from 'react-native';
import Facility from 'types/Facility';

type MapLinkProps = Pick<Facility, 'lat' | 'long' | 'location'>;

const MapLink: React.FC<MapLinkProps> = ({lat, long, location, children}) => {
  const scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
  const url = scheme + `${lat},${long}?q=${location}&`;
  const onPress = () => {
    Linking.openURL(url);
  };
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default MapLink;
