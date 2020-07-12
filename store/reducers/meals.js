import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/mealsActions';

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: []
};

const mealsReducer = (state = initialState, action) => {

    switch(action.type){
        case TOGGLE_FAVORITE:
            const existingIndex = state.favoriteMeals.findIndex(meal => meal.id === action.mealId);
            if (existingIndex >= 0){
                const updatedFavoriteMeals = [...state.favoriteMeals];
                updatedFavoriteMeals.splice(existingIndex, 1);
                console.log(state.favoriteMeals);
                return {...state, favoriteMeals: updatedFavoriteMeals}
            }else{
                const newFavoriteMeal = state.meals.find(meal => meal.id === action.mealId);
                return{...state, favoriteMeals: state.favoriteMeals.concat(newFavoriteMeal)}
            }
        case SET_FILTERS:
            const appliedFilters = action.filters;
            const updatedFilteredMeals = state.meals.filter(meal => {
                if(appliedFilters.glutenFree && !meal.isGlutenFree){
                    return false;
                }
                if(appliedFilters.lactoseFree && !meal.isLactoseFree){
                    return false;
                }
                if(appliedFilters.vegan && !meal.isVegan){
                    return false;
                }
                if(appliedFilters.vegetarian && !meal.isVegetarian){
                    return false;
                }
                return true;
            });
            return {...state, filteredMeals: updatedFilteredMeals}
        default:
            return state;
    }
    
    return state;
};

export default mealsReducer;