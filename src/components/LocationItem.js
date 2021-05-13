import React from 'react'
import { Text, Wrapper, TouchView } from '../styles/Styles'
import styled from 'styled-components'
import * as geolib from 'geolib'
import LocationContext from '../LocationContext'
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function LocationItem ( { handlePress, location, setSelectedLocation}) {

    const {name, address, distance, latitude, longitude, locType, free, upvotes, downvotes, price_cents, unisex, key_required, wheelchair_accessible, id} = location

    const {userLocation} = React.useContext(LocationContext)
    const [contextUserLocation, setcontextUserLocation] = userLocation

    // console.log(location.distance)

    const LocationView = styled(TouchView)`
        borderBottomWidth: .5px;
        padding-left: 0px;
    `

    const DetailsView = styled(Wrapper)`
        flex-direction: row;
        padding: 10px;
        padding-left: 20px;
        margin-left: 0px;
    `

    const InfoView = styled(DetailsView)`
        flex-direction: column;
        padding: 0px;
    `

    const AttributesView = styled(Wrapper)`
        flex-direction: row;
        margin-left: 0px;
        padding-top: 2px;
    `

    const IconView = styled(AttributesView)`
        padding-left: 10px;
    `

    return (
        <LocationView onPress={() => handlePress(location)}>
            <DetailsView>
                <InfoView>
                    <Text>{address}</Text>
                    <AttributesView>
                        <IconView>
                            <MaterialCommunityIcons name="tape-measure" size={18} color="black" style={{marginRight: 5}} />                            
                            {/* <MaterialIcons name="directions-walk" size={18} color="black" /> */}
                            <Text>{distance} miles</Text>  
                        </IconView>
                    </AttributesView>
                </InfoView>
            </DetailsView>
        </LocationView>
    )
}

export default LocationItem