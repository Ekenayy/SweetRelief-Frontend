import React, { useState } from 'react'
import styled from 'styled-components'
import AllLocationsList from './AllLocationsList'
import { Animated, View, StyleSheet} from "react-native";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import { Text, Wrapper } from '../styles/Styles'
import LocationShow from './LocationShow'
// import { Animated } from 'react-native'
// import  { PanGestureHandler, FlingGestureHandler } from 'react-native-gesture-handler'



function NavBar ( {selectedLocation, setSelectedLocation} ) {

    // I want to set the height of the navbar equal to where the user is gesturing
    // If the user goes below 150, I dont the navbar to go any lower
    // The swipe direction doesn't actually matter that much -- I just want where the users finger lands
    const [swipeUp, setSwipeUp] = useState(false)
    const [height, setHeight] = useState(150)

    const styles = StyleSheet.create({
        animatedContainer: {
            // display: flex,
            position: 'absolute',
            width: '100%',
            height: height,
            bottom: 0,
            backgroundColor: 'grey'
        }
    })

    // const heightProperty = () => {
    //     if (swipeUp) {
    //         return 300
    //     } else {
    //         return 150
    //     }
    // } 

    // const Wrapper = styled.View`
    //     display: flex;
    //     position: absolute;
    //     width: 100%
    //     height: ${heightProperty}px;
    //     bottom: 0;
    //     background-color: grey;
    // `

    const Scroll = styled.View`
    `

    const Container = styled.View`
    `

    const LocContainer = styled(Wrapper)`
        borderTopWidth: .5px;
    `

    const handleGesture = (gestureName, gestureState) => {
        const {SWIPE_UP, SWIPE_DOWN} = swipeDirections

        switch(gestureName) {
            case SWIPE_UP:
                if (gestureState.dy !== 0 && -(gestureState.dy) > height) {
                    setHeight(-(gestureState.dy))
                }
                break;
            case SWIPE_DOWN:
                if (gestureState.dy !== 0 && gestureState.dy >= 150 )
                setHeight(gestureState.dy)
        }
    }

    const config = {
        velocityThreshold: .1,
        directionalOffsetThreshold: 80,
        gestureIsClickThreshold: 10
    }

    // Create two component for the navbar dependent on if the user has clicked on a location

    const NoPress = () => {
        return (
            <>
                <Container>
                    <Text>Filter</Text>
                </Container>
                <LocContainer>
                    <AllLocationsList/>
                </LocContainer>
            </>
        )
    }

    return (
        <GestureRecognizer 
            onSwipe={(direction, state) => handleGesture(direction, state)}
            config={config}
        >
            <Animated.View style={styles.animatedContainer}>
                <NoPress/>
            </Animated.View>
        </GestureRecognizer>
    )

}


export default NavBar