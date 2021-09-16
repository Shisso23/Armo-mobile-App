import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text, Avatar } from 'react-native-elements';

import { Colors } from '../../../theme/Variables';
import { useTheme } from '../../../theme';

type ImageThumbnailProps = {
  image: any;
};

const ImageThumbnail: React.FC<ImageThumbnailProps> = ({ image }) => {
  const { Gutters, Layout, Common } = useTheme();
  return (
    <>
      <View
        style={[
          Layout.rowBetween,
          Common.inputWithRoundBorders,
          Layout.alignItemsCenter,
          Gutters.regularRPadding,
          styles.container,
        ]}
      >
        <Avatar source={{ uri: image.uri }} title="uri" containerStyle={styles.avatar} />
        <Text style={styles.imageUri}>Image source uri</Text>
        <Icon name="trash-o" type="font-awesome" size={22} color={Colors.white} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  avatar: { backgroundColor: Colors.primary, borderRadius: 15, height: 60, width: 90 },
  container: { backgroundColor: Colors.gray, bottom: 18, minHeight: 60, width: '100%' },
  imageUri: { color: Colors.white, fontSize: 16 },
});
export default ImageThumbnail;
