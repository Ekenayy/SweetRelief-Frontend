import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { DarkText, H2, Wrapper, PurpButton, Scroll, Span, Input } from '../styles/Styles'
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { BASE_URL } from '@env'
import {useForm} from 'react-hook-form'


function EditUser ( {currentUser, setCurrentUser}) {

    const {register, handleSubmit, setValue} = useForm()
    
    const [errors, setErrors] = useState("")

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
    const ErrorSpan = styled(Span)`
        color: red;
    `

    const handleEdit = data => {
        
        let formBody = {}

        for (const [key, value] of Object.entries(data)) {
            if (value !== undefined) {
                formBody[key]=value
            }
        }

        fetch(`${BASE_URL}/users/${currentUser.id}`, {
            method: 'PATCH', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formBody)
        })
            .then(r=> r.json())
            .then(updatedUser => {
                if (updatedUser.errors) {
                    setErrors(updatedUser.errors)
                } else {
                    setCurrentUser(updatedUser)
                }
            })
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
            {/* {errors ? <ErrorSpan>{errors}</ErrorSpan> : null} */}
            {errors ? errors.map( (error) => <ErrorSpan key={error}>*{error}</ErrorSpan>) : null}
            <ButtonView>
                <PurpButton onPress={handleSubmit(handleEdit)}>
                    <Span>Submit</Span>
                </PurpButton>
            </ButtonView>
        </Form>
    )

}

export default EditUser