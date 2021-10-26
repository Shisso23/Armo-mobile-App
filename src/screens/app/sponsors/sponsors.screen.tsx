import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { List, Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import _ from 'lodash';

import { useTheme } from '../../../theme';
import SearchBar from '../../../components/atoms/search-bar';
import { sponsorsSelector } from '../../../reducers/sponsors-reducer/sponsors.reducer';
import { getSponsorsAction } from '../../../reducers/sponsors-reducer/sponsors.actions';
import { SponsorsProps } from '../../../models/app/sponsors/sponsors.model';

const { width } = Dimensions.get('window');
const SponsorsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const { sponsors, isLoadingSponsors } = useSelector(sponsorsSelector);
  const dispatch = useDispatch();
  const [searchResult, setSearchResult] = useState([]);
  const { Layout, Gutters, Common } = useTheme();

  useFocusEffect(
    useCallback(() => {
      dispatch(getSponsorsAction());
    }, [dispatch]),
  );

  const getSponsors = async () => {
    return dispatch(getSponsorsAction());
  };

  const searchSponsors = (searchKeyWord: string) => {
    setSearchText(searchKeyWord);
    const results = sponsors.filter(
      (sponsor: SponsorsProps) =>
        sponsor.name.includes(searchKeyWord) || sponsor.description.includes(searchKeyWord),
    );
    setSearchResult(results);
  };

  const clearSearch = () => {
    setSearchText('');
  };

  const renderAvatars = (images: Array<{ uri: string }>) => {
    return (
      <View style={[Layout.row, Gutters.smallTMargin]}>
        {images.map((image, index) => {
          return (
            <Avatar.Image
              key={index}
              size={40}
              source={{ uri: _.get(image, 'uri', undefined) }}
              style={{ left: -index * 10 }}
            />
          );
        })}
      </View>
    );
  };

  const renderSponsor = ({ item }: { item: SponsorsProps }) => {
    return (
      <View style={[Common.inputWithRoundBorders, Gutters.tinyMargin, styles.sponsorItem]}>
        <List.Item
          title={item.name}
          titleNumberOfLines={2}
          titleStyle={[Common.cardTitle, styles.sponsorTitle]}
          description={() => (
            <View style={Gutters.smallTMargin}>
              <Text style={Common.cardDescription}>{item.description}</Text>
            </View>
          )}
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
        onChangeTex={searchSponsors}
        placeHolder="Search sponsors"
        style={[Gutters.tinyLMargin, Gutters.tinyRMargin]}
      />
      <FlatList
        data={searchText.length > 0 ? searchResult : sponsors}
        renderItem={renderSponsor}
        keyExtractor={(item) => {
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
