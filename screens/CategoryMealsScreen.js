import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';

const CategoryMealScreen = props => {

  const categoryId = props.navigation.getParam('categoryId');
  const availableMeals = useSelector(state => state.meals.filteredMeals);

  const displayedMeals = availableMeals.filter(
    meal => meal.categoryIds.indexOf(categoryId) >= 0
  );

  if (displayedMeals.length === 0){
    return(
      <View style={styles.defaultText}>
        <Text>
          Sorry! No meals being shown since you have filtered out all recipes!
        </Text>
        <Text>
          Change your filters to see more recipes!
        </Text>
      </View>
    );
  }

  return (
    <MealList listData={displayedMeals} navigation={props.navigation}/>
  );
};

CategoryMealScreen.navigationOptions = (navigationData) => {
  const categoryId = navigationData.navigation.getParam('categoryId');

  const selectedCategory = CATEGORIES.find(category => category.id === categoryId);

  return{
    headerTitle: selectedCategory.title
  };
};

const styles = StyleSheet.create({
  defaultText:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default CategoryMealScreen;
