import './Icon.scss';

const Icon = ($: any) => (
    <i className='material-symbols-rounded'>
        {$.children}
    </i>
);

export default Icon;