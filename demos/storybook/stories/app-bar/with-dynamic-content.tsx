import React from 'react';
import { number, text } from '@storybook/addon-knobs';
import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types';
import { AppBar, ThreeLiner } from '@brightlayer-ui/react-components';
import { makeStyles, Toolbar } from '@material-ui/core';

export const withDynamicContent = (): StoryFnReactReturnType => {
    const useStyles = makeStyles({
        title: {},
        subtitle: {},
        info: {},
        liner: {
            top: 0,
            position: 'relative',
        },
        expanded: {
            '& $liner': {
                top: 64,
            },
        },
        collapsed: {
            '& $title': {
                fontSize: '1.25rem',
                fontWeight: 600,
            },
            '& $subtitle': {
                fontSize: 0,
            },
            '& $info': {
                fontSize: '1rem',
                fontWeight: 400,
                marginTop: '-0.25rem',
            },
        },
    });

    const classes = useStyles();
    const appBarGroupId = 'AppBar';
    const threeLinerGroupId = 'ThreeLiner';
    // AppBar props
    const expandedHeight = number('expandedHeight', 200, {}, appBarGroupId);
    const collapsedHeight = number('collapsedHeight', 64, {}, appBarGroupId);
    // ThreeLiner Props
    const title = text('title', 'title', threeLinerGroupId);
    const subtitle = text('subtitle', 'subtitle', threeLinerGroupId);
    const info = text('info', 'info', threeLinerGroupId);

    return (
        <AppBar
            expandedHeight={expandedHeight}
            collapsedHeight={collapsedHeight}
            classes={{ collapsed: classes.collapsed, expanded: classes.expanded }}
        >
            <Toolbar>
                <ThreeLiner
                    title={title}
                    subtitle={subtitle}
                    info={info}
                    animationDuration={300}
                    classes={{ title: classes.title, subtitle: classes.subtitle, info: classes.info }}
                    className={classes.liner}
                ></ThreeLiner>
            </Toolbar>
        </AppBar>
    );
};

withDynamicContent.story = { name: 'with dynamic content' };
