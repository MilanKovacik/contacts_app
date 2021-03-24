import React from 'react';
import Contacts from "../pages/Contacts";
import Contact from "../pages/Contact";
import {AppBarInformation} from "../dto/AppBarInformation";
import {RouteInformation} from "../dto/RouteInformation";
import ContactInfo from "../pages/ContactInfo";

export const HomeAppBarInfo: AppBarInformation = {
    back: false,
    delete: false,
    name: "Contacts"
};

const Routes: RouteInformation[] = [
    {
        path: '/',
        appBarInfo: HomeAppBarInfo,
        component: Contacts
    },
    {
        path: '/contact/:id',
        appBarInfo: {
            back: true,
            delete: true,
            name: ""
        },
        component: ContactInfo
    },
    {
        path: '/contact/:id/update',
        appBarInfo: {
            back: true,
            delete: false,
            name: "Update contact"
        },
        component: Contact
    },
    {
        path: '/contact',
        appBarInfo: {
            back: true,
            delete: false,
            name: "New contact"
        },
        component: Contact
    },
];

export default Routes;