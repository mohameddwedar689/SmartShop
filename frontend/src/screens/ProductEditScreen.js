import React , {useState , useEffect} from 'react'
import { Link , useLocation , useNavigate, useParams } from 'react-router-dom'
import { Form , Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { useDispatch , useSelector } from  'react-redux'
import { listProductDetailes , updateProduct } from '../actions/productActions'
import {PRODUCT_UPDATE_RESET} from '../constants/productConstants'
import axios from 'axios'

function ProductEditScreen() {
    const { id } = useParams();
    
    const [name , setName] = useState('')
    const [price , setPrice] = useState(0)
    const [image , setImage] = useState('')
    const [brand , setBrand] = useState('')
    const [category , setCategory] = useState('')
    const [countInStock , setCountInStock] = useState(0)
    const [description , setDescription] = useState('')
    const [uploading , setUploading] = useState(false)
    
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const productDetailes = useSelector(state => state.productDetailes)
    const {error , loading , product} = productDetailes

    const productUpdate = useSelector(state => state.productUpdate)
    const {error: errorUpdate , loading: loadingUpdate , success: successUpdate} = productUpdate


    useEffect(() => {
        if(successUpdate) {
            dispatch({
                type: PRODUCT_UPDATE_RESET,
            })
            navigate('/admin/productlist')
        }
        else {
            if( !product.name || product._id !== Number(id)) {
                dispatch(listProductDetailes(id))
            }
            else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }

    }, [product , id , dispatch , successUpdate , navigate]) 
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: id,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image' , file)
        formData.append('product_id' , id)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post(
                '/api/products/upload/' ,
                formData,
                config
            )

            setImage(data)
            setUploading(false)
        }
        catch(error) {
            setUploading(false)
        }
    }


    return (
        <div>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader/>
                    : error ? <Message variant='danger'>{error}</Message>
                        : (
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='name'>
                                    <Form.Label className='mb-1'>Name</Form.Label>
                                    <Form.Control className='mb-1' type='name' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='price'>
                                    <Form.Label className='mb-1'>Price</Form.Label>
                                    <Form.Control className='mb-1' type='number' placeholder='Enter Price' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='image'>
                                    <Form.Label className='mb-1'>Image</Form.Label>
                                    <Form.Control className='mb-1' type='text' placeholder='Upload Image' value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>
                                    <Form.Control type='file' id='image-file' label='Choose File' custom onChange={uploadFileHandler}></Form.Control>
                                    {uploading && <Loader/>}
                                </Form.Group>

                                <Form.Group controlId='brand'>
                                    <Form.Label className='mb-1'>Brand</Form.Label>
                                    <Form.Control className='mb-1' type='text' placeholder='Enter Brand' value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='category'>
                                    <Form.Label className='mb-1'>Category</Form.Label>
                                    <Form.Control className='mb-1' type='text' placeholder='Enter Category' value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='countinstock'>
                                    <Form.Label className='mb-1'>Stock</Form.Label>
                                    <Form.Control className='mb-1' type='number' placeholder='Enter Stock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='description'>
                                    <Form.Label className='mb-1'>Description</Form.Label>
                                    <Form.Control className='mb-1' type='text' placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                                </Form.Group>

                                <Button className='mt-1' type='submit' variant='primary'>Update</Button>
                            </Form>
                        )}
            </FormContainer>
        </div>
    )
}

export default ProductEditScreen
