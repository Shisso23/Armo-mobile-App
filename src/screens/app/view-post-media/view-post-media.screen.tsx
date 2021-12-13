import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { ActivityIndicator, Menu } from 'react-native-paper';
import { Icon, Image, ListItem } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import useTheme from '../../../theme/hooks/useTheme';
import { getNotificationsAction } from '../../../reducers/notifications-reducer/notifications.actions';
import { Colors } from '../../../theme/Variables';
import { attachementsService } from '../../../services';
import { shareContent } from '../../../helpers/download-share-content-helper';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';

const { width } = Dimensions.get('window');
const ViewPostMediaScreen = ({ route }: { route: Object }) => {
  const { Layout, Gutters } = useTheme();
  const navigation = useNavigation();
  const attachment = _.get(route, 'params.item', undefined);
  const { user } = useSelector(userSelector);
  const owner = _.get(route, 'params.owner', '');
  const isOwner = useMemo(() => user.id === owner.id, [owner.id, user.id]);
  const url = _.get(attachment, 'uri', '');
  const filename = useMemo(() => url.substring(url.lastIndexOf('/') + 1), [url]);
  const [deleting, setDeleting] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const postId = _.get(route, 'params.postId', '');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotificationsAction());
  }, []);

  const deleteImage = async () => {
    setDeleting(true);
    await attachementsService.deleteAttachment(postId, filename);
    setDeleting(false);
    navigation.navigate('Home');
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
    setModalVisible(false);
  };

  const handleShare = () => {
    shareContent({ filename, content: '', url, headers: _.get(attachment, 'headers', {}) });
    setModalVisible(false);
  };

  const hidePostOptionsModal = () => {
    setModalVisible(false);
  };

  const showPostOptionsModal = () => setModalVisible(true);

  const goBack = () => navigation.goBack();

  const renderModal = () => {
    return (
      <Menu
        style={[Layout.alignSelfCenter, styles.menu]}
        visible={modalVisible}
        onDismiss={hidePostOptionsModal}
        anchor={
          <Icon
            name="dots-vertical"
            type="material-community"
            onPress={showPostOptionsModal}
            style={Layout.alignSelfEnd}
          />
        }
        contentStyle={styles.modalContent}
      >
        <ListItem>
          <ListItem.Content>
            <ListItem.Title style={styles.modalTitle}>Image</ListItem.Title>
          </ListItem.Content>
          <Icon name="md-close-circle-outline" type="ionicon" onPress={hidePostOptionsModal} />
        </ListItem>

        <>
          <ActivityIndicator
            animating={deleting}
            color={Colors.lightGray}
            style={styles.loadingIndicator}
            size={25}
          />
          {isOwner && (
            <TouchableOpacity style={Gutters.regularMargin} onPress={handleDeleteImage}>
              <Text>Delete Image</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={Gutters.regularMargin} onPress={handleShare}>
            <Text>Download image</Text>
          </TouchableOpacity>
        </>
      </Menu>
    );
  };

  return (
    <View style={[Gutters.regularPadding, Gutters.regularHPadding, Layout.fill, styles.container]}>
      <View style={Layout.rowBetween}>
        <Icon name="arrow-left" type="material-community" size={30} onPress={goBack} />
        {renderModal()}
      </View>

      <Image
        source={attachment}
        style={[styles.image, Layout.alignSelfCenter, Gutters.largeTMargin]}
        PlaceholderContent={
          <>
            <ActivityIndicator animating={true} color={Colors.secondary} size={40} />
            <Text style={[styles.loadingText, Gutters.regularTMargin]}>Loading image...</Text>
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: width * 0.17 },
  image: { height: '88%' },
  loadingIndicator: {
    alignSelf: 'center',
    position: 'absolute',
  },
  loadingText: { fontSize: 23 },
  menu: {
    ...Platform.select({
      android: { backgroundColor: Colors.transparent },
      ios: {},
    }),
    borderRadius: 15,
    marginBottom: 100,
    shadowColor: Colors.black,
    shadowOffset: {
      height: 0.2,
      width: 0.2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 2,
    top: '35%',
    width: '80%',
  },
  modalContent: { borderRadius: 15, height: '100%', width: '100%' },
  modalTitle: { fontWeight: Platform.OS === 'ios' ? '600' : 'bold' },
});

export default ViewPostMediaScreen;
