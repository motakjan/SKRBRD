import { LoadingOverlay } from '@mantine/core';
import React from 'react';

export const Loading = () => {
  return (
    <LoadingOverlay
      loaderProps={{ size: 'lg', color: 'yellow.5' }}
      visible={true}
      overlayBlur={1}
      transitionDuration={500}
    />
  );
};
