import React, { createContext, useContext } from 'react';
import { ApolloError, gql, useMutation, useQuery, ApolloQueryResult } from '@apollo/client';

interface ReturnData {
    _id: string;
    name: string;
    salary: number;
    position: string;
}

interface Data {
    getEmp: ReturnData[] | undefined;
}

interface updateData {
    getEmp: ReturnData[];
}

interface returnMutationAdd {
    saveEmp: ReturnData;
}

interface returnMutationRemove {
    removeEmp: ReturnData;
}

interface input {
    name: string;
    position: string;
    salary: number;
}

interface contextEmployees {
    queryEmployees: {
        data: Data | undefined;
        loading: boolean;
        error: ApolloError | undefined;
        refetch: (variables?: Partial<{}> | undefined) => Promise<ApolloQueryResult<any>>
    },
    mutationEmployees: {
        AddEmp(data: { variables: input }): void;
        RemoveEmp(data: { variables: { _id: string } }): void;
    }
}


interface inputAddEmp {
    name: string;
    salary: number;
    position: string;
}

interface inputRemoveEmp {
    _id: string;
}

const Context = createContext<contextEmployees>({} as contextEmployees);

interface Props {
    children: JSX.Element | JSX.Element[];
}

const GET_EMPLOYEES = gql`
    query GetEmp($name: String, $position: String, $salary: Float) {
        getEmp(input: { name: $name, position: $position, salary: $salary }) {
            _id
            name
            salary
            position
        }
    }
`;

const ADD_EMPLOYEES = gql`
    mutation AddEmp($name: String!, $position: String!, $salary: Float!) {
        saveEmp(input: { name: $name, position: $position, salary: $salary }) {
            name
            salary
            position    
        }
  }
`;

const REMOVE_EMPLOYEES = gql`
mutation RemoveEmp($_id: String) {
    removeEmp(input: { _id: $_id }) {
        name
        salary
        position    
    }
}
`;

const Provider = ({ children }: Props) => {
    const { data, error, loading, refetch } = useQuery(GET_EMPLOYEES, {
        variables: {
        }
    });

    const [AddEmp] = useMutation<returnMutationAdd, inputAddEmp>(ADD_EMPLOYEES, {
        update(cache, { data }) {
            const newEmployeeResponse = data?.saveEmp;
            const existiongEmployees = cache.readQuery<updateData>({ query: GET_EMPLOYEES })

            cache.writeQuery({
                query: GET_EMPLOYEES,
                data: {
                    getEmp: existiongEmployees ? [...existiongEmployees.getEmp, newEmployeeResponse] : [newEmployeeResponse]
                }
            })
        },
    });

    const [RemoveEmp] = useMutation<returnMutationRemove, inputRemoveEmp>(REMOVE_EMPLOYEES, {
        update(cache, { data }) {
            const newEmployeeResponse = data?.removeEmp;
            const existiongEmployees = cache.readQuery<updateData>({ query: GET_EMPLOYEES })

            cache.writeQuery({
                query: GET_EMPLOYEES,
                data: {
                    getEmp: existiongEmployees ? [...existiongEmployees.getEmp, newEmployeeResponse] : [newEmployeeResponse]
                }
            })
        },
    });

    return (
        <Context.Provider value={{
            queryEmployees: {
                data,
                error,
                loading,
                refetch,
            },
            mutationEmployees: {
                AddEmp,
                RemoveEmp
            }
        }}
        >
            { children}
        </Context.Provider>
    )
}
export default Provider;

export const useEmployeeContext = () => useContext(Context);