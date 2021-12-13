import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';

import useTheme from '../../../theme/hooks/useTheme';
import { Colors } from '../../../theme/Variables';

type CategoryItemProps = {
  setCategorySelected: Function;
  item?: { id: any; name: String; selected: Boolean };
  name?: String;
  selected?: Boolean;
  cleared?: Boolean;
};

const CategoryItem: React.FC<CategoryItemProps> = ({
  setCategorySelected,
  item,
  name,
  selected,
  cleared,
}) => {
  const [isSelected, setIsSelected] = useState(selected);
  const { Gutters } = useTheme();

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  useEffect(() => {
    if (cleared && item) {
      setIsSelected(false);
      item.selected = false;
    }
  }, [cleared]);

  return (
    <TouchableOpacity
      style={[
        Gutters.tinyMargin,
        Gutters.regularPadding,
        styles.container,
        { backgroundColor: isSelected ? Colors.secondary : Colors.lightGray },
      ]}
      key={(item && item.id) || name}
      onPress={() => {
        if (item) {
          setIsSelected(!isSelected);
          item.selected = !isSelected;
          setCategorySelected(item);
        } else {
          setCategorySelected();
          setIsSelected(!selected);
        }
      }}
    >
      <ListItem.Subtitle style={{ color: isSelected ? Colors.white : Colors.black }}>
        {(item && item.name) || name}
      </ListItem.Subtitle>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
  },
});

export default CategoryItem;
