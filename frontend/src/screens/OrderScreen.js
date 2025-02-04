import React , { useState , useEffect } from 'react'
import {  useParams , useNavigate} from 'react-router-dom'
import {   Row , Col , ListGroup , Image , Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getOrderDetails , payOrder , deliverOrder } from '../actions/orderActions'
import {ORDER_DELIVERED_RESET , ORDER_PAY_RESET} from '../constants/orderConstants'
import {PayPalButton} from 'react-paypal-button-v2'

function OrderScreen() {
    const { id } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [sdkReady , setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const {order , error , loading} = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const {loading: loadingPay , success: successPay} = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const {loading: loadingDeliver , success: successDeliver} = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const cart = useSelector(state => state.cart)
    const {shippingAddress: shippingAddressCart} = cart

    // ATavDyVBYV_pbRRAv44WcrarSnazoz9HUCd0DP-VGNF3Fi17U6YC1cc59bRhWpXalpn0azEO_JDRPUPe

    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=ATavDyVBYV_pbRRAv44WcrarSnazoz9HUCd0DP-VGNF3Fi17U6YC1cc59bRhWpXalpn0azEO_JDRPUPe'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    } 


    useEffect(() => {

        if (!userInfo) {
            navigate('/login')
        }

        if (!order || successPay || order._id !== Number(id) || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVERED_RESET })

            dispatch(getOrderDetails(id))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, order, id , navigate , userInfo, successPay, successDeliver])

    console.log("Order: " , order);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(id , paymentResult))
    }

    const DeliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return (
        loading ? (<Loader/>) 
            : error ? (<Message variant='danger'>{error}</Message>)
                : (
                    <div>
            <Row>
                <h1>Order: {order._id}</h1>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <p><strong>Name: </strong>{order.user.name}</p>
                                <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                                <strong>shipping: </strong>
                                {shippingAddressCart.address}, {shippingAddressCart.city}
                                {'  '}
                                {shippingAddressCart.postalCode},
                                {'  '}
                                {shippingAddressCart.country}
                                {order.isDelivered ? (
                                    <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                                ) : (
                                    <Message variant='warning'>Not Delivered</Message>
                                )} 
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant='warning'>Not Paid</Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message variant='info'>
                                Order is empty
                            </Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item , index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)} 
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items: </Col>
                                    <Col>${Number(order.totalPrice) - (Number(order.taxPrice) + Number(order.shippingPrice)).toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping: </Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax: </Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total: </Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader/>}
                                    {!sdkReady ? (
                                        <Loader/>
                                    ): (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                        {loadingDeliver && <Loader />}
                                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button
                                            type='button'
                                            className='btn btn-block'
                                            onClick={DeliverHandler}
                                        >
                                            Mark As Delivered
                                        </Button>
                                    </ListGroup.Item>
                                )}
                    </Card>
                </Col>
            </Row>
        </div>

                )
            
    )
};

export default OrderScreen
