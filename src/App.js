import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import Home from './pages/Home'
import Products from './pages/Products/Products'
import Register from './pages/Products/Register'
import Edit from './pages/Products/Edit'
import About from './pages/About'

import TemplateDefault from './pages/templates/Default'
import TemplatePage from './pages/templates/Page'

import './App.css';


function App() {
  return (
    
      <Router>
        <TemplateDefault>
        <Switch>       
          <Route path="/products/edit/:id">
            <TemplatePage title='Editar Produto' Component={Edit} />
          </Route>

          <Route path="/products/add">
            <TemplatePage title='Cadastro de Produtos' Component={Register} />
          </Route>

          <Route path="/products/:prod">
            <TemplatePage title='Produtos' Component={Products} />
          </Route> 

          <Route path="/about">
          <TemplatePage title='Sobre' Component={About} />
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
