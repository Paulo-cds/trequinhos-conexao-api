import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import teal from '@material-ui/core/colors/teal'



/* export const administ = process.env.administ

export const senha = process.env.senha */


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


