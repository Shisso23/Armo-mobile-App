import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { List } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import _ from 'lodash';

import { useTheme } from '../../../theme';
import SearchBar from '../../../components/atoms/search-bar';
import { sponsorsSelector } from '../../../reducers/sponsors-reducer/sponsors.reducer';
import { getSponsorsAction } from '../../../reducers/sponsors-reducer/sponsors.actions';
import { sponsorTypes } from '../../../models/app/sponsors/sponsors.model';
import { getCategoriesAction } from '../../../reducers/posts-reducer/posts.actions';
import { postsSelector } from '../../../reducers/posts-reducer/posts.reducer';
import { Colors } from '../../../theme/Variables';

const { width } = Dimensions.get('window');
const SponsorsScreen: React.FC = () => {
  const { categories } = useSelector(postsSelector);
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const { sponsors, isLoadingSponsors } = useSelector(sponsorsSelector);
  const [groupedPromos, setGroupedPromos] = useState<Array<Object>>([]);
  const dispatch = useDispatch();
  const { Layout, Gutters, Common } = useTheme();

  const filterPromosWithCategory = (categoryToGroupBy: string) => {
    return sponsors.filter((sponsor: sponsorTypes) =>
      sponsor.categories.some(
        (category: Object) => _.get(category, 'name', '') === categoryToGroupBy,
      ),
    );
  };

  const groupPromosByCategory: () => Array<Object> = () => {
    const promosGroupedByCategories: Array<Object> = [];
    categories.forEach((category: {}) => {
      const emptyObject = {};
      const objWithCategoryName = _.set(emptyObject, 'name', `${_.get(category, 'name', '')}`);
      const addedListOfPromos = _.set(
        objWithCategoryName,
        'promos',
        filterPromosWithCategory(_.get(category, 'name', '')),
      );

      promosGroupedByCategories.push(addedListOfPromos);
    });

    return promosGroupedByCategories.filter((category) => _.get(category, 'promos', []).length > 0);
  };

  useEffect(() => {
    setGroupedPromos(groupPromosByCategory());
  }, []);

  useEffect(() => {
    setGroupedPromos(groupPromosByCategory());
  }, [JSON.stringify(sponsors)]);

  const debounce = useMemo(
    () =>
      _.throttle(
        async (searchKeyWord: string) => {
          await dispatch(getSponsorsAction({ keyword: searchKeyWord, PageNumber: 1 }));
        },
        1500,
        undefined,
      ),
    [dispatch],
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(getSponsorsAction());
      dispatch(getCategoriesAction());
    }, []),
  );

  const getSponsors = async () => {
    return dispatch(getSponsorsAction());
  };

  const clearSearch = () => {
    setSearchText('');
    getSponsors();
  };

  const renderAvatars = (promos: Array<Object>) => {
    const randomSponsors = _.shuffle(promos).slice(0, 3);

    return (
      <View style={[Layout.row, Gutters.smallTMargin]}>
        {randomSponsors.map((promo, index) => {
          return (
            <View
              key={_.get(promo, 'id', index)}
              style={[styles.imageContainer, { left: -index * 10 }]}
            >
              <Image source={{ uri: _.get(promo, 'logo', undefined) }} style={styles.image} />
            </View>
          );
        })}
      </View>
    );
  };

  const navigateToDetails = (categoryWithPromos: Object) => {
    navigation.navigate('SponsorDetails', { categoryWithPromos });
  };

  const renderCategoryWithPromos = ({ item }: { item: Object }) => {
    return (
      <TouchableOpacity
        onPress={() => navigateToDetails(item)}
        style={[
          Common.inputWithRoundBorders,
          Gutters.tinyMargin,
          Gutters.smallVPadding,
          styles.sponsorItem,
        ]}
      >
        <List.Item
          title={_.get(item, 'name', '')}
          titleNumberOfLines={2}
          titleStyle={[Common.cardTitle, styles.sponsorTitle]}
          descriptionNumberOfLines={10}
          descriptionStyle={{}}
          right={() => renderAvatars(_.get(item, 'promos', []))}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[Gutters.regularPadding, Gutters.regularHPadding, Layout.fill, styles.container]}>
      <View style={[Layout.alignSelfStart, Gutters.largeBMargin]}>
        <Icon
          name="arrow-left"
          type="material-community"
          size={25}
          onPress={() => navigation.goBack()}
        />
      </View>
      <SearchBar
        value={searchText}
        clearSearch={clearSearch}
        onChangeTex={(search: string) => {
          setSearchText(search);
          debounce(search);
        }}
        placeHolder="Search sponsors"
        style={[Gutters.tinyLMargin, Gutters.tinyRMargin]}
      />

      <KeyboardAwareFlatList
        data={groupedPromos}
        renderItem={renderCategoryWithPromos}
        keyExtractor={(item: Object, index: number) => {
          return String(_.get(item, 'name', index));
        }}
        onRefresh={getSponsors}
        refreshing={isLoadingSponsors}
        ListEmptyComponent={<Text style={[Layout.alignSelfCenter]}>There are no promos here!</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: width * 0.17 },
  image: {
    backgroundColor: Colors.muted,
    borderRadius: 30,
    height: 55,
    resizeMode: 'contain',
    width: 55,
  },
  imageContainer: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  sponsorItem: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  sponsorTitle: {
    fontSize: 16,
  },
});

export default SponsorsScreen;
