import { Avatar } from '@material-ui/core';
import { Email, Settings } from '@material-ui/icons';
import SendIcon from '@material-ui/icons/Send';
import {UserMenu, UserMenuGroup, UserMenuItem} from '@pxblue/react-components';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types';
import React from 'react';

const menuItems: UserMenuItem[] = [
    {
        itemID: '1',
        title: 'Log Out',
        icon: <SendIcon />,
        onClick: action('Log Out Selected'),
    },
    {
        itemID: '2',
        title: 'Account Settings',
        icon: <Settings />,
        onClick: action('Account Settings Selected'),
    },
    {
        itemID: '3',
        title: 'Contact Us',
        icon: <Email />,
        onClick: action('Contact Us Selected'),
    }
];

const menuGroups: UserMenuGroup[] = [
    {
        fontColor: '',
        iconColor: '',
        items: menuItems
    }
];

export const getMenu = (): UserMenuGroup[] => {
    menuGroups[0].fontColor = '';
    menuGroups[0].iconColor = '';
    return menuGroups;
};

export const withBasicUsage = (): StoryFnReactReturnType => {
    const value = text('value', 'AB');
    const avatar = <Avatar>{value}</Avatar>;
    return <UserMenu avatar={avatar} menuGroups={getMenu()} />;
};

withBasicUsage.story = { name: 'with basic usage ' };
