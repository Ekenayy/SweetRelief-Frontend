import React, {useState} from 'react';
import styled from "styled-components";
import { CloseView, ModalHolder, ModalForm, CloseText, H2 } from '../../styles/Styles'
import {FlatList, ActivityIndicator} from "react-native";
import CommentItem from '../CommentItem'
import { BASE_URL } from '@env'

function CommentList ( {selectedLocation, comments, commentCount, setModalVisible}) {

    const [refreshing, setRefreshing] = useState(true) 
    const [localComments, setLocalComments] = useState(comments)
    const [offset, setOffset] = useState(8)
    

    const renderComment = ( {item} ) => {
        return <CommentItem key={item.id} inModal={true} comment={item} />
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

    const ActivityView = styled.View`
        margin-top: 10px;
    `

    function onRefresh () {

        if (offset < commentCount) {
            setRefreshing(true)
            fetch(`${BASE_URL}/location_comments/${selectedLocation.id}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({offset: offset})
            })
                    .then(r => r.json())
                    .then(data => {
                        setRefreshing(false)
                        let commentsFromDb = data.comments
                        setLocalComments(localComments.concat(commentsFromDb))
                        setOffset(offset + 8)
                    })
        }
    }

    const renderFooter = () => {
        if (refreshing) {
            return (
                <ActivityView>
                    <ActivityIndicator animating size="large" />
                </ActivityView>
            )
        } else {
            return null
        }
    }


    return (
        <ModalHolder>
            <Form>
                <ExitView onPress={() => setModalVisible(false)}>
                    <CloseText>❌</CloseText>
                </ExitView>
                    <H2>Reviews</H2>
                    <FlatList 
                        data={localComments}
                        renderItem={renderComment}
                        style={{ flex: 1, minWidth: '100%' }}
                        keyExtractor={(item) => item.id.toString()}
                        initialNumToRender={5}
                        showsVerticalScrollIndicator={false}
                        onEndReached={onRefresh}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={renderFooter}
                    />
            </Form>
        </ModalHolder>
    )
}

export default CommentList