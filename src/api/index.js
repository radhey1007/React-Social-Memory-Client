import axios from 'axios';

// const url = 'http://localhost:5000/posts';    // for locally 

const url = 'https://social-memory.herokuapp.com/posts';  // for heroku deployement

export const fetchPosts = () => axios.get(url);

export const createPost = (newPost) => axios.post(url, newPost);

export const updatePost = (id , updatedPost) => axios.patch(`${url}/${id}`, updatedPost);

export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);