import React, {useState, useEffect} from 'react'
import styled from "styled-components";
import { Alert } from 'react-native'
import { Rating } from 'react-native-ratings';
import {useForm} from 'react-hook-form';
import { Text, Scroll } from '../styles/Styles'


function CommentForm ( {currentUser, selectedLocation, setModalVisible, modalVisible}) {

    return (
        <Text>Hello from Comment Form</Text>
    )

}

export default CommentForm