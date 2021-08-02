import React, {useState} from 'react';
import styled from "styled-components";
import { Text, DarkText, Scroll, CloseView, ModalHolder, ModalForm, CloseText, H2, Wrapper } from '../styles/Styles'
import {FlatList, RefreshControl, ActivityIndicator} from "react-native";
import PaymentOrder from './PaymentOrder';

function PaymentOrderList () {

    const Title = styled(H2)`
        align-self: center;
        margin-bottom: 15px;
        font-weight: bold;
    `

    const MainView = styled.View`
        margin-bottom: 10px;
    `

    return (
        <MainView>
            <Title>Recent Orders</Title>
        </MainView>
    )
}

export default PaymentOrderList