/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import { useEffect, useState } from 'react'
import './Cart.css'
import close from '../src/assets/close_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png'
import delet from '../src/assets/delete_19dp_000000_FILL0_wght400_GRAD0_opsz20.png'
import fav from '../src/assets/favorite_border_16dp_000000.png'
import add from '../src/assets/add_16dp_FFFFFF_FILL0_wght400_GRAD0_opsz20.png'
import remove from '../src/assets/remove_16dp_FFFFFF_FILL0_wght400_GRAD0_opsz20.png'
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
                <div className='Tittle' >

                    <div className="close">
                        <img src={close} alt={close} className='cancle' onClick={() => setViewCart(false)} />
                    </div>
                    <div className="tittlename">
                        <h1>Cart Items</h1>
                    </div>
                </div>






                <div className='cartempty' > {
                    cartItem.length === 0 ? <h1 className='cartem'>Your cart iS Empty</h1> : ""
                }</div>
                {
                    cartitem.map((cart) => (
                        <div className="cartlist" key={cart.id}>


                            <img src={cart.image} alt={cart.name} style={{ 'maxheight': "200px" }} className='cartimg' />
                            <div className="name">
                                <div className="name1" >

                                    <h1 className='prodname'>{cart.name}</h1>
                                    <div className="cartstn">  <button className='cartsbtn'><img src={add} alt="" className='addlesscaart' style={{ 'width': '20px', 'height': '20px' }} /> </button>
                                        <h1 style={{ 'fontSize': '30px', 'marginTop': '10px', 'margin': '10px 10px' }}>1</h1>
                                        <button className='cartsbtn'><img src={remove} alt="" className='addlesscaart' style={{ 'width': '20px', 'height': '20px' }} /> </button></div>
                                    <div className="deletefav">
                                        <img src={delet} alt={delet} className='cartdel' onClick={() => HandleDelete(cart.id)} />
                                        <img src={fav} alt={fav} className='cartdel' />
                                    </div>
                                </div>


                            </div>
                            <h3 className='cartPrice'>MRP : {cart.price}</h3>
                        </div>

                    ))
                }

            </div>}





        </>
    )
}

export default Cart