import React from 'react'
import { Text, Scroll, TouchView } from '../styles/Styles'
import styled from 'styled-components'


function FilterItem ( {filter, setFilters} ) {
    
    const ItemView = styled(TouchView)`
        background-color: white;
        margin: 5px;
        border-radius: 5px;
    `

    const FilterText = styled(Text)`
        color: #5bd96c;
        align-self: center;
        font-weight: bold;
        padding: 5px;
        padding-right: 15px;
    `


    return (
        <ItemView onPress={() => setFilters(filter)}>
            <FilterText>{filter}</FilterText>
        </ItemView>
    )

}

export default FilterItem 