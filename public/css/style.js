import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "container": {
        "marginTop": 20
    },
    "mb20": {
        "marginBottom": 20
    },
    "hgroup": {
        "paddingLeft": 15,
        "borderBottom": "1px solid #ccc"
    },
    "hgroup h1": {
        "font": "500 normal 1.625em \"Roboto\",Arial,Verdana,sans-serif",
        "color": "#2a3644",
        "marginTop": 0,
        "lineHeight": 1.15
    },
    "hgroup h2lead": {
        "font": "normal normal 1.125em \"Roboto\",Arial,Verdana,sans-serif",
        "color": "#2a3644",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingBottom": 10
    },
    "search-result thumbnail": {
        "borderRadius": "0 !important"
    },
    "search-result:first-child": {
        "marginTop": "0 !important"
    },
    "search-result": {
        "marginTop": 20
    },
    "search-result col-md-2": {
        "borderRight": "1px dotted #ccc",
        "minHeight": 140
    },
    "search-result ul": {
        "paddingLeft": "0 !important",
        "listStyle": "none"
    },
    "search-result ul li": {
        "font": "400 normal .85em \"Roboto\",Arial,Verdana,sans-serif",
        "lineHeight": 30
    },
    "search-result ul li i": {
        "paddingRight": 5
    },
    "search-result col-md-7": {
        "position": "relative"
    },
    "search-result h3": {
        "font": "500 normal 1.375em \"Roboto\",Arial,Verdana,sans-serif",
        "marginTop": "0 !important",
        "marginBottom": "10px !important"
    },
    "search-result h3 > a": {
        "color": "#248dc1 !important"
    },
    "search-result i": {
        "color": "#248dc1 !important"
    },
    "search-result p": {
        "font": "normal normal 1.125em \"Roboto\",Arial,Verdana,sans-serif"
    },
    "search-result spanplus": {
        "position": "absolute",
        "right": 0,
        "top": 126
    },
    "search-result spanplus a": {
        "backgroundColor": "#248dc1",
        "paddingTop": 5,
        "paddingRight": 5,
        "paddingBottom": 3,
        "paddingLeft": 5
    },
    "search-result spanplus a:hover": {
        "backgroundColor": "#414141"
    },
    "search-result spanplus a i": {
        "color": "#fff !important"
    },
    "search-result spanborder": {
        "display": "block",
        "width": "97%",
        "marginTop": 0,
        "marginRight": 15,
        "marginBottom": 0,
        "marginLeft": 15,
        "borderBottom": "1px dotted #ccc"
    }
});