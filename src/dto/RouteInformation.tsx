import React from "react";
import {AppBarInformation} from "./AppBarInformation";

export interface RouteInformation {
    path: string,
    appBarInfo: AppBarInformation,
    component: React.FC
}