import React, { useEffect } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import useTheme from '../../../theme/hooks/useTheme';
import { getNotificationsAction } from '../../../reducers/notifications-reducer/notifications.actions';

const { width } = Dimensions.get('window');
const PostImageScreeen = ({ route }: { route: Object }) => {
  const { Layout, Gutters } = useTheme();
  const navigation = useNavigation();
  const uri = _.get(route, 'params.uri', undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotificationsAction());
  }, [dispatch]);

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
        source={uri ? { uri } : undefined}
        style={[styles.image, Layout.alignSelfCenter, Gutters.largeTMargin]}
      />
      <Icon
        name="download"
        type="feather"
        size={50}
        style={[Layout.alignSelCenter, Gutters.regularBMargin]}
      />
    </View>
  );
};

PostImageScreeen.propTypes = {};

PostImageScreeen.defaultProps = {};

const styles = StyleSheet.create({
  container: { paddingTop: width * 0.17 },
  image: { height: '82%' },
});

export default PostImageScreeen;
