import React, {FC, useState} from "react";
import {createStyles, Fab, List, ListItem, ListItemAvatar, ListItemText, Theme} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import {ContactDto} from "../dto/ContactDto";
import CircularProgress from "./Contact";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingInline: 25,
        },
        avatar: {
            background: '#6200EE'
        },
        fab: {
            position: 'absolute',
            bottom: theme.spacing(5),
            right: theme.spacing(5),
            background: '#03DAC5'
        }
    }),
);

const ListOfContacts:FC<{ contactList: ContactDto[], classes: any }> = ({ contactList, classes}) => {
    const list: any[] = [];

    const update = (id: bigint | null) => {
        window.location.href = "/contact/" + id;
    };

    contactList.forEach((contact) => {
        list.push(
            <ListItem key={`item-${contact.id}`} button onClick={() => update(contact.id)}>
                <ListItemAvatar>
                    <Avatar className={classes.avatar}>{contact.name.charAt(0) + "" + contact.surename.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={contact.name + " " + contact.surename} />
            </ListItem>
        )
    });

    return (<List>
                {list}
            </List>
    )
};

const Contacts: React.FC = () => {
    const classes = useStyles();
    const [contactList, setContactList] = useState<ContactDto[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);

    if(loading) {
        axios.get<ContactDto[]>("/contacts")
            .then(response => {
                console.log(response.data);
                setContactList(response.data);
                setLoading(false)
            }).catch(
            // TODO Alert and redirect home
        );
    }

    return (
        <div className={classes.root}>
            { loading ? <CircularProgress /> : <ListOfContacts contactList={contactList} classes={classes}/>}
            <Fab aria-label="Add" className={classes.fab} href="/contact" >
                <AddIcon />
            </Fab>
        </div>
    );
};

export default Contacts;