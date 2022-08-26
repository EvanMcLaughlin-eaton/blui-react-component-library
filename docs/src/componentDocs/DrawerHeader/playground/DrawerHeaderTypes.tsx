import { ComponentType } from '../../../__types__';
import * as Colors from '@brightlayer-ui/colors';

export const drawerTypes: ComponentType[] = [
    {
        componentName: 'DrawerHeader',
        props: [
            {
                propName: 'backgroundColor',
                inputType: 'colorPicker',
                inputValue: Colors.blue[500],
                propType: 'string',
                helperText: 'The color used for the background',
                required: false,
            },
            {
                propName: 'backgroundImage',
                inputType: 'select',
                inputValue: ['undefined', 'Pattern', 'Farm'],
                defaultValue: 'undefined',
                propType: 'string',
                helperText: 'An image to display in the header',
                required: false,
            },
            {
                propName: 'backgroundOpacity',
                inputType: 'number',
                inputValue: 0.3,
                propType: 'number',
                helperText: 'The opacity of the background image',
                required: false,
                rangeData: {
                    min: 0,
                    max: 1,
                    step: 0.1,
                },
            },
            {
                propName: 'divider',
                inputType: 'boolean',
                inputValue: false,
                propType: 'boolean',
                helperText: 'Optional divider which appears beneath header',
                required: false,
            },
            {
                propName: 'fontColor',
                inputType: 'colorPicker',
                inputValue: Colors.white[50],
                propType: 'string',
                helperText: 'The color of the text elements',
                required: false,
            },
            {
                propName: 'icon',
                inputType: 'select',
                inputValue: ['<Menu />', '<FitnessCenter />', 'undefined'],
                defaultValue: '<Menu />',
                propType: 'ReactNode',
                helperText: 'A component to render for the icon',
                required: false,
            },
            {
                propName: 'subtitle',
                inputType: 'string',
                inputValue: 'Organize your menu items here',
                propType: 'string',
                helperText: 'The text to show on the second line',
                required: false,
            },
            {
                propName: 'title',
                inputType: 'string',
                inputValue: 'Brightlayer UI Drawer',
                propType: 'string',
                helperText: 'The text to show on the first line',
                required: false,
            },
        ],
    },
];

export default drawerTypes;
