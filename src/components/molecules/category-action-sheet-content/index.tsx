import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';

import { useTheme } from '../../../theme';
import { Colors } from '../../../theme/Variables';
import CategoryItem from '../category-item';

type CategoryActionSheetContentProps = {
  showResults: Function;
  categories: Array<{ id: string; name: string }>;
  isLoadingGetPosts: boolean;
  closeActionSheet: Function;
  initiallySelectedCategories: Array<string>;
};

const CategoryActionSheetContent: React.FC<CategoryActionSheetContentProps> = ({
  showResults,
  categories,
  isLoadingGetPosts,
  closeActionSheet,
  initiallySelectedCategories,
}) => {
  const { Gutters, Common, Layout } = useTheme();
  const [sortBy, setSortBy] = useState('New');
  const [categoriesCleared, setCategoriesCleared] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initiallySelectedCategories || [],
  );
  useEffect(() => {
    return () => {
      clearCategories();
    };
  }, []);

  const onSelectCategory = (item: { name: string; id: string }) => {
    if (_.get(item, 'selected', false)) {
      setSelectedCategories(Array.from(new Set([...selectedCategories, item.id])));
    } else {
      if (selectedCategories?.some((categoryId) => categoryId === item.id)) {
        setSelectedCategories(selectedCategories?.filter((category_id) => category_id !== item.id));
      }
    }
  };

  const clearCategories = () => {
    setSortBy('New');
    setCategoriesCleared(true);
    setSelectedCategories([]);
  };

  const renderCategories = ({ item }: { item: { id: any; name: String; selected: Boolean } }) => {
    return (
      <CategoryItem
        item={item}
        cleared={categoriesCleared}
        setCategorySelected={(category: Object) => {
          onSelectCategory(category);
          setCategoriesCleared(false);
        }}
        clear={clearCategories}
        selected={initiallySelectedCategories?.some((categoryId) => {
          return categoryId === item.id;
        })}
      />
    );
  };

  return (
    <ScrollView
      nestedScrollEnabled={true}
      contentContainerStyle={[Gutters.largeRPadding, Gutters.smallBMargin]}
    >
      <Text style={[Gutters.regularLMargin, styles.title]}>Category</Text>
      <FlatList
        data={categories}
        renderItem={renderCategories}
        numColumns={3}
        contentContainerStyle={[Gutters.smallPadding, Gutters.regularRMargin]}
        keyExtractor={(item: { id: any }) => item.id}
        scrollEnabled
      />
      <Text style={[Gutters.regularLMargin, styles.title]}>Sort by</Text>
      <View style={[Layout.row, Gutters.regularMargin]}>
        <CategoryItem
          name="New"
          selected={sortBy === 'New'}
          cleared={categoriesCleared}
          setCategorySelected={() => {
            setSortBy('New');
            setCategoriesCleared(false);
          }}
        />
        <CategoryItem
          name="Old"
          selected={sortBy === 'Old'}
          cleared={categoriesCleared}
          setCategorySelected={() => {
            setSortBy('Old');
            setCategoriesCleared(false);
          }}
        />
      </View>
      <View style={[Layout.rowBetween, Gutters.regularMargin]}>
        <Button
          title="Show results"
          onPress={async () => {
            showResults(selectedCategories, sortBy).then(() => {
              closeActionSheet();
            });
          }}
          loading={isLoadingGetPosts}
          containerStyle={[Common.submitButtonContainer, styles.showResultsButton]}
          buttonStyle={[Common.submitButton, styles.showResultsButtonStyle]}
        />

        <Button
          type="clear"
          title="Clear"
          onPress={clearCategories}
          titleStyle={styles.clearButtonTitle}
          containerStyle={[Gutters.regularRMargin]}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  clearButtonTitle: { color: Colors.gray },
  showResultsButton: { maxHeight: 45 },
  showResultsButtonStyle: { height: '100%' },
  title: { fontSize: 18, fontWeight: '500' },
});

export default CategoryActionSheetContent;
