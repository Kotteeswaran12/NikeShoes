
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



function App() {
  const [shoes, setShoes] = useState([])
  const [bannerimg, setBannerimg] = useState(null)

  const [Hoverimg, setHoverimg] = useState({})
  const [cartItem, setCartItem] = useState([])

  const [viewCart, setViewCart] = useState(false)

  const [Shoesimg, setShoesimg] = useState([])

  useEffect(() => {
    const fetchshoe = async () => {
      try {
        let link = await axios.get("http://localhost:8080/products");

        setShoes(link.data);
        // confirm.log(link.data.image)
        // console.log(link.data)
      }
      catch (error) {
        console.log("unable to fetchShoes data" + error)
      }

    }
    const thumblineImg = async () => {
      try {
        let url = await axios.get(`http://localhost:8080/products/14 `);
        setBannerimg(url.data);
      }
      catch (error) {
        console.log("Unable to fetch Banner url " + error)
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
    thumblineImg();
  }, [cartItem])

  useEffect(() => {
    if (bannerimg) {
      console.log("banner img update successfully", bannerimg.image)
    } else {
      console.log("unamble to update banner img")
    }

  }, [])

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


  return (
    <>
      <div className="header">

        <img src={bdname} alt="" className='logo' />

        <ul>

          <li ><img src={searchicon} alt="" style={{
            'width': '35px', 'background-color': 'rgb(209, 204, 192)', 'padding': '3px', 'borderRadius': '50%', 'position': 'absolute'
          }} /><input type="text" className='search' placeholder='               Search' ></input></li>

          <li onClick={() => setViewCart(true)}><img src={cartimg} /> {cartItem.length === 0 ? "" : <span className='cartList'>{cartItem.length}</span>}</li>
          <li><img src={favicon} alt="" className='fav' /></li>

        </ul>
      </div>


      {viewCart && <Cart cartItem={cartItem} viewCart={viewCart} setViewCart={setViewCart} />}
      <div className="banner">
        <div className="details">
          <h4>Mens Fashion </h4>
          <h1>Branded Shoes</h1>
          <h3>Make your Move Memorable</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio sint accusamus sed vero nostrum, id doloribus optio quibusdam error reiciendis, porro culpa molestiae quasi commodi similique omnis. Possimus, ipsam. Ea dolorem ad atque incidunt, dolorum, sunt repellat architecto placeat unde maxime vitae. Consectetur ad reiciendis, repellat dolorum quibusdam totam iste.</p>
          <button className='detailsbtn' onClick={() => Handlescrool('products')}>Shop Now &gt;</button>
        </div>


        <div className="content">
          <div className="dot"></div>
          {
            bannerimg && (
              <img src={bannerimg.image} alt="" key={bannerimg.id} />

            )
          }


        </div>
      </div>

      <AutoSlide shoes={shoes} cartItem={cartItem} additemtocart={additemtocart} updatemethod={updatemethod} />


      <div className="offertext" >
        <h1 className="text" id='products'>Newly Arrieved </h1>
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
            <div className="logo">

              <img src={facebook} alt="" />
              <img src={insta} alt="" />
              <img src={twite} alt="" />
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
