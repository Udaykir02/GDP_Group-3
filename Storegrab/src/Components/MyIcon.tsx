import React, { Component } from "react";
import { View, Text, StyleSheet, StyleProp, TextStyle } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'

interface MyIconProps {
    name: string;
    style?: StyleProp<TextStyle>;
}

export default class MyIcon extends Component<MyIconProps> {
    render() {
        const { name, style } = this.props;
        var iconNameParts = name.split('|');
        var iconStyle = style;
        switch (iconNameParts[0]) {
            case 'fontawesome': return (<FontAwesome name={iconNameParts[1]} style={iconStyle} />);
            case 'MaterialCommunityIcons': return (<MaterialCommunityIcons name={iconNameParts[1]} style={iconStyle} />);
            case 'Entypo': return (<Entypo name={iconNameParts[1]} style={iconStyle} />);
            case 'AntDesign': return (<AntDesign name={iconNameParts[1]} style={iconStyle} />);
            default: return (<Ionicons name={iconNameParts[1] || iconNameParts[0]} style={iconStyle} />);
        }
    }
}
