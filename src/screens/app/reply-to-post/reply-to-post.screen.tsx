import React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

import { FormScreenContainer } from '../../../components';
import { ReplyToPostForm } from '../../../components/forms';
import { ReplyToPostModel, ReplyToPostProps } from '../../../models';
import { useTheme } from '../../../theme';

const { width } = Dimensions.get('window');

const ReplyToPostScreen: React.FC = () => {
  const navigation = useNavigation();
  const { Gutters, Layout, Fonts } = useTheme();

  const goBack = () => {
    navigation.goBack();
  };
  const onSubmit = async (formData: ReplyToPostProps) => {
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
