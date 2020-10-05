import Link from 'next/link';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const Footer = () => (
    <div>
        <Navbar fixed="bottom" expand="lg" bg="secondary" variant="light">
            <Navbar.Text className="mx-auto">© Virtual Box Company</Navbar.Text>
        </Navbar>
    </div>
);

export default Footer;
