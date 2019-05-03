import React, { Component } from 'react';
import {ProductConsumer} from '../context';
import {Link} from 'react-router-dom';
import {ButtonContainer} from './Button';

class Details extends Component {
    render() {
        return (
            <ProductConsumer>
                { value => {
                    const { id, title, type, size, img, color, price, info, inCart } = value.detail;                    
                    return (
                        <div className="container py-5"> {/** title */}
                            <div className="row">
                                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                                    <h1> {type} {title}   </h1> {/** end of title */}
                                    {/** product info */}
                                    <div className="row">
                                    <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                        <img src={img} alt="product" className="img-fluid"/>
                                    </div> </div>
                                    {/**product text */}
                                    <div className="row">
                                        <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                            <h2>{size }  <span>-</span>  {color}  </h2>  
                                                <strong>
                                                    <h5 className="text-blue fomt-italic mb-0">
                                                        Price : <span className="mr-1">$</span>{price} 
                                                    </h5> 
                                                </strong>            
                                            <h6 className="text-title text-uppercase text-muted mt-3 mb-2">{info}</h6>
                                            {/**Buttons */}
                                            <div>
                                                <Link to="/">
                                                    <ButtonContainer className="cart-btn" >Back to Procuts
                                                    </ButtonContainer> 
                                                </Link>
                                                <ButtonContainer 
                                                    cart
                                                        disabled={inCart? true : false} 

                                                        onClick={()=>{
                                                            value.addToCart(id);
                                                            value.openModal(id);
                                                         }}>
                                                        {inCart? "In cart": "Add to Cart"} 
                                                </ButtonContainer>
                                            </div>       
                                        </div> 
                                    </div>                                        
                                </div>
                            </div>                            
                        </div>
                    )                     
                }}
            </ProductConsumer>
        );
    }
}

export default Details;