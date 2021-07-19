import React, { useState } from 'react'
import styled from 'styled-components'
import { Alert } from 'react-native'
import CommentForm from './CommentForm'
import PayOptions from './PayOptions'
import Receipt from './Receipt'
import WebComp from './WebComp'
import CommentList from './CommentList'


function ShowModal ({modalContent, setModalContent, currentUser, comments, setComments, selectedLocation, setModalVisible, modalVisible}) {

    const [orderToken, setOrderToken] = useState()
    const [showGateway, setShowGateway] = useState(false)
    const [progClr, setProgClr] = useState("#000")
    const [prog, setProg] = useState(false)

    let locationUrl = 'https://www.grubhub.com/restaurant/garam-masala-1819-palmetto-st-ridgewood/1038691?classicAffiliateId=%2Fr%2Fw%2F141623%2F&utm_source=kitchen.grubhub.com&utm_medium=OOL&utm_campaign=order%20online&utm_content=1038691'

    // I have the current user and the location -- I can prefill a price for now 
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
                return <CommentForm setComments={setComments} comments={comments} currentUser={currentUser} modalVisible={modalVisible} selectedLocation={selectedLocation} setModalVisible={setModalVisible}/>
            case 'pay':
                return <PayOptions orderToken={orderToken} setOrderToken={setOrderToken} setModalContent={setModalContent} currentUser={currentUser} selectedLocation={selectedLocation} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            case 'receipt':
                return <Receipt comments={comments} currentUser={currentUser} setModalContent={setModalContent} selectedLocation={selectedLocation} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            case 'discover':
                return <WebComp headerText='Discover' setModalVisible={setModalVisible} setProgClr={setProgClr} progClr={progClr} uri={locationUrl} showGateway={true} setShowGateway={setShowGateway} setProg={setProg} prog={prog}/>
            case 'comment list': 
                return <CommentList setComments={setComments} comments={comments} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        }
        // if (modalContent === 'comment') {
        //     return <CommentForm setComments={setComments} comments={comments} currentUser={currentUser} modalVisible={modalVisible} selectedLocation={selectedLocation} setModalVisible={setModalVisible}/>
        // } else if (modalContent === 'pay') {
        //     return <PayOptions currentUser={currentUser} selectedLocation={selectedLocation} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        // }
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
            {/* <ModalHolder>
                <ModalForm> */}
                    <ConditionalComponent/>
                    {/* <CommentForm setComments={setComments} comments={comments} currentUser={currentUser} modalVisible={modalVisible} selectedLocation={selectedLocation} setModalVisible={setModalVisible}/> */}
                {/* </ModalForm>
            </ModalHolder> */}
        </Modal1>
    )

}

export default ShowModal