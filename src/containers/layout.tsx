import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import { ListPage } from '../pages/list';
import { AboutPage } from '../pages/about';
import { FAQPage } from '../pages/faq';
import { HeaderMenu } from '../components/header-menu';
import { EditPage } from '../pages/edit';
import { AddPage } from '../pages/add';

import { thunkLoadAuthors, thunkLoadCategories, thunkLoadProcessedVideos } from '../store/thunks';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

interface BaseLayoutProps {}

export const BaseLayout: React.FC<BaseLayoutProps> = () => {
  const dispatch: Dispatch<any> = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    dispatch(thunkLoadProcessedVideos());
    dispatch(thunkLoadCategories());
    dispatch(thunkLoadAuthors());
  }, []);

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
