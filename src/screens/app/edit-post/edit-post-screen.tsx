import React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import { FormScreenContainer } from '../../../components';
import { EditPostForm } from '../../../components/forms';
import { editPostModel, EditPostProps } from '../../../models';
import { useTheme } from '../../../theme';
import { editPostAction, getPostAction } from '../../../reducers/posts-reducer/posts.actions';
import _ from 'lodash';

const { width } = Dimensions.get('window');

const EditPostScreen = ({ route }: { route: Object }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { Gutters, Layout, Fonts } = useTheme();
  const post = _.get(route, 'params.post', {});
  const id = _.get(post, 'id', '');

  const goBackToPost = async () => {
    const editedPost = await dispatch(getPostAction(id));
    navigation.navigate('ViewPost', { post: editedPost });
  };
  const onSubmit = async (formData: EditPostProps) => {
    try {
      await dispatch(editPostAction(formData, id));
      await goBackToPost();
    } catch (error) {
      console.warn(error);
    }
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
        <Text style={Fonts.title}>Edit Post</Text>
        <Icon name="close-a" type="fontisto" size={17} onPress={goBackToPost} />
      </View>

      <EditPostForm submitForm={onSubmit} initialValues={editPostModel()} />
    </FormScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: width * 0.17 },
});
export default EditPostScreen;
