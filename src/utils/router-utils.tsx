import React from 'react';
import { useSearchParams } from 'react-router-dom';

export const withSearchParams = (Component: any) => {
    return ($: React.ComponentProps<any>) => {
        let [searchParams, setSearchParams] = useSearchParams();

        return (
            <Component
                {...$}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
            />
        );
    };
};