import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {

    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        await fetch("http://localhost:5000/api/myOrderData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response)
        })



        // await res.map((data)=>{
        //    console.log(data)
        // })


    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <div className='row'>

                    {orderData !== {} ? Array(orderData).map(data => {
                        return (
                            //reverse is used here because we want to show the latest order first
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div  >
                                                    {arrayData.order_date ? <div className='m-auto mt-5'>

                                                        {data = arrayData.order_date}
                                                        <hr />
                                                    </div> :
                                                        <div className='row row-cols-1 row-cols-md-3 mb-4'>
                                                            {/* <div className='col-12 col-md-6 col-lg-3' > */}
                                                                <div className='col'>
                                                                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                        <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "160px", objectFit: "fill" }} />
                                                                        <div className="card-body mb-3">
                                                                            <h5 className="card-title">{arrayData.name}</h5>
                                                                            <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                                <span>Quantuty/Size: {arrayData.quantity}</span>
                                                                                <span>{arrayData.size}</span><br></br>
                                                                                {/* <span className='m-1'>{data}</span> */}
                                                                                <div className=' d-inline mb-2 h-100 w-20 fs-5' >
                                                                                    Price: ${arrayData.price}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    {/* </div> */}
                                                                </div>
                                                            </div>

                                                        </div>



                                                    }

                                                </div>
                                            )
                                        })

                                    )
                                }) : ""
                        )
                    }) : ""}
                </div>


            </div>

            <Footer />
        </div>
    )
}