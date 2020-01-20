import React from 'react';
import Header from './components/layoutComponents/header'
import style from './app.module.scss';
import {  BrowserRouter as Router , Route, Switch } from 'react-router-dom';
import FromList from './pages/formsList/formsList';
import Form from './pages/form/from';
import FromBuilder from './pages/formBuilder/formBuilder';
import Submissions from './pages/Submissions/Submissions';
import Notfound from './pages/notfound/Notfound';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();


function App() {
  return (
    <main className={style.AppContainer}>
      <Router history={history}>
        <Header/>  
        <Switch>
          <Route exact path="/" component={FromList} />
          <Route path="/createForm" component={FromBuilder} />
          <Route path="/submissions/:id" component={Submissions} />
          <Route path="/form/:id" component={Form} />
          <Route component={Notfound} />
        </Switch>
      </Router >  
    </main>
  );
}

export default App;
