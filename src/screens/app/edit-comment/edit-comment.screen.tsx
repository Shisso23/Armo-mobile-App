import React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

import { FormScreenContainer } from '../../../components';
import { EditCommentForm } from '../../../components/forms';
import { editCommentModel, EditCommentProps } from '../../../models';
import { useTheme } from '../../../theme';
import _ from 'lodash';
import { commentsService } from '../../../services';

const { width } = Dimensions.get('window');

const EditCommentScreen = ({ route }: { route: Object }) => {
  const navigation = useNavigation();
  const { Gutters, Layout, Fonts } = useTheme();
  const comment = _.get(route, 'params.comment', {});
  const id = _.get(comment, 'id', '');

  const goBackToPost = async () => {
    navigation.goBack();
  };
  const onSubmit = async (formData: EditCommentProps) => {
    try {
      await commentsService.editComment(formData, id);
      navigation.goBack();
    } catch (error) {
      Promise.reject(error);
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
        <Text style={Fonts.title}>Edit Comment</Text>
        <Icon name="close-a" type="fontisto" size={17} onPress={goBackToPost} />
      </View>

      <EditCommentForm submitForm={onSubmit} initialValues={editCommentModel()} />
    </FormScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: width * 0.17 },
});
export default EditCommentScreen;
