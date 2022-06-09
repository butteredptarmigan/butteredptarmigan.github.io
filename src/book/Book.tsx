import { ElementType } from 'react';
import { Book as BookInterface } from '../api/types';
import { getAuthor, getCover } from '../api/book';
import './Book.scss';

export type BookProps = React.PropsWithChildren<{
    as?: ElementType
} & BookInterface>;

const Book = ({ as: Tag = 'div', ...$ }: BookProps) => (
    <Tag className='Book'>
        {$.children}
        <div className='container'>
            <div className='Book-information'>
                <span className='Book-author'>{getAuthor($)}</span>
                <h4 className='Book-title'>{$.title}</h4>
            </div>
            <img src={getCover($)} />
        </div>
    </Tag>
);

export default Book;