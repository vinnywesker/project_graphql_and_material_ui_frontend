import React, { useState, ChangeEvent, FormEvent } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useEmployeeContext } from '../../services/employeesContext';

const styles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: '100%',
        justifyContent: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing(1),
    },
    input: {
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(2),
    },
}))


const INITIAL_STATE = {
    name: '',
    position: '',
    salary: null
}

interface data {
    name: string;
    position: string;
    salary: number | null;
}

const Formulario = () => {
    const classes = styles();

    const [data, setData] = useState<data>(INITIAL_STATE);

    const { mutationEmployees } = useEmployeeContext();

    const onHandleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const nameOfAtribute = e.target.name;
        const valueOfAtribute = e.target.value;
        setData({
            ...data, [nameOfAtribute]: (nameOfAtribute === "salary") ? parseFloat(e.target.value) : valueOfAtribute,
        })
    }

    const onHandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { name, position, salary } = data;

        if (name.length <= 1 || position.length <= 1 || salary === null || salary < 1)
            return alert("Erro: algum dado digitado está em branco ou é inválido!\n\nVerifique e tente novamente.")

        mutationEmployees.AddEmp({
            variables: {
                name, position, salary
            },
        });
    }

    return (
        <div className={classes.root}>
            <form className={classes.form} noValidate onSubmit={onHandleSubmit}>
                <TextField
                    className={classes.input}
                    name="name"
                    label="* Nome"
                    variant="outlined"
                    autoFocus
                    value={data.name}
                    onChange={onHandleChange}
                />
                <TextField
                    className={classes.input}
                    name="position"
                    label="* Cargo"
                    variant="outlined"
                    value={data.position}
                    onChange={onHandleChange}
                />
                <TextField
                    className={classes.input}
                    name="salary"
                    label="* Salário"
                    type="number"
                    variant="outlined"
                    value={data.salary}
                    onChange={onHandleChange}
                />
                <Button className={classes.button} variant="contained" color="primary" startIcon={<AddIcon />} type="submit">Adicionar</Button>
            </form>
        </div>
    )
}

export default Formulario;