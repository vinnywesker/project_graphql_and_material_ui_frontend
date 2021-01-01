import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import DeleteIcon from '@material-ui/icons/Delete';

import { useSelectedCards } from '../../../services/selectedCardsContext';
import { useEmployeeContext } from '../../../services/employeesContext';

interface Props {
    open: boolean;
}

const DeleteBar = ({ open }: Props) => {
    const { selectedItems, setSelectedItems } = useSelectedCards();
    const { mutationEmployees, queryEmployees } = useEmployeeContext();

    const handleClick = () => {

        if (selectedItems) {
            for (let i = 0; i < selectedItems.length; i++) {
                mutationEmployees.RemoveEmp({ variables: { _id: selectedItems[i]._id } })
            }
        }
        setSelectedItems(null);
    }

    const countItems = selectedItems ? selectedItems.length : 0;
    const message = `${countItems} Itens selecionados!`

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={open}
                message={message}
                action={
                    <>
                        <Button color="secondary" size="small" startIcon={<DeleteIcon />} onClick={handleClick}>
                            DELETAR
                        </Button>
                    </>
                }
            />
        </div>
    );
}

export default DeleteBar;