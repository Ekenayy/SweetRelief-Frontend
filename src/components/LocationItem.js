import React from 'react'
import { Text, Wrapper, TouchView } from '../styles/Styles'
import styled from 'styled-components'
import * as geolib from 'geolib'
import LocationContext from '../LocationContext'
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

function LocationItem ( { handlePress, location, setSelectedLocation}) {

    const {name, address, distance, latitude, walkTime, longitude, locType, free, upvotes, downvotes, price_cents, unisex, key_required, wheelchair_accessible, id} = location

    const {userLocation} = React.useContext(LocationContext)
    const [contextUserLocation, setcontextUserLocation] = userLocation

    // console.log(location.distance)

    const LocationView = styled(TouchView)`
        borderBottomWidth: .3px;
        padding-left: 0px;
        flex-direction: row;
    `

    const DetailsView = styled(Wrapper)`
        flex-direction: row;
        padding: 10px;
        padding-left: 20px;
        margin-left: 0px;
        margin-right: 0px;
        width: 93%;
    `

    const InfoView = styled(DetailsView)`
        flex-direction: column;
        padding: 0px;
        overflow: hidden;
    `

    const AttributesView = styled(Wrapper)`
        flex-direction: row;
        margin-left: 0px;
        padding-top: 2px;
    `

    const IconView = styled(Wrapper)`
        padding-left: 10px;
        flex-direction: row;
        margin-left: 0px;
        padding-top: 2px;
        justifyContent: space-around;
    `

    const ArrowView = styled(Wrapper)`
        align-self: center;
        margin-left: 0px;
        padding-left: 0px;
        justify-content: flex-end;
    `

    const LocationText = styled(Text)`
        color: white;
    `

    return (
        <LocationView onPress={() => handlePress(location)}>
            <DetailsView>
                <InfoView>
                    <LocationText numberOfLines={1}>{address}</LocationText>
                    <AttributesView>
                        <IconView>
                            <MaterialCommunityIcons name="tape-measure" size={18} color="black" style={{marginRight: 5}} />                            
                            {/* <MaterialIcons name="directions-walk" size={18} color="black" /> */}
                            <LocationText>{distance} mi</LocationText>  
                        </IconView>
                        <IconView>
                            <MaterialIcons name="directions-walk" size={18} color="black" />                           
                            {/* <MaterialIcons name="directions-walk" size={18} color="black" /> */}
                            <LocationText>{walkTime} minutes</LocationText>  
                        </IconView>
                    </AttributesView>
                </InfoView>
            </DetailsView>
            <ArrowView>
                <Fontisto name="angle-right" size={24} color="black" />
            </ArrowView>
        </LocationView>
    )
}

export default LocationItem