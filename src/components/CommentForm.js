import React, {useState, useEffect, useRef} from 'react'
import styled from "styled-components";
import { Alert } from 'react-native'
import { Rating } from 'react-native-ratings';
import {useForm} from 'react-hook-form';
import { Text, Scroll, H2, Wrapper } from '../styles/Styles'
import { BASE_URL } from '@env'
import { createNativeWrapper } from 'react-native-gesture-handler';



function CommentForm ( {currentUser, comments, setComments, selectedLocation, setModalVisible, modalVisible}) {

    const [ios, setIos] = useState(Platform.OS === 'ios')
    const [errors, setErrors] = useState("")
    const yesButton = useRef()
    const noButton = useRef()

    let locationRating 
    let stillOpen

    const Input = styled.TextInput`
        background: #F3F5F6;
        width: 70%;
        border-radius:20px;
        padding-left: 12px;
        height: 30px;
        margin-bottom: 10px;
    `
    
    const ButtonView = styled.View`
        flex-direction: row;
        margin-top: 10px;
    `

    const Button = styled.TouchableOpacity`
        background: #03DAC5;
        width: 150px;
        border-radius:20px;
        align_self: center;
        margin-top: 5px;
        margin-right: 5px;
    `

    const CancelButton = styled(Button)`
        background: #E379DF;
        margin-left: 5px;
    `

    const Span = styled.Text`
        color: #F7F8F3
        padding: 12px;
        align-self: center
        font-weight: bold;
    `
    const ErrorSpan = styled(Span)`
        color: red
        font-weight: bold;
    `
    const Modal1 = styled.Modal`
    `

    const ModalForm = styled.View`
        padding:10px;
        background-color: white;
        border-radius: 20px;
        align-items: center;
    `

    const ModalHolder = styled.View`
        flex: 1;
        margin-top: 200px;
        width: 90%;
        align-self: center;
    `
    const FormTitle = styled.Text`
        font-size: 24px;
        color: black;
        align-self: center;
        font-weight: bold;
        margin-bottom: 10px;
    `

    const YesButton = styled(Button)`
        background-color: #F3F5F6;
    `
    const NoButton = styled(YesButton)`
        background-color: #F3F5F6;
    `

    const OptionText = styled(Span)`
        color: black;
    `

    const QuestionView = styled.View`
        margin-bottom: 20px;
    `


    const {register, handleSubmit, setValue} = useForm()

    useEffect(() => {
        register('description')
    }, [register])

    function onSubmit(data) {

        let safeDescription

        if (data.description == undefined) {
            safeDescription = ""
        } else {
            safeDescription = data.description
        }


        let formBody = {
            description: safeDescription,
            still_open: stillOpen,
            rating: locationRating,
            location_id: selectedLocation.id,
            user_id: currentUser.id
        }

        console.log(formBody)

        fetch(`${BASE_URL}/comments`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formBody)
        })
            .then(res => res.json())
            .then(newComment => {
                if (newComment.errors) {
                    setErrors(newComment.errors)
                } else {
                    setComments([...comments, newComment])}
                }
            )

            console.log(errors)
        // setModalVisible(!modalVisible)

    }

    const changeColors = (word) => {
        let startingColor = '#F3F5F6'

        if (word == 'yes') {
            yesButton.current.setNativeProps({
                backgroundColor: '#aab3af'
            })
            noButton.current.setNativeProps({
                backgroundColor: startingColor
            })
            stillOpen = true 
        } else if (word == 'no') {
            noButton.current.setNativeProps({
                backgroundColor: '#aab3af'
            })
            yesButton.current.setNativeProps({
                backgroundColor: startingColor
            })
            stillOpen = false
        }
    }

    return (
        <Modal1
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
            >
                <ModalHolder>
                    <ModalForm>
                        <Rating
                            showRating={ios ? false : true}
                            // ratingBackgroundColor="#03DAC5"
                            type="heart"
                            imageSize={ ios ? 50 : 20}
                            onFinishRating={rating => locationRating = rating}
                            style={{ paddingVertical: 5, marginBottom: 50, paddingLeft: 0, borderRadius: 20, height: 30 }}
                        />
                        <QuestionView>
                            <H2>Still Open?</H2>
                            <YesButton ref={yesButton} onPress={() => changeColors('yes')}>
                                <OptionText>Yes</OptionText> 
                            </YesButton>
                            <NoButton ref={noButton} onPress={() => changeColors('no')}>
                                <OptionText>No</OptionText> 
                            </NoButton> 
                        </QuestionView>
                        <Input
                            placeholder="Comment..." 
                            multline={true}
                            onChangeText={text => setValue('description', text)}
                        />
                        
                        {/* <Input
                            placeholder="Still Open? Yes or No?" 
                            multline={true}
                            onChangeText={text => setValue('still_open', text)}
                        />                   */}
                        {errors ? errors.map( (error) => <ErrorSpan key={error}>*{error}</ErrorSpan>) : null}
                        <ButtonView>
                            <Button onPress={handleSubmit(onSubmit)}>
                                <Span>Submit rating</Span>
                            </Button>
                            <CancelButton onPress={() => setModalVisible(!modalVisible)}>
                                <Span>Cancel</Span>
                            </CancelButton>
                        </ButtonView>
                    </ModalForm>
                </ModalHolder> 
            </Modal1>
    )

}

export default CommentForm