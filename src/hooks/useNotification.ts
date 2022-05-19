import {
  NotificationContext,
  NotificationType,
} from 'contextProviders/NotificationContextProvider';
import React from 'react';

export default function useNotification(): NotificationType {
  return React.useContext(NotificationContext);
}
