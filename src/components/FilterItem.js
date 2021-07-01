import React from 'react'
import { Text, DarkText, Scroll, TouchView } from '../styles/Styles'
import styled from 'styled-components'


function FilterItem ( {filter, filterBy, setFilterBy} ) {
    
    const ItemView = styled(TouchView)`
        ${'' /* background-color: white; */}
        ${'' /* margin: 4px; */}
        border-radius: 5px;
        background-color: ${props => props.selected ? '#bea7e5' : '#F7F8F3'};
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
    `

    const filterName = (name) => {
      switch (name) {
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
              style={filterBy == filter ? {opacity: 0.5} : {opacity: 1}}
            >
              {filterName(filter)}
            </FilterText>
        </ItemView>
    )

}

export default FilterItem 