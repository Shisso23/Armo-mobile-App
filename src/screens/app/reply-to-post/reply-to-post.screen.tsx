import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

import { ReplyToPostForm } from '../../../components/forms';
import { commentsService, postCommentsService } from '../../../services';
import { ReplyToPostModel, ReplyToPostProps } from '../../../models';
import { useTheme } from '../../../theme';

import _ from 'lodash';
import { FormScreenContainer } from '../../../components';

const { width } = Dimensions.get('window');
const ReplyToPostScreen = ({ route }: { route: { params: Object } }) => {
  const navigation = useNavigation();
  const { params } = route;
  const postId = _.get(params, 'post.id', '');
  const isPostReply = _.get(params, 'isPostReply', false);
  const { Gutters, Layout, Fonts } = useTheme();

  const goBack = () => {
    navigation.goBack();
  };
  const onSubmit = async (formData: ReplyToPostProps) => {
    if (isPostReply) {
      await postCommentsService.createPostComment(formData, postId);
    } else {
      await commentsService.createCommentReply(formData, postId);
    }
    return navigation.goBack();
  };

  return (
    <FormScreenContainer
      contentContainerStyle={[Gutters.regularPadding, Gutters.largeHPadding, styles.container]}
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
