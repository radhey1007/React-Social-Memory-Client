import React, { useState , useEffect } from 'react';
import { Container ,AppBar,Typography,Grow, Grid} from '@material-ui/core';
import { useDispatch } from 'react-redux';

import image from './images/1.jpg';
import Forms from './components/Forms/Forms';
import Posts from './components/Posts/Posts'
import useStyle from './style';
import { getPosts } from './actions/posts'; 


function App() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [currentId , setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  return (
    <Container maxwidth="lg">
      <AppBar className={classes.AppBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center"> Social-Memories
        <img className={classes.image} src={image} alt="" width="60" />
        </Typography>
        </AppBar>
      <Grow in>
        <Container>
          <Grid container className={classes.mainContainer} justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <div className={classes.topBar}>
                <Posts setCurrentId={setCurrentId}/>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className={classes.topBar}>
                  <Forms currentId={currentId} setCurrentId={setCurrentId}/>
              </div>  
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
