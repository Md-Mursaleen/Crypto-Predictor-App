import React from "react";
import { StyleSheet, Text, View } from "react-native";
import moment from 'moment';

const NewsItem = ({ item }) => {
    const { kind, domain, source, title, published_at, slug, currencies, url, created_at, votes, meta_data } = item;

    const timeAgo = moment(new Date(created_at)).fromNow();

    return (
        <View style={styles.newsItemContainer}>
            <View style={styles.subContainer}>
                <Text style={styles.newsTitleTextStyle}>{title}</Text>
                <View style={styles.textContainer}>
                    <Text style={styles.textStyle}>{source.title} • </Text>
                    <Text style={styles.textStyle}>{timeAgo}</Text>
                </View>
            </View>
        </View>
    );
}

export default NewsItem;

const styles = StyleSheet.create({
    newsItemContainer: {
        flex: 1,
        backgroundColor: "#141323"
    },
    subContainer: {
        marginLeft: 20,
        marginTop: 25,
        width: "90%"
    },
    newsTitleTextStyle: {
        marginBottom: 10,
        fontSize: 16,
        fontWeight: "500",
        color: "#d6d6d8",
        lineHeight: 20
    },
    textContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    textStyle: {
        fontSize: 13.8,
        fontWeight: "400",
        color: "#5e80fc",
        lineHeight: 16
    }
});