import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { getDatabase, ref, onValue, off } from "firebase/database";

function DisplayView({ navigation }) {

    const [users, setUsers] = useState();

    useEffect(() => {
        const db = getDatabase();
        const usersRef = ref(db, "UserData");

        // Listen for changes in the 'UserData' node
        onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setUsers(data);
            }
        });

        // Clean up the listener when the component unmounts
        return () => {
            off(usersRef);
        };
    }, []); // Effect runs only once

    // If data is not yet loaded
    if (!users) {
        return <Text>Loading...</Text>;
    }

    const handleSelectUser = id => {
        const user = Object.entries(users).find(user => user[0] === id);
        navigation.navigate('User Details', { user }); // Navigate to details of the selected user
    };

    // Convert the users object into an array for FlatList
    const userArray = Object.values(users);
    const userKeys = Object.keys(users);

    return (
        <FlatList
            data={userArray}
            keyExtractor={(item, index) => userKeys[index]}
            renderItem={({ item, index }) => {
                return (
                    <TouchableOpacity style={styles.container} onPress={() => handleSelectUser(userKeys[index])}>
                        <Text>
                            {item.firstName} - {item.vare}
                        </Text>
                    </TouchableOpacity>
                )
            }}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 10,
        margin: 5,
        padding: 5,
        height: 50,
        justifyContent: 'center'
    },
    label: {
        fontWeight: 'bold'
    },
});

export default DisplayView;