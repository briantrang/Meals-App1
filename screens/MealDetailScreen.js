import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { toggleFavorite } from '../store/actions/mealsActions';

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = props => {

  const mealId = props.navigation.getParam('mealId');
  const chosenMeal = useSelector(state => state.meals.meals);
  const selectedMeal = chosenMeal.find(meal => meal.id === mealId );
  const currentMealIsFavorite = useSelector(state => 
    state.meals.favoriteMeals.some(meal => meal.id === mealId)
  );

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId))
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({toggleFavorite: toggleFavoriteHandler});
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({isFavorite: currentMealIsFavorite})
  },[currentMealIsFavorite])

  return (
    <ScrollView>
      <View>
      <Image source={{uri:selectedMeal.imageUrl}} style={styles.image}/>
      </View>
      <View style={styles.details}>
        <DefaultText>Duration: {selectedMeal.duration} min</DefaultText>
        <DefaultText>Difficulty: {selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>Cost: {selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <View style={styles.instructions}>
        <Text style={styles.title}>Ingredients</Text>
        {selectedMeal.ingredients.map(ingredient => 
          <ListItem key={ingredient}>-{ingredient}</ListItem>
        )}
        <Text style={styles.title}>Steps</Text>
        {selectedMeal.steps.map(step => 
          <ListItem key={step}>-{step}</ListItem>
        )}
      </View>

    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = navigationData => {
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  const toggleFavorite = navigationData.navigation.getParam('toggleFavorite');
  const isFavoriteMeal = navigationData.navigation.getParam('isFavorite');

  return {
    headerTitle: mealTitle,
    headerRight: () => 
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item 
          style={{width: '100%'}}
          title='Favorite' 
          iconName={isFavoriteMeal ? 'ios-heart' : 'ios-heart-empty'} 
          onPress={toggleFavorite}/>
      </HeaderButtons>
  };
}

const styles = StyleSheet.create({
  title:{
    fontFamily: 'open-sans-bold',
    fontSize: 20
  },
  image:{
    width: '100%',
    height: 250
  },
  details:{
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  },
  instructions:{
    padding: 10
  },
  listItem:{
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding:10
  },
});

export default MealDetailScreen;
