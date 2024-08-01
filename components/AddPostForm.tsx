import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useDatabase} from "@nozbe/watermelondb/hooks";

const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [body, setBody] = useState('');
    const database = useDatabase();

    const handleAddPostToDB = async (postData) => {
        await database.write(async () => {
            await database.collections.get('posts').create(post => {
                post.title = postData.title;
                post.subtitle = postData.subtitle;
                post.body = postData.body;
            });
        });
    };

    const handleDeleteLastPost = async () => {
        await database.write(async () => {
            const postsCollection = database.collections.get('posts');
            const lastPost = await postsCollection.query().fetch();

            if (lastPost.length > 0) {
                await lastPost[lastPost.length - 1].destroyPermanently();
                console.log('Last post deleted successfully');
            } else {
                console.log('No posts to delete');
            }
        });
    };

    const handleSubmit = () => {
        if (title && subtitle && body) {
            handleAddPostToDB({title, subtitle, body});
            setTitle('');
            setSubtitle('');
            setBody('');
        } else {
            alert('Please fill in all fields');
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.inputRow}>
                <Text style={styles.label}>Title:</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Enter title"
                />
            </View>

            <View style={styles.inputRow}>
                <Text style={styles.label}>Subtitle:</Text>
                <TextInput
                    style={styles.input}
                    value={subtitle}
                    onChangeText={setSubtitle}
                    placeholder="Enter subtitle"
                />
            </View>

            <View style={styles.inputRow}>
                <Text style={styles.label}>Body:</Text>
                <TextInput
                    style={[styles.input, styles.inputLarge]}
                    value={body}
                    onChangeText={setBody}
                    placeholder="Enter body text"
                    multiline
                />
            </View>

            <Button
                title="Add Post"
                onPress={handleSubmit}
            />

            <Button title="Delete Last Post" onPress={handleDeleteLastPost}/>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        // backgroundColor: 'red',
        width: "80%"
    },
    label: {
        fontSize: 16,
        width: 80,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginLeft: 10,
    },
    inputLarge: {
        height: 100,
    }
});

export default AddPostForm;
