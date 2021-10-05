import React, { useEffect } from 'react';
import { View, StyleSheet, Linking, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Text, Divider } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { exitAppOnHardwarePressListener } from '../../../helpers';
import { Colors } from '../../../theme/Variables';
import { useTheme } from '../../../theme';
import { ScreenContainer } from '../../../components';
import config from '../../../config';

const { width } = Dimensions.get('window');
const { CancelToken } = axios;
const ServicesScreen: React.FC = () => {
  const requestSource = CancelToken.source();
  const armoWebSiteLink = config.website;
  const navigateToWebsite = () => Linking.openURL(`https://${armoWebSiteLink}`);
  const { Layout, Gutters, Images, Common } = useTheme();

  useEffect(() => {
    return () => {
      requestSource.cancel();
    };
  });

  const services = [];

  useFocusEffect(exitAppOnHardwarePressListener);

  return (
    <ScreenContainer>
      {services.map((service, index) => {
        return (
          <View key={index}>
            <Image
              source={Images.logo3}
              style={[styles.image, Gutters.largeBMargin, Layout.alignSelfCenter]}
            />
            <Text style={[styles.title, Gutters.smallBMargin]}>{service.title}</Text>
            <Text style={[styles.texts]}>{service.description}</Text>
            <TouchableOpacity onPress={navigateToWebsite}>
              <Text style={[styles.linkText, Common.text, Gutters.smallTMargin]} selectable>
                {armoWebSiteLink}
              </Text>
            </TouchableOpacity>

            {index < services.length - 1 ? (
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
      })}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  divider: { opacity: 0.65, width: '70%' },
  image: { height: 70, width: width * 0.65 },
  linkText: {
    color: Colors.linkText,
    fontSize: 15,
  },
  texts: { fontSize: 16, lineHeight: 22, opacity: 0.86, textAlign: 'left' },
  title: { fontSize: 19, fontWeight: '500' },
});

export default ServicesScreen;
