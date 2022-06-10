import { ElementType } from 'react';
import { Book as BookInterface } from '../api/types';
import { getCover } from '../api/book';
import './Book.scss';

export type BookProps = React.PropsWithChildren<{
    as?: ElementType
} & BookInterface>;

const Book = ({ as: Tag = 'div', ...$ }: BookProps) => (
    <Tag className='Book'>
        {$.children}
        <div className='container'>
            <img src={getCover($)} />
        </div>
    </Tag>
);

export default Book;