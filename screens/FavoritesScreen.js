import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-ionicons';
import MealList from '../components/MealList';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Ionicons } from '@expo/vector-icons';


const FavoritesScreen = props => {
  const favoriteMeals = useSelector(state => state.meals.favoriteMeals);

  if (favoriteMeals.length === 0 || !favoriteMeals){
    return(
      <View style={styles.defaultText}>
        <Text>No favorite meals found! Go add some!</Text>
        <Ionicons style={styles.icon} name='md-sad' size={50}/>
      </View>
      
    )
  }

  return (
    <MealList listData={favoriteMeals} navigation={props.navigation}/>
  );
};

FavoritesScreen.navigationOptions = navData => {
  return{
    headerTitle: 'Your Favorites',
    headerLeft: () => 
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='Menu' iconName='ios-menu' onPress={() => {
          navData.navigation.toggleDrawer();
        }}/>
      </HeaderButtons>
  }
};

const styles = StyleSheet.create({
  defaultText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: '100%',
    textAlign: 'center'
  }
});

export default FavoritesScreen;
