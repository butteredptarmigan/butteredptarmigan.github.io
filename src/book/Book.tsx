import { ElementType } from 'react';
import { Book as BookInterface } from '../api/types';
import { getCover } from '../api/book';

export type BookProps = React.PropsWithChildren<{
    as?: ElementType
} & BookInterface>;

const Book = ({ as: Tag = 'div', ...$ }: BookProps) => (
    <Tag>
        {$.children}
        <div>
            <img src={getCover($)} />
        </div>
    </Tag>
);

export default Book;