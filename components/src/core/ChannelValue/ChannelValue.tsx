import React, { useCallback, HTMLAttributes } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';

export type ChannelValueClasses = {
    root?: string;
    icon?: string;
    units?: string;
    value?: string;
};
export type ChannelValueProps = Omit<HTMLAttributes<HTMLSpanElement>, 'prefix'> & {
    classes?: ChannelValueClasses;
    color?: string;
    fontSize?: number | string;
    icon?: JSX.Element;
    prefix?: boolean;
    units?: string;
    value: number | string;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'inline-flex',
            alignItems: 'center',
            lineHeight: 1.2,
            fontSize: (props: ChannelValueProps): string | number => props.fontSize,
            color: (props: ChannelValueProps): string => props.color,
        },
        icon: {
            marginRight: theme.spacing(0.5),
            display: 'inline',
            fontSize: 'inherit',
        },
        text: {
            fontSize: 'inherit',
            lineHeight: 'inherit',
            letterSpacing: 0,
        },
        units: {
            fontWeight: 300,
        },
        value: {
            fontWeight: 600,
        },
    })
);

const changeIconDisplay = (newIcon: JSX.Element): JSX.Element =>
    React.cloneElement(newIcon, {
        style: Object.assign({}, newIcon.props.style, { display: 'block', fontSize: 'inherit' }),
    });

const ChannelValueRender: React.ForwardRefRenderFunction<unknown, ChannelValueProps> = (
    props: ChannelValueProps,
    ref: any
) => {
    const {
        classes,
        icon,
        prefix,
        units,
        value,
        // ignore unused vars so that we can do prop transferring to the root element
        /* eslint-disable @typescript-eslint/no-unused-vars */
        color,
        fontSize,
        /* eslint-enable @typescript-eslint/no-unused-vars */
        ...otherSpanProps
    } = props;
    const defaultClasses = useStyles(props);

    const getUnitElement = useCallback(
        (): JSX.Element => (
            <>
                {units && (
                    <Typography
                        variant={'h6'}
                        color={'inherit'}
                        className={clsx(defaultClasses.text, defaultClasses.units, classes.units)}
                        data-test={'units'}
                    >
                        {units}
                    </Typography>
                )}
            </>
        ),
        [units, classes, defaultClasses]
    );

    return (
        <span ref={ref} className={clsx(defaultClasses.root, classes.root)} data-test={'wrapper'} {...otherSpanProps}>
            {icon && (
                <span className={clsx(defaultClasses.icon, classes.icon)} data-test={'icon'}>
                    {changeIconDisplay(icon)}
                </span>
            )}
            {prefix && getUnitElement()}
            <Typography
                variant={'h6'}
                color={'inherit'}
                className={clsx(defaultClasses.text, defaultClasses.value, classes.value)}
                data-test={'value'}
            >
                {value}
            </Typography>
            {!prefix && getUnitElement()}
        </span>
    );
};
export const ChannelValue = React.forwardRef(ChannelValueRender);

ChannelValue.displayName = 'ChannelValue';
ChannelValue.propTypes = {
    classes: PropTypes.shape({
        root: PropTypes.string,
        icon: PropTypes.string,
        value: PropTypes.string,
        units: PropTypes.string,
    }),
    color: PropTypes.string,
    fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    icon: PropTypes.element,
    prefix: PropTypes.bool,
    units: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
ChannelValue.defaultProps = {
    classes: {},
    color: 'inherit',
    fontSize: 'inherit',
    prefix: false,
};
