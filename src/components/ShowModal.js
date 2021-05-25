import React from 'react'
import styled from 'styled-components'
import { Alert } from 'react-native'
import CommentForm from '../components/CommentForm'
import PayOptions from '../components/PayOptions'

function ShowModal ({modalContent, setModalContent, currentUser, comments, setComments, selectedLocation, setModalVisible, modalVisible}) {

    const Modal1 = styled.Modal`
    `

    const ModalHolder = styled.View`
        flex: 1;
        margin-top: 200px;
        width: 90%;
        align-self: center;
    `

    const ModalForm = styled.View`
        padding:10px;
        background-color: white;
        border-radius: 20px;
        align-items: center;
    `

    const ConditionalComponent = () => {
        if (modalContent === 'comment') {
            return <CommentForm setComments={setComments} comments={comments} currentUser={currentUser} modalVisible={modalVisible} selectedLocation={selectedLocation} setModalVisible={setModalVisible}/>
        } else if (modalContent === 'pay') {
            return <PayOptions modalVisible={modalVisible} setModalVisible={setModalVisible}/>
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
                    <ConditionalComponent/>
                    {/* <CommentForm setComments={setComments} comments={comments} currentUser={currentUser} modalVisible={modalVisible} selectedLocation={selectedLocation} setModalVisible={setModalVisible}/> */}
                </ModalForm>
            </ModalHolder>
        </Modal1>
    )

}

export default ShowModal