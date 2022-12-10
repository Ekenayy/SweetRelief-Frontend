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
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #BEA7E5;
    `

    const LogoView = styled.View`
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 100%;
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