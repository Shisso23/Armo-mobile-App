import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { List, Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import _ from 'lodash';

import { useTheme } from '../../../theme';
import SearchBar from '../../../components/atoms/search-bar';
import { sponsorsSelector } from '../../../reducers/sponsors-reducer/sponsors.reducer';
import { getSponsorsAction } from '../../../reducers/sponsors-reducer/sponsors.actions';
import { sponsorTypes } from '../../../models/app/sponsors/sponsors.model';

const { width } = Dimensions.get('window');
const SponsorsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const { sponsors, isLoadingSponsors } = useSelector(sponsorsSelector);
  const dispatch = useDispatch();
  const { Layout, Gutters, Common } = useTheme();

  const debounce = useMemo(
    () =>
      _.throttle(
        async (searchKeyWord: string) => {
          await dispatch(getSponsorsAction({ keyword: searchKeyWord, PageNumber: 1 }));
        },
        1000,
        undefined,
      ),
    [dispatch],
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(getSponsorsAction());
    }, [dispatch]),
  );

  const getSponsors = async () => {
    return dispatch(getSponsorsAction());
  };

  const clearSearch = () => {
    setSearchText('');
  };

  const renderAvatars = (logo: { uri: string }) => {
    return (
      <View style={Gutters.smallTMargin}>
        <Avatar.Image size={40} source={{ uri: _.get(logo, 'uri', undefined) }} />
      </View>
    );
  };

  const renderSponsor = ({ item }: { item: sponsorTypes }) => {
    return (
      <View
        style={[
          Common.inputWithRoundBorders,
          Gutters.tinyMargin,
          Gutters.smallVPadding,
          styles.sponsorItem,
        ]}
      >
        <List.Item
          title={item.company}
          titleNumberOfLines={2}
          titleStyle={[Common.cardTitle, styles.sponsorTitle]}
          descriptionNumberOfLines={10}
          descriptionStyle={{}}
          right={() => renderAvatars(_.get(item, 'images', []))}
        />
      </View>
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
      <FlatList
        data={sponsors}
        renderItem={renderSponsor}
        keyExtractor={(item: sponsorTypes) => {
          return String(item.id);
        }}
        onRefresh={getSponsors}
        refreshing={isLoadingSponsors}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: width * 0.17 },
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
