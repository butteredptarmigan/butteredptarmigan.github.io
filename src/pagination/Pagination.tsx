import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import classNames from 'classnames';

type PaginationProps = {
    root?: string,
    count: number
} & React.HTMLAttributes<HTMLElement>;

const Pagination = ($: PaginationProps) => {
    const { page } = useParams();
    const [pages, setPages] = useState([] as Array<any>);

    const calculatePages = (page: string | undefined, count: number) => {
        // allow for default values
        const index = page ? Number(page) : 1;
        const limit = count > 0 ? count : 10;

        // last index shown should be divisible by the number of all indexes currently on display
        const first = index - (index % count) + 1;

        const pages = [];
        for (let i = first; i <= limit; i++) {
            pages.push(i);
        }

        return pages;
    }
    
    useEffect(() => {
        const calculated = calculatePages(page, $.count);
        setPages(calculated);
    }, [page, $.count]);

    return (
        <nav className={classNames('Pagination', $.className)}>
            {pages.map(page => (
                <NavLink
                    to={$.root ? `${$.root}/${page}` : page.toString()}
                    className={({ isActive }) => isActive ? '.Pagination-active' : ''}
                >
                    {page}
                </NavLink>
            ))}
        </nav>
    );
}
export default Pagination;