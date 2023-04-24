import React, {useState} from 'react';
import styled from "styled-components";
import { H2 } from '../styles/Styles'
import {FlatList, ActivityIndicator} from "react-native";
import PaymentOrder from './PaymentOrder';
import { BASE_URL } from '@env'

function PaymentOrderList ( {currentUser, orders, orderCount, modalVisible, setModalVisible, chosenOrder, setChosenOrder}) {
    const [refreshing, setRefreshing] = useState(false) 
    const [offset, setOffset] = useState(5)
    const [localOrders, setLocalOrders] = useState(orders)

    const Title = styled(H2)`
        align-self: center;
        margin-bottom: 15px;
        font-weight: bold;
    `

    const MainView = styled.View`
        padding-bottom: 0px;
    `

    const ActivityView = styled.View`
        margin-top: 10px;
    `

    function onRefresh () {

        let formBody = {
            user_id: currentUser.id, 
            offset
        }

        if (offset < orderCount) {
            setRefreshing(true)
            fetch(`${BASE_URL}/user_orders`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formBody)
            })
                    .then(r => r.json())
                    .then(data => {
                        setRefreshing(false)
                        let oredersFromDb = data.payment_orders
                        setLocalOrders(localOrders.concat(oredersFromDb))
                        setOffset(offset + 5)
                    })
        }
    }

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
            <FlatList
                ListHeaderComponent={
                    <Title>Recent Orders</Title>
                }
                data={localOrders}
                renderItem={renderPayment}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                onEndReached={onRefresh}
                onEndReachedThreshold={0.1}
                ListFooterComponent={renderFooter}
            />
    )
}

export default PaymentOrderList