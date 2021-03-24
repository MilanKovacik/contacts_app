import React, {useContext, useState} from "react";
import {createStyles, Fab, makeStyles, Theme} from "@material-ui/core";
import {useParams} from "react-router";
import {ContactDto, emptyContact} from "../dto/ContactDto";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import CreateIcon from '@material-ui/icons/Create';
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CircularProgress from "./Contact";
import {RouteContext, RouteContextInfo} from "../routes/RoutesContext";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingInline: 25,
        },
        card: {
            marginBlock: 6,
            width: "100%",
            textAlign: "left",
            paddingInline: 21,
        },
        avatar: {
            background: '#6200EE',
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
        center: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
        },
        fab: {
            position: 'absolute',
            bottom: theme.spacing(5),
            right: theme.spacing(5),
            background: '#03DAC5'
        }
    }),
);

export default function ContactInfo() {
    const classes = useStyles();
    let { id } = useParams<{ id: string }>();

    const { updateId } = useContext(RouteContext) as RouteContextInfo;

    updateId(BigInt(id));

    const [loading, setLoading] = useState<Boolean>(true);
    const [contact, setContact] = useState<ContactDto>(emptyContact);

    if (loading) {
        axios.get<ContactDto>("/contacts/" + id)
            .then(response => {
                console.log(response.data);
                setContact( response.data );
                setLoading(false)
            }).catch(
                // TODO Alert and redirect home
        );
    }

    return (
        <div className={classes.root}>
            { loading ? <CircularProgress/> : <Container className={classes.center}>
                    <Avatar className={classes.avatar}>{contact.name.charAt(0) + "" + contact.surename.charAt(0)}</Avatar>
                    <h1>{contact.name + " " + contact.surename}</h1>
                    <Card className={classes.card} variant="outlined">
                        <p>
                            Phone Number
                        </p>
                        <p>
                            {contact.phone}
                        </p>
                    </Card>
                    <Card className={classes.card} variant="outlined">
                        <p>
                            Email
                        </p>
                        <p>
                            {contact.email}
                        </p>
                    </Card>
                    < Fab aria-label="Update" className={classes.fab} href={`/contact/${contact.id}/update`} >
                        <CreateIcon />
                    </Fab>
                </Container>
            }
        </div>
    );
};
