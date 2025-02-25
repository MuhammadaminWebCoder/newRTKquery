import React from 'react'
import { Route, Routes } from "react-router-dom"
import { routes } from "../hooks/useRoute"

export const RouterPath = () => {
    return(
        <Routes>{routes.map(({id,path,element}) => <Route key={id} id={id} path={path} element={element} />)}</Routes>
    )
}