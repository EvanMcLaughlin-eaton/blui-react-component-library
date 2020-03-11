import { List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { ChevronRight, MoreVert } from '@material-ui/icons';
import * as Colors from '@pxblue/colors';
import { Moisture as Humidity, Temp } from '@pxblue/icons-mui';
import { Hero, HeroBanner, ScoreCard } from '@pxblue/react-components';
import { action } from '@storybook/addon-actions';
import { number } from '@storybook/addon-knobs';
import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types';
import React from 'react';

const backgroundImage = require('../../assets/topology_40.png');

export const heroes: JSX.Element[] = [
    <Hero
        key={'hero1'}
        icon={<Temp fontSize={'inherit'} htmlColor={Colors.black[500]} />}
        label={'Temperature'}
        iconSize={48}
        iconBackgroundColor={Colors.white[50]}
        value={98}
        units={'°F'}
        fontSize={'normal'}
    />,
    <Hero
        key={'hero2'}
        icon={<Humidity fontSize={'inherit'} htmlColor={Colors.blue[300]} />}
        label={'Humidity'}
        value={54}
        iconBackgroundColor={Colors.white[50]}
        units={'%'}
        iconSize={48}
        fontSize={'normal'}
    />,
];

export const withHeroes = (): StoryFnReactReturnType => (
    <ScoreCard
        style={{ width: 400, flex: '0 0 auto' }}
        headerTitle={'Substation 3'}
        headerSubtitle={'High Humidity Alarm'}
        headerInfo={'4 Devices'}
        headerColor={Colors.red[500]}
        headerFontColor={Colors.white[50]}
        headerBackgroundImage={backgroundImage}
        actionItems={[<MoreVert onClick={action('clicked more')} key={'morevert'} />]}
        actionRow={
            <List style={{ cursor: 'pointer'}} >
                <ListItem onClick={action('view location')}>
                    <ListItemText primary="View Location" />
                    <ListItemSecondaryAction>
                        <ChevronRight />
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        }
        badge={
            <HeroBanner>
                {heroes.slice(0, number('Number of Heroes', 1, { range: true, min: 0, max: 2, step: 1 }))}
            </HeroBanner>
        }
        badgeOffset={0}
    >
        <List>
            <ListItem>
                <ListItemText primary={'Body Content'} />
            </ListItem>
        </List>
    </ScoreCard>
);

withHeroes.story = { name: 'with heroes' };
