import { ElementType } from 'react';
import { Book as BookInterface } from '../api/types';
import { getCover } from '../api/book';

type BookProps = {
    as?: ElementType
} & BookInterface;

const Book = ({ as: Tag = 'div', ...$ }: BookProps) => (
    <Tag>
        <div>
            <img src={getCover($)} />
        </div>
    </Tag>
);

export default Book;