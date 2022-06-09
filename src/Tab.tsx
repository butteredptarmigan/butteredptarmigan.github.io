import classNames from "classnames";
import './Tab.scss';

const Tab = ($: any) => (
    <main className={classNames('Tab', $.className)}>
        {$.children}
    </main>
);

export default Tab;