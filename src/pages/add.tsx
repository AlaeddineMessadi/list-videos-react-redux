import React from 'react';
import { Button, Container, Divider, Grid, makeStyles, TextField } from '@material-ui/core';
import * as _ from 'lodash';

import { getCategories } from '../services/categories';
import { Author, Category, Video } from '../common/interfaces';
import { getAuthors } from '../services/authors';
import { Link } from 'react-router-dom';
import { FormControlElm } from '../components/form-control';
import { SelectInputElm } from '../components/select-input';
import { MultipleSelector } from '../components/multiple-selector';
import { parseCategoryIds } from '../utils/helpers';

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

  /**
   * videoName, Categories and Authors Hooks initialization
   */
  const [videoName, setVideoName]: [string, (videoName: string) => void] = React.useState<string>('');
  const [authors, setAuthors]: [Author[], (authors: Author[]) => void] = React.useState<Author[]>([]);
  const [categories, setCategories]: [Category[], (categories: Category[]) => void] = React.useState<Category[]>([]);

  /**
   * Form inputs errors Hooks initialization
   */
  const [videoNameErr, setVideoNameErr]: [boolean, (error: boolean) => void] = React.useState<boolean>(false);
  const [authorErr, setAuthorErr]: [boolean, (error: boolean) => void] = React.useState<boolean>(false);
  const [categoryNamesErr, setCategoryNamesErr]: [boolean, (error: boolean) => void] = React.useState<boolean>(false);

  /**
   * Form Input videoName ChangeHandler
   */
  const videoNameChangeHandler = (event: React.ChangeEvent<{ value: unknown }>) => {
    const vidName: string = event.target.value as string;
    setVideoName(vidName);
  };

  /**
   * Form Input Author Hooks and ChangeHandler
   */
  const [author, setAuthor] = React.useState<Author>({} as Author);

  const authorChangeHandler = (event: React.ChangeEvent<{ value: unknown }>) => {
    const authorId: number = event.target.value as number;

    setAuthor(authors[authors.findIndex((elm) => elm.id == authorId)]);
  };

  /**
   * Form Input Category Hooks and ChangeHandler
   */
  const [categoryNames, setCategory] = React.useState<Category[]>([]);
  const categoryChangeHandler = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { options } = event.target as HTMLSelectElement;
    const value: Category[] = [];

    Object.entries(options).map((element, i) => {
      const option = element[1];
      if (option.selected) {
        const selectedId: number = parseInt(option.value);
        value.push(categories[categories.findIndex((cat: Category) => cat.id === selectedId)]);
      }
    });

    setCategory(value);
  };

  /**
   * On form submit Handler
   */
  const onSubmit = () => {
    console.log(categoryNames);
    console.log(_.isEmpty(categoryNames));
    /**
     * form validation
     */
    if (!videoName) {
      setVideoNameErr(true);
      return;
    } else {
      setVideoNameErr(false);
    }
    if (_.isEmpty(author)) {
      setAuthorErr(true);
      return;
    } else {
      setAuthorErr(false);
    }
    if (!_.isEmpty(categoryNames)) {
      console.log(categoryNames);
      setCategoryNamesErr(true);
      return;
    } else {
      setCategoryNamesErr(false);
    }

    let video: Video = {
      id: Math.floor(Math.random() * 100),
      name: videoName,
      catIds: parseCategoryIds(categoryNames),
    };
    let authorClone = author;
    author.videos.push(video);
  };

  /**
   * Fetch data: categories and authors
   */
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
            <TextField
              fullWidth
              label="Video name"
              variant="outlined"
              value={videoName}
              onChange={videoNameChangeHandler}
              error={videoNameErr}
            />
          </FormControlElm>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.label}>
          <label>Video author</label>
        </Grid>
        <Grid item xs={12} sm={8}>
          <FormControlElm>
            <SelectInputElm options={authors} value={author.id} changeHandler={authorChangeHandler} error={authorErr} />
          </FormControlElm>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.label}>
          <label>Video Category</label>
        </Grid>
        <Grid item xs={12} sm={8}>
          <FormControlElm>
            <MultipleSelector
              error={categoryNamesErr}
              label="Category"
              categories={categories}
              value={parseCategoryIds(categoryNames)}
              changeHandler={categoryChangeHandler}
            />
          </FormControlElm>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.label} />
        <Grid item xs={12} sm={8}>
          <FormControlElm>
            <div className={classes.btnContainer}>
              <Button variant="contained" size="medium" color="primary" className={classes.btnMargin} onClick={() => onSubmit()}>
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
