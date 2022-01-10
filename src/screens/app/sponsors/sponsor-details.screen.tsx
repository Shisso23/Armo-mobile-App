import React from 'react';
import {
  View,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import _ from 'lodash';
import { Text, Divider } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';

import { exitAppOnHardwarePressListener } from '../../../helpers';
import { Colors } from '../../../theme/Variables';
import { useTheme } from '../../../theme';
import { ScreenContainer } from '../../../components';
import { sponsorTypes } from '../../../models/app/sponsors/sponsors.model';
import { SafeAreaView } from 'react-native-safe-area-context';
import { flashService } from '../../../services';

const { width } = Dimensions.get('window');

const PromosScreen = ({ route }: { route: Object }) => {
  const promos = _.get(route, 'params.categoryWithPromos.promos', {});
  const { Layout, Gutters, Common } = useTheme();

  const navigateToWebsite = (link: string) => {
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

  const openEmail = (email: string) =>
    Linking.canOpenURL(`${email}`)
      .then(() => {
        Linking.openURL(`mailto:${email}`);
      })
      .catch((error) => {
        return error;
      });

  const renderSponsor = ({ item, index }: { item: sponsorTypes; index: number }) => {
    return (
      <View key={item.id}>
        <Image
          source={{ uri: _.get(item, 'logo', undefined) }}
          style={[styles.image, Gutters.largeBMargin, Layout.alignSelfCenter]}
        />
        <Text style={[styles.texts, Common.text]} selectable>
          Company: {item.company}
        </Text>
        <Text style={[styles.texts, Gutters.tinyBMargin]}>{_.get(item, 'description', '')}</Text>
        <TouchableOpacity onPress={() => openEmail(item.contact)}>
          <Text style={[styles.linkText, Common.text, Gutters.smallTMargin]}>
            <Text style={styles.texts} selectable>
              Contact:
            </Text>
            {_.get(item, 'contact', '')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateToWebsite(item.link)}>
          <Text style={[styles.linkText, Common.text, Gutters.smallTMargin]} selectable>
            <Text style={styles.texts}>Website: </Text>
            {item.link}
          </Text>
        </TouchableOpacity>

        {index < promos.length - 1 ? (
          <Divider
            color={Colors.text}
            style={[Gutters.largeVMargin, Layout.alignSelfCenter, styles.divider]}
            width={0.75}
            inset
            insetType="middle"
          />
        ) : (
          <View />
        )}
      </View>
    );
  };

  useFocusEffect(exitAppOnHardwarePressListener);

  return (
    <ScreenContainer contentContainerStyle={Gutters.smallPadding}>
      <SafeAreaView>
        <FlatList data={promos} renderItem={renderSponsor} />
      </SafeAreaView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  divider: { opacity: 0.65, width: '70%' },
  image: { height: 90, resizeMode: 'contain', width: width * 0.65 },
  linkText: {
    color: Colors.linkText,
    fontSize: 15,
  },
  texts: { fontSize: 16, lineHeight: 22, opacity: 0.86, textAlign: 'left' },
});

export default PromosScreen;
