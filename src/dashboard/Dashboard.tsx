import Tab from '../Tab';
import Filler from '../ui/Filler';
import './Dashboard.scss';

const Dashboard = () => (
    <Tab className='Dashboard'>
        <Filler>
            <span>
                <p>Welcome to Gutenberg Reader! As you can see, currently this dashboard is only here to greet you.</p>
                <p>Please proceed to other tabs to see the actual application.</p>
                <p className='instructions'>
                    This app allows you to:
                    <ul>
                        <li>Browse books from Gutenberg Project</li>
                        <li>Find books by title and author</li>
                        <li>Read books in the reading room</li>
                        <li>Mark books as favorite (although they are not persisted to local storage yet)</li>
                    </ul>
                </p>
                <p className="instructions">
                    You can disable network connection or trigger 404 error to see how it responds.
                </p>
                <p className='instructions'>
                    Unfortunately, it's not particularly responsive or mobile-fiendly yet.
                </p>
            </span>
        </Filler>
    </Tab>
);

export default Dashboard;