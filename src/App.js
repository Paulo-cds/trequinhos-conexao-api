import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import Home from './pages/Home'
import Products from './pages/Products'

import TemplateDefault from './pages/templates/Default'
import TemplatePage from './pages/templates/Page'

import './App.css';


function App() {
  return (
    
      <Router>
        <TemplateDefault>
        <Switch>       
          <Route path="/products">
            <TemplatePage title='Produtos' Component={Products} />
          </Route>
          <Route path="/">
          <TemplatePage title='Pagina Inicial' Component={Home} />
          </Route>
        </Switch>
        </TemplateDefault>
      </Router>
    
  )
}

export default App
