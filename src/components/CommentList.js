import React, {useState} from 'react';
import styled from "styled-components";
import { Text, DarkText, Scroll, CloseView, ModalHolder, ModalForm, CloseText, H2, Wrapper } from '../styles/Styles'
import {FlatList} from "react-native";
import CommentItem from './CommentItem'

function CommentList ( {comments, setComments, setModalVisible}) {

    const renderComment = ( {item} ) => {
        return <CommentItem inModal={true} comment={item} />
    }

    const Form = styled(ModalForm)`
        display: flex;
        align-items: flex-start
        padding-left: 20px;
        height: 500px;
    `

    const ExitView = styled(CloseView)`
        align-self: flex-end
    `

    return (
        <ModalHolder>
            <Form>
                <ExitView onPress={() => setModalVisible(false)}>
                    <CloseText>❌</CloseText>
                </ExitView>
                    <H2>Reviews</H2>
                    <FlatList 
                        data={comments}
                        renderItem={renderComment}
                        keyExtractor={(item) => item.id}
                        initialNumToRender={3}
                        showsVerticalScrollIndicator={false}
                        onEndReached={() => console.log('end')}
                    />
            </Form>
        </ModalHolder>
    )
}

export default CommentList