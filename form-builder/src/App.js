import React from 'react';
import Header from './components/layoutComponents/header'
import style from './app.module.scss';
import {  BrowserRouter as Router , Route, Switch } from 'react-router-dom';
import FromListPage from './pages/formsListPage/formsListPage';
import FormPage from './pages/formPage/fromPage';
import FromBuilderPage from './pages/formBuilderPage/formBuilderPage';
import SubmissionsPage from './pages/submissionsPage/submissionsPage';
import notfoundPage from './pages/notfoundPage/notfoundPage';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();


function App() {
  return (
    <main className={style.AppContainer}>
      <Router history={history}>
        <Header/>  
        <Switch>
          <Route exact path="/" component={FromListPage} />
          <Route path="/createForm" component={FromBuilderPage} />
          <Route path="/submissions/:id" component={SubmissionsPage} />
          <Route path="/form/:id" component={FormPage} />
          <Route component={notfoundPage} />
        </Switch>
      </Router >  
    </main>
  );
}

export default App;
