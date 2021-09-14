import React, { useEffect } from 'react';
import { View, StyleSheet, Linking, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Text, Divider } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { exitAppOnHardwarePressListener } from '../../../helpers';
import { Colors } from '../../../theme/Variables';
import { useTheme } from '../../../theme';

const { width } = Dimensions.get('window');
const { CancelToken } = axios;

const HomeScreen: React.FC = () => {
  const requestSource = CancelToken.source();
  const armoWebSiteLink = 'www.armo.co.za';
  const navigateToWebsite = () => Linking.openURL(`https://${armoWebSiteLink}`);
  const { Layout, Gutters, Images, Common } = useTheme();

  useEffect(() => {
    return () => {
      requestSource.cancel();
    };
  });

  const services = [
    {
      title: 'Services',
      description:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took agalley of type and scrambled it to make a type specimen book.",
    },
    {
      title: 'Services',
      description:
        'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took agalley of type and scrambled it to make a type specimen book.',
    },
  ];

  useFocusEffect(exitAppOnHardwarePressListener);

  return (
    <View style={[Gutters.largeHPadding, Gutters.largeTPadding]}>
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
    </View>
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

export default HomeScreen;
