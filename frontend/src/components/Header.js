import React from 'react'
import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useDispatch , useSelector} from 'react-redux'
import { logout } from '../actions/userActions'
import {useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'
import SearchBox from './SearchBox'

function Header() {

    const navigate = useNavigate();
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch();


    const logoutHandler = () => {
        dispatch(logout())
    }

    const redirectToProfile = () => {
        navigate('/profile')
    }

    const redirectToUsersList = () => {
        navigate('/admin/userlist')
    }

    const redirectToProductsList= () => {
        navigate('/admin/productlist')
    }

    const redirectToOrdersList = () => {
        navigate('/admin/orderlist')
    }

    return (
        <div>
            <header>
                <Navbar bg='primary' variant='dark' expand="lg" collapseOnSelect>
                    <Container>
                        <Navbar.Brand href='/'>SmartShop</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <SearchBox/>
                            <Nav className="ms-auto">
                                <Nav.Link href='/cart'><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
                                {userInfo ? (
                                    <NavDropdown title={userInfo.name} id='username'>
                                        <Nav.Link>
                                            <NavDropdown.Item onClick={redirectToProfile}>Profile</NavDropdown.Item>
                                        </Nav.Link>
                                        <Nav.Link>
                                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                        </Nav.Link>
                                    </NavDropdown>
                                ) : (
                                    <Nav.Link href='/login'><i className='fas fa-user'></i>Login</Nav.Link>
                                )}
                                {userInfo && userInfo.isAdmin && (
                                    <NavDropdown title='Admin' id='adminmenu'>
                                        <Nav.Link>
                                            <NavDropdown.Item onClick={redirectToUsersList}>Users</NavDropdown.Item>
                                        </Nav.Link>
                                        <Nav.Link>
                                            <NavDropdown.Item onClick={redirectToProductsList}>Products</NavDropdown.Item>
                                        </Nav.Link>
                                        <Nav.Link>
                                            <NavDropdown.Item onClick={redirectToOrdersList}>Orders</NavDropdown.Item>
                                        </Nav.Link>
                                    </NavDropdown>
                                )}
                            </Nav>
                            
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </div>
    )
}

export default Header;
