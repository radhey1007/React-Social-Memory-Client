import * as api from '../api';
import { FETCH_ALL , CREATE , UPDATE , DELETE , LIKE } from '../constant/actionTypes';

// Action Creators  
export  const getPosts = () => async (dispatch) => {
    try {
     const { data } = await api.fetchPosts();  
     dispatch({type:FETCH_ALL, 'payload':data}); 
    } catch (error) {
        console.log(error.message);
    }
}


export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);  
        dispatch({type:CREATE, 'payload':data}); 
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (currentId , post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(currentId , post); 
        dispatch({type:UPDATE, 'payload':data}); 
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (deleteId) => async (dispatch) => {
    try {
        await api.deletePost(deleteId); 
        dispatch({type:DELETE, 'payload':deleteId});
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const {data} = await api.likePost(id); 
        dispatch({type:LIKE, 'payload':data});
    } catch (error) {
        console.log(error);
    } 
}
