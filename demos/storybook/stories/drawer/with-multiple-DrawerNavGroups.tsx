import { Accessibility, Gavel, Menu, NotificationsActive, Person, Settings, Today } from '@material-ui/icons';
import { Spacer } from '@pxblue/react-components';
import { Drawer, DrawerBody, DrawerHeader, DrawerNavGroup, NavItem } from '@pxblue/react-components/core/Drawer';
import { State, Store } from '@sambego/storybook-state';
import { boolean, text } from '@storybook/addon-knobs';
import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types';
import React, { useState } from 'react';
import { DrawerState } from './util';

const store: Store<DrawerState> = new Store<DrawerState>({
    selected: '',
});

export const withMultipleNavGroups = (): StoryFnReactReturnType => {
    const [selected, setSelected] = useState('');

    const navGroupItems1: NavItem[] = [
        {
            title: 'Identity Management',
            itemID: '1',
            icon: <Person />,
            onClick: () => setSelected('1'),
        },
        {
            title: 'Calendar',
            itemID: '2',
            icon: <Today />,
            onClick: () => setSelected('2'),
        },
        {
            title: 'Accessibility',
            itemID: '3',
            icon: <Accessibility />,
            onClick: () => setSelected('3'),
        },
        {
            title: 'Notifications',
            itemID: '4',
            icon: <NotificationsActive />,
            onClick: () => setSelected('4'),
        },
    ];

    const navGroupItems2: NavItem[] = [
        {
            title: 'Settings',
            itemID: '2-1',
            icon: <Settings />,
            onClick: () => setSelected('2-1'),
        },
        {
            title: 'Legal',
            itemID: '2-2',
            icon: <Gavel />,
            onClick: () => setSelected('2-2'),
        },
    ];

    return (
        <State store={store}>
            <Drawer open={boolean('open', true)} activeItem={selected}>
                <DrawerHeader icon={<Menu />} title={'PX Blue Drawer'} subtitle={'with multiple navigation groups'} />
                <DrawerBody>
                    <DrawerNavGroup title={text('navGroup[0].title', 'First DrawerNavGroup')} items={navGroupItems1} />
                    {boolean('Add Spacer', true) && <Spacer />}
                    <DrawerNavGroup title={text('navGroup[1].title', 'Second DrawerNavGroup')} items={navGroupItems2} />
                </DrawerBody>
            </Drawer>
        </State>
    );
};

withMultipleNavGroups.story = { name: 'with multiple Drawer Nav Groups' };
