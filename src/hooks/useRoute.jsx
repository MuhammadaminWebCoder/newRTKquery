import Dashboard from "../pages/Dashboard";
import DashboardItem from "../pages/DashboardItem";
import LogIn from "../pages/LogIn";
import { PATH } from "./usePath";
import React from 'react'

export const routes = [
    {
        id:1,
        path:PATH.Dashboard,
        element:<Dashboard/>
    },
    {
        id:2,
        path:PATH.logIn,
        element:<LogIn/>
    },
    {
        id:3,
        path:PATH.dashItem,
        element:<DashboardItem/>
    }
]