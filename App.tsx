import {StyleSheet, View} from 'react-native';
import {DatabaseProvider} from "@nozbe/watermelondb/react";
import database from "./database";
import PostLists from "./components/Posts";
import AddPostForm from "./components/AddPostForm";

export default function App() {
    return (
        <DatabaseProvider database={database}>
            <View style={styles.container}>
                <AddPostForm/>
                <PostLists/>
            </View>
        </DatabaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
