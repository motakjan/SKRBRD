import { LoadingOverlay } from '@mantine/core';
import React from 'react';

export const Loading = () => {
  return (
    <LoadingOverlay
      loaderProps={{ size: 'lg', color: 'indigo.5' }}
      visible={true}
      overlayBlur={1}
      transitionDuration={500}
    />
  );
};
