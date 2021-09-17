import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';

import useTheme from '../../../theme/hooks/useTheme';
import { Colors } from '../../../theme/Variables';

type CategoryItemProps = {
  setCategorySelected: Function;
  item?: { id: any; name: String };
  name?: String;
  selected: Boolean;
};

const CategoryItem: React.FC<CategoryItemProps> = ({
  setCategorySelected,
  item,
  name,
  selected,
}) => {
  const [iseSelected, setIsSelected] = useState(selected);
  const { Gutters } = useTheme();
  return (
    <TouchableOpacity
      style={[
        Gutters.tinyMargin,
        Gutters.regularPadding,
        styles.container,
        { backgroundColor: selected ? Colors.secondary : Colors.lightGray },
      ]}
      key={(item && item.id) || name}
      onPress={() => {
        setIsSelected(!iseSelected);
        setCategorySelected(!iseSelected);
      }}
    >
      <ListItem.Subtitle>{(item && item.name) || name}</ListItem.Subtitle>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
  },
});

export default CategoryItem;
