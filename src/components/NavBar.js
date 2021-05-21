import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import AllLocationsList from './AllLocationsList'
import { View, StyleSheet} from "react-native";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import { Text, Wrapper } from '../styles/Styles'
import LocationShow from './LocationShow'
import Filters from './Filters'
import { FontAwesome5 } from '@expo/vector-icons';
import  { PanGestureHandler, FlingGestureHandler } from 'react-native-gesture-handler'
// import { createAnimatedPropAdapter } from 'react-native-reanimated';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, withSpring} from 'react-native-reanimated';

function NavBar ( {handlePress, currentUser, comments, setComments, modalVisible, setModalVisible, selectedLocation, setSelectedLocation} ) {

    // The original starting height was set to 150
    const [swipeUp, setSwipeUp] = useState(false)
    const [height, setHeight] = useState('95%')
    const [filterBy, setFilterBy] = useState(null)

    const styles = StyleSheet.create({
        animatedContainer: {
            // display: flex,
            position: 'absolute',
            width: '100%',
            height: height,
            bottom: 0,
            top: '30%',
            backgroundColor: 'rgba(52, 52, 52, 0.85)',
            paddingBottom: 200,
        }
    })
    

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
                    <Filters filterBy={filterBy} setFilterBy={setFilterBy} />
                </FilterContainer>
                <LocContainer>
                    <AllLocationsList filterBy={filterBy} setFilterBy={setFilterBy} handlePress={handlePress} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}/>
                </LocContainer>
            </>
        )
    }

    const pressed = useSharedValue(false)

    const startingPosition = 300;
    // const x = useSharedValue(startingPosition);
    const y = useSharedValue(startingPosition);

// The lower the value of absoluteY is, the higher it is on the page

    const handleBiz = useAnimatedGestureHandler({
        onStart: (event, ctx) => {
            pressed.value = true;
            // ctx.startX = x.value;
            ctx.startY = y.value;
        },
        onActive: (event, ctx) => {
            // x.value = ctx.startX + event.translationX;
            y.value = ctx.startY + event.translationY;
        },
        onEnd: (event, ctx) => {
            pressed.value = false;
            // x.value = withSpring(startingPosition);
            // y.value = withSpring(startingPosition);
            y.value = ctx.startY + event.translationY;
        },
    })

    const uas = useAnimatedStyle(() => {
        return {
            // backgroundColor: pressed.value ? '#FEEF86' : '#001972',
            transform: [{ translateY: y.value }],
        }
    })


    return (
        <PanGestureHandler onGestureEvent={handleBiz}>
            <Animated.View style={[styles.animatedContainer, uas]}>
                {/* <GestureRecognizer 
                    onSwipe={(direction, state) => handleGesture(direction, state)}
                    config={config}> */}
                <IconWrapper>
                    <FontAwesome5 name="grip-lines" size={24} color="black" />
                </IconWrapper>
                {/* </GestureRecognizer> */}
                {selectedLocation ? <LocationShow currentUser={currentUser} setComments={setComments} comments={comments} setModalVisible={setModalVisible} modalVisible={modalVisible} setSelectedLocation={setSelectedLocation} selectedLocation={selectedLocation}/> : <NoPress/>}
            </Animated.View>
        </PanGestureHandler>

    )

}


export default NavBar