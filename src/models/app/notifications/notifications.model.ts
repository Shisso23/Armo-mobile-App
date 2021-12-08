import _ from 'lodash';

export type NotificationProps = {
  id: any;
  message: String;
  datePublished: Date;
  seen: Boolean;
  title: string;
};

export const notificationModel = (_model?: NotificationProps) => ({
  id: _.get(_model, 'id', ''),
  title: _.get(_model, 'title', ''),
  message: _.get(_model, 'content', ''),
  datePublished: _.get(_model, 'createDate', new Date()),
  seen: _.get(_model, 'markedAsRead', false),
});

export const constructNotificationsModels = (apiNotificationModel: NotificationProps[]) =>
  apiNotificationModel.map((notification: NotificationProps) => notificationModel(notification));
