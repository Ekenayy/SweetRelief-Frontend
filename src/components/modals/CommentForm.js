import React, {useState, useEffect, useRef} from 'react'
import styled from "styled-components";
import { Rating } from 'react-native-ratings';
import {useForm} from 'react-hook-form';
import { CloseView, ModalHolder, ModalForm, H2 } from '../../styles/Styles'
import { BASE_URL } from '@env'
import { MaterialIcons } from '@expo/vector-icons';

function CommentForm ( {setAvgRating, currentUser, setCommented, setCommentCount, commentCount, comments, setComments, selectedLocation, setModalVisible, modalVisible}) {

    const [ios, setIos] = useState(Platform.OS === 'ios')
    const [errors, setErrors] = useState([])
    const yesButton = useRef()
    const noButton = useRef()

    let locationRating 
    let stillOpen

    const Input = styled.TextInput`
        background: #F3F5F6;
        width: 70%;
        border-radius:20px;
        padding-left: 12px;
        height: 40px;
        margin-bottom: 10px;
    `
    
    const ButtonView = styled.View`
        flex-direction: row;
        margin-top: 10px;
    `

    const Button = styled.TouchableOpacity`
        background: #bea7e5;
        width: 150px;
        border-radius:20px;
        align_self: center;
        margin-top: 5px;
        margin-right: 5px;
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

        if (formBody.rating) {
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
                        setComments([newComment.comment, ...comments])}
                        setAvgRating(newComment.average_rating)
                        setCommentCount(commentCount + 1)
                        setCommented(true);
                    }
                )
            setModalVisible(!modalVisible)
        } else {
            setErrors(['Review must include a rating'])
        }
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
                <ModalHolder>
                    <ModalForm>
                        <CloseView onPress={() => setModalVisible(!modalVisible)}>
                            <MaterialIcons name="cancel" size={30} color="#bea7e5" />
                        </CloseView>
                        <Rating
                            showRating={ios ? false : true}
                            type="heart"
                            imageSize={ ios ? 50 : 20}
                            onFinishRating={rating => locationRating = rating}
                            style={{ paddingVertical: 0, marginBottom: 50, paddingLeft: 0, borderRadius: 20, height: 30 }}
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
                            multiline={true}
                            onChangeText={text => setValue('description', text)}
                        />
                        {errors ? errors.map( (error) => <ErrorSpan key={error}>*{error}</ErrorSpan>) : null}
                        <ButtonView>
                            <Button onPress={handleSubmit(onSubmit)}>
                                <Span>Submit rating</Span>
                            </Button>
                        </ButtonView>
                    </ModalForm>
                </ModalHolder>

    )

}

export default CommentForm