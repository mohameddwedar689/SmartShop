import React from 'react'
import {Pagination , Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function Paginate({page , pages , keyword = '' , isAdmin = false}) {
    if(keyword) {
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }
    console.log("dgbd: " , keyword );
    
    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((x) => (
                    <Pagination.Item 
                        to={!isAdmin ?
                                `/?keyword=${keyword}&page=${x + 1}`
                                : `/admin/productlist/?keyword=${keyword}&page=${x + 1}`
                        } 
                        key={x + 1} 
                        as={Link} 
                        active={x + 1 === page}>
                            {x + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        )
    )
}

export default Paginate
