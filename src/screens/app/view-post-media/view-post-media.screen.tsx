import React, { useEffect, useMemo, useState } from 'react';
import { View, Dimensions, StyleSheet, Alert, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Icon, Image, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import useTheme from '../../../theme/hooks/useTheme';
import { getNotificationsAction } from '../../../reducers/notifications-reducer/notifications.actions';
import { Colors } from '../../../theme/Variables';
import { attachementsService } from '../../../services';
import { shareContent } from '../../../helpers/download-share-content-helper';

const { width } = Dimensions.get('window');
const ViewPostMediaScreen = ({ route }: { route: Object }) => {
  const { Layout, Gutters, Common } = useTheme();
  const navigation = useNavigation();
  const attachment = _.get(route, 'params.item', undefined);
  const url = _.get(attachment, 'uri', '');
  const filename = useMemo(() => url.substring(url.lastIndexOf('/') + 1), [url]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const postId = _.get(route, 'params.postId', '');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotificationsAction());
  }, [dispatch]);

  const deleteImage = async () => {
    setDeleting(true);
    await attachementsService.deleteAttachment(postId, filename);
    setDeleting(false);
    navigation.navigate('Forums');
  };

  const handleDeleteImage = () => {
    Alert.alert(
      'Are you sure?',
      'Delete this image?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: deleteImage,
        },
      ],
      { cancelable: false },
    );
  };

  const handleShare = () => {
    shareContent({ filename, content: '', url, headers: _.get(attachment, 'headers', {}) });
  };

  return (
    <View style={[Gutters.regularPadding, Gutters.regularHPadding, Layout.fill, styles.container]}>
      <Icon
        name="arrow-left"
        type="material-community"
        size={30}
        onPress={() => navigation.goBack()}
        style={Layout.alignSelfStart}
      />

      <Image
        source={attachment}
        style={[styles.image, Layout.alignSelfCenter, Gutters.largeTMargin]}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        PlaceholderContent={
          <>
            <ActivityIndicator animating={true} color={Colors.secondary} size={40} />
            <Text style={[styles.loadingText, Gutters.regularTMargin]}>Loading image...</Text>
          </>
        }
      />
      <View style={[styles.bottomView, Gutters.smallBPadding]}>
        <Button
          title="Download"
          icon={
            <Icon
              name="download"
              size={15}
              color={Colors.white}
              type="font-awesome"
              style={Gutters.smallRMargin}
            />
          }
          onPress={handleShare}
          disabled={isLoading}
          titleStyle={Common.submitButtonTitle}
          containerStyle={[Common.submitButtonContainer, styles.postButton]}
          buttonStyle={Common.submitButton}
          raised
        />
        {(!isLoading && !deleting && (
          <Icon
            name="trash"
            color={Colors.darkGray}
            type="fontisto"
            size={45}
            containerStyle={Gutters.smallTMargin}
            onPress={handleDeleteImage}
          />
        )) ||
          (deleting && (
            <ActivityIndicator
              animating={true}
              color={Colors.secondary}
              size={40}
              style={Gutters.smallTMargin}
            />
          ))}
      </View>
    </View>
  );
};

ViewPostMediaScreen.propTypes = {};

ViewPostMediaScreen.defaultProps = {};

const styles = StyleSheet.create({
  bottomView: { bottom: 25, left: 10, position: 'absolute', right: 10 },
  container: { paddingTop: width * 0.17 },
  image: { height: '82%' },
  loadingText: { fontSize: 23 },
  postButton: { position: 'relative', width: '100%' },
});

export default ViewPostMediaScreen;
