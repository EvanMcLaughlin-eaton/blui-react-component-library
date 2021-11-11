import React, { useCallback } from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card, { CardProps } from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import * as Colors from '@pxblue/colors';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export type ScoreCardClasses = {
    root?: string;
    actionItems?: string;
    badgeWrapper?: string;
    bodyWrapper?: string;
    content?: string;
    header?: string;
    headerBackground?: string;
    headerContent?: string;
    headerInfo?: string;
    headerTitle?: string;
    headerSubtitle?: string;
};

export type ScoreCardProps = CardProps & {
    /** Icons to show to the right of the text */
    actionItems?: JSX.Element[];
    /** Max number of actionItems in the header
     *
     * Default: 3
     */
    actionLimit?: number;
    /** Component to render for the footer */
    actionRow?: JSX.Element;
    /** Component to render in the call-out area on the right side of the card body.
     *
     * This is usually a single `Hero` or `HeroBanner`containing multiple Heroes.
     */
    badge?: JSX.Element;
    /** Vertical offset for the badge component
     *
     * Default: 0
     */
    badgeOffset?: number;
    /** Custom classes for default style overrides */
    classes?: ScoreCardClasses;
    /** An image to display in the header */
    headerBackgroundImage?: string;
    /** The color of the header
     *
     * Default: theme.palette.primary.main
     */
    headerColor?: string;
    /** The color for text and icons in header
     *
     * Default: white
     */
    headerFontColor?: string;
    /** Tertiary text */
    headerInfo?: string | JSX.Element;
    /** The primary text */
    headerTitle: string;
    /** The secondary text */
    headerSubtitle?: string | JSX.Element;
};

const fontColor = (props: ScoreCardProps): string => props.headerFontColor || Colors.white[50];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flex: '1 1 0px',
        },
        flexColumn: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
        },
        header: {
            height: `6.25rem`,
            overflow: 'hidden',
            position: 'relative',
            backgroundColor: (props: ScoreCardProps): string =>
                props.headerColor ||
                (theme.palette.type === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main),
            color: fontColor,
        },
        headerContent: {
            display: 'flex',
            position: 'relative',
            zIndex: 1,
            alignItems: 'flex-start',
            padding: `1rem ${theme.spacing(2)}px 0 ${theme.spacing(2)}px`,
        },
        headerTitle: {
            color: fontColor,
            lineHeight: 1.4,
        },
        headerSubtitle: {
            color: fontColor,
            lineHeight: 1.4,
        },
        headerInfo: {
            color: fontColor,
            fontWeight: 300,
        },
        headerBackground: {
            position: 'absolute',
            zIndex: 0,
            width: '100%',
            backgroundSize: 'cover',
            height: '100%',
            opacity: 0.3,
            backgroundPosition: 'center',
            backgroundImage: (props: ScoreCardProps): string => `url(${props.headerBackgroundImage})`,
        },
        content: {
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
        },
        bodyWrapper: {
            flex: '1 1 0px',
        },
        badgeWrapper: {
            flex: '0 0 auto',
            marginRight: theme.spacing(2),
            marginLeft: theme.spacing(2),
            alignSelf: (props: ScoreCardProps): string => (props.badgeOffset !== 0 ? 'flex-start' : 'center'),
            marginTop: (props: ScoreCardProps): number => props.badgeOffset,
        },
        actionItems: {
            marginLeft: theme.spacing(1.5),
            cursor: 'pointer',
        },
    })
);

const ScoreCardRender: React.ForwardRefRenderFunction<unknown, ScoreCardProps> = (props: ScoreCardProps, ref: any) => {
    const defaultClasses = useStyles(props);
    const {
        actionLimit,
        actionItems,
        actionRow,
        badge,
        headerBackgroundImage,
        children,
        classes,
        headerInfo,
        headerTitle,
        headerSubtitle,
        // ignore unused vars so that we can do prop transferring to the root element
        /* eslint-disable @typescript-eslint/no-unused-vars */
        headerColor,
        headerFontColor,
        badgeOffset,
        /* eslint-enable @typescript-eslint/no-unused-vars */
        ...otherCardProps
    } = props;

    const getBackgroundImage = useCallback((): JSX.Element | undefined => {
        if (headerBackgroundImage) {
            return <div className={clsx(defaultClasses.headerBackground, classes.headerBackground)} />;
        }
    }, [headerBackgroundImage, defaultClasses, classes]);

    const getHeaderInfo = useCallback((): JSX.Element | undefined => {
        if (!headerInfo) return;
        if (typeof headerInfo === 'string') {
            return (
                <Typography noWrap variant={'body2'} className={clsx(defaultClasses.headerInfo, classes.headerInfo)}>
                    {headerInfo}
                </Typography>
            );
        }
        return headerInfo;
    }, [headerInfo, defaultClasses, classes]);

    const getHeaderSubtitle = useCallback((): JSX.Element | undefined => {
        if (!headerSubtitle) return;
        if (typeof headerSubtitle === 'string') {
            return (
                <Typography
                    noWrap
                    variant={'body2'}
                    className={clsx(defaultClasses.headerSubtitle, classes.headerSubtitle)}
                >
                    {headerSubtitle}
                </Typography>
            );
        }
        return headerSubtitle;
    }, [headerSubtitle, defaultClasses, classes]);

    const getHeaderText = useCallback(
        (): JSX.Element => (
            <div className={defaultClasses.flexColumn} style={{ flex: '1 1 0px', overflow: 'hidden' }}>
                <Typography variant={'h6'} noWrap className={clsx(defaultClasses.headerTitle, classes.headerTitle)}>
                    {headerTitle}
                </Typography>
                {getHeaderSubtitle()}
                {getHeaderInfo()}
            </div>
        ),
        [defaultClasses, classes, headerTitle, getHeaderSubtitle, getHeaderInfo]
    );

    const getActionItems = useCallback((): JSX.Element[] | undefined => {
        if (actionItems) {
            return actionItems.slice(0, actionLimit).map((actionItem, index) => (
                <div
                    key={`${index}`}
                    className={clsx(defaultClasses.actionItems, classes.actionItems)}
                    data-test={'action-item'}
                >
                    {actionItem}
                </div>
            ));
        }
    }, [actionItems, actionLimit, defaultClasses, classes]);

    const getHeroes = useCallback((): JSX.Element | undefined => {
        if (badge) {
            return (
                <div className={clsx(defaultClasses.badgeWrapper, classes.badgeWrapper)} data-test={'badge-wrapper'}>
                    {badge}
                </div>
            );
        }
    }, [badge, defaultClasses, classes]);

    const getFooter = useCallback((): JSX.Element | undefined => {
        if (actionRow) {
            return (
                <>
                    <Divider />
                    {actionRow}
                </>
            );
        }
    }, [actionRow]);

    return (
        <Card ref={ref} className={clsx(defaultClasses.root, classes.root)} data-test={'card'} {...otherCardProps}>
            <div data-test={'header'} className={clsx(defaultClasses.header, classes.header)}>
                {getBackgroundImage()}
                <div className={clsx(defaultClasses.headerContent, classes.headerContent)}>
                    {getHeaderText()}
                    {getActionItems()}
                </div>
            </div>
            <div className={clsx(defaultClasses.content, classes.content)} data-test={'content'}>
                <div className={clsx(defaultClasses.bodyWrapper, classes.bodyWrapper)} data-test={'body-wrapper'}>
                    {children}
                </div>
                {getHeroes()}
            </div>
            {getFooter()}
        </Card>
    );
};
/**
 * [ScoreCard](https://pxblue-components.github.io/react/?path=/info/components-score-card--get-read-me-story) component
 *
 * Card component that calls attention to particular values.
 */
export const ScoreCard = React.forwardRef(ScoreCardRender);

ScoreCard.displayName = 'ScoreCard';
ScoreCard.propTypes = {
    actionItems: PropTypes.arrayOf(PropTypes.element),
    actionLimit: PropTypes.number,
    actionRow: PropTypes.element,
    badge: PropTypes.element,
    badgeOffset: PropTypes.number,
    classes: PropTypes.shape({
        root: PropTypes.string,
        actionItems: PropTypes.string,
        badgeWrapper: PropTypes.string,
        bodyWrapper: PropTypes.string,
        content: PropTypes.string,
        header: PropTypes.string,
        headerBackground: PropTypes.string,
        headerContent: PropTypes.string,
        headerInfo: PropTypes.string,
        headerTitle: PropTypes.string,
        headerSubtitle: PropTypes.string,
    }),
    headerBackgroundImage: PropTypes.string,
    headerColor: PropTypes.string,
    headerFontColor: PropTypes.string,
    headerInfo: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    headerTitle: PropTypes.string.isRequired,
    headerSubtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};
ScoreCard.defaultProps = {
    actionLimit: 3,
    badgeOffset: 0,
    classes: {},
};
