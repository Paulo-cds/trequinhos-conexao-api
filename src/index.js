import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import deepPurple from '@material-ui/core/colors/deepPurple'
import teal from '@material-ui/core/colors/teal'


/* import dotenv from 'dotenv'


dotenv.config() */

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1e0546',
    },
    secondary: {
      main:teal[400]
    }
  }
})


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
     <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)


