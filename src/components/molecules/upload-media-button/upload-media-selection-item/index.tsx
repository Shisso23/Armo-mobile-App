import React from 'react';
import { ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';

type UploadMediaSelectionItemProps = {
  title: string;
  onPress?: Function;
};

const UploadMediaSelectionItem: React.FC<UploadMediaSelectionItemProps> = ({ title, onPress }) => {
  return (
    <ListItem bottomDivider onPress={onPress}>
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};

UploadMediaSelectionItem.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

UploadMediaSelectionItem.defaultProps = {};

export default UploadMediaSelectionItem;
