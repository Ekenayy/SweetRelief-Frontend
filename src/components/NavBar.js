import React, { useState } from 'react'
import styled from 'styled-components'
import AllLocationsList from './AllLocationsList'
import { Animated, View, StyleSheet} from "react-native";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import { Text, Wrapper } from '../styles/Styles'
import LocationShow from './LocationShow'
import Filters from './Filters'
import { FontAwesome5 } from '@expo/vector-icons';
// import { Animated } from 'react-native'
// import  { PanGestureHandler, FlingGestureHandler } from 'react-native-gesture-handler'



function NavBar ( {handlePress, selectedLocation, setSelectedLocation, distance} ) {

    // The original starting height was set to 150
    const [swipeUp, setSwipeUp] = useState(false)
    const [height, setHeight] = useState(300)
    const [filters, setFilters] = useState(null)

    const styles = StyleSheet.create({
        animatedContainer: {
            // display: flex,
            position: 'absolute',
            width: '100%',
            height: height,
            bottom: 0,
            backgroundColor: 'rgba(52, 52, 52, 0.85)'
        }
    })
    
    const Scroll = styled.View`
    `

    const FilterContainer = styled(Wrapper)`
        height: 50px;
        margin-bottom: 10px;
    `

    const LocContainer = styled(Wrapper)`
        borderTopWidth: .5px;
    `

    const IconWrapper = styled(Wrapper)`
        align-items: center;
    `

    const handleGesture = (gestureName, gestureState) => {
        const {SWIPE_UP, SWIPE_DOWN} = swipeDirections

        switch(gestureName) {
            case SWIPE_UP:
                // If the gesture is higher than a certain amount -- I want it to be half way, full, 25%
                if (gestureState.dy !== 0 && -(gestureState.dy) > 150 && -(gestureState.dy) <= 300) {
                    setHeight(400)
                } else if (gestureState.dy !== 0 && -(gestureState.dy) > 300) {
                    setHeight(800)
                }
                break;
            case SWIPE_DOWN:
                // The bigger the pull down -- the lower the user is trying to go
                if (gestureState.dy !== 0 && gestureState.dy > 600 ) {
                    setHeight(180)
                } else if (gestureState.dy !== 0 && gestureState.dy < 600 && gestureState.dy > 280 ) {
                    setHeight(400)
                } else {
                    setHeight(180)
                }
        }
    }

    const config = {
        velocityThreshold: .1,
        directionalOffsetThreshold: 80,
        gestureIsClickThreshold: 10
    }

    // Create two component for the navbar dependent on if the user has clicked on a location

    const NoPress = ( ) => {
        return (
            <>
                <FilterContainer>
                    <Filters filters={filters} setFilters={setFilters}/>
                </FilterContainer>
                <LocContainer>
                    <AllLocationsList handlePress={handlePress} filters={filters} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}/>
                </LocContainer>
            </>
        )
    }

    return (
            <Animated.View style={styles.animatedContainer}>
                <GestureRecognizer 
                    onSwipe={(direction, state) => handleGesture(direction, state)}
                    config={config}>
                    <IconWrapper>
                        <FontAwesome5 name="grip-lines" size={24} color="black" />
                    </IconWrapper>
                </GestureRecognizer>
                {selectedLocation ? <LocationShow distance={distance} setSelectedLocation={setSelectedLocation} selectedLocation={selectedLocation}/> : <NoPress/>}
            </Animated.View>
    )

}


export default NavBar