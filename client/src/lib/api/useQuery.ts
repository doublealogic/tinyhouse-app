import { useState, useEffect } from "react";

interface State<TData> {
    data: TData | null;
}

export const useQuery = <TData = any>(query: string) => {
    const [state, setState] = useState<State<TData>>({
        data: null
    });
};