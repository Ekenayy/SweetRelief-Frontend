import React from 'react'
import styled from 'styled-components'
import AllLocationsList from './LocationItem'

function NavBar ( ) {

    const Wrapper = styled.View`
        display: flex;
        height: 25%;
        
    `

    const Container = styled.View`
    `

    const Text = styled.Text`
    `

    return (
        <Wrapper>
            <Container>
                <Text>Filter</Text>
            </Container>
            <Container>
                {/* <AllLocationsList/> */}
                <Text>Closest Toilet</Text>
            </Container>
        </Wrapper>
    )

}

export default NavBar