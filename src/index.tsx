import React, {StrictMode} from 'react'
import './index.css'
import App from './App'
import {render} from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

const rootElement = document.getElementById('root')
render(
    <StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </StrictMode>,
    rootElement
)
