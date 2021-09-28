import React, { useState, createRef } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Keyboard } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { FAB } from 'react-native-paper';
import ActionSheet from 'react-native-actions-sheet';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../../../theme/Variables';
import { useTheme } from '../../../theme';
import { ScreenContainer } from '../../../components';
import CategoryActionSheet from '../../../components/molecules/category-action-sheet-content';
import SearchBar from '../../../components/atoms/search-bar';
import PostItem from '../../../components/molecules/post-item';

const ForumsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [actionSheetIsVisible, setActionSheetIsVisible] = useState(false);
  const actionSheetRef = createRef<any>();
  const [searchResult, setSearchResult] = useState([]);
  const { Layout, Gutters, Common, Fonts } = useTheme();
  const forums = [
    {
      title: 'Cloudiness on Marble Material or similar',
      description:
        'We are struggling with cloudiness on our products when we run marble material or similar. Any ide…',
    },
    {
      title: 'Struggling to Mould around Pipe',
      description:
        'Any ideas on how to improve the moulding in this area, it seems to be a bit of a hit and …',
    },
    {
      title: 'Rough Inner Surface on Flat Part',
      description:
        'Any ideas why the inner surface of our Moulding would look like this, Is really rough..',
    },
    {
      title: 'Cloudiness on Marble Material or similar',
      description:
        'We are struggling with cloudiness on our products when we run marble material or similar. Any ide…',
    },
    {
      title: 'Struggling to Mould around Pipe',
      description:
        'Any ideas on how to improve the moulding in this area, it seems to be a bit of a hit and …',
    },
    {
      title: 'Rough Inner Surface on Flat Part',
      description:
        'Any ideas why the inner surface of our Moulding would look like this, Is really rough..',
    },
  ];

  const handleJoinForum = () => {};

  const handleFilterPress = () => {
    Keyboard.dismiss();
    setActionSheetIsVisible(true);
    actionSheetRef.current.setModalVisible(true);
  };

  const searchForums = (searchKeyWord: string) => {
    setSearchText(searchKeyWord);
    const results = forums.filter(
      (forum) => forum.title.includes(searchKeyWord) || forum.description.includes(searchKeyWord),
    );
    setSearchResult(results);
  };

  const clearSearch = () => {
    setSearchText('');
  };

  const onActionSheetClose = () => {
    setActionSheetIsVisible(false);
  };

  const renderForum = ({ item }: { item: { title: String; description: String; id: any } }) => {
    return (
      <PostItem
        item={item}
        handleJoinForum={handleJoinForum}
        onSelect={() => navigation.navigate('ViewPost')}
      />
    );
  };

  return (
    <>
      <Text style={[Gutters.regularMargin, Fonts.titleSmall, styles.title]}>Community</Text>
      <View style={[Layout.rowCenter, Gutters.largeHMargin]}>
        <SearchBar
          value={searchText}
          clearSearch={clearSearch}
          onChangeTex={searchForums}
          placeHolder="Search forums"
        />

        <Icon
          name={actionSheetIsVisible ? 'filter' : 'equalizer'}
          type={actionSheetIsVisible ? 'feather' : 'simple-line-icon'}
          onPress={handleFilterPress}
          iconStyle={styles.iconsOpacity}
          containerStyle={[
            Common.inputWithRoundBorders,
            Gutters.smallPadding,
            styles.filterIconContainer,
            actionSheetIsVisible && { transform: [] },
          ]}
        />
      </View>
      <ScreenContainer contentContainerStyle={Gutters.smallPadding}>
        <FlatList
          contentContainerStyle={[Gutters.smallHMargin]}
          data={searchText.length > 0 ? searchResult : forums}
          renderItem={renderForum}
          keyExtractor={(item) => String(item.id)}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {}}
              tintColor={Colors.primary}
              colors={[Colors.primary]}
            />
          }
        />
      </ScreenContainer>
      <FAB
        style={[Common.fabAlignment, styles.fab]}
        icon="plus"
        color={Colors.white}
        onPress={() => navigation.navigate('CreatePost')}
      />
      <ActionSheet
        ref={actionSheetRef}
        gestureEnabled
        containerStyle={styles.actionSheet}
        onClose={onActionSheetClose}
      >
        <CategoryActionSheet showResults={() => {}} />
      </ActionSheet>
    </>
  );
};

const styles = StyleSheet.create({
  actionSheet: { borderRadius: 25 },
  fab: { backgroundColor: Colors.secondary, borderRadius: 10 },
  filterIconContainer: {
    borderColor: Colors.secondary,
    borderWidth: 1.5,
    bottom: '2%',
    right: '25%',
    transform: [{ rotate: '90deg' }],
  },
  iconsOpacity: { opacity: 0.72 },
  title: { fontWeight: '500', marginLeft: '5%' },
});

export default ForumsScreen;
