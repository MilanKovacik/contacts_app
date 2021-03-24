import React from "react";

export interface ContactDto {
    id: bigint | null,
    name: string,
    surename: string,
    phone: string,
    email: string
}

export const emptyContact: ContactDto = {
    id: null,
    name: "",
    surename: "",
    email: "",
    phone: ""
};

