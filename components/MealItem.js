import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, ImageBackground } from 'react-native';
import DefaultText from '../components/DefaultText';

const MealItem = props => {
    return(
        <TouchableNativeFeedback onPress={props.onSelectMeal}>
            <View style={styles.mealItem}>
                <View style={{...styles.mealRow, ...styles.mealHeader}}>
                    <ImageBackground source={{uri: props.image}} style={styles.bgImage}>
                    <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
                    </ImageBackground>
                </View>
                <View style={{...styles.mealRow, ...styles.mealDetail}}>
                    <DefaultText>Duration: {props.duration} min</DefaultText>
                    <DefaultText>Difficulty: {props.complexity.toUpperCase()}</DefaultText>
                    <DefaultText>Cost: {props.affordability.toUpperCase()}</DefaultText>
                </View>
            </View>
        </TouchableNativeFeedback>
    );
};

const styles = StyleSheet.create({
    mealRow: {
        flexDirection: 'row',
    },
    mealItem:{
        height: 200, 
        width: '100%',
        backgroundColor: '#f5f5f5',
    },
    mealHeader:{
        height: '85%'
    },
    mealDetail: {
        height: '15%',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bgImage:{
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    title:{
        color: 'white',
        padding: 10,
        fontSize: 18,
        backgroundColor: 'rgba(0,0,0,0.5)',
        fontFamily: 'open-sans-bold',
        paddingVertical: 5,
        paddingHorizontal: 12,
        textAlign: 'center',

        
    }
});

export default MealItem;