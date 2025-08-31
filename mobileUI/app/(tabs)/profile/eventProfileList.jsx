
import EventProfileEmpty from '../../../components/eventProfileEmpty';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { useState, React, useCallback } from 'react';
import Colors from '../../../constants/Colors'
import EventProfileCard from '../../../components/eventProfileCard'
import { deleteEventProfile } from '../../../viewmodels/profiles/EventProfileViewModel';
import { useRouter } from 'expo-router'
import { useEventProfileListState } from '../../../states/useEventProfileListState';
import { useFocusEffect } from '@react-navigation/native';

const EventProfileList = () => {
    const router = useRouter();
    const { profiles, loading, error, reload } = useEventProfileListState();
    const [deletingId, setDeletingId] = useState(null);

    const handleDelete = async (id) => {
        setDeletingId(id);
        deleteEventProfile(
            id, () => {
                reload(); // refresh the list
                setDeletingId(null);
            },
            (errMessage) => {
                alert(errMessage);
                setDeletingId(null);
            }
        );
    };

    // this block refresh the page once the user navigates back to this screen
    useFocusEffect(
        useCallback(() => {
            reload();
        }, [])
    );


    return (
        <View style={styles.container}>
            <View style={styles.backgroundContainer}>
                <View style={styles.addNewContactButton}>
                    <TouchableOpacity style={styles.button} onPress={() => router.push('/profile/createEventProfile')}>
                        <Text style={styles.buttonText}>+ Add a New Profile</Text>
                    </TouchableOpacity>
                </View>
                {loading ? (
                    <ActivityIndicator size="large" color={Colors.accent} />
                ) : error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : (
                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                        {profiles.map((profile) => (
                            <EventProfileCard
                                key={profile._id}
                                images={profile.photoGallery}
                                name={`${profile.eventProfileName}`}
                                position={`${profile.eventName}`}
                                createdDate={new Date(profile.createdAt).toDateString()}
                                modifiedDate={new Date(profile.updatedAt).toDateString()}
                                onEdit={() => router.push({
                                    pathname: '/profile/createEventProfile',
                                    params: { profile: JSON.stringify(profile) }
                                })}
                                onDelete={() => handleDelete(profile._id)}
                                deleting={deletingId === profile._id}
                            />
                        ))}

                    </ScrollView>
                )}

            </View>
        </View>
    )

}

export default EventProfileList


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    backgroundContainer: {
        backgroundColor: Colors.secondary,
        margin: 16,
        flex: 1,
        padding: 16,
        borderRadius: 18,
    },
    addNewContactButton: {
        marginBottom: 16,
        alignSelf: 'flex-end',
    },
    button: {
        backgroundColor: '#fff',
        borderColor: Colors.accent,
        borderWidth: 1,
        borderRadius: 5,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    buttonText: {
        color: Colors.accent,
        fontSize: 14,
    },
})
