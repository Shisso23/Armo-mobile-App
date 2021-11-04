import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

import { FormScreenContainer } from '../../../components';
import { CreatePostForm } from '../../../components/forms';
import { CreatePostModel, CreatePostProps } from '../../../models';
import { useTheme } from '../../../theme';
import { postsService } from '../../../services';

const CreatePostScreen: React.FC = () => {
  const navigation = useNavigation();
  const { Gutters, Layout, Fonts } = useTheme();

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <View
          style={[
            Layout.rowBetween,
            Gutters.regularBMargin,
            Gutters.regularHMargin,
            Layout.alignItemsEnd,
            styles.header,
          ]}
        >
          <Text style={Fonts.title}>Create Post</Text>
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

  const onSubmit = async (formData: CreatePostProps) => {
    const response = await postsService.createPost(formData);
    if (response !== undefined) {
      goBack();
    }
  };

  return (
    <>
      <FormScreenContainer contentContainerStyle={[Gutters.regularPadding, Gutters.largeHPadding]}>
        <CreatePostForm submitForm={onSubmit} initialValues={CreatePostModel()} />
      </FormScreenContainer>
    </>
  );
};

const styles = StyleSheet.create({
  header: { height: 90 },
});
export default CreatePostScreen;
