import { generateUtilityClass, generateUtilityClasses } from '@mui/material';

export type ThreeLinerClasses = {
    /** Styles applied to the root element. */
    root?: string;
    /** First Line Content */
    title?: string;

    /** Second Line Content */
    subtitle?: string;

    /** Third Line Content */
    info?: string;
};

export type ThreeLinerClassKey = keyof ThreeLinerClasses;

export function getThreeLinerUtilityClass(slot: string): string {
    return generateUtilityClass('BluiThreeLiner', slot);
}

const threeLinerClasses: ThreeLinerClasses = generateUtilityClasses('BluiThreeLiner', [
    'root',
    'title',
    'subtitle',
    'info',
]);

export default threeLinerClasses;
