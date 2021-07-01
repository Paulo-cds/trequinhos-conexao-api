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
import Admin from './pages/Admin'
import TemplateDefault from './pages/templates/Default'
import TemplatePage from './pages/templates/Page'
import StoreProvider from './components/store/Provider'

import './App.css';


function App() {
  return (
    
      <Router>
        <StoreProvider>
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

              <Route path="/admin">
              <TemplatePage title='Administrador' Component={Admin} />
              </Route>  

              <Route path="/about">
              <TemplatePage title='Sobre' Component={About} />
              </Route>         

              <Route path="/">
              <TemplatePage title='Trequinhos e Coisa e Tal' Component={Home} />
              </Route>
            </Switch>
          </TemplateDefault>
        </StoreProvider>
      </Router>
    
  )
}

export default App
