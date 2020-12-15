import React , { useState , useEffect } from 'react';
import { TextField, Button , Paper, Typography } from '@material-ui/core';
import useStyle from './style';
import FileBase from 'react-file-base64'; 

import { useDispatch , useSelector } from 'react-redux';
import { createPost , updatePost } from '../../actions/posts'; 

// GET the current ID
function Forms({currentId,setCurrentId}) {
    const initialPostData = {
        creator:'',
        title:'',
        message:'',
        tags:'',
        selectedFile:''  
    }
    const [postData , setPostData] = useState(initialPostData);
    const initialValidationMessage = {
        creatorError:'',
        titleError:'',
        messageError:'',
        tagsError:'',
        selectedFileError:''
    }
    const [validationMessage , setValidationMessage]  = useState(initialValidationMessage);
    const classes = useStyle();
    const dispatch = useDispatch();
    const post = useSelector((state) => currentId ? 
    (state.posts.find((p)=> p._id=== currentId)): null);

    useEffect(() => {
      if(post) setPostData(post);  
    } ,[post])

    // const handleChange = (e) => {
    //     const {name , value} = e.target;
    //     setPostData({...postData,[name]:value});
    //     console.log(postData);
    // }

    const applyFormValidataion = () =>  {
        let creatorError ='';
        let titleError = '';
        let messageError='';
        let tagsError=''
        let selectedFileError= '';
        if(postData.creator==='') {
            creatorError = 'Creator required.'  
        }
        if(postData.title===''){
            titleError = 'Title required.'
        }
        if(postData.message===''){  
            messageError = 'Message required.'
        }
        if(postData.tags===''){
            tagsError = 'Tags rquired.'
        }
        if(postData.selectedFile===''){
            selectedFileError = 'File required.'
        }
        if(creatorError || titleError || messageError || tagsError || selectedFileError){
            setValidationMessage({creatorError , titleError , messageError, tagsError , selectedFileError})
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
         e.preventDefault();
         let isValid = applyFormValidataion();
         if(isValid) {
            if(currentId) {
                await dispatch(updatePost(currentId,postData)); 
            } else {
                await dispatch(createPost(postData)); 
            }
            clear();  
        }
    }

    const clear = () => {
        setCurrentId(null);
        setPostData(initialPostData);
        setValidationMessage(initialValidationMessage);
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
              <Typography variant="h6">
                 { currentId ? 'Editing ' : 'Creating' } a Memory
               </Typography>  
               <TextField
               name="creator"
               variant="outlined"
               label="Creator"
               fullWidth
               value={postData.creator}
               onChange={(e) => setPostData({...postData,creator:e.target.value})} />

               <Typography variant="p" 
               style={{color :'red',alignItems: 'left',fontSize:'12px'}}>
               {validationMessage.creatorError}
               </Typography>

               <TextField
               name="title"
               variant="outlined"
               label="Title"
               fullWidth
               value={postData.title}
               onChange={(e) => setPostData({...postData,title:e.target.value})} />

               <Typography variant="p" 
               style={{color :'red',alignItems: 'left',fontSize:'12px'}}>
               {validationMessage.titleError}
               </Typography>

               <TextField
               name="message"
               variant="outlined"
               label="Message"
               fullWidth 
               value={postData.message}
               onChange={(e) => setPostData({...postData,message:e.target.value})} />

               <Typography variant="p" 
               style={{color :'red',alignItems: 'left',fontSize:'12px'}}>
               {validationMessage.messageError}
               </Typography>

               <TextField
               name="tags"
               variant="outlined"
               label="Tags"
               fullWidth
               value={postData.tags}
               onChange={(e) => setPostData({...postData,tags:e.target.value.split(',')})} />
             
               <Typography variant="p" 
               style={{color :'red',alignItems: 'left',fontSize:'12px'}}>
               {validationMessage.tagsError}
               </Typography>

               <div className={classes.fileInput}>
                <FileBase 
                type="file"
                multiple={false}
                onDone={({base64}) => setPostData({...postData,selectedFile:base64})}
                />
               </div> 
               <Typography variant="p" 
               style={{color :'red',alignItems: 'left',fontSize:'12px'}}>
               {validationMessage.selectedFileError}
               </Typography>
               <Button 
                    type="submit" 
                    classes={classes.buttonSubmit} 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    size="large">
                    Submit
               </Button>
               <Button
                    variant="contained" 
                    color="secondary" 
                    fullWidth 
                    size="small"
                    onClick={clear}>
                    Clear
                </Button>
            </form>
        </Paper>
    )
}

export default Forms
