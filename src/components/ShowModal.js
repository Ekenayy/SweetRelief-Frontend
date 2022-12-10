import React, { useState } from 'react'
import styled from 'styled-components'
import { Alert } from 'react-native'
import CommentForm from './CommentForm'
import PayOptions from './PayOptions'
import PayScreen from './PayScreen'
import Receipt from './Receipt'
import Discover from './Discover'
import Info from './Info'
import CommentList from './CommentList'
import ErrorMsg from './ErrorMsg'



function ShowModal ({avgRating, setAvgRating, modalContent, commentCount, setCommentCount, setCommented, setModalContent, currentUser, setCurrentUser, comments, setComments, selectedLocation, setModalVisible, modalVisible}) {

    const [orderToken, setOrderToken] = useState()
    const [showGateway, setShowGateway] = useState(false)
    
    const Modal1 = styled.Modal`
    `

    const ModalHolder = styled.View`
        flex: 1;
        margin-top: 200px;
        width: 90%;
        align-self: center;
    `

    const ModalForm = styled.View`
        padding: 10px;
        background-color: white;
        border-radius: 20px;
        align-items: center;
    `

    const ConditionalComponent = () => {
        switch (modalContent) {
            case 'comment':
                return <CommentForm avgRating={avgRating} setAvgRating={setAvgRating} setCommented={setCommented} setCommentCount={setCommentCount} commentCount={commentCount} setComments={setComments} comments={comments} currentUser={currentUser} modalVisible={modalVisible} selectedLocation={selectedLocation} setModalVisible={setModalVisible}/>
            case 'pay':
                return <PayOptions orderToken={orderToken} setOrderToken={setOrderToken} setModalContent={setModalContent} currentUser={currentUser} selectedLocation={selectedLocation} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            case 'receipt':
                return <Receipt comments={comments} currentUser={currentUser} setModalContent={setModalContent} selectedLocation={selectedLocation} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            case 'discover':
                return <Discover headerText='Discover' setModalVisible={setModalVisible} uri={selectedLocation.marketing_link} showGateway={true} setShowGateway={setShowGateway}/>
            case 'comment list': 
                return <CommentList commentCount={commentCount} selectedLocation={selectedLocation} setComments={setComments} comments={comments} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            case 'money':
                return <PayScreen setCurrentUser={setCurrentUser} setModalContent={setModalContent} currentUser={currentUser} selectedLocation={selectedLocation} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            case 'info':
                return <Info setModalContent={setModalContent} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
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