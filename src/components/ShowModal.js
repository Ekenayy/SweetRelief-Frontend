import React from 'react'
import styled from 'styled-components'
import { Alert } from 'react-native'
import CommentForm from './modals/CommentForm'
import Info from './modals/Info'
import CommentList from './modals/CommentList'
import ErrorMsg from './modals/ErrorMsg'
import OutOfRadius from './modals/OutOfRadius'
import NoUser from './modals/NoUser'

function ShowModal ({avgRating, setAvgRating, modalContent, commentCount, setCommentCount, setCommented, currentUser, comments, setComments, selectedLocation, setModalVisible, modalVisible, setLoginSkipped}) {

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
            case 'outOfRange':
                return <OutOfRadius setModalVisible={setModalVisible}/>
            case 'no user':
                return <NoUser setModalVisible={setModalVisible} setLoginSkipped={setLoginSkipped}/>
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