import React from 'react'; 
import { Platform, Text, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator} from 'react-navigation-drawer';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoriesMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreens from '../screens/FiltersScreen';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Colors.primaryColor
    },
    headerTitleStyle:{
        fontFamily: 'open-sans-bold'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor 
}

const MealsNavigation = createStackNavigator({
    Categories: {
        screen:CategoriesScreen
    },
    CategoriesMeals: {
        screen: CategoriesMealsScreen
    },
    MealDetail: {
        screen: MealDetailScreen
    }
}, {defaultNavigationOptions: defaultStackNavOptions});

const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
}, {defaultNavigationOptions: defaultStackNavOptions});

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigation,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons 
                    style={styles.icon}
                    name='ios-restaurant' 
                    size={25} 
                    color={tabInfo.tintColor}/>;
            },
            tabBarColor: Colors.primaryColor,
            shifting: true,
            tabBarLabel: Platform.OS === 'android' ? 
                <Text style={{fontFamily: 'open-sans'}}>Meals</Text> 
                : 'Meals'

        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons 
                    style={styles.icon}
                    name='ios-heart' 
                    size={25} 
                    color={tabInfo.tintColor}/>;
            },
            tabBarColor: Colors.primaryColor,
            shifting: true,
            tabBarLabel: Platform.OS === 'android' ? 
                <Text style={{fontFamily: 'open-sans'}}>Favorites</Text>
                : 'Favorites'
        }
    }   
};

const MealFavTabNavigator = Platform.OS === 'android' 
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: 'white',
        shifting: true,
        barStyle: {
            backgroundColor: Colors.accentColor,
        }
    })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
            labelStyle: {
                fontFamily: 'open-sans-bold',
                fontSize: 1
            },
            activeTintColor: Colors.accentColor,
            shifting: true
        }
    });

const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreens
},
{defaultNavigationOptions: defaultStackNavOptions})

const MainNavigator = createDrawerNavigator({
    MealsFavs: {
        screen: MealFavTabNavigator,
        navigationOptions:{
            drawerLabel: 'Meals'
        }
    },
    Filters: {
        screen: FiltersNavigator,
        navigationOptions:{
            drawerLabel: 'Filters'
        }
    }
}, {
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: 'open-sans'
        }
    }
});

const styles = StyleSheet.create({
    icon: {
        width: '100%',
        textAlign: 'center',
    }
})

export default createAppContainer(MainNavigator);