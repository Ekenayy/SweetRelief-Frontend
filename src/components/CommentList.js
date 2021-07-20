import React, {useState} from 'react';
import styled from "styled-components";
import { Text, DarkText, Scroll, CloseView, ModalHolder, ModalForm, CloseText, H2, Wrapper } from '../styles/Styles'
import {FlatList, RefreshControl, ActivityIndicator} from "react-native";
import CommentItem from './CommentItem'
import { BASE_URL } from '@env'


function CommentList ( {selectedLocation, comments, setComments, setModalVisible}) {

    const [refreshing, setRefreshing] = useState(false) 
    const [limit, setLimit] = useState(5)
    const [offset, setOffset] = useState(8)

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

        fetch(`${BASE_URL}/location_comments/${selectedLocation.id}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({offset: offset})
        })
                .then(r => r.json())
                .then(data => {
                    console.log(data, 'fetched')
                    // setComments(...comments, data.comments)
                })
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
                        extraData={comments}
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