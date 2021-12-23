import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Map } from 'immutable';

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
  const [categoryItem, setCategoryItem] = useState<undefined | Map<string, Boolean>>(undefined);

  useEffect(() => {
    if (item) {
      const newItem = Map(item).set('selected', selected);
      setCategorySelected(newItem.toJS());
      setIsSelected(selected);
      setCategoryItem(newItem);
    }
  }, []);

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  useEffect(() => {
    if (cleared && categoryItem) {
      setIsSelected(false);
      setCategoryItem(categoryItem.set('selected', false));
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
      key={(categoryItem && categoryItem.get('id', '')) || name}
      onPress={() => {
        if (categoryItem) {
          setIsSelected(!isSelected);
          setCategoryItem(categoryItem.set('selected', !isSelected));
          setCategorySelected(categoryItem.set('selected', !isSelected).toJS());
        } else {
          setCategorySelected({});
          setIsSelected(!selected);
        }
      }}
    >
      <ListItem.Subtitle style={[{ color: isSelected ? Colors.white : Colors.black }]}>
        {(categoryItem && categoryItem.get('name', '')) || name}
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
