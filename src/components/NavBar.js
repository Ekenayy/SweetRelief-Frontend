import React from 'react'
import styled from 'styled-components'

function NavBar ({locations}) {

    const Wrapper = styled.View`
        display: flex;
        height: 15%;
        
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
                <Text>Closest Toilet</Text>
            </Container>
        </Wrapper>
    )

}

export default NavBar