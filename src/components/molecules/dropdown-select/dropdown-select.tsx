import React, { useState } from 'react';
import { Menu, List } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { Dimensions, StyleSheet, Platform, Pressable, FlatList, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useTheme from '../../../theme/hooks/useTheme';
import { Colors } from '../../../theme/Variables';
import CustomInput from '../../molecules/custom-input';

const { width } = Dimensions.get('window');

type DropdownSelectProps = {
  items?: Array<any> | undefined;
  value?: String | any;
  onChange?: Function;
  keyExtractor?: Function;
  valueExtractor?: Function;
  error?: any;
  placeholder?: String | any;
  errorStyle?: Object;
  inputContainerStyle?: Object;
  disabled?: Boolean | any;
  label?: String | any;
  onBlur?: () => void;
  contentStyle?: Object;
  rightIcon?: any;
};

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  items,
  value,
  onChange,
  keyExtractor,
  valueExtractor,
  error,
  placeholder,
  label,
  onBlur,
  contentStyle,
  inputContainerStyle,
  rightIcon,
}) => {
  const [visible, setVisible] = useState(false);
  const hide = () => {
    setVisible(false);
    onBlur && onBlur();
  };
  const show = () => setVisible(true);
  const { Common, Gutters, Layout } = useTheme();

  const _handleChange = (newItem: any) => {
    hide();
    onChange && onChange(newItem);
  };

  const renderListItem = ({ item, index }: { item: any; index: any }) => (
    <List.Item
      key={keyExtractor ? keyExtractor(item, index) : item.id}
      onPress={() => _handleChange(item)}
      title={valueExtractor ? valueExtractor(item, index) : item.label}
      style={{ width: width * 0.92 }}
      titleNumberOfLines={5}
    />
  );

  const renderInput = (pressed = false) => {
    return (
      <CustomInput
        value={value}
        onChangeText={() => null}
        placeholder={placeholder}
        label={label}
        editable={false}
        errorMessage={error}
        leftIcon={undefined}
        rightIcon={
          rightIcon || (
            <View>
              <Icon
                name="chevron-up"
                type="feather"
                size={16}
                color={Colors.shadow}
                style={Gutters.tinyRMargin}
              />
              <Icon
                name="chevron-down"
                type="feather"
                size={16}
                color={Colors.shadow}
                style={Gutters.tinyRMargin}
              />
            </View>
          )
        }
        inputContainerStyle={[inputContainerStyle || {}, pressed && Common.pressed]}
      />
    );
  };

  return (
    <Menu
      visible={visible}
      onDismiss={hide}
      style={[styles.menu, Layout.alignSelfCenter]}
      contentStyle={[contentStyle, Common.viewWithShadow]}
      anchor={
        Platform.OS === 'ios' ? (
          <TouchableOpacity onPress={show}>{renderInput()}</TouchableOpacity>
        ) : (
          <Pressable onPress={show}>{({ pressed }) => renderInput(pressed)}</Pressable>
        )
      }
    >
      <FlatList data={items} renderItem={renderListItem} />
    </Menu>
  );
};

export default DropdownSelect;

const styles = StyleSheet.create({
  menu: {
    ...Platform.select({
      android: { elevation: 3, backgroundColor: Colors.white },
      ios: {},
    }),
    backgroundColor: Colors.transparent,
    height: 200,
    marginBottom: 40,
    marginTop: 82,
    shadowColor: Colors.transparent,
    shadowOffset: {
      height: 0.2,
      width: 0.2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: '88.5%',
  },
});
