import React from 'react';
import { Icon, ListItem } from 'react-native-elements';

type ShareActionContentProps = {
  onReportPress: Function | any;
  onSharePress: Function | any;
  onCopyPress: Function | any;
};

const ShareActionContent: React.FC<ShareActionContentProps> = ({
  onReportPress,
  onSharePress,
  onCopyPress,
}) => {
  const getActionData = (action: string) => {
    switch (action) {
      case 'share':
        return { icon: 'share-variant', text: 'Share', function: onSharePress };
      case 'copy':
        return { icon: 'content-copy', text: 'Copy Text', function: onCopyPress };

      case 'report':
        return { icon: 'flag-variant', text: 'Report', function: onReportPress };

      default:
        return {};
    }
  };

  const renderContent = (action: string) => {
    return (
      <ListItem onPress={getActionData(action).function}>
        <Icon name={getActionData(action).icon} type="material-community" />
        <ListItem.Content>
          <ListItem.Title>{getActionData(action).text}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <>
      {renderContent('share')}
      {renderContent('copy')}
      {renderContent('report')}
    </>
  );
};

export default ShareActionContent;
