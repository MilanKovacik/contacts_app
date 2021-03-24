import React from 'react';
import {HomeAppBarInfo} from "./Routes";
import {AppBarInformation} from "../dto/AppBarInformation";

export interface RouteContextInfo {
    appBarInfo: AppBarInformation,
    id: bigint | null,
    updateId: (id: bigint) => void;
    switchInfo: (appBarInfo: AppBarInformation) => void,
}

export const RouteContext = React.createContext<RouteContextInfo | null>(null);

const RouteContextProvider: React.FC<React.ReactNode> = ({ children }) => {
    const [appBarInfo, setAppBarInfo] = React.useState<AppBarInformation>(HomeAppBarInfo);
    const [id, setId] = React.useState<bigint|null>(null );

    const updateId = (id: bigint) => {
        setId(id);
    };

    const switchInfo = (appBarInfo: AppBarInformation) => {
        setAppBarInfo(appBarInfo);
    };

    return (
        <RouteContext.Provider value={{ appBarInfo, id, updateId, switchInfo }} >
            {children}
        </RouteContext.Provider>
    );
};

export default RouteContextProvider;

