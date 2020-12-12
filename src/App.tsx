import React, { useEffect, useState } from 'react';
import { VideosTable } from './components/videos-table';
import { getVideos } from './services/videos';
import { ProcessedVideo } from './common/interfaces';
import { BaseLayout } from './containers/layout';

const App: React.FC = () => {
  const [videos, setVideos] = useState<ProcessedVideo[]>([]);

  useEffect(() => {
    getVideos().then((videos) => {
      setVideos(videos);
    });
  }, []);

  const videosList = <VideosTable videos={videos} />;
  return <BaseLayout page={videosList} />;
};

export default App;
