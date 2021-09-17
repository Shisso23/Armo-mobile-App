import React, { useState, useEffect, createRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { FAB, List } from 'react-native-paper';
import ActionSheet from 'react-native-actions-sheet';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../../../theme/Variables';
import { useTheme } from '../../../theme';
import { ScreenContainer } from '../../../components';
import CustomInput from '../../../components/molecules/custom-input';
import CategoryActionSheet from '../../../components/molecules/category-action-sheet-content';

const ForumsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  // const [selectedCategories, setSelectedCategories] = useState([]);
  // const [categorySelected, setCategorySelected] = useState(false);
  // const [sortOrder, setSortOrder] = useState(null); // by default sorts from new to old
  const [actionSheetIsVisible, setActionSheetIsVisible] = useState(false);
  const actionSheetRef = createRef();
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

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={[Layout.rowBetween, Gutters.regularRMargin]}>
          <Icon
            type="font-awesome-5"
            name="bell"
            size={23}
            iconStyle={[styles.iconsOpacity, Gutters.smallRMargin, styles.bellIcon]}
          />
          <View
            style={[
              Layout.rowBetween,
              styles.userView,
              Gutters.smallHPadding,
              Gutters.tinyVPadding,
            ]}
          >
            <Icon
              name="user"
              type="feather"
              size={15}
              iconStyle={[styles.iconsOpacity, Gutters.tinyRMargin]}
            />
            <Text>username</Text>
          </View>
        </View>
      ),
    });
  });

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

  const renderForum = ({ item }: { item: { title: String; description: String; id: any } }) => {
    return (
      <View style={[Common.inputWithRoundBorders, Gutters.tinyMargin, styles.forumItem]}>
        <List.Item
          title={item.title}
          titleNumberOfLines={2}
          titleStyle={Common.cardTitle}
          description={() => (
            <View style={Gutters.smallTMargin}>
              <Text style={Common.cardDescription}>{item.description}</Text>
              <TouchableOpacity
                style={[Layout.row, Layout.alignSelfEnd, Gutters.smallTMargin]}
                onPress={handleJoinForum}
              >
                <Text style={[Common.link, Gutters.tinyRMargin, styles.joinForumText]}>
                  Join Forum
                </Text>
                <Icon
                  name="arrow-right-circle"
                  type="feather"
                  color={Colors.secondary}
                  iconStyle={styles.iconsOpacity}
                  size={14}
                  containerStyle={styles.joinForumIcon}
                />
              </TouchableOpacity>
            </View>
          )}
          onPress={() => {
            navigation.navigate('ViewForum', { item });
          }}
          descriptionNumberOfLines={10}
          descriptionStyle={{}}
        />
      </View>
    );
  };

  return (
    <>
      <Text style={[Gutters.regularMargin, Fonts.titleSmall, styles.title]}>Community</Text>
      <View style={[Layout.rowCenter, Gutters.largeHMargin]}>
        <CustomInput
          value={searchText}
          onChangeText={searchForums}
          label=""
          placeholder="Search forums"
          inputContainerStyle={styles.searchInput}
          leftIcon={<Icon name="search" iconStyle={styles.iconsOpacity} />}
          rightIcon={
            <Icon name="clear" size={20} onPress={clearSearch} iconStyle={styles.iconsOpacity} />
          }
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
        onClose={() => setActionSheetIsVisible(false)}
      >
        <CategoryActionSheet
          onSelectCategory={() => {}}
          setSortOrder={() => {}}
          showResults={() => {}}
          loadingResults={false}
          clearSelectedCategories={() => {}}
        />
      </ActionSheet>
    </>
  );
};

const styles = StyleSheet.create({
  bellIcon: { marginTop: 3 },
  actionSheet: { borderRadius: 25 },
  fab: { backgroundColor: Colors.secondary, borderRadius: 10 },
  filterIconContainer: {
    borderColor: Colors.secondary,
    borderWidth: 1.5,
    bottom: '2%',
    right: '30%',
    transform: [{ rotate: '90deg' }],
  },
  forumItem: {
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  iconsOpacity: { opacity: 0.72 },
  joinForumIcon: { marginTop: 3 },
  joinForumText: { fontWeight: '300' },
  searchInput: {
    borderBottomWidth: 1.5,
    borderColor: Colors.secondary,
    borderWidth: 1.5,
    marginBottom: 0,
    marginLeft: 15,
    marginRight: '10%',
  },
  title: { fontWeight: '500', marginLeft: '5%' },
  userView: { borderColor: Colors.secondary, borderRadius: 10, borderWidth: 1 },
});

export default ForumsScreen;
