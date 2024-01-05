import CartHeader from "../CartHeader";
import Product from "../Product";
import Footer from "../Footer";
import { useState,useEffect,createContext } from "react";
import Button from "../Button";
import cartData from '../../data'
import serverPath from "../utils/serverPath";
import './style.scss'

export const AppContext = createContext(null)


const Cart = () => {
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(null)
  const [fetchData, setFetchData] = useState(true)
  const [index, setIndex ] = useState(0)

  useEffect(()=>{
    fetch(serverPath).then(res=>res.json()).then(data=> {
      setCart(data)
    })
  }, [fetchData])

  useEffect(()=>{
    if(cart){
      setTotal({
        price:cart.reduce((prev, curr)=>{
            return prev + curr.priceTotal
        },0),
        count: cart.reduce((prev,curr)=>{
            return prev + curr.count
        },0)
    })
    }
  }, [cart])

  const deleteProduct = (id) => {
    setCart((cart) => {
      return cart.filter((product) => {
        return product.id !== id;
      });
    });
      fetch(serverPath + id,{
        method:'DELETE'
    }).then((res)=>{
      res.ok && setFetchData((value)=> !value)
    })
  }


  const increase = (id) => {
    // console.log('Up',id);

    const product = cart.find(product => id === product.id)
   
  
    const data ={
      ...product,
      count: product.count >= 1 ? ++product.count  : 1,
      priceTotal: product.count * product.price
    }


    fetch(serverPath + id,{
      method:'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then((res)=>{
      res.ok && setFetchData((value)=> !value)
    })
    
  };
  
  const changeValue = (id,value) =>{
    const product = cart.find(product => product.id)
    const data ={
      ...product,
      count: value,
      priceTotal: value * product.price
    }
    fetch(serverPath + id,{
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(data)
    }).then((res)=>{
      res.ok && setFetchData((value)=> !value)
    })
  }


  const decrease = (id) => {

    const product = cart.find(product => id === product.id)
    const data = {
      ...product,
      count: product.count > 1 ? --product.count  : 1,
      priceTotal: product.count * product.price,
    }

    fetch(serverPath + id,{
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(data)
    }).then((res)=>{
      res.ok && setFetchData((value)=> !value)
    })
  };

  const addProduct = () => {

    setIndex((index + 1) % cartData.length)
    const newData = cartData[index]
    
    
      const data = {
          title:newData.title,
          img:newData.img,
          count:newData.count,
          price:newData.price,
          priceTotal:newData.count * newData.price
      }
        fetch(serverPath,{
          method: 'POST',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify(data)
        }).then((res)=>{
          res.ok && setFetchData((value)=> !value)
        })
  }

  const products = () => {
    return cart.map((product) => {
      return (
        <Product
          product={product}
          key={product.id}
        />
      );
    })
  }



  return (
    <>
    <AppContext.Provider value={{deleteProduct, increase,decrease,changeValue}}>
    <section className="cart">
      <section> 
       <Button title='Добавить продукт' 
       onClick={addProduct}/>
      </section>
      <CartHeader />
      {cart && products()}
      {total && <Footer total={total} />}
    </section>
    </AppContext.Provider>
    </>
  );
};

export default Cart;
