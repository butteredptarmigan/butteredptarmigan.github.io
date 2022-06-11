import React from 'react';
import classNames from "classnames";

type FillerProps = React.PropsWithChildren<any>;

export const Filler = ($: FillerProps) => (
    <div className={classNames('Filler', $.className)}>
        {$.children}
    </div>
)

export const Loading = ($: FillerProps) => (
    <Filler className='Loading'>
        <p>{$.children}</p>
    </Filler>
);

export const Empty = ($: FillerProps) => (
    <Filler className='Empty'>
        <p>{$.children}</p>
    </Filler>
);

export default Filler;