import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

import { FormScreenContainer } from '../../../components';
import { ReplyToPostForm } from '../../../components/forms';
import { commentsService } from '../../../services';
import { ReplyToPostModel, ReplyToPostProps } from '../../../models';
import { useTheme } from '../../../theme';
import { createPostCommentAction } from '../../../reducers/post-comments-reducer/post-comments.actions';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

const { width } = Dimensions.get('window');
const ReplyToPostScreen = ({ route }: { route: { params: Object } }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { params } = route;
  const postId = _.get(params, 'post.id', '');
  const isPostReply = _.get(params, 'isPostReply', false);
  const { Gutters, Layout, Fonts } = useTheme();

  const goBack = () => {
    navigation.goBack();
  };
  const onSubmit = async (formData: ReplyToPostProps) => {
    if (isPostReply) {
      dispatch(createPostCommentAction(formData, postId));
    } else {
      commentsService.createCommentReply(formData, postId);
    }

    return null;
  };

  return (
    <FormScreenContainer
      contentContainerStyle={[
        Gutters.regularPadding,
        Layout.fill,
        Gutters.largeHPadding,
        styles.container,
      ]}
    >
      <View style={[Layout.rowBetween, Gutters.largeBMargin]}>
        <Text style={Fonts.title}>Reply</Text>
        <Icon name="close-a" type="fontisto" size={17} onPress={goBack} />
      </View>
      <ReplyToPostForm submitForm={onSubmit} initialValues={ReplyToPostModel()} />
    </FormScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: width * 0.17 },
});
export default ReplyToPostScreen;
