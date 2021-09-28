import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

import { FormScreenContainer } from '../../../components';
import { ReplyToPostForm } from '../../../components/forms';
import { ReplyToPostModel, ReplyToPostProps } from '../../../models';
import { useTheme } from '../../../theme';
import { Colors } from '../../../theme/Variables';

const ReplyToPostScreen: React.FC = () => {
  const navigation = useNavigation();
  const { Gutters, Layout } = useTheme();

  const goBack = () => {
    navigation.goBack();
  };
  const onSubmit = async (formData: ReplyToPostProps) => {
    console.log(formData);
    return null;
  };

  useEffect(
    () =>
      navigation.setOptions({
        header: () => (
          <View style={[Layout.rowBetween, Gutters.largeHPadding, styles.emptyHeader]} />
        ),
      }),
    [Gutters.largeHPadding, Layout.rowBetween, navigation],
  );
  return (
    <FormScreenContainer
      contentContainerStyle={[Gutters.regularPadding, Layout.fill, Gutters.largeHPadding]}
    >
      <View style={[Layout.rowBetween, Gutters.largeBMargin]}>
        <Text style={styles.title}>Reply</Text>
        <Icon name="close-a" type="fontisto" size={17} onPress={goBack} />
      </View>
      <ReplyToPostForm submitForm={onSubmit} initialValues={ReplyToPostModel()} />
    </FormScreenContainer>
  );
};

const styles = StyleSheet.create({
  emptyHeader: {
    backgroundColor: Colors.white,
    height: 100,
  },
  title: { fontSize: 23, fontWeight: '500' },
});
export default ReplyToPostScreen;
