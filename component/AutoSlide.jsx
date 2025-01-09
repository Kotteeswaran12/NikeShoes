/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import "../src/Index.css"
import axios from "axios"
import { use } from "react"
import fav from '../src/assets/favorite_border_16dp_000000.png'
 import iconfav from '../src/assets/favorite_24dp_000000.png'

const AutoSlide = ({ shoes , cartItem ,additemtocart , updatemethod}) => {
    const [offershoes ,setOffershoes]=useState([])
    const [favls,setFavls]=useState(true)

    

    useEffect(() => {

        const fetch = async () => {
            try {
              let url = await axios.get("http://localhost:8080/offer")//http://localhost:8080/offer
            //   console.log(url.data)
              setOffershoes(url.data)
            }
            catch (error) {
              console.log("un able to fetch data" + error)
            }
          }
          fetch()
    }, [offershoes])
    const autofav=async(id, name, price, img, fav , rating)=>{
 
 
        await axios.put("http://localhost:8080/offer",{
          id, name, price, img, fav: fav? "false":"true" , rating
          
        },{
          headers:{
            "Content-Type" : "application/JSON"
          }
        })
    }
    return (
       <>
       <div className="offertext">
        <h1 className="text">Black Friday Sale Upto <span className="offer">50%OFF</span></h1>
       </div>
        <div className="slide" style={{
            '--width': '90vw',
            '--height': '450px',
            '--quantity': offershoes.length
        }}>
            <div className="slidelist">
                {/* <div className="offer">50% offer</div> */}
                {
                    offershoes.map((shoes) => (
                        <div className="slideitem" key={shoes.id} style={{
                            '--position': shoes.id
                        }}  >
                           {
                            shoes.fav?  "" : <img src={fav} alt="fav"style={{'width':'40px', 'height':'40px', 'position':'absolute', 'right':'10%' , 'zIndex':'1000'}} onClick={()=>{ setFavls(true);
                              autofav(shoes.id ,shoes.name , shoes.price , shoes.img , shoes.fav , shoes.rating )}}/>
                           }{
                            shoes.fav &&  <img src={iconfav} alt=""style={{'width':'40px', 'height':'40px', 'position':'absolute', 'right':'10%'}} onClick={()=>{ setFavls(false);
                              autofav(shoes.id ,shoes.name , shoes.price , shoes.img , shoes.fav , shoes.rating )}}/> 
                           }
                            <img src={shoes.img} alt="" onClick={() => additemtocart(shoes.name, shoes.price, shoes.img ,shoes.fav)} />
                            <h1 className="slidename">{shoes.name}</h1>

                        </div>
                    ))
                }
            </div>
        </div></>
    )
}

export default AutoSlide