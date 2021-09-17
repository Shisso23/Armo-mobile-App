import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Button } from 'react-native-elements';

import { useTheme } from '../../../theme';
import { Colors } from '../../../theme/Variables';
import CategoryItem from '../category-item';

type CategoryActionSheetContentProps = {
  onSelectCategory: Function;
  setSortOrder: Function;
  showResults: Function;
  loadingResults: Boolean;
  clearSelectedCategories: Function;
};

const CategoryActionSheetContent: React.FC<CategoryActionSheetContentProps> = ({
  onSelectCategory,
  setSortOrder,
  showResults,
  loadingResults,
  clearSelectedCategories,
}) => {
  const { Gutters, Common, Layout } = useTheme();

  const categories = [
    { name: 'Mould', id: 1 },
    { name: 'Material', id: 2 },
    { name: 'Machine', id: 3 },
    { name: 'Design', id: 4 },
    { name: 'Insets', id: 5 },
    { name: 'Graphics', id: 6 },
    { name: 'Post Moulding', id: 7 },
    { name: 'Safety', id: 8 },
    { name: 'Trimming', id: 9 },
    { name: 'Foaming', id: 10 },
  ];

  const renderCategories = ({ item }: { item: { id: any; name: String } }) => {
    return <CategoryItem item={item} selected={false} setCategorySelected={onSelectCategory} />;
  };

  return (
    <>
      <Text style={[Gutters.regularLMargin, styles.title]}>Category</Text>
      <FlatList
        data={categories}
        renderItem={renderCategories}
        numColumns={3}
        style={[Gutters.smallPadding]}
        keyExtractor={(item: { id: any }) => item.id}
      />
      <Text style={[Gutters.regularLMargin, styles.title]}>Sort by</Text>
      <View style={[Layout.row, Gutters.regularMargin]}>
        <CategoryItem
          name="New"
          selected={false}
          setCategorySelected={() => setSortOrder('ascending')}
        />
        <CategoryItem
          name="Old"
          selected={false}
          setCategorySelected={() => setSortOrder('descending')}
        />
      </View>
      <View style={[Layout.rowBetween, Gutters.regularMargin]}>
        <Button
          title="Show results"
          onPress={showResults}
          loading={loadingResults}
          containerStyle={[Common.submitButtonContainer, styles.showResultsButton]}
          buttonStyle={[Common.submitButton, styles.showResultsButtonStyle]}
        />

        <Button
          type="clear"
          title="Clear"
          onPress={clearSelectedCategories}
          titleStyle={styles.clearButtonTitle}
          containerStyle={[Gutters.regularRMargin]}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  clearButtonTitle: { color: Colors.black, opacity: 0.6 },
  showResultsButton: { maxHeight: 45 },
  showResultsButtonStyle: { height: '100%' },
  title: { fontSize: 18, fontWeight: '500' },
});

export default CategoryActionSheetContent;
