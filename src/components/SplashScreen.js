import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import logo from '../photos/Logo_purp_bg.png'
import { ActivityIndicator, Animated } from 'react-native'

function SplashScreen () {
    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(
                    fadeAnim,
                    {
                        toValue: 1,
                        duration: 1800,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    fadeAnim,
                    {
                        toValue: 0,
                        duration: 1800,
                        useNativeDriver: true
                    }
                )
            ])
        ).start()
    }, [fadeAnim])
    
    const Body = styled.View`
        flex: 1;
        background-color: #BEA7E5;
    `

    const LogoView = styled.View`
        padding-top: 100px;
        align-self: center;
        height: 50%;
        width: auto;
    `

    return (
        <Body>
            <LogoView>
                <Animated.Image style={{opacity: fadeAnim}} source={logo}/>
            </LogoView>
                {/* <ActivityIndicator size='large' color='#F7F8F3'/> */}
        </Body>
    )
}

export default SplashScreen