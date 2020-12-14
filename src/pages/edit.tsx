import React from 'react';
import { Button, Container, Divider, Grid, makeStyles, TextField } from '@material-ui/core';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Dispatch } from 'redux';
import * as _ from 'lodash';
import moment from 'moment';

import { Author, Category, FormErrors, Video, ProcessedVideo } from '../common/interfaces';
import { FormControlElm } from '../components/form-control';
import { SelectInputElm } from '../components/select-input';
import { MultipleSelector } from '../components/multiple-selector';
import { findAuthorById, parseCategoryIds, findProcessedVideoById, findAuthorByVideoId, findCategoriesByVideo } from '../utils/helpers';
import { DEFAULT_VIDEO_FORMAT } from '../common/constants';
import { thunkUpdateVideo } from '../store/thunks';
import { AppState } from '../store/types';

type TParams = {
  params: any;
};

interface EditPageProps {
  match: TParams;
}

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

export const EditPage: React.FC<EditPageProps> = ({ match }) => {
  const videoId: number = parseInt(match.params.id);
  let history = useHistory();
  const dispatch: Dispatch<any> = useDispatch();
  const classes = useStyles();

  /**
   * get categories and authors from state
   */
  const { categories, authors, videos } = useSelector((state: AppState) => state, shallowEqual);
  const video: ProcessedVideo = findProcessedVideoById(videos, videoId);
  const selectedAuthor: Author = findAuthorByVideoId(authors, videoId);
  const selectedCategories: Category[] = findCategoriesByVideo(categories, video);

  /**
   * videoName, Categories and Authors Hooks initialization
   */
  const [videoName, setVideoName]: [string, (videoName: string) => void] = React.useState<string>(video.name);
  const [author, setAuthor] = React.useState<Author>(selectedAuthor);
  const [categoryNames, setCategory] = React.useState<Category[]>(selectedCategories);

  const hasNoChanges = () => {
    return categoryNames === selectedCategories && author === selectedAuthor && videoName === video.name;
  };

  /**
   * Form inputs errors Hooks initialization
   */
  const [errors, setErrors]: [FormErrors, (errors: FormErrors) => void] = React.useState<FormErrors>({
    videoName: false,
    author: false,
    categoryNames: false,
  });

  /**
   * Form Input videoName ChangeHandler
   */
  const videoNameChangeHandler = (event: React.ChangeEvent<{ value: unknown }>) => {
    const vidName: string = event.target.value as string;
    setVideoName(vidName);
  };

  /**
   * Form Input Author ChangeHandler
   */
  const authorChangeHandler = (event: React.ChangeEvent<{ value: unknown }>) => {
    const authorId = parseInt(event.target.value as string);

    setAuthor(findAuthorById(authors, authorId));
  };

  /**
   * Form Input Category ChangeHandler
   */
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
  const onSubmit = async () => {
    /**
     * form validation
     */
    let localErrors: FormErrors = {
      ...errors,
      videoName: _.isEmpty(videoName),
      author: _.isEmpty(author),
      categoryNames: _.isEmpty(categoryNames),
    };
    setErrors(localErrors);

    // return when error exists
    if (Object.values(localErrors).includes(true)) return;

    let video: Video = {
      id: videoId, // random generated id
      name: videoName,
      catIds: parseCategoryIds(categoryNames),
      formats: [DEFAULT_VIDEO_FORMAT],
      date: moment().format('l'), // random generated release date
    };

    // persist Video
    await dispatch(thunkUpdateVideo(video, author));

    // Redirect after submission
    history.push('/videos');
  };

  return (
    <Container className={classes.root}>
      <Divider className={classes.divider} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>Edit Video with id: {video.id}</h1>
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
              error={errors.videoName}
            />
          </FormControlElm>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.label}>
          <label>Video author</label>
        </Grid>
        <Grid item xs={12} sm={8}>
          <FormControlElm>
            <SelectInputElm options={authors} value={author.id} changeHandler={authorChangeHandler} error={errors.author} />
          </FormControlElm>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.label}>
          <label>Video Category</label>
        </Grid>
        <Grid item xs={12} sm={8}>
          <FormControlElm>
            <MultipleSelector
              error={errors.categoryNames}
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
              <Button
                variant="contained"
                size="medium"
                color="primary"
                className={classes.btnMargin}
                onClick={() => onSubmit()}
                disabled={hasNoChanges()}>
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
