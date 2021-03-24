import React, {FC, useContext} from 'react';

import {createStyles, makeStyles} from '@material-ui/core/styles';
import {AppBar, Box, IconButton, Toolbar, Typography,} from '@material-ui/core';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {RouteContext, RouteContextInfo} from "../routes/RoutesContext";
import axios from "axios";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
            paddingBottom: 20
        },
        appBar: {
            background: "#6200EE"
        },
        backButton: {
            textAlign: "left",
            flexGrow: 1,
        },
        deleteButton: {
            textAlign: "right"
        },
        title: {
            flexGrow: 6,
            textAlign: "left"
        },
    }),
);

const BackButton:FC<{ back: boolean, classes: any }> = ({ back, classes }) => {

    return <Box className={classes.backButton}>
        { (back) ?
            <IconButton edge="start" className={classes.backButton} color="inherit" aria-label="back" onClick={() => { window.history.back(); }}>
                <ArrowBack />
            </IconButton>
            :
            <span className={classes.backButton}/>

        }
    </Box>
};

const DeleteButton:FC<{ del: boolean, classes: any }> = ({ del, classes }) => {
    const { id } = useContext(RouteContext) as RouteContextInfo;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteContact = () => {

        axios.delete("/contacts/" + id )
            .then(response => {
                window.history.replaceState(null, "", null);
                window.location.href = "/";
            })
            .catch();
    };

    return <Box className={classes.deleteButton}>
        { (del) ?
            <Box>
                <IconButton edge="end" color="inherit" aria-label="trash" onClick={() => handleClickOpen()}>
                    <DeleteOutlined />
                </IconButton>
                <Dialog
                    fullWidth={true}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >

                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Delete contact?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={deleteContact} color="primary" autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
            :
            <span className={classes.backButton}/>
        }
    </Box>
};

const MyAppBar: React.FC = () => {
    const { appBarInfo } = useContext(RouteContext) as RouteContextInfo;
  const classes = useStyles();
  return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
              <BackButton back={appBarInfo.back} classes={classes}/>
              <Box className={classes.title}>
                  <Typography variant="h6">
                      {appBarInfo.name}
                  </Typography>
              </Box>
              <DeleteButton del={appBarInfo.delete} classes={classes}/>
          </Toolbar>
        </AppBar>
      </div>
  );
}

export default MyAppBar;