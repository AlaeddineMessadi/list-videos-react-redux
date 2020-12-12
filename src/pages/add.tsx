import React from 'react';
import { Button, Container, Divider, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import { MultipleSelector } from '../components/multiple-selector';
import { FormControlElm } from '../components/form-control';
import { SelectInputElm } from '../components/select-input';
import { getCategories } from '../services/categories';
import { Author, Category } from '../common/interfaces';
import { getAuthors } from '../services/authors';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
  },
  divider: {
    margin: theme.spacing(2, 0),
    border: '1px solid #000',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
  },
  btnMargin: {
    margin: theme.spacing(1),
  },
  btnContainer: {
    flexFlow: 'row',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: '#000',
    },
  },
}));

export const AddPage: React.FC = () => {
  const classes = useStyles();

  const [categories, setCategories]: [Category[], (categories: Category[]) => void] = React.useState<Category[]>([]);
  const [authors, setAuthors]: [Author[], (loading: Author[]) => void] = React.useState<Author[]>([]);

  React.useEffect(() => {
    getCategories().then((value) => {
      setCategories(value);
    });

    getAuthors().then((value) => {
      setAuthors(value);
    });
  }, []);

  return (
    <Container className={classes.root}>
      <Divider className={classes.divider} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>Add Video</h1>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.label}>
          <label>Video Name</label>
        </Grid>
        <Grid item xs={12} sm={8}>
          <FormControlElm>
            <TextField fullWidth label="Video name" variant="outlined" />
          </FormControlElm>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.label}>
          <label>Video author</label>
        </Grid>
        <Grid item xs={12} sm={8}>
          <FormControlElm>
            <SelectInputElm authors={authors} />
          </FormControlElm>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.label}>
          <label>Video Category</label>
        </Grid>
        <Grid item xs={12} sm={8}>
          <FormControlElm>
            <MultipleSelector categories={categories} label="Category" />
          </FormControlElm>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.label} />
        <Grid item xs={12} sm={8}>
          <FormControlElm>
            <div className={classes.btnContainer}>
              <Button variant="contained" size="medium" color="primary" className={classes.btnMargin}>
                Submit
              </Button>
              <Button variant="contained" size="medium" color="secondary" className={classes.btnMargin}>
                <Link to={`/`} className={classes.link}>
                  Cancel
                </Link>
              </Button>
            </div>
          </FormControlElm>
        </Grid>
      </Grid>
    </Container>
  );
};
