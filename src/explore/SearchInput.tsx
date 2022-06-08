import { useState } from 'react';

type SearchInputProps = {
    query?: string,
    setQuery: Function
};

export const SearchInput = ($: SearchInputProps) => {
    let [value, setValue] = useState($.query ? $.query : '');

    return (
        <>
            <input
                type='search'
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onKeyUp={(event) => {
                    if (event.key === 'Enter') {
                        // onKeyUp event fires before onChange
                        // so the value must be obtained directly and not from the state
                        const value = (event.target as HTMLInputElement).value;
                        $.setQuery(value);
                    }
                }} />
            <button onClick={() => $.setQuery(value)}>
                search
            </button>
        </>
    );
};