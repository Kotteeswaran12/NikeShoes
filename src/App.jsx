/* eslint-disable react/prop-types */

import './App.css'

import facebook from './assets/facebook.png'
import cartimg from './assets/shopping_bag_16dp_000000_FILL0_wght400_GRAD0_opsz20.png'
import insta from './assets/insta.png'
import twite from './assets/twitter.png'
import black from './assets/favorite_24dp_000000.png'
import searchicon from './assets/search_16dp_000000.png'
import favicon from './assets/favorite_border_16dp_000000.png'
import { useEffect, useState } from 'react'

import axios from 'axios'
import AutoSlide from '../component/AutoSlide'
import bdname from './assets/name-nike-removebg-preview.png'
import Cart from '../component/Cart'

import banner2 from './assets/banner2.webp'
import banner3 from './assets/banner3.webp'
import banner4 from './assets/banner4.webp'
import Login from '../component/Login'


function App() {
  const [shoes, setShoes] = useState([])
  const [cartSatus , setCartSatus]=useState(false)
  const [Hoverimg, setHoverimg] = useState({})
  const [cartItem, setCartItem] = useState([])
  const [loginSatus, setLoginSatus] = useState()
  const [viewCart, setViewCart] = useState(false);
  const [login , setLogin]=useState(false);
  const [searchView , setSearchView] = useState(false)
 
const [searchList , setSearchList]=useState([])
  const handleFocus=() => setSearchView(true);
  const handleBlur =()=> setSearchView(false)
  useEffect(() => {
    const fetchshoe = async () => {
      try {
        let link = await axios.get("http://localhost:8080/products");

        setShoes(link.data);
      
      }
      catch (error) {
        console.log("unable to fetchShoes data" + error)
      }

    }
    const cartlist = async () => {
      try {
        const carturl = await axios.get("http://localhost:8080/cart")
        setCartItem(carturl.data)
      } catch (error) {
        console.log(error)
      }


    }



    cartlist()
    fetchshoe();
   
  }, [cartItem])
  const additemtocart = async (name, price, img) => {


    try {
      let post = await axios.post("http://localhost:8080/carts", { name: name, price: price, image: img }, {
        headers: {
          "Content-Type": "application/json"
        },
      })
      setCartItem((cartItem) => [...cartItem, post.data])

    } catch (error) {
      console.log(error)
    }
    console.log(cartItem)
  }





  const updatemethod = async (id, name, price, image, fav, rating) => {


    await axios.put("http://localhost:8080/products", {
      id, name, price, image, fav: fav ? "false" : "true", rating

    }, {
      headers: {
        "Content-Type": "application/JSON"
      }
    })

    console.log(id, name, price, image, fav, rating);
  }

  const Handlescrool = (selectionId) => {
    var element = document.getElementById(selectionId)

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }

  }

const handleChange=async(event)=>{
 
  if(event.key == 'Enter'){
    const slist=await axios.get(`http://localhost:8080/products/search?keyword=${event.target.value}`);
setSearchList(slist.data);
  }
 
}

  return (
    <>
      <div className="header">

        <img src={bdname} alt="" className='logo' />

        <ul>
        
          <li >
          <img src={searchicon} alt="" className='searchIcon'  />
            <input type="text" className='search' placeholder='Search' onFocus={handleFocus} onBlur={handleBlur} onKeyDown={handleChange} onChange={ handleChange} ></input>
          </li>

          <li onClick={() =>{ setViewCart(true); setCartSatus(true)}}><img src={cartimg} /> {cartItem.length === 0 ? "" : <span className='cartList'>{cartItem.length}</span>}</li>
          <li onClick={()=>login? setLogin(false): setLogin(true)}> <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="black">
    <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>
  </svg></li>

        </ul>
      </div>
     { searchView &&  <div className="SearchMain">
      <div className={`SearchList ${searchView? "": 'no'}`}>
        { searchList.length === 0 ?<h1 className='noItem'>No Item Found</h1>: ""}
        {
          searchList.map((search)=>(
             <div className="searchItem" key={search.id}>
          <img src={search.image} alt="palceHolder" className='searchimg'/>
          <h1>{search.name}</h1>
          <h4>RS :{search.price}</h4>
        </div>
          ))
        }
       
      </div>
      </div>}


      {viewCart && <Cart cartItem={cartItem} viewCart={viewCart} setViewCart={setViewCart} setLogin={setLogin} cartSatus={cartSatus} setCartSatus={setCartSatus} setLoginSatus={setLoginSatus} loginSatus={loginSatus}/>}
      <div className="banner">
        <div className={`details${login? "-login" : ''}`}>
          <h4>Mens Fashion </h4>
          <h1>Branded Shoes</h1>
          <h3>Make your Move Memorable</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio sint accusamus sed vero nostrum, id doloribus optio quibusdam error reiciendis, porro culpa molestiae quasi commodi similique omnis. Possimus, ipsam. Ea dolorem ad atque incidunt, dolorum, sunt repellat architecto placeat unde maxime vitae. Consectetur ad reiciendis, repellat dolorum quibusdam totam iste.</p>
          <button className='detailsbtn' onClick={() => Handlescrool('products')}>Shop Now &gt;</button>
        </div>


        <div className="content">
          <div className={`dot${login? '-login':''}`}></div>
          <img src="https://i.ibb.co/b5Y5pXS/nike-sb-dunk-removebg-preview.png" alt="" className={`Bannerimg${login?"-login":' '}`}/>
          {/* {
            bannerimg && (
             

            )
          } */}


        </div>

          {
            login? <Login setLogin={setLogin} setLoginSatus={setLoginSatus} loginSatus={loginSatus}/>: ""
          }

      </div>

      <AutoSlide shoes={shoes} cartItem={cartItem} additemtocart={additemtocart} updatemethod={updatemethod} />


      <div className="newlyarrived" >
        <h1 className="arrivedtxt" id='products'>Newly Arrieved </h1>
        <img src={banner2} alt="" />
        <img src={banner3} alt="" />
        <img src={banner4} alt="" />
      </div>

      <div className={`container `}>
        <div className="div" >

          {
            shoes && shoes.map((shoes) => (
              <div className="item" key={shoes.id} >

                <img src={
                  Hoverimg[shoes.id] || shoes.image[0]
                } alt="" className='prod' />

                <div className="prodD">

                  <p className='productname'>{shoes.name} </p>
                  <p className='price'>RS:{shoes.price} </p>
                  <p style={{'marginBottom':'5px'}}>{shoes.image.length} colours</p>
                  <button onClick={() => additemtocart(shoes.name, shoes.price, shoes.image, shoes.fav)} className='addtocart'>Add to Bag</button>
                </div>
                {/* <div className="lsimg">
                  <ul style={{'listStyle':'none'}}>
                    <li onMouseEnter={()=>setHoverimg({...Hoverimg, [shoes.image] : image})}><img src={shoes.image} alt="" className='limg'/></li>
                    <li onMouseEnter={()=>setHoverimg({...Hoverimg, [shoes.image] : image})}><img src={shoes.image[1]} alt="" className='limg'/></li>
                    <li onMouseEnter={()=>setHoverimg({...Hoverimg, [shoes.image] : image})}><img src={shoes.image[1]} alt="" className='limg'/></li>
                    
                  </ul>
                </div> */}
                <div className="lsimg">
                  <ul style={{ listStyle: 'none' }}>
                    {shoes.image.map((imgurl, index) => (
                      <li
                        key={index}
                        onMouseEnter={() => setHoverimg({ ...Hoverimg, [shoes.id]: imgurl })}
                       >
                        <img src={imgurl} alt={`Thumbnail ${index}`} className="limg" />
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  {shoes.fav ? "" : <img src={favicon} alt="" className='fav' onClick={() => updatemethod(shoes.id, shoes.name, shoes.price, shoes.image, shoes.fav, shoes.rating)} />}
                  {shoes.fav && <img src={black} alt="" className='fav' onClick={() => updatemethod(shoes.id, shoes.name, shoes.price, shoes.image, shoes.fav, shoes.rating)} />}
                </div>

              </div>
            ))
          }
        </div>

      </div>
      <div className="f" id='footer'>

        <div className="footer">
          <div className="logos">
            <h3> Nike</h3>
            <div className="abc" >

              <img src={facebook} alt=""className='socialmedia' />
              <img src={insta} alt="" className='socialmedia' />
              <img src={twite} alt="" className='socialmedia' />
            </div>

          </div>
          <div className="condition">
            <ul>
              <li>Products </li>
              <li>overlayer</li>
              <li>features</li>
              <li>solutions</li>
              <li>Tutorials</li>
              <li>pricing</li>
              <li>releases</li>
            </ul>
          </div>
          <div className="condition">
            <ul>
              <li>Products </li>
              <li>overlayer</li>
              <li>features</li>
              <li>solutions</li>
              <li>Tutorials</li>
              <li>pricing</li>
              <li>releases</li>
            </ul>
          </div>

        </div>
        <div className="copyright">
          <div className="first">
            <h3>Make your Move Memorable</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam, inventore.</p>
          </div>
          <div className="last">
            <p>&copy; 2024 Nike</p>
          </div>
        </div>

      </div>

    </>
  )
}

export default App
