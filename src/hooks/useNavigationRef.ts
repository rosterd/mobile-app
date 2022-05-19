import {NavigationContainerRef} from '@react-navigation/native';
import React from 'react';
const navigationRef = React.createRef<NavigationContainerRef>();

export function useNavigationRef(): typeof navigationRef {
  return navigationRef;
}
