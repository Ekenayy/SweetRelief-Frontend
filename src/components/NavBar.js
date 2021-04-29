import React, { useState } from 'react'
import styled from 'styled-components'
import AllLocationsList from './LocationItem'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

// import { Animated } from 'react-native'
// import  { PanGestureHandler, FlingGestureHandler } from 'react-native-gesture-handler'



function NavBar ( ) {

    // Make the the nav respond to touch 
    // Capture the users movement - Either up or down
    // Make the height of the nav respond depending on gesture

    const [swipeUp, setSwipeUp] = useState(false)

    const heightProperty = () => {
        if (swipeUp) {
            return 300
        } else {
            return 150
        }
    } 

    const Wrapper = styled.View`
        display: flex;
        position: absolute;
        width: 100%
        height: ${heightProperty}px;
        bottom: 0;
        background-color: grey;
    `

    const Scroll = styled.ScrollView`
        flex-direction: column;
    `

    const Container = styled.View`
    `

    const Text = styled.Text`
    `

    // const handleGesture = (evt) => {
    //     console.log(evt)
    // }

    const config = {
        velocityThreshold: .1,
        directionalOffsetThreshold: 80,
        gestureIsClickThreshold: 10
    }

    return (
        <GestureRecognizer 
            onSwipeUp={() => setSwipeUp(true)}
            onSwipeDown={() => setSwipeUp(false)}
        >
            <Wrapper>
                <Scroll>
                    <Container>
                        <Text>Filter</Text>
                    </Container>
                    <Container>
                        {/* <AllLocationsList/> */}
                        <Text>Closest Toilet</Text>
                    </Container>
                </Scroll>
            </Wrapper>
        </GestureRecognizer>

    )

}

export default NavBar