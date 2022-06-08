import React from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';

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

export const withOutletContext = (Component: any) => {
    return ($: React.ComponentProps<any>) => (
        <Component
            {...$}
            {...useOutletContext()}
        />
    );
}