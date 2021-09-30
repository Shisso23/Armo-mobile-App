import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text, Avatar } from 'react-native-elements';

import { Colors } from '../../../theme/Variables';
import { useTheme } from '../../../theme';
import _ from 'lodash';
import { promptConfirm } from '../../../helpers/prompt.helper';

type ImageThumbnailProps = {
  media: any;
  deleteImage: Function;
  imageSize: any;
};

const ImageThumbnail: React.FC<ImageThumbnailProps> = ({
  media,
  deleteImage = () => null,
  imageSize = 0,
}) => {
  const { Gutters, Layout, Common } = useTheme();
  return (
    <>
      {!_.isEmpty(media) && (
        <View
          style={[
            Layout.rowBetween,
            Common.inputWithRoundBorders,
            Layout.alignItemsCenter,
            Gutters.regularRPadding,
            styles.container,
          ]}
        >
          <Avatar source={{ uri: media }} title="uri" containerStyle={styles.avatar} />
          <Text numberOfLines={2} style={styles.imageUri}>
            {`${media.slice(0, 15)}...${media.slice(-11)}\n`}
            <Text style={styles.imageSize}>{`${imageSize} ${imageSize > 1000 ? 'MB' : 'KB'}`}</Text>
          </Text>

          <Icon
            name="trash-o"
            type="font-awesome"
            size={22}
            color={Colors.white}
            onPress={() => {
              promptConfirm('', 'Are you sure you want to delete this item?', 'Delete', () =>
                deleteImage(media),
              );
            }}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    height: 60,
    overflow: 'hidden',
    width: 75,
  },
  container: { backgroundColor: Colors.gray, bottom: 18, minHeight: 60, width: '100%' },
  imageSize: { color: Colors.white, opacity: 0.5 },
  imageUri: { color: Colors.white, fontSize: 16, maxHeight: 40 },
});
export default ImageThumbnail;
