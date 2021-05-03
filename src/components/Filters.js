import React from 'react'
import { Text, Scroll, TouchView } from '../styles/Styles'
import FilterItem from './FilterItem'
import LocationContext from '../LocationContext'
import styled from 'styled-components'


function Filters ( {filters, setFilters}) {

    
    const FiltersScroll = styled(Scroll)`
        flex-direction: row;
        flex-wrap: wrap;
        padding-top: 15px;
        padding-right: 10px;
    `
    const filterNames = [
        'Free',
        'Unisex',
        'No key required',
        'Wheelchair accessible'
    ]


    const allFilters = filterNames.map(filter => {
        return <FilterItem key={filter} setFilters={setFilters} filter={filter}/>
    })

    // Create a horizontal scrollview with all of the different filterItems
    // Filters Icon to left
    // Each filter should be a touchable opacity 
    // First filter should be a drop down of location type i.e park, business etc 

    return (
        <FiltersScroll
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            {allFilters}
        </FiltersScroll>
    )
    
}

export default Filters 