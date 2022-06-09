import { MouseEventHandler } from 'react';
import classNames from 'classnames';
import I from '../ui/Icon';

type ToolbarEventHandler = MouseEventHandler<HTMLButtonElement>;

type ToolbarProps = {
    isFavorite: boolean,
    favoriteAction: ToolbarEventHandler,
    readAction: ToolbarEventHandler
};

const Toolbar = ($: ToolbarProps) => (
    <div className='Toolbar'>
        <button onClick={$.favoriteAction}>
            <I className={classNames('Icon', { 'Icon-filled': $.isFavorite })}>
                favorite
            </I>
        </button>
        <button onClick={$.readAction}>
            <I>import_contacts</I>
        </button>
    </div>
);

export default Toolbar;