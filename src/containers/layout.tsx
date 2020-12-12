import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import { BrowserRouter as Router, Switch, Route, useRouteMatch, useParams } from 'react-router-dom';

import { ListPage } from '../pages/list';
import { AboutPage } from '../pages/about';
import { FAQPage } from '../pages/faq';
import { HeaderMenu } from '../components/header-menu';
import { EditPage } from '../pages/edit';
import { AddPage } from '../pages/add';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

interface BaseLayoutProps {
  page: JSX.Element;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ page }) => {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <HeaderMenu />
        <Container>
          <Switch>
            <Route path="/about" component={AboutPage} />
            <Route path="/faq" component={FAQPage} />
            <Route path="/video/add" component={AddPage} />
            <Route path="/video/:id" component={EditPage} />
            <Route path="/" component={ListPage} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
};
