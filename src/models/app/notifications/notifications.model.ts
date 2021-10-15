import _ from 'lodash';

export type NotificationProps = {
  id: any;
  message: String;
  seenAt: Date;
  seen: Boolean;
};

export const notificationModel = (_model?: NotificationProps) => ({
  id: _.get(_model, 'id', ''),
  message: _.get(_model, 'message', ''),
  sentAt: _.get(_model, 'sent_at', new Date()),
  seen: _.get(_model, 'seen', false),
});

export const constructNotificationsModels = (apiNotificationModel: NotificationProps) =>
  apiNotificationModel.map((notification: NotificationProps) => notificationModel(notification));
