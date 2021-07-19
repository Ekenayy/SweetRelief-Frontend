import React, {useState} from 'react';
import styled from "styled-components";
import { Text, DarkText, Scroll, CloseView, ModalHolder, ModalForm, CloseText, H2, Wrapper } from '../styles/Styles'
import {FlatList} from "react-native";
import CommentItem from './CommentItem'

function CommentList ( {comments, setComments, setModalVisible}) {

    const Comment = ( {comment} ) => {
        return (
            <Wrapper>
                <DarkText>{comment.name}</DarkText>
            </Wrapper>
        )
    }

    const renderComment = ( {item} ) => {
        return <CommentItem inModal={true} comment={item} />
    }

    return (
        <ModalHolder>
            <ModalForm>
                <CloseView onPress={() => setModalVisible(false)}>
                    <CloseText>❌</CloseText>
                </CloseView>
                <DarkText>Hello from Comment List</DarkText>
                <FlatList 
                    data={comments}
                    renderItem={renderComment}
                    keyExtractor={(item) => item.id}
                />
            </ModalForm>
        </ModalHolder>
    )
}

export default CommentList