import React from 'react';
import { View, Text,StyleSheet, Dimensions, Switch } from 'react-native';
import Colors from '../../constants/Colors';

const Chemical = props => {
    return <View style={styles.items} >
        <Text style={styles.item}>{props.name}</Text>
        <Switch
            style={styles.switch}
            value={props.checked}
            thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
            trackColor={{ true: Colors.primaryColor }}
            onValueChange={newValue => props.onChange(newValue)} />
    </View>
}

const styles = StyleSheet.create({
    item: {
        fontFamily: 'open-sans',
        fontSize: 16,
        marginHorizontal: 15
    },
    items: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginVertical: 15,
        marginRight: 20,
        justifyContent: "space-between",
        width: '100%',
    },
    switch: {
        marginEnd: Dimensions.get('window').width > 320 ? '10%' : 0
    }
});

export default Chemical;