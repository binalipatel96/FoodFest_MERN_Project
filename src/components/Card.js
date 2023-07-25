import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {

    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState('');
    const handleAddToCart = async () => {

        let food = [];
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, quantity: quantity })
                return
            }
            else if (food.size !== size) {
                await dispatch({
                    type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice,
                    quantity: quantity, size: size, img: props.foodItem.img
                });
                return
            }
            return
        }

        await dispatch({
            type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice,
            quantity: quantity, size: size
        });

        // console.log(data);
    }
    let finalPrice = quantity * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    return (
        <div>
            <div>
                {/* code of card from bootstrap 5 */}
                {/* style should be added as key value pair  */}
                <div className="card mt-5" style={{ "width": "18rem", "maxHeight": "400px" }}>
                    <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "200px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title ms-3">{props.foodItem.name}</h5>

                        <div className='container w-100'>
                            {/* Code for selecting the quantity */}
                            <select className='m-2 h-100 rounded' onChange={(e) => setQuantity(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>
                            <select className='m-2 h-100 rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                                {priceOptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })}
                            </select>
                            {/* display the total price */}
                            <div className='d-inline h-100 fs-5 ms-2'>
                                ${finalPrice}
                            </div>
                            <hr></hr>
                            <button className={`btn bg-success justify-center text-white ms-2`} onClick={handleAddToCart}>Add to Cart</button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}
