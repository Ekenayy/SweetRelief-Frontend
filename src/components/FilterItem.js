import React from 'react'
import { Text, DarkText, Scroll, TouchView } from '../styles/Styles'
import styled from 'styled-components'


function FilterItem ( {filter, filterBy, setFilterBy} ) {
    
    const ItemView = styled(TouchView)`
        ${'' /* background-color: white; */}
        ${'' /* margin: 4px; */}
        border-radius: 10px;
        background-color: ${props => props.selected ? '#F4A261' : 'transparent'};
        border-width: 2px;
        border-color: #F4A261
        justify-content: space-around;
        margin: 5px;
        padding-bottom: 5px;
        height: 35px;
    `

    const FilterText = styled(DarkText)`
        align-self: center;
        font-weight: bold;
        padding: 2px;
        padding-right: 12px;
        padding-top: 5px;
        font-size: 15px;
        color: ${props => props.selected ? 'white' : '#F4A261'} ;
    `

    const filterName = (filterName) => {
      switch (filterName) {
        case 'key_required':
          return "No key needed"
        case 'free':
          return "Free"
        case 'wheelchair_accessible':
          return "Wheelchair accessible"
        case 'unisex':
          return 'Unisex'
        case 'favorites':
          return 'Favorites'
      }
    }

      const handleFilterPress = (e) => {
        filterBy === filter ? setFilterBy(null) : setFilterBy(filter)
      }

    return (
        // <ItemView onPress={() => setFilterBy(filter)}>
        <ItemView selected={filterBy === filter} onPress={handleFilterPress}>
            <FilterText 
              selected={filterBy === filter}
              style={filterBy == filter ? {opacity: 0.5} : {opacity: 1}}
            >
              {filterName(filter)}
            </FilterText>
        </ItemView>
    )

}

export default FilterItem 