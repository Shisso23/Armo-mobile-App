import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import { Colors } from '../../../theme/Variables';
import CustomInput from '../../molecules/custom-input';

type SearchBarProps = {
  clearSearch: any;
  onChangeTex: any;
  placeHolder?: string;
  value: any;
  style?: any;
};

const SearchBar: React.FC<SearchBarProps> = ({
  clearSearch,
  onChangeTex,
  placeHolder,
  value,
  style,
}) => {
  return (
    <CustomInput
      value={value}
      onChangeText={onChangeTex}
      label=""
      placeholder={placeHolder}
      inputContainerStyle={[styles.searchInput, style]}
      leftIcon={<Icon name="search" iconStyle={styles.iconsOpacity} />}
      rightIcon={
        <Icon name="clear" size={20} onPress={clearSearch} iconStyle={styles.iconsOpacity} />
      }
    />
  );
};

const styles = StyleSheet.create({
  iconsOpacity: { opacity: 0.72 },
  searchInput: {
    borderBottomWidth: 1.5,
    borderColor: Colors.secondary,
    borderWidth: 1.5,
    marginBottom: 0,
    marginLeft: 15,
    marginRight: '10%',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
});

export default SearchBar;
