import React, {useState} from 'react';
import styled from "styled-components";
import { Text, DarkText, Scroll, CloseView, ModalHolder, ModalForm, CloseText, H2, Wrapper } from '../styles/Styles'
import {FlatList, RefreshControl, ActivityIndicator} from "react-native";
import PaymentOrder from './PaymentOrder';

function PaymentOrderList ( {orders, modalVisible, setModalVisible, chosenOrder, setChosenOrder}) {

    const [refreshing, setRefreshing] = useState(false) 

    const Title = styled(H2)`
        align-self: center;
        margin-bottom: 15px;
        font-weight: bold;
    `

    const MainView = styled.View`
        padding-bottom: 0px;
    `

    const renderPayment = ( {item} ) => {
        return <PaymentOrder modalVisible={modalVisible} setModalVisible={setModalVisible} setChosenOrder={setChosenOrder} chosenOrder={chosenOrder} order={item} />
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
        // <MainView>
        <>
            <FlatList
                ListHeaderComponent={
                    <Title>Recent Orders</Title>
                }
                data={orders}
                renderItem={renderPayment}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
            />
        </>
        // </MainView>
    )
}

export default PaymentOrderList