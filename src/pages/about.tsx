import React from 'react';
import { Container, Grid } from '@material-ui/core';

interface AboutPageProps {
  page?: string;
}

export const AboutPage: React.FC<AboutPageProps> = () => {
  return (
    <Container>
      <Grid container spacing={3} alignItems="flex-end">
        <Grid item xs={12}>
          <h1>About</h1>
        </Grid>
        <Grid item xs={12}>
          <section>
            <article>Read README.md</article>
          </section>
        </Grid>
      </Grid>
    </Container>
  );
};
