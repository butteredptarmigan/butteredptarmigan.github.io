import { NavLink, useMatch } from 'react-router-dom';
import I from '../ui/Icon';
import classNames from 'classnames';
import './ShowFavorites.scss';

export const ShowFavorites = () => {
    const active = useMatch('/explore/favorites');

    return (
        <NavLink
            to={active ? '/explore' : '/explore/favorites'}
            className='ShowFavorites'
        >
            <I className={classNames('Icon', { 'Icon-filled': active })}>
                favorite
            </I>
        </NavLink>
    );
};