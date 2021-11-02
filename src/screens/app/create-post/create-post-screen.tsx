import React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

import { FormScreenContainer } from '../../../components';
import { CreatePostForm } from '../../../components/forms';
import { CreatePostModel, CreatePostProps } from '../../../models';
import { useTheme } from '../../../theme';
import { postsService } from '../../../services';

const { width } = Dimensions.get('window');

const CreatePostScreen: React.FC = () => {
  const navigation = useNavigation();
  const { Gutters, Layout, Fonts } = useTheme();

  const goBack = () => {
    navigation.goBack();
  };
  const onSubmit = async (formData: CreatePostProps) => {
    const response = await postsService.createPost(formData);
    if (response !== undefined) {
      goBack();
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
        <Text style={Fonts.title}>Create Post</Text>
        <Icon name="close-a" type="fontisto" size={17} onPress={goBack} />
      </View>

      <CreatePostForm submitForm={onSubmit} initialValues={CreatePostModel()} />
    </FormScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: width * 0.17 },
});
export default CreatePostScreen;
