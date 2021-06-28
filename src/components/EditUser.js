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
    const [passwordClicked, setPasswordClicked] = useState(false)

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
        flex-direction: row;
        align-self: center;
    `
    const ErrorSpan = styled(Span)`
        color: red;
    `

    const ChangePassView = styled.TouchableOpacity`
        align-self: center;
        flex-direction: row;
        align-items: center;
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
            {/* <EditInput
                placeholder="Password.."
                defaultValue='*******'
                secureTextEntry={true}
                onChangeText={text => setValue('password', text)}
            /> */}
            {/* {errors ? <ErrorSpan>{errors}</ErrorSpan> : null} */}
            {errors ? errors.map( (error) => <ErrorSpan key={error}>*{error}</ErrorSpan>) : null}
            <ChangePassView>
                <Ionicons name="eye-outline" size={26} color="#F4A261" style={{marginRight: 10}} />
                <DarkText>Change Password</DarkText>
            </ChangePassView>
            <ButtonView>
                <PurpButton onPress={handleSubmit(handleEdit)}>
                    <Span>Submit</Span>
                </PurpButton>
            </ButtonView>
        </Form>
    )

}

export default EditUser