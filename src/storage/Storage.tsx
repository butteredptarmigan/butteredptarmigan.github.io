import { useState } from 'react';

export type StorageObject = { [key: number]: number; };

export type StorageOperator = {
    orderedItems: number[];
    items: Storage;
    add: Function;
    remove: Function;
    includes: Function;
    toggle: Function;
};

const DatewiseStorage = ($: any) => {
    let [storage, setStorage]: [StorageObject, Function] = useState({});

    const add = (id: number | string) => {
        const item = Number(id);

        if (item in storage) {
            return;
        }

        const date = Date.now();
        setStorage({
            ...storage,
            [item]: date
        });
    };

    const remove = (id: number | string) => {
        const item = Number(id);

        if (item in storage) {
            const { [item]: removed, ...updatedStorage } = storage;
            setStorage(updatedStorage);
        }
    };

    const includes = (id: number | string) => {
        const item = Number(id);
        return item in storage;
    };

    const toggle = (id: number | string) => {
        const item = Number(id);
        includes(item)
            ? remove(item)
            : add(item);
    };

    const orderedItems = Object.entries(storage)
        .sort(([,a], [,b]) => b - a)
        .map(([a, b]) => a);

    const operator = {
        orderedItems: Object.seal(orderedItems),
        items: Object.seal(storage),
        add,
        remove,
        includes,
        toggle
    };

    if (typeof $.children != 'function') {
        throw new TypeError('The only child of DatewiseStorage must be a function');
    }

    return $.children(operator);
};

export default DatewiseStorage;