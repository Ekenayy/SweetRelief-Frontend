import React, {useState} from 'react'
import { Text, Scroll, TouchView } from '../styles/Styles'
import FilterItem from './FilterItem'
import LocationContext from '../LocationContext'
import styled from 'styled-components'
import { Ionicons } from '@expo/vector-icons';


function Filters ( {filterBy, setFilterBy}) {


    const FiltersScroll = styled(Scroll)`
        flex-direction: row;
        flex-wrap: wrap;
        padding-top: 5px;
        padding-right: 10px;
        border-radius: 5px;
    `
    const filterNames = [
        'free',
        'unisex',
        'key_required',
        'wheelchair_accessible'
    ]


    const allFilters = filterNames.map(filter => {
        return <FilterItem key={filter} setFilterBy={setFilterBy} filter={filter} filterBy={filterBy}/>
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
            <Ionicons name="filter" size={24} style={{paddingTop: 5}} color="black" />            
            {allFilters}
        </FiltersScroll>
    )
    
}

export default Filters 