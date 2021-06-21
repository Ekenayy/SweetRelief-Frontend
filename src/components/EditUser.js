import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { DarkText, H2, Wrapper, PurpButton, Scroll, Span, Input } from '../styles/Styles'
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { BASE_URL } from '@env'
import {useForm} from 'react-hook-form'


function EditUser ( {currentUser}) {

    const {register, handleSubmit, setValue} = useForm()

    useEffect(() => {
        register('name')
        register('password')
        register('email')
    }, [register])

    const Form = styled.View`
        padding-left: 12px;
        margin-bottom: 20px;
    `
    // background: #c9c9c9;

    const EditInput = styled(Input)`
        background: #F4A261
        opacity: .6
    `
    const ButtonView = styled.View`
        margin-top: 10px;
    `
    const handleEdit = data => {
        
        let formBody = {}

        for (const [key, value] of Object.entries(data)) {
            if (value !== undefined) {
                formBody[key]=value
            }
        }

        // fetch(`${BASE_URL}/users/${thisUser.id}`, {
        //     method: 'PATCH', 
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(formBody)
        // })
        //     .then(r=> r.json())
        //     .then(updatedUser => {
        //         setThisUser(updatedUser)
        //     })
    }

    return (
        <Form>
            <EditInput
                placeholder="Name..."
                defaultValue={currentUser.name}
                multline={true}
                onChangeText={text => setValue('name', text)}
            />
            <EditInput
                placeholder="Email.."
                defaultValue={currentUser.email}
                onChangeText={text => setValue('email', text)}
            />
            <EditInput
                placeholder="Password.."
                defaultValue='*******'
                onChangeText={text => setValue('password', text)}
            />
            <ButtonView>
                <PurpButton onPress={handleSubmit(handleEdit)}>
                    <Span>Submit</Span>
                </PurpButton>
            </ButtonView>
        </Form>
    )

}

export default EditUser