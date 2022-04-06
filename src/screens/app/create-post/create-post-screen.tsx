import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { FormScreenContainer } from '../../../components';
import { CreatePostForm } from '../../../components/forms';
import { CreatePostModel, CreatePostProps } from '../../../models';
import { useTheme } from '../../../theme';
import { flashService, postsService } from '../../../services';
import { postsSelector } from '../../../reducers/posts-reducer/posts.reducer';
import { getCategoriesAction } from '../../../reducers/posts-reducer/posts.actions';

type CreatePostScreenProps = {
  route: { params: any };
};

const CreatePostScreen: React.FC<CreatePostScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { Gutters, Layout, Fonts } = useTheme();
  const dispatch = useDispatch();
  const { categories } = useSelector(postsSelector);
  const getPosts = _.get(route, 'params.getPosts', () => {});

  const goBack = () => {
    navigation.navigate('Home');
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
          <Icon name="close-a" type="fontisto" size={17} onPress={goBack} />
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    dispatch(getCategoriesAction());
  }, []);

  const onSubmit = async (formData: CreatePostProps) => {
    return postsService.createPost(formData).then((response) => {
      if (_.get(response, 'status', null) === 200 || _.get(response, 'status', null) === 204) {
        flashService.success('Post created successfully');
        getPosts();
        return goBack();
      }
      return null;
    });
  };

  return (
    <>
      <FormScreenContainer contentContainerStyle={[Gutters.regularPadding, Gutters.largeHPadding]}>
        <CreatePostForm
          submitForm={onSubmit}
          initialValues={CreatePostModel()}
          categories={categories}
        />
      </FormScreenContainer>
    </>
  );
};

const styles = StyleSheet.create({
  header: { height: 90 },
});
export default CreatePostScreen;
