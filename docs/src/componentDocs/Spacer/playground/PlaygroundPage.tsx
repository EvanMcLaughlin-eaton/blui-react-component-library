import React from 'react';
import Box from '@mui/material/Box';
import SpacerPlayground from './PropsPlayground';
import { PreviewComponent } from './PreviewComponent';

export const SpacerPlaygroundComponent = (): JSX.Element => (
    <Box
        sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
        }}
    >
        <PreviewComponent />
        <SpacerPlayground />
    </Box>
);
