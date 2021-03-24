import React, {useState} from "react";
import {Box, Button, createStyles, makeStyles, TextField} from "@material-ui/core";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useParams} from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";
import {ContactDto, emptyContact} from "../dto/ContactDto";
import axios from "axios";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            paddingInline: 25,
        },
        buttonSave: {
            background: "#6200EE",
            color: "#FFFFFF",
            marginLeft: 10,
            paddingInline: 30
        },
        buttonBox: {
            paddingTop: 50,
            textAlign: "right",
        }
    }),
);

export default function Contact() {
    const classes = useStyles();
    let { id } = useParams<{ id: string }>();
    const updateContact: boolean = id != null;
    const [loading, setLoading] = useState<Boolean>(updateContact);
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


    const phoneRegex = /(^[+][0-9]{12}$)|(^[0-9]{9}$)/;
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: contact.name,
            surename: contact.surename,
            email: contact.email,
            phone: contact.phone
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, "Minimum length of name is 2 characters")
                .required("Please enter contact's name!"),
            surename: Yup.string()
                .min(2, "Minimum length of surename is 2 characters")
                .required("Please enter contact's surename!"),
            email: Yup.string()
                .email("Please enter valid email address")
                .required("Please enter contact's email!"),
            phone: Yup.string()
                .matches(phoneRegex, 'Please enter valid phone')
                .required("Please enter contact's phone!"),
        }),
        onSubmit: values => {
            if(updateContact) {
                axios.put<ContactDto>("/contacts/" + id, values)
                    .then(response => {
                        console.log("DATA UPDATED");
                    }).catch(
                    // TODO Alert and redirect home
                );
            } else {
                axios.post<ContactDto>("/contacts", values)
                    .then(response => {
                        console.log("DATA ADD");
                    }).catch(
                    // TODO Alert and redirect home
                );
            }
            window.location.href = "/";
        },
    });

    const cancel = () => {
        window.location.href = "/";
    };

    return (
        <div className={classes.root}>
            { loading ? <CircularProgress /> : <form onSubmit={formik.handleSubmit}>
                <Box width="100%" mx="auto">
                    <TextField
                        id="name"
                        label="Name"
                        value={formik.values.name}
                        fullWidth={true}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        margin="normal"
                        error={Boolean(formik.errors.name)}
                        helperText={formik.errors.name}
                    />
                    <TextField
                        id="surename"
                        label="Surename"
                        value={formik.values.surename}
                        fullWidth={true}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        margin="normal"
                        error={Boolean(formik.errors.surename)}
                        helperText={formik.errors.surename}
                    />
                    <TextField
                        id="email"
                        label="Email"
                        value={formik.values.email}
                        fullWidth={true}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        margin="normal"
                        error={Boolean(formik.errors.email)}
                        helperText={formik.errors.email}
                    />
                    <TextField
                        id="phone"
                        label="Phone"
                        value={formik.values.phone}
                        fullWidth={true}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        margin="normal"
                        error={Boolean(formik.errors.phone)}
                        helperText={formik.errors.phone}
                    />

                    <Box className={classes.buttonBox} width="100%">
                        <Button onClick={() => cancel()}>Cancel</Button>
                        <Button className={classes.buttonSave} type="submit" variant="contained">{updateContact ? "Update" : "Save" }</Button>
                    </Box>
                </Box>
            </form> }
        </div>);
};
