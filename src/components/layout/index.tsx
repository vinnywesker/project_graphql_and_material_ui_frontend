import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { useSetTheme } from '../../services/themeContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        divTitleMenu: {
            display: 'flex',
            height: 100,
            justifyContent: 'center',
            alignItems: 'center'
        },
        titleMenu: {
            fontSize: 40,
            color: (theme.palette.type === 'dark') ? theme.palette.primary.light : theme.palette.primary.dark,
        },
        toolbars: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }
    }),
);

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    children: JSX.Element | JSX.Element[];
    leftMenuItems: JSX.Element | JSX.Element[] | boolean;
}

export default function ResponsiveDrawer({ window, children, leftMenuItems }: Props) {
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [checked, setChecked] = useState(true);
    const { setUserTheme } = useSetTheme();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.divTitleMenu}>
                <Typography className={classes.titleMenu}>Formulário</Typography>
            </div>
            <Divider />
            {leftMenuItems}
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    const handleChange = () => {
        const theme = checked ? "light" : "dark";
        setChecked(!checked);
        setUserTheme(theme);
    }

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolbars}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Vinicius's Aplication
                    </Typography>
                    <FormControlLabel
                        control={<Switch checked={checked} onChange={handleChange} name="checkTheme" />}
                        label={checked ? "Modo Escuro" : "Modo Claro"}
                    />
                </Toolbar>
            </AppBar>

            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>

            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </div>
    );
}
