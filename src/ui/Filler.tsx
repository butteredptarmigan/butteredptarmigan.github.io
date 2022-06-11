import React from 'react';
import classNames from "classnames";

type FillerProps = React.PropsWithChildren<any>;

export const Filler = ($: FillerProps) => (
    <div className={classNames('Filler', $.className)}>
        <p>{$.children}</p>
    </div>
)

export const Loading = ($: FillerProps) => (
    <Filler className='Loading'>
        {$.children}
    </Filler>
);

export const Empty = ($: FillerProps) => (
    <Filler className='Empty'>
        {$.children}
    </Filler>
);

export default Filler;