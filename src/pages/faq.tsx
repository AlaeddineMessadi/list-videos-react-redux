import { Container, Grid } from '@material-ui/core';
import React from 'react';

interface FAQPageProps {
  content?: JSX.Element;
}

export const FAQPage: React.FC<FAQPageProps> = ({ content }) => {
  return (
    <Container>
      <Grid container spacing={3} alignItems="flex-end">
        <Grid item xs={12}>
          <h1>Frequently Asked Questions</h1>
        </Grid>
        <Grid item xs={12}>
          <section>
            <article>{content}</article>
          </section>
        </Grid>
      </Grid>
    </Container>
  );
};
