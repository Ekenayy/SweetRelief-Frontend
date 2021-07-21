import React, {useState, useEffect} from 'react'
import {useForm} from 'react-hook-form';
import { BASE_URL } from '@env'
import styled from 'styled-components';
import { Input, Span, BrownButton, DarkText, H1} from '../styles/Styles'

function ResetPass () {

    const Title = styled(H1)`
    `
    return (
        <H1>Hello from reset pass</H1>
    )
}

export default ResetPass