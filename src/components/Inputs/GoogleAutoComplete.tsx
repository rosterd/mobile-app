import React from 'react';
import {
  GooglePlaceData,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';
import {TextInputProps} from 'react-native';

const API_KEY = Constants.manifest?.extra?.GOOGLE_AUTOCOMPLETE_API_KEY;

interface AutoCompleteProps {
  placeholder: string;
  onPress?: (data: GooglePlaceData) => void;
  styles?: Record<string, unknown>;
  textInputProps: TextInputProps;
}

const GoogleAutoComplete: React.FC<AutoCompleteProps> = ({
  placeholder,
  styles,
  textInputProps,
  onPress,
}) => {
  return (
    <GooglePlacesAutocomplete
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
      }}
      debounce={200}
      fetchDetails={false}
      filterReverseGeocodingByTypes={[
        // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        'locality',
        'administrative_area_level_3',
      ]}
      minLength={1} // minimum length of text to search
      nearbyPlacesAPI='GoogleReverseGeocoding'
      placeholder={placeholder}
      onPress={onPress}
      query={{
        key: API_KEY,
        language: 'en',
        types: '(cities)',
        components: 'country:nz',
      }}
      styles={styles}
      textInputProps={textInputProps}
    />
  );
};

export default GoogleAutoComplete;
