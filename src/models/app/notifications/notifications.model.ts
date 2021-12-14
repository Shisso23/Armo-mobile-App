import _ from 'lodash';

export type NotificationProps = {
  id: any;
  message: String;
  datePublished: Date;
  seen: Boolean;
  title: string;
};

const sortNotifications = (apiNotifications: Array<NotificationProps>) => {
  return apiNotifications.sort((not1: Object, not2: Object) => {
    if (_.get(not1, 'datePublished', '') > _.get(not2, 'datePublished', '')) {
      return -1;
    }
    if (_.get(not1, 'datePublished', '') < _.get(not2, 'datePublished', '')) {
      return 1;
    }
    return 0;
  });
};

export const notificationModel = (_model?: NotificationProps) => ({
  id: _.get(_model, 'id', ''),
  title: _.get(_model, 'title', ''),
  message: _.get(_model, 'content', ''),
  datePublished: _.get(_model, 'createDate', new Date()),
  seen: _.get(_model, 'markedAsRead', false),
});

export const constructNotificationsModels = (apiNotificationModel: NotificationProps[]) =>
  sortNotifications(
    apiNotificationModel.map((notification: NotificationProps) => notificationModel(notification)),
  );
