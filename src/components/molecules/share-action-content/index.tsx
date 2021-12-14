import React, { useMemo } from 'react';
import { Icon, ListItem } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

import { userSelector } from '../../../reducers/user-reducer/user.reducer';
import { commentRepliesSelector } from '../../../reducers/comment-replies-reducer/comment-replies.reducer';
import { useTheme } from '../../../theme';

type ShareActionContentProps = {
  onReportPress: Function | any;
  onSharePress: Function | any;
  onCopyPress: Function | any;
  onEditPress: Function | any;
  onDeletePress: Function | any;
  ownerId: string;
};

const ShareActionContent: React.FC<ShareActionContentProps> = ({
  onReportPress,
  onSharePress,
  onCopyPress,
  onEditPress,
  onDeletePress,
  ownerId,
}) => {
  const { user } = useSelector(userSelector);
  const { isLoadingDeleteComment } = useSelector(commentRepliesSelector);
  const isOwner = useMemo(() => user.id === ownerId, [ownerId, user.id]);
  const { Gutters, Colors } = useTheme();
  const getActionData = (action: string) => {
    switch (action) {
      case 'edit':
        return { icon: 'square-edit-outline', text: 'Edit', function: onEditPress };
      case 'delete':
        return { icon: 'delete', text: 'Delete', function: onDeletePress };
      case 'share':
        return { icon: 'share-variant', text: 'Share', function: onSharePress };
      case 'copy':
        return { icon: 'content-copy', text: 'Copy Text', function: onCopyPress };

      case 'report':
        return { icon: 'flag-variant', text: 'Report', function: onReportPress };

      default:
        return { icon: '', text: '', function: () => {} };
    }
  };

  const renderContent = (action: string) => {
    return (
      <ListItem onPress={getActionData(action).function}>
        <Icon name={getActionData(action).icon} type="material-community" />
        <ListItem.Content>
          <ListItem.Title>{getActionData(action).text}</ListItem.Title>
        </ListItem.Content>
        {action === 'delete' && (
          <ActivityIndicator
            size={40}
            style={Gutters.smallTMargin}
            animating={isLoadingDeleteComment}
            color={Colors.darkGray}
          />
        )}
      </ListItem>
    );
  };

  return (
    <>
      {isOwner && renderContent('edit')}
      {isOwner && renderContent('delete')}
      {renderContent('share')}
      {renderContent('copy')}
      {!isOwner && renderContent('report')}
    </>
  );
};

export default ShareActionContent;
