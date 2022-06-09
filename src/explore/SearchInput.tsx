import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import I from '../ui/Icon';
import './SearchInput.scss';

export const SearchInput = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query');
    let [value, setValue] = useState(query ? query : '');

    const setQuery = (query?: string) => {
        setSearchParams(query ? { query } : {});
    }

    return (
        <div className='SearchInput'>
            <input
                type='search'
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onKeyUp={(event) => {
                    if (event.key === 'Enter') {
                        // onKeyUp event fires before onChange
                        // so the value must be obtained directly and not from the state
                        const value = (event.target as HTMLInputElement).value;
                        setQuery(value);
                    }
                }} />
            <button onClick={() => setQuery(value)}>
                <I>search</I>
            </button>
        </div>
    );
};