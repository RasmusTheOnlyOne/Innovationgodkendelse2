import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { getDatabase, ref, push, update } from "firebase/database"; //Ekskluderet child

function InputView({ navigation, route }) {

    const db = getDatabase();

    const initialState = {
        firstName: '',
        vare: '',
        pictureURL: ''
    }

    const [userData, setUserData] = useState(initialState);

    const isEditUser = route.name === "Edit User";

    useEffect(() => {
        if (isEditUser) {
            const user = route.params.user[1];
            setUserData(user);
        }
        return () => {
            setUserData(initialState);
        };
    }, []);

    const changeTextInput = (name, event) => {
        setUserData({ ...userData, [name]: event });
    }

    const handleSave = async () => {
        const { firstName, vare, pictureURL } = userData;

        if (!firstName || !vare || !pictureURL) {
            return Alert.alert('One or more fields are empty!');
        }

        if (isEditUser) {
            const id = route.params.user[0];
            const userRef = ref(db, `UserData/${id}`);
            const updatedFields = {
                firstName,
                vare,
                pictureURL,
            };

            await update(userRef, updatedFields)
                .then(() => {
                    Alert.alert("Information updated!");
                    navigation.goBack(); // Go back to the previous screen
                })
                .catch((error) => {
                    console.error(`Error: ${error.message}`);
                });

        } else {
            const usersRef = ref(db, "/UserData/");
            const newUserData = {
                firstName,
                vare,
                pictureURL,
            };

            await push(usersRef, newUserData)
                .then(() => {
                    Alert.alert("Saved");
                    setUserData(initialState);
                })
                .catch((error) => {
                    console.error(`Error: ${error.message}`);
                });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    Object.keys(initialState).map((key, index) => {
                        return (
                            <View style={styles.row} key={index}>
                                <Text style={styles.label}>{key}</Text>
                                <TextInput
                                    value={userData[key]}
                                    onChangeText={(event) => changeTextInput(key, event)}
                                    style={styles.input}
                                />
                            </View>
                        )
                    })
                }
                <Button title={isEditUser ? "Save changes" : "Add data"} onPress={() => handleSave()} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        height: 40,
        margin: 10,
    },
    label: {
        fontWeight: 'bold',
        width: 120,
        textAlign: 'right',
        marginRight: 10
    },
    input: {
        borderWidth: 1,
        padding: 5,
        flex: 1
    },
});

export default InputView;