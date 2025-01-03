import React , {useEffect, useState} from 'react'
import { Link, useParams , useNavigate } from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import { Row , Col , Image , ListGroup , Button , Card , Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listProductDetailes} from '../actions/productActions'


function ProductScreen({ match }) {
    const [qty , setQty] = useState(1);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    
    const productDetailes = useSelector(state => state.productDetailes)
    
    const {error , loading , product} = productDetailes
    useEffect(()=> {
        dispatch(listProductDetailes(id));
    },[dispatch , id]);

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`);
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {loading ?
                <Loader/>
                : error 
                    ?<Message variant='danger'>{error}</Message>
                    : (
                        <Row>
                <Col md={6}>  
                    <Image src={product.image} alt={product.name}/>
                </Col>

                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews` } color={'#f8e825'}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: ${product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price: 
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status: 
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Qty: 
                                        </Col>
                                        <Col xs='auto' className='m-1'>
                                            <Form.Select as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                {
                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Select>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                <Button onClick={addToCartHandler} className='btn-block' disabled={product.countInStock === 0} type='button'>Add to Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
                    )
            }
        </div>
    )
}

export default ProductScreen
