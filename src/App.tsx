import React, { useEffect, useState } from 'react';
import { VideosTable } from './components/videos-table';
import { getVideos } from './services/videos';
import { ProcessedVideo } from './common/interfaces';
import { BaseLayout } from './containers/layout';
import { Provider } from 'react-redux';
import { store } from './store';

import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { loadProcessedVideosAction } from './store/actions';

const App: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const [videos, setVideos] = useState<ProcessedVideo[]>([]);

  useEffect(() => {
    // load processed videos
    dispatch(loadProcessedVideosAction);
  }, []);

  const videosList = <VideosTable videos={videos} />;
  return (
    <Provider store={store}>
      <BaseLayout page={videosList} />
    </Provider>
  );
};

export default App;
