import { useFocusEffect } from '@react-navigation/core';
import _ from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View, Image, Pressable, Linking, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { sponsorTypes } from '../../../models/app/sponsors/sponsors.model';
import { getSponsorsAction } from '../../../reducers/sponsors-reducer/sponsors.actions';
import { sponsorsSelector } from '../../../reducers/sponsors-reducer/sponsors.reducer';
import { flashService } from '../../../services';
import useTheme from '../../../theme/hooks/useTheme';
import { Colors } from '../../../theme/Variables';

const screenWidth = Dimensions.get('window').width;
const SponsorsFooter = ({ categoryId }: { categoryId?: string }) => {
  const { Layout, Gutters } = useTheme();
  const { sponsors } = useSelector(sponsorsSelector);
  const dispatch = useDispatch();

  const randomSponsors = useMemo(() => {
    return _.shuffle(sponsors).slice(0, 3);
  }, [sponsors]);

  const goToPromoWebsite = (link: string) => {
    if (link.substr(0, 5) === 'http:') {
      Linking.openURL(`https://${link.substr(7)}`);
    } else if (link.substr(0, 5) === 'https') {
      Linking.openURL(`https://${link.substr(8)}`);
    } else if (link.substr(0, 3) === 'www') {
      Linking.openURL(`https://${link}`);
    } else {
      flashService.error('Could not open url!');
    }
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(getSponsorsAction(categoryId ? { CategoryId: categoryId } : undefined));
      const interval = setInterval(() => {
        dispatch(getSponsorsAction(categoryId ? { CategoryId: categoryId } : undefined));
      }, 5000);
      return () => {
        clearInterval(interval);
      };
    }, [categoryId]),
  );

  const renderDivider = () => <View style={[styles.divider]} />;

  const renderSponsor = (sponsor: sponsorTypes) => {
    return (
      (sponsor && (
        <Pressable onPress={() => goToPromoWebsite(sponsor.link)}>
          {() => (
            <Image
              source={{ uri: _.get(sponsor, 'logo', null) }}
              style={[Layout.row, Gutters.tinyHMargin, styles.logo]}
            />
          )}
        </Pressable>
      )) || <View />
    );
  };

  return (
    (_.get(sponsors, 'length', 0) > 0 && (
      <View
        style={[Layout.row, styles.footer, Layout.alignItemsCenter, Layout.justifyContentCenter]}
      >
        {renderSponsor(randomSponsors[0])}
        {sponsors.length > 1 && renderDivider()}
        {renderSponsor(randomSponsors[1])}
        {sponsors.length > 2 && renderDivider()}
        {renderSponsor(randomSponsors[2])}
      </View>
    )) || <View />
  );
};

const styles = StyleSheet.create({
  divider: { borderColor: Colors.gray, borderWidth: 0.4, height: '95%', opacity: 0.5 },
  footer: {
    backgroundColor: Colors.white,
    bottom: 15,
    height: 75,
    position: 'absolute',
    width: '100%',
  },
  logo: {
    borderRadius: 3,
    height: '100%',
    resizeMode: 'contain',
    width: screenWidth * 0.3,
  },
});

export default SponsorsFooter;
