import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.jsx'
import { BrowserRouter } from 'react-router-dom'
import {GlobalContext} from './context/Context.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <GlobalContext>
        <App />
      </GlobalContext>
    </Provider>
  </BrowserRouter>
)
