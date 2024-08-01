import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {compose, withDatabase, withObservables} from '@nozbe/watermelondb/react';

const PostLists = ({posts}) => {
    // const database = useDatabase();
    // useEffect(() => {
    //     // query all posts in the database
    //     const getPosts = async () => {
    //         const postsInDb = await database.get('posts').query();
    //         if (postsInDb?.length > 0) {
    //             console.log('[🍉] Posts in databse >>> ');
    //             postsInDb.map((post) => {
    //                 console.log('[🍉] Post:', post.title, post.body);
    //             });
    //         }
    //     }
    //
    //     getPosts()
    // }, [])

    useEffect(() => {
        if (posts?.length > 0) {
            console.log('[🍉] Posts from observable >>> ');
            posts.map((post) => {
                console.log('[🍉] Post:', post.title, post.body);
            });
        }
    }, []);


    return (
        <>
            {posts?.map((post) => (
                <Text key={post.id}>
                    {post.id} - {post.title}:{post.body}
                </Text>
            ))}
        </>
    );
};

const enhancedPosts = compose(
    withDatabase,
    withObservables([], ({database}) => ({
        posts: database.get('posts').query().observeWithColumns(['title', 'body'])
    }))
)(PostLists);

export default enhancedPosts;

