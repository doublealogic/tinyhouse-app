import { useState, useReducer, useEffect, useCallback } from "react";
import { server } from './server';

interface State<TData> {
    data: TData | null;
    loading: boolean;
    error: boolean
}

type Action<TData> = 
    | { type: "FETCH" }
    | { type: "FETCH_SUCCESS"; payload: TData }
    | { type: "FETCH_ERROR" };

interface QueryResult<TData> extends State<TData> {
    refetch: () => void;
}

const reducer = <TData>(
    state: State<TData>, 
    action: Action<TData>
    ): State<TData> => {
    switch (action.type) {
        case 'FETCH':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return {
                data: action.payload,
                loading: false,
                error: false
            };
        case 'FETCH_ERROR':
            return { ...state, loading: false, error: true };
        default:
            throw new Error();
    }
}

export const useQuery = <TData = any>(
    query: string
    ): QueryResult<TData> => {
    const [state, dispatch] = useReducer(reducer, {
        data: null, 
        loading: false, 
        error: false
    })
    const [state, setState] = useState<State<TData>>({
        data: null,
        loading: false,
        error: false
    });

    const fetch = useCallback(() => {
        const fetchApi = async () => {
            try {
                setState({ 
                    data: null, 
                    loading: true, 
                    error: false 
                });

                const { data, errors } = await server.fetch<TData>({ 
                    query 
                });

                if (errors && errors.length) {
                    throw new Error(errors[0].message);
                }

                setState({ data, loading: false, error: false });
            } catch (err) {
                setState({ 
                    data: null, 
                    loading: false, 
                    error: true 
                });
                throw console.error(err);
            }
        };

        fetchApi();
    }, [query]);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return { ...state, refetch: fetch };
};
