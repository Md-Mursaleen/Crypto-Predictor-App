import React from 'react';
import { StyleSheet, Text, View, Linking, Alert, Image } from 'react-native';
import { normalize } from './theme';
import moment from 'moment';

const NewsItem = ({ item }) => {
    // const { kind, domain, source, title, published_at, slug, currencies, url, created_at, votes, meta_data } = item;
    // const timeAgo = moment(new Date(created_at)).fromNow();

    const { title, news_site, updated_at, url, thumb_2x } = item;
    const timeAgo = moment.unix(updated_at).fromNow();

    const openLink = async (url) => {
        try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert(`Sorry, we can't open this link: ${url}`);
            }
        } catch (error) {
            Alert.alert('An error occurred while trying to open the link.');
        }
    };

    return (
        <View style={styles.newsItemContainer}>
            {thumb_2x && thumb_2x !== 'missing_large.png' && (
                <Image source={{ uri: thumb_2x }} style={styles.newsItemImageStyle} />
            )}
            <Text style={styles.newsTitleTextStyle}>{title} {' '}<Text onPress={() => openLink(url)}
                style={styles.linkTextStyle}>Read more</Text></Text>
            <View style={styles.textContainer}>
                <Text style={styles.textStyle}>{news_site} • </Text>
                <Text style={styles.textStyle}>{timeAgo}</Text>
            </View>
        </View>
    );
}

export default NewsItem;

const styles = StyleSheet.create({
    newsItemContainer: {
        padding: normalize(14),
        marginLeft: normalize(20),
        marginTop: normalize(20),
        width: '90%',
        height: 'auto',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#5e80fc',
        borderRadius: 5,
    },
    linkTextStyle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#5e80fc',
        fontFamily: 'Mukta-Regular',
        textDecorationLine: 'underline',
        textDecorationColor: '#5e80fc',
    },
    newsTitleTextStyle: {
        marginBottom: 10,
        fontSize: 15.5,
        fontWeight: '500',
        color: '#d6d6d8',
        fontFamily: 'Inter-SemiBold',
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'PlusJakartaSans-Medium',
        color: '#808080',
        lineHeight: 16,
    },
    newsItemImageStyle: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
});