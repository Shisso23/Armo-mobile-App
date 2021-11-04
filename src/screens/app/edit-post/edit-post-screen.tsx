import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import { FormScreenContainer } from '../../../components';
import { EditPostForm } from '../../../components/forms';
import { editPostModel, EditPostProps } from '../../../models';
import { useTheme } from '../../../theme';
import { editPostAction, getPostAction } from '../../../reducers/posts-reducer/posts.actions';
import _ from 'lodash';

const EditPostScreen = ({ route }: { route: Object }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { Gutters, Layout, Fonts } = useTheme();
  const post = _.get(route, 'params.post', {});
  const id = _.get(post, 'id', '');

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <View
          style={[
            Layout.rowBetween,
            styles.header,
            Gutters.regularBMargin,
            Gutters.regularHMargin,
            Layout.alignItemsEnd,
          ]}
        >
          <Text style={Fonts.title}>Edit Post</Text>
          <Icon name="close-a" type="fontisto" size={17} onPress={() => navigation.goBack()} />
        </View>
      ),
    });
  }, [
    Fonts.title,
    Gutters.regularBMargin,
    Gutters.regularHMargin,
    Layout.alignItemsEnd,
    Layout.rowBetween,
    navigation,
  ]);

  const onSubmit = async (formData: EditPostProps) => {
    try {
      await dispatch(editPostAction(formData, id));
      const editedPost = await dispatch(getPostAction(id));
      navigation.navigate('ViewPost', { post: editedPost });
    } catch (error) {
      return error;
    }
  };

  return (
    <FormScreenContainer contentContainerStyle={[Gutters.regularPadding, Gutters.largeHPadding]}>
      <EditPostForm submitForm={onSubmit} initialValues={editPostModel()} />
    </FormScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: { height: 90 },
});
export default EditPostScreen;
