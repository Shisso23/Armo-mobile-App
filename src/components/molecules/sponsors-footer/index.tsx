import { useFocusEffect } from '@react-navigation/core';
import _ from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { sponsorTypes } from '../../../models/app/sponsors/sponsors.model';
import { getSponsorsAction } from '../../../reducers/sponsors-reducer/sponsors.actions';
import { sponsorsSelector } from '../../../reducers/sponsors-reducer/sponsors.reducer';
import useTheme from '../../../theme/hooks/useTheme';
import { Colors } from '../../../theme/Variables';

const SponsorsFooter = ({ categoryId }: { categoryId?: string }) => {
  const { Layout, Gutters } = useTheme();
  const { sponsors } = useSelector(sponsorsSelector);
  const dispatch = useDispatch();

  const randomSponsors = useMemo(() => {
    return _.shuffle(sponsors).slice(0, 3);
  }, [sponsors]);

  useFocusEffect(
    useCallback(() => {
      dispatch(getSponsorsAction(categoryId ? { CategoryId: categoryId } : undefined));
      const interval = setInterval(() => {
        dispatch(getSponsorsAction(categoryId ? { CategoryId: categoryId } : undefined));
      }, 5000);
      return () => {
        clearInterval(interval);
      };
    }, [categoryId, dispatch]),
  );

  const renderDivider = () => <View style={[styles.divider]} />;

  const renderSponsor = (sponsor: sponsorTypes) => {
    return (
      <ImageBackground
        source={{ uri: _.get(sponsor, 'logo', null) }}
        style={[Layout.row, Layout.fill, Gutters.tinyHMargin, styles.logo]}
      >
        <Text style={[Gutters.regularLMargin, Layout.alignSelfEnd, styles.sponsor]}>
          {_.get(sponsor, 'company', '')}
        </Text>
      </ImageBackground>
    );
  };

  return (
    (_.get(sponsors, 'length', 0) > 0 && (
      <View style={[Layout.rowBetween, styles.footer]}>
        {renderSponsor(randomSponsors[0])}
        {renderDivider()}
        {renderSponsor(randomSponsors[1])}
        {renderDivider()}
        {renderSponsor(randomSponsors[2])}
      </View>
    )) || <View />
  );
};

const styles = StyleSheet.create({
  divider: { borderColor: Colors.gray, borderWidth: 0.4, height: '95%', opacity: 0.5 },
  footer: {
    backgroundColor: Colors.white,
    bottom: 0,
    height: 80,
    position: 'absolute',
    width: '100%',
  },
  logo: {
    backgroundColor: Colors.muted,
    height: 75,
    resizeMode: 'contain',
    width: '100%',
  },
  sponsor: {
    backgroundColor: Colors.fourtyPercentBlack,
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SponsorsFooter;
