import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, Dimensions, View, Pressable } from 'react-native';
import _ from 'lodash';
import { Image } from 'react-native-elements';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { Colors } from '../../../theme/Variables';
import useTheme from '../../../theme/hooks/useTheme';

const { width, height } = Dimensions.get('window');
const CustomCarousel = ({ sources, onSelect }: { sources: Array<Object>; onSelect: Function }) => {
  const [activeImage, setActiveImage] = useState(0);
  const { Layout } = useTheme();

  const renderPagination = () => {
    return (
      <Pagination
        dotsLength={_.get(sources, 'length', 0)}
        activeDotIndex={activeImage}
        containerStyle={{ backgroundColor: Colors.transparent }}
        dotStyle={styles.paginationDots}
        inactiveDotStyle={{
          backgroundColor: Colors.darkBrown,
        }}
        activeOpacity={1}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };

  const renderCarouselImage = (item: any) => (
    <View style={[Layout.alignItemsCenter, Layout.justifyContentCenter]}>
      <Image
        source={item}
        style={[styles.image, Layout.alignItemsCenter, Layout.justifyContentCenter]}
        PlaceholderContent={<ActivityIndicator color={Colors.secondary} />}
      />
    </View>
  );

  const _renderCarouselItem = ({ item }: { item: Object }) => {
    return <Pressable onPress={() => onSelect(item)}>{renderCarouselImage(item)}</Pressable>;
  };

  return (
    <>
      <Carousel
        layout="tinder"
        data={sources}
        renderItem={_renderCarouselItem}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={(index: number) => setActiveImage(index)}
      />
      {renderPagination()}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    height: height * 0.26,
    width: width * 0.55,
  },
  paginationDots: {
    backgroundColor: Colors.secondary,
    borderRadius: 5,
    height: 10,
    marginHorizontal: 8,
    width: 10,
  },
});

export default CustomCarousel;
