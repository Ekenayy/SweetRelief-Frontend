import React from 'react'
import { Text, Scroll, TouchView } from '../styles/Styles'
import styled from 'styled-components'


function FilterItem ( {filter, filterBy, setFilterBy} ) {
    
    const ItemView = styled(TouchView)`
        ${'' /* background-color: white; */}
        ${'' /* margin: 4px; */}
        border-radius: 5px;
    `

    const FilterText = styled(Text)`
        color: #5bd96c;
        align-self: center;
        font-weight: bold;
        padding: 2px;
        padding-right: 5px;
        font-size: 30px;
    `

    const filterImage = (name) => {
        if (name === "key_required") {
          return "🔐"
        }
        if (name === "free") {
          return "🆓";
        }
        if (name === "wheelchair_accessible") {
          return "♿";
        }
        if (name === "unisex") {
          return "🚻";
        }
      };

      const handleFilterPress = (e) => {
        filterBy === filter ? setFilterBy(null) : setFilterBy(filter)
      }

    return (
        // <ItemView onPress={() => setFilterBy(filter)}>
        <ItemView onPress={handleFilterPress}>

            <FilterText 
              style={filterBy == filter ? {opacity: 0.5} : {opacity: 1}}
            >
              {filterImage(filter)}
            </FilterText>
        </ItemView>
    )

}

export default FilterItem 