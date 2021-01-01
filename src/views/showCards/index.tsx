import React, { useEffect, useMemo, useState } from 'react';
import Grid from '@material-ui/core/Grid';

import Layout from '../../components/layout/index';
import CardEmployee from '../../components/cardEmployee/index';
import Formulario from '../../components/formulario/index';
import { useEmployeeContext } from '../../services/employeesContext/index';
import BackDrop from '../../components/backDrop/index';
import { useSelectedCards } from '../../services/selectedCardsContext';
import DeleteCard from '../../components/cardEmployee/deleteCard/index';

const ShowCards = () => {
    const { queryEmployees } = useEmployeeContext();
    const { data, loading } = queryEmployees;
    const [openBackDrop, setOpenBackDrop] = useState(false);
    const [openDeleteCard, setOpenDeleteCard] = useState(false);
    const { selectedItems } = useSelectedCards();

    useEffect(() => {
        if (selectedItems && selectedItems.length >= 1)
            setOpenDeleteCard(true)
        else
            setOpenDeleteCard(false)
    }, [selectedItems])

    const LoadCards = useMemo((): JSX.Element | JSX.Element[] => {
        setOpenBackDrop(loading);

        if (loading)
            return <h1>CARREGANDO, POR FAVOR AGUARDE!!!</h1>

        if (data?.getEmp)
            return data.getEmp?.map((value, key) => <CardEmployee name={value.name} salary={value.salary} position={value.position} key={key} _id={value._id} />);

        if (!loading) setOpenBackDrop(false);

        return <h1>OCORREU UM ERRO!</h1>
    }, [data, loading]);

    return (
        <Layout leftMenuItems={<Formulario />}>
            <DeleteCard open={openDeleteCard} />
            <BackDrop open={openBackDrop} />
            <Grid container spacing={2}>
                {LoadCards}
            </Grid>
        </Layout>
    );
}

export default ShowCards;