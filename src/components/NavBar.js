import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import AllLocationsList from './AllLocationsList'
import { View, StyleSheet} from "react-native";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import { Text, Wrapper, Button } from '../styles/Styles'
import LocationShow from './LocationShow'
import Filters from './Filters'
import { FontAwesome5 } from '@expo/vector-icons';
import  { PanGestureHandler, FlingGestureHandler } from 'react-native-gesture-handler'
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, withSpring} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function NavBar ( {modalContent, favoriteLocIds, setFavoriteLocIds, setLoggedIn, setCurrentUser, navigation, setToken, setModalContent, filterBy, setFilterBy, handlePress, currentUser, comments, setComments, modalVisible, setModalVisible, selectedLocation, setSelectedLocation} ) {

    const styles = StyleSheet.create({
        animatedContainer: {
            display: 'flex',
            flex: 1,
            position: 'absolute',
            width: '100%',
            height: '100%',
            bottom: 0,
            top: 300,
        },
        navContainer: {
            backgroundColor: 'rgba(52, 52, 52, 0.85)',
        }
    })
    
    const NavContainer = styled.View`
        background-color: 'rgba(52, 52, 52, 0.85)';
        height: 100%;
        paddingBottom: 200px;
        flex: 1;
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
    const BigIconView = styled.View`
        align-items: flex-end
        margin-bottom: 2px;
    `

    const IconView = styled.View`
        flex-direction: row;
        justify-content: space-around;
        padding-right: 5px;
    `

    const TouchView = styled.TouchableOpacity`

    `

    const NoPress = ( ) => {
        return (
            <>
                <FilterContainer>
                    <Filters filterBy={filterBy} setFilterBy={setFilterBy} />
                </FilterContainer>
                <LocContainer>
                    <AllLocationsList favoriteLocIds={favoriteLocIds} filterBy={filterBy} setFilterBy={setFilterBy} handlePress={handlePress} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}/>
                </LocContainer>
            </>
        )
    }

    const pressed = useSharedValue(false)

    const startingPosition = 300;
    // const x = useSharedValue(startingPosition);
    const y = useSharedValue(startingPosition);

    const handleGesture = useAnimatedGestureHandler({
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
            transform: [{ translateY: y.value < -258 ? -258 : y.value }],
        }
    })

    const removeToken = async () => {
        try {
            await AsyncStorage.removeItem('token')
        } catch(e) {
        }
    
        console.log('Token Removed.')
    }

    const handleLogOut = () => {
        setToken(null)
        removeToken()
        setCurrentUser(null)
        setLoggedIn(false)
    }


    return (
        <PanGestureHandler onGestureEvent={handleGesture}>
            <Animated.View style={[styles.animatedContainer, uas]}>
                <BigIconView>
                    <IconView>
                        <TouchView onPress={() => navigation.navigate('Profile')}>
                            <Ionicons name="person" size={24} color="#1C1C1C" style={{paddingRight: 5}} />
                        </TouchView>
                        <TouchView onPress={handleLogOut}>
                            <MaterialCommunityIcons name="logout" size={24} color="#1C1C1C" style={{paddingLeft: 5}}/>
                        </TouchView>
                    </IconView>
                </BigIconView>
                <NavContainer>
                    <IconWrapper>
                        <FontAwesome5 name="grip-lines" size={24} color="#1C1C1C"/>
                    </IconWrapper>
                    {selectedLocation ? <LocationShow setFavoriteLocIds={setFavoriteLocIds} favoriteLocIds={favoriteLocIds} modalConent={modalContent} setModalContent={setModalContent} currentUser={currentUser} setComments={setComments} comments={comments} setModalVisible={setModalVisible} modalVisible={modalVisible} setSelectedLocation={setSelectedLocation} selectedLocation={selectedLocation}/> : <NoPress/>}
                </NavContainer>
            </Animated.View>
        </PanGestureHandler>
    )

}


export default NavBar