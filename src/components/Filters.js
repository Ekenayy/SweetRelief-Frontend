import React from 'react'
import { Scroll } from '../styles/Styles'
import FilterItem from './FilterItem'
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
        'favorites',
        'free',
        'unisex',
        'key_required',
        'wheelchair_accessible'
    ]

    const allFilters = filterNames.map(filter => {
        return <FilterItem key={filter} setFilterBy={setFilterBy} filter={filter} filterBy={filterBy}/>
    })

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