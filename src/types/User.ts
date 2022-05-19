import {AvailableDays} from './AvailableDays';

export interface User {
  email: string;
  idmUserName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  availableDays: AvailableDays;
  shift: {
    dayShift: boolean;
    nightShift: boolean;
  };
  turnAllNotificationsOff: boolean;
  city: string;
  deviceId: string;
}
