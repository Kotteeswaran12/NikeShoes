/* eslint-disable react/prop-types */
// import { arrow } from '../src/assets/arrow_back_ios_16dp_FFFFFF_FILL0_wght400_GRAD0_opsz20.png'
import arrow from '../src/assets/arrow_back_ios_16dp_FFFFFF_FILL0_wght400_GRAD0_opsz20.png'
import applepay from '../src/assets/XMLID_34_.png'
import gpay from '../src/assets/G pay logo.png'
import visa from '../src/assets/container.png'
import bank from '../src/assets/account_balance_20dp_000 1.png'
import security from '../src/assets/Vector.png'
import './Payement.css'
const Payement = ({ setPayementStatus  , setCartItem}) => {
    const clearCart=()=>{
        setCartItem([]);
    }
    return (
        <>

            <div className="payement">
                <div className="payementmode">
                    <div className="payementArrow">
                        <img src={arrow} alt="" className='Arrow' onClick={() => setPayementStatus(false)} />
                    </div>

                    <div className="Amountoption">
                        <div className="Amounttype">
                            <h1 className='Choose' style={{
                                'fontWeight':'400'
                            }}>Choose one of the Payement options</h1>
                            <div className="apay">
                                <img src={applepay} alt="" />
                            </div>
                            <div className="apay">
                                <img src={gpay} alt="" />
                            </div>
                            <div className="visa">
                                <img src={visa} alt="" className='visaimg' />
                                <div className="payDetails">
                                    <h1 style={{
                                        'fontWeight':'520'
                                    }}>Pay by card</h1>
                                    <h3 style={{
                                        'fontWeight':'300' , 'fontSize':'1rem'
                                    }}>To pay,please Enter your VISA , mastercard or Mastero payement card information</h3>
                                </div>
                            </div>
                            <div className="visa">
                                <img src={bank} alt="" style={{
                                    'width': '20px', 'height': '20px', 'marginRight': '20px'
                                }} />
                                <div className="payDetails">
                                    <h1 style={{
                                        'fontWeight':'520'
                                    }}>Pay by card</h1>
                                    <h3 style={{
                                        'fontWeight':'300' , 'fontSize':'1rem'
                                    }}>To pay,please Enter your VISA , mastercard or Mastero payement card information</h3>
                                </div>
                            </div>
                        </div>
                        <div className="AmountDetails">
                            <div className="TotalAmount">
                                <h3 style={{
                                    'fontSize':'2rem'
                                }}>Total Price</h3>
                                <h1>RS : 50,5700</h1>
                               
                                <div className="totalDetails">
                                    
                                    <h4 style={{'fontWeight':'200'}}>Deleviry Chardges --</h4>
                                    <h4 style={{'fontWeight':'200'}}>60</h4>
                                    <h4 style={{'fontWeight':'200'}}>GST + Tax --</h4>
                                    <h4 style={{'fontWeight':'200'}}>160</h4>

                                </div>
                            </div>
                            <div className="paySecurity">
                                <img src={security} alt="" style={{
                                    'marginLeft':'40%' , 'marginBottom': '20px'
                                }} />
                                <p style={{
                                        'fontWeight':'300' , 'fontSize':'1rem'
                                    }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam odio est praesentium,!</p>
                            </div>
                            <div className="ConfirmPaybtn" onClick={()=> {alert("Confirm payment"); clearCart() ; setPayementStatus(false)}}>
                                <button style={{
                                        'fontWeight':'520' 
                                    }} >Pay Now</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Payement