import React, { createRef } from 'react';
import { View, Keyboard, StyleSheet } from 'react-native';
import { Text, Icon, Button } from 'react-native-elements';
import ActionSheet from 'react-native-actions-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '../../../theme/Variables';
import { openUserGallery, openUserCamera } from '../../../helpers/upload-media-helper/uploadMedia';
import UploadMediaSelectionItem from './upload-media-selection-item';
import useTheme from '../../../theme/hooks/useTheme';

type UploadMediaButtonProps = {
  onImageSelect: Function;
  errorMessage?: string;
  title: String;
  style: any;
  disabled: Boolean;
};
const actionSheetRef = createRef<{ setModalVisible: Function }>();
const UploadMediaButton: React.FC<UploadMediaButtonProps> = ({
  onImageSelect,
  errorMessage = '',
}) => {
  const { Common, Gutters } = useTheme();

  const openActionSheet = () => {
    Keyboard.dismiss();
    if (actionSheetRef.current !== null) {
      return actionSheetRef.current.setModalVisible(true);
    }
  };
  const closeActionSheet = () => actionSheetRef.current?.setModalVisible(false);

  const _handlePhotoLibrary = () => {
    openUserGallery().then((selectedImage) => {
      onImageSelect(selectedImage);
      closeActionSheet();
    });
  };

  const _handleCamera = () => {
    openUserCamera().then((cameraPhotos) => {
      onImageSelect(cameraPhotos);
      closeActionSheet();
    });
  };
  const insets = useSafeAreaInsets();
  const safeArea = {
    marginBottom: insets.bottom,
  };

  return (
    <>
      <Text style={[Common.errorStyle]}>{errorMessage}</Text>
      <Button
        type="outline"
        title="Upload Image/Video"
        icon={
          <Icon
            name="upload"
            color={Colors.gray}
            size={17}
            type="antdesign"
            style={Gutters.smallRMargin}
          />
        }
        onPress={openActionSheet}
        titleStyle={styles.uploadButtonTitle}
        buttonStyle={styles.uploadButtonStyle}
        containerStyle={[
          Gutters.regularBMargin,
          Common.submitButtonContainer,
          styles.uploadButtonContainer,
        ]}
        raised
      />

      <ActionSheet ref={actionSheetRef} gestureEnabled>
        <View style={safeArea}>
          <UploadMediaSelectionItem title="Take Photo" onPress={_handleCamera} />
          <UploadMediaSelectionItem
            title="Choose Photo From Library"
            onPress={_handlePhotoLibrary}
          />
          <UploadMediaSelectionItem title="Cancel" onPress={closeActionSheet} />
        </View>
      </ActionSheet>
    </>
  );
};

const styles = StyleSheet.create({
  uploadButtonContainer: {
    width: '100%',
  },
  uploadButtonStyle: {
    borderBottomWidth: 0.8,
    borderColor: Colors.gray,
    borderRadius: 20,
    borderWidth: 0.8,
  },
  uploadButtonTitle: { color: Colors.gray },
});

export default UploadMediaButton;
