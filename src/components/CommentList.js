import React, {useState} from 'react';
import styled from "styled-components";
import { Text, DarkText, Scroll, CloseView, ModalHolder, ModalForm, CloseText, H2, Wrapper } from '../styles/Styles'
import {FlatList, RefreshControl, ActivityIndicator} from "react-native";
import CommentItem from './CommentItem'
import { BASE_URL } from '@env'


function CommentList ( {fetchedCount, setFetchedCount, offset, setOffset, selectedLocation, comments, commentCount, setComments, setModalVisible}) {

    const [refreshing, setRefreshing] = useState(false) 
    

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

    const ActivityView = styled.View`
        margin-top: 10px;
    `

    function onRefresh () {
        // setRefreshing(true)

        // If the number of times fetched * offset is more than the amount of comments then don't fetch

        console.log(offset)
        if (offset < commentCount) {
            fetch(`${BASE_URL}/location_comments/${selectedLocation.id}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({offset: offset})
            })
                    .then(r => r.json())
                    .then(data => {
                        // console.log(data)
                        // setComments([...comments, data.comments])
                        let commentsFromDb = data.comments
                        setComments(comments.concat(commentsFromDb))
                        setOffset(offset + 8)
                        setFetchedCount(fetchedCount + 1)
                    })
        }
        
        // setRefreshing(false)
        // console.log(data)
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
                        data={comments}
                        // extraData={comments}
                        renderItem={renderComment}
                        keyExtractor={(item) => item.id.toString()}
                        initialNumToRender={8}
                        showsVerticalScrollIndicator={false}
                        // refreshing={refreshing}
                        // onRefresh={onRefresh}
                        onEndReached={onRefresh}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={renderFooter}
                    />
            </Form>
        </ModalHolder>
    )
}

export default CommentList