import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Checkbox from '@material-ui/core/Checkbox';

import { useSelectedCards } from '../../services/selectedCardsContext/index';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: 200,
        backgroundColor: theme.palette.secondary.light,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    checkbox: {
        backgroundColor: '#fff',
    }
}));

interface Props {
    name: string;
    salary: number;
    position: string;
    _id: string;
}

const CardEmployee = ({ name, salary, position, _id }: Props) => {
    const classes = useStyles();

    const [checked, setChecked] = useState(false);
    const { selectedItems, setSelectedItems } = useSelectedCards();

    useEffect(() => {
        if (!selectedItems) setChecked(false);
    }, [selectedItems])

    const handleClick = () => {
        const items = { _id, name, position };

        if (checked)
            if (selectedItems) setSelectedItems(selectedItems.filter(item => (item._id !== _id)));
            else setSelectedItems(null);

        else
            if (selectedItems) setSelectedItems([...selectedItems, items]);
            else setSelectedItems([items]);

        setChecked(!checked);
    }

    return (
        <>
            <Grid item>
                <ButtonBase onClick={handleClick}>
                    <Card className={classes.root} variant="outlined">
                        <CardContent>
                            <Checkbox
                                color='primary'
                                checked={checked}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {name}
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {`R$ ${salary},00`}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {position}
                            </Typography>
                        </CardContent>
                        {/* <CardActions>
                Button size="small">Learn More</Button>
                </CardActions> */}
                    </Card>
                </ButtonBase>
            </Grid>
        </>
    );
}

export default CardEmployee;
