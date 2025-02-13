import React , {useState} from 'react'
import {Button , Form} from 'react-bootstrap'
import {useNavigate , useLocation} from 'react-router-dom'
function SearchBox() {
    const [keyword , setKeyword] = useState('');
    let navigate = useNavigate();
    let location = useLocation();

    const submitHandler = (e) => {
        e.preventDefault();
        if(keyword) {
            navigate(`/?keyword=${keyword}&page=1`) 
        }
        else {
            navigate(location.pathname)
        }
    }
    return (
        <Form onSubmit={submitHandler} className='d-flex align-items-center gap-2'>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className='w-75'
            >
            </Form.Control>
            <Button
                type='submit'
                className='p-2 w-50'
                variant='outline-success'
            >
                Submit
            </Button>
        </Form>
    )
}

export default SearchBox
