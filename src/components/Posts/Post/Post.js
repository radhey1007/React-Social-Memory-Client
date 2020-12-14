import React from 'react';
import useStyle from './style';
import { Card, CardActions , CardContent , CardMedia , Button , Typography } 
from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';  
import moment from 'moment'; 
import {useDispatch} from 'react-redux';
import { deletePost , likePost } from '../../../actions/posts';

function Post({post,setCurrentId}) {
    const classes = useStyle();
    const dispatch = useDispatch();
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant="h6">
                    {post.creator}
                </Typography>
                <Typography variant="body2">
                    {moment(post.createdAt).fromNow()}
                </Typography>
            </div>
            <div className={classes.overlay}>
                <div className={classes.wrapper}>
                    <Button style={{color:'white',flex:'right'}} size='small' onClick={()=> setCurrentId(post._id) }>
                        <MoreHorizIcon fontSize="default" />
                    </Button>
                </div>
            </div>
            <div className={classes.details}>              
                <Typography variant="body2" color="textSecondary">
                   {post.tags.map((tag) => `#${tag} `)}
                </Typography>
            </div>
            <Typography variant="h5" className={classes.title} gutterBottom>
            {post.title}
        </Typography>
            <CardContent>
                <Typography component="p" color="textSecondary">
                    {post.message}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}>
                    <ThumbUpAltIcon fontSize="small"/>
                    &nbsp; Like &nbsp;
                    {post.likeCount}
                </Button>
                <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small"/>
                      Delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default Post
