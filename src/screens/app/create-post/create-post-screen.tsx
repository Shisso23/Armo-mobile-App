import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Text, Icon } from 'react-native-elements';

import { FormScreenContainer } from '../../../components';
import { CreatePostForm } from '../../../components/forms';
import { CreatePostModel, CreatePostProps } from '../../../models';
import { useTheme } from '../../../theme';

const { width } = Dimensions.get('window');

const CreatePostScreen: React.FC = () => {
  const { Gutters, Layout } = useTheme();
  const onSubmit = async (formData: CreatePostProps) => {
    console.log(formData);
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
        <Text style={styles.title}>Create Post</Text>
        <Icon name="times" type="font-awesome-5" size={25} />
      </View>

      <CreatePostForm submitForm={onSubmit} initialValues={CreatePostModel()} />
    </FormScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: width * 0.17 },
  title: { fontSize: 23, fontWeight: '800' },
});
export default CreatePostScreen;
