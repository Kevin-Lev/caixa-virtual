import Head from 'next/head';
import Link from 'next/link';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const Header = (props) => {
    console.log('userId HEADER');
    console.log(props);

    return (
        <div style={{ marginBottom: '5%' }}>
            <Head>
                <title>vCaixa.dev - a sua Caixa Virtual!</title>
            </Head>
            <Navbar fixed="top" collapseOnSelect expand="lg" bg="primary" variant="dark">
                <Navbar.Brand>Caixa Virtual</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <NavDropdown
                            hidden={props.hide ? true : false}
                            title="Opções do usuário"
                            id="collasible-nav-dropdown">
                            <NavDropdown.Item style={{ paddingLeft: 7 }}>
                                <Link
                                    href={'/usuarios/caixa/' + props.idCaixa + '/newMovimentacao'}>
                                    <a style={{ color: 'black' }}>Simular movimentação</a>
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <Link href={'/usuarios/caixa/' + props.idCaixa + '/categorias/new'}>
                                    <a style={{ color: 'black' }}>Adicionar categoria</a>
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <Link href={'/usuarios/caixa/' + props.idCaixa}>
                                    <a style={{ color: 'black' }}>Lista de registros</a>
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <Link href={'/login'}>
                                    <a style={{ color: 'black' }}>Sair</a>
                                </Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;
