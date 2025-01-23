import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function CheckoutSteps({step1 , step2 , step3 , step4}) {
    
    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 ? (
                    <Link to='/login'>
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Link>
                ): (
                    <Nav.Link disabled>Login</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <Link to='/shipping'>
                        <Nav.Link href="/shipping">Shipping</Nav.Link>
                    </Link>
                ): (
                    <Nav.Link disabled>Shipping</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <Link to='/payment'>
                        <Nav.Link href="/payment">Payment</Nav.Link>
                    </Link>
                ): (
                    <Nav.Link disabled>Payment</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    <Link to='/placeorder'>
                        <Nav.Link href="/placeorder">Place Order</Nav.Link>
                    </Link>
                ): (
                    <Nav.Link disabled>Place Order</Nav.Link>
                )}
            </Nav.Item>
        </Nav>




    )
}

export default CheckoutSteps
