import React from 'react'
import styled from 'styled-components'
import { Alert } from 'react-native'
import CommentForm from './CommentForm'
import Info from './Info'
import CommentList from './CommentList'
import ErrorMsg from './ErrorMsg'

function ShowModal ({avgRating, setAvgRating, modalContent, commentCount, setCommentCount, setCommented, setModalContent, currentUser, setCurrentUser, comments, setComments, selectedLocation, setModalVisible, modalVisible}) {

    const Modal1 = styled.Modal`
    `

    const ConditionalComponent = () => {
        switch (modalContent) {
            case 'comment':
                return <CommentForm avgRating={avgRating} setAvgRating={setAvgRating} setCommented={setCommented} setCommentCount={setCommentCount} commentCount={commentCount} setComments={setComments} comments={comments} currentUser={currentUser} modalVisible={modalVisible} selectedLocation={selectedLocation} setModalVisible={setModalVisible}/>
            case 'comment list': 
                return <CommentList commentCount={commentCount} selectedLocation={selectedLocation} comments={comments} setModalVisible={setModalVisible}/>
            case 'info':
                return <Info setModalVisible={setModalVisible}/>
            case 'error': 
                return <ErrorMsg setModalVisible={setModalVisible}/>
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
            <ConditionalComponent/>
        </Modal1>
    )

}

export default ShowModal