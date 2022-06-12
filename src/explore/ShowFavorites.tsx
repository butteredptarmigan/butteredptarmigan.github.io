import { NavLink, useMatch } from 'react-router-dom';
import I from '../ui/Icon';
import './ShowFavorites.scss';

const ShowFavorites = () => {
    const active = useMatch('/explore/favorites/*');

    return (
        <NavLink
            to={active ? '/explore' : '/explore/favorites'}
            className='ShowFavorites'
        >
            <I filled={Boolean(active)}>
                favorite
            </I>
        </NavLink>
    );
};

export default ShowFavorites;