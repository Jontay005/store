import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {
    state ={
        products:storeProducts,
        detail: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct:detailProduct,
        //cart stuff
        cartSubtotal: 0,
        cartTax: 0,
        cartTotal: 0 
    };

    componentDidMount(){
        this.setProducts();
    }
    setProducts = () =>{
        let tempProducts = [];
        storeProducts.forEach( item =>{
            const singleItem = {...item };
            tempProducts = [...tempProducts, singleItem];
        });

        this.setState(()=>{
            return {products: tempProducts};
        });
    };

    getItem = id => {
        const product = this.state.products.find(item =>item.id === id); 
        return product;
    }

    //method will open up detail
    handleDetail = id => { 
         const product = this.getItem(id);
         this.setState(()=>{ 
             return { detail:product };
         })
    }

    //method will add to cart
    addToCart = id => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.total = 100;
        const price = product.price;
        product.total = price;
        this.setState(()=> {
            return {products: tempProducts, cart: [...this.state.cart, 
                product]};
        }, ()=>{
            this.addTotals();
        })
        //console.log(`Hello from to cart.id is ${id}`);
    }

    openModal = id => {
        const product = this.getItem(id);
        this.setState(()=>{
            return {modalProduct:product, modalOpen:true}
        })
    }

    closeModal = () => {
        this.setState(() =>{
            return {modalOpen: false}
        })
    }

    increment = (id) => {
        let tempCart = [...this.state.cart];
        //look for selected product
        const selectedproduct = tempCart.find(item => item.id === id); 

        //look for the item index in tempCart
        const index = tempCart.indexOf(selectedproduct); 

        //assign this prduct to product variable
        const product = tempCart[index];
 
        product.count = product.count + 1;
        product.total = product.count * product.price;

        this.setState(()=>{
            return{
                cart: tempCart
            }
        }, ()=>{
            this.addTotals()
        }) 
    }

    decrement = (id) => {
        let tempCart = [...this.state.cart];
        let selectedproduct = tempCart.find(item => item.id === id);

        let index = tempCart.indexOf(selectedproduct);
        let product = tempCart[index];

        product.count = product.count - 1;
        if(product.count === 0){
            this.removeItem(id)
        } else {
            product.total = product.count * product.price;

            this.setState(()=>{
                    return { cart: tempCart}
                }, ()=>{
                    this.addTotals();
                }) 
        }
    }

    removeItem = (id) => {
        let tempProducts = [...this.state.products]; 
        let tempCart = [...this.state.cart]; 

        tempCart = tempCart.filter(item => item.id !==id);

        const index = tempProducts.indexOf(this.getItem(id));
        let removeProduct = tempProducts[index];
        removeProduct.inCart = false;
        removeProduct.count = 0;
        removeProduct.total = 0;

        this.setState(()=>{
            return {
                cart:[...tempCart],
                products:[...tempProducts]
            }
        },
        ()=> {
            this.addTotals()
        })

        console.log('this is the remove item method');
    }

    clearCart = () => {
        this.setState(()=>{
            return { cart: []}
        }, () =>{
            this.setProducts();
            this.addTotals();
        })
        console.log("cart is clear");
    }

    addTotals =() => {
        let subTotal = 0;
        this.state.cart.map(item => (subTotal +=item.total));
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(()=>{
            return {
                cartSubtotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }

    render() {
        return (
            <ProductContext.Provider value={{ 
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer; //create Product 
export  {ProductConsumer, ProductProvider}; //export