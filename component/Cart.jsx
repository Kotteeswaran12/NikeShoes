/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import { useEffect, useState } from 'react'
import './Cart.css'
import close from '../src/assets/close_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png'
import delet from '../src/assets/delete_19dp_000000_FILL0_wght400_GRAD0_opsz20.png'
import fav from '../src/assets/favorite_border_16dp_000000.png'

const Cart = ({ cartItem, viewCart, setViewCart }) => {

    const [cartitem, setCartItem] = useState([])
    const [del, setDel] = useState()

    useEffect(() => {

        const addtocart = async () => {
        }

        const fetch = async () => {
            try {
                const carturl = await axios.get("http://localhost:8080/cart")
                setCartItem(carturl.data)
            } catch (error) {
                console.log(error)
            }


        }




        fetch()
    }, [cartItem])

    const HandleDelete = async (id) => {
        await axios.delete(`http://localhost:8080/cart/${id}`)

        setCartItem((cartitem) => cartitem.filter((c) => c.id !== id))
        // setDel(id)
        // deleteurl()

    }
    // console.log(del)

    return (
        <>

            {/* <div className="cartcontainer">
            
            {
                cartitem.map((cart)=>(
                    <div className="cartitem" key={cart.id}  >
                        <h1 >{cart.name}</h1>
                        <img src={cart.image} alt={cart.name} />
                        <h2>{cart.price}</h2>
                    </div>
                ))
            }
        </div> */}
            {viewCart && <div className="cartcontainer">




                <img src={close} alt={close} className='cancle' onClick={() => setViewCart(false)} />


                <h1 className='cartempty' > {
                    cartItem.length === 0 ? "Your cart is empty" : ""
                }</h1>
                {
                    cartitem.map((cart) => (
                        <div className="cartlist" key={cart.id}>

                            <img src={cart.image} alt={cart.name} style={{ 'maxheight': "200px" }} />
                            <div className="name">
                                <h1 className='prodname'>{cart.name}</h1>
                                <button className='cartbtn'>+ -</button>
                                <div className="deletefav">
                                    <img src={delet} alt={delet} className='cartdel' onClick={() => HandleDelete(cart.id)} />
                                    <img src={fav} alt={fav} className='cartdel' />
                                </div>
                            </div>
                            <h3>MRP : {cart.price}</h3>
                        </div>

                    ))
                }

            </div>}





        </>
    )
}

export default Cart