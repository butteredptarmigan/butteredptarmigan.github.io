import React from 'react';
import classNames from 'classnames';
import './Icon.scss';

type IconProps = React.HTMLProps<HTMLElement>;

const Icon = ($: IconProps) => (
    <i className={classNames('material-symbols-rounded', $.className)}>
        {$.children}
    </i>
);

export default Icon;