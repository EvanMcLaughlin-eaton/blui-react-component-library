import * as React from 'react';
import { RootState } from '../../../redux/store';
import { useAppSelector } from '../../../redux/hooks';
import PlaygroundDrawer from '../../../shared/PlaygroundDrawer';

const PropsPlayground = (): JSX.Element => {
    const drawerSubheaderJson = useAppSelector(
        (state: RootState) => state.componentsPropsState.drawerSubheaderComponent
    );

    return <PlaygroundDrawer drawerData={drawerSubheaderJson} />;
};

export default PropsPlayground;
