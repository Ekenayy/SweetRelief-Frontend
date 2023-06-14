import React from 'react'
import styled from 'styled-components'
import AllLocationsList from './AllLocationsList'
import { StyleSheet, ActivityIndicator } from "react-native";
import { Wrapper } from '../styles/Styles'
import LocationShow from './LocationShow'
import Filters from './Filters'
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import  { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

function NavBar ( { searchingUserLocation, getUserLocation, commentCount, setCommentCount, setAvgRating, avgRating, commented, modalContent, contextUserLocation, wholeMap, favoriteLocIds, setFavoriteLocIds, setCurrentUser, navigation, setToken, setModalContent, filterBy, setFilterBy, handlePress, currentUser, comments, setComments, modalVisible, setModalVisible, selectedLocation, setSelectedLocation, loginSkipped, setLoginSkipped } ) {

    const styles = StyleSheet.create({
        animatedContainer: {
            display: 'flex',
            flex: 1,
            position: 'absolute',
            width: '100%',
            height: '100%',
            bottom: 0,
            top: 300,
        }
    })
    
    const NavContainer = styled.View`
        background-color: rgba(52, 52, 52, 0.85);
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
        margin-left: 0px;
        padding: 5px 0px;
    `
    const BigIconView = styled.View`
        margin-bottom: 2px;
        flex-direction: row;
        justify-content: space-between;
    `

    const IconView = styled.View`
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        padding-right: 5px;
        gap: 12px
    `

    const ZoomView = styled(IconView)`
        padding-left: 5px;
    `

    const TouchView = styled.TouchableOpacity`
    `

    const NoPress = ( ) => {
        return (
            <>
                <FilterContainer>
                    <Filters filterBy={filterBy} setFilterBy={setFilterBy} />
                </FilterContainer>
                {searchingUserLocation ? <ActivityIndicator size="large" color="#F4A261" /> : 
                <LocContainer>
                    <AllLocationsList favoriteLocIds={favoriteLocIds} filterBy={filterBy} handlePress={handlePress}/>
                </LocContainer>
                }
            </>
        )
    }

    const pressed = useSharedValue(false)

    const startingPosition = 300;
    const y = useSharedValue(startingPosition);

    const handleGesture = useAnimatedGestureHandler({
        onStart: (event, ctx) => {
            pressed.value = true;
            ctx.startY = y.value;
        },
        onActive: (event, ctx) => {
            y.value = ctx.startY + event.translationY;
        },
        onEnd: (event, ctx) => {
            pressed.value = false;
            y.value = ctx.startY + event.translationY;
        },
    })

    const uas = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: y.value < -258 ? -258 : y.value }],
        }
    })

    const handleLogOut = () => {
        const removeToken = async () => {
            try {
                let tokenPresence = await AsyncStorage.removeItem('token') == undefined ? 'removed' : 'here';
                if (tokenPresence == 'removed') {
                    setToken(null)
                    setCurrentUser(null)
                }
                return true;
            } catch(e) {
                return false;
            }
        }

        removeToken()
    }
    
    return (
        <PanGestureHandler onGestureEvent={handleGesture}>
            <Animated.View style={[styles.animatedContainer, uas]}>
                <BigIconView>
                    <ZoomView>
                        <TouchView onPress={() => wholeMap.current.animateToRegion(contextUserLocation, 500)}>
                            <FontAwesome5 name="location-arrow" size={26} color="black" />
                        </TouchView>
                        <TouchView onPress={() => getUserLocation()}>
                            <Ionicons name="reload" size={26} color="black" />
                        </TouchView>
                    </ZoomView>
                    <IconView>
                        { currentUser ? 
                            <TouchView onPress={() => navigation.navigate('Profile')}>
                                <Ionicons name="person" size={30} color="#1C1C1C" />
                            </TouchView> :
                            null
                        }
                        <TouchView onPress={() => {
                            setModalVisible(true)
                            setModalContent('info')
                        }}>
                            <Ionicons name="information-circle-outline" size={30} color="#1C1C1C" />
                        </TouchView>
                        { currentUser ?
                            <TouchView onPress={handleLogOut}>
                                <MaterialCommunityIcons name="logout" size={30} color="#1C1C1C" />
                            </TouchView> :
                            <TouchView onPress={() => setLoginSkipped(false)}>
                                <MaterialCommunityIcons name="login" size={30} color="#1C1C1C" />
                            </TouchView> 
                        }
                    </IconView>
                </BigIconView>
                <NavContainer>
                    <IconWrapper>
                        <FontAwesome5 name="grip-lines" size={24} color="#1C1C1C"/>
                    </IconWrapper>
                    {selectedLocation ? <LocationShow setAvgRating={setAvgRating} avgRating={avgRating} commentCount={commentCount} setCommentCount={setCommentCount} commented={commented} avgRating={avgRating} setFavoriteLocIds={setFavoriteLocIds} favoriteLocIds={favoriteLocIds} modalConent={modalContent} setModalContent={setModalContent} currentUser={currentUser} setComments={setComments} comments={comments} setModalVisible={setModalVisible} modalVisible={modalVisible} setSelectedLocation={setSelectedLocation} selectedLocation={selectedLocation} loginSkipped={loginSkipped} /> 
                        : 
                        <NoPress/>
                    }
                </NavContainer>
            </Animated.View>
        </PanGestureHandler>
    )

}


export default NavBar