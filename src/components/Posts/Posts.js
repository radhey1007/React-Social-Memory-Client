import React from 'react'
import Post from './Post/Post'
import useStyle from './styles';
import { useSelector } from 'react-redux';
import { Grid , CircularProgress} from '@material-ui/core';

function Posts({setCurrentId}) {
    const posts = useSelector(state => state.posts);     // here we are fetching our global redux state (,post define in combineReducers)
    const classes = useStyle();
    return (
            !posts.length ? <CircularProgress /> : (  
                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                    {posts.map((post) => (
                        <Grid key={post._id} item xs={12} sm={6} md={6}>
                          <Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                      ))}
                </Grid>
                )       
        )
}

export default Posts
