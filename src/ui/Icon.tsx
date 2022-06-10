import React from 'react';
import classNames from 'classnames';
import './Icon.scss';

type IconProps = {
    filled?: boolean
} & React.HTMLProps<HTMLElement>;

const Icon = ($: IconProps) => (
    <i
        className={classNames(
            'material-symbols-rounded',
            'Icon',
            { 'Icon-filled': $.filled },
            $.className
        )}
    >
        {$.children}
    </i>
);

export default Icon;