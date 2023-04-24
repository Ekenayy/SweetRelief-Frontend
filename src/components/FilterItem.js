import React from 'react'
import { DarkText, TouchView } from '../styles/Styles'
import styled from 'styled-components'


function FilterItem ( {filter, filterBy, setFilterBy} ) {
    
    const ItemView = styled(TouchView)`
        border-radius: 10px;
        background-color: ${props => props.selected ? '#F4A261' : 'transparent'};
        border-width: 2px;
        border-color: #F4A261
        justify-content: space-around;
        margin: 5px;
        padding-bottom: 5px;
        height: 35px;
    `

    const FavoriteView = styled(ItemView)`
      border-color: ${props => props.selected ? 'transparent': '#bea7e5'};
      background-color: ${props => props.selected ? '#bea7e5' : 'transparent'};
    `
    const FilterText = styled(DarkText)`
        align-self: center;
        font-weight: bold;
        padding: 2px;
        padding-right: 12px;
        padding-top: 5px;
        font-size: 15px;
        color: ${props => props.selected ? 'black' : '#F4A261'} ;
    `

    const FavoriteText = styled(FilterText)`
      color: ${props => props.selected ? 'black' : '#bea7e5'} ;
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

      const handleFilterPress = () => {
        // Create multi-select filter
        filterBy === filter ? setFilterBy(null) : setFilterBy(filter)
      }

    if (filter == 'favorites') {
      return (
        <FavoriteView selected={filterBy === filter} onPress={handleFilterPress}>
          <FavoriteText 
            selected={filterBy === filter}
            style={filterBy == filter ? {opacity: 0.5} : {opacity: 1}}
          >
            {filterName(filter)}
          </FavoriteText>
        </FavoriteView>
      )
    } else {
      return (
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

}

export default FilterItem 