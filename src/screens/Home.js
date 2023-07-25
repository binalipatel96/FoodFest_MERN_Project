import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home() {

  const [search, setSearch] = useState('');
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCategory(response[1]);
    // console.log(response[0], response[1]);
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      <div> <Navbar /> </div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          {/* style={{objectFit: "contain !important"}} */}
          <div className="carousel-inner" id='carousel'>
            <div className='carousel-caption' style={{ zIndex: 10 }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search}
                  onChange={(e) => { setSearch(e.target.value) }} />
                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img src="https://source.unsplash.com/random/700×500/?pizza" className="d-block w-100" style={{ filter: "brightness(40%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/700×500/?cake" className="d-block w-100" style={{ filter: "brightness(40%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/700×500/?noodles" className="d-block w-100" style={{ filter: "brightness(40%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {
          //Using ternary operator check if foodCategory is not empty
          //If not empty then return category names and food items
          foodCategory !== [] ? foodCategory.map((data) => {
            return (
              <div className='row mb-3'>
                <div key={data.id} className='fs-3 m-3'>{data.CategoryName}</div>
                <hr />
                {foodItem !== [] ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) &&
                  item.name.toLowerCase().includes(search.toLowerCase())).map(filterItems => {
                    return (
                      <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                        {/* <Card foodName={filterItems.name}
                          options={filterItems.options[0]}
                          imgSrc={filterItems.img}>
                        </Card> */}
                        <Card
                          foodItem={filterItems}
                          options={filterItems.options[0]}>
                        </Card>
                      </div>
                    )
                  }) : <div>No Data Found</div>}
              </div>
            )
          }) : ""
        }
      </div>
      <div> <Footer /> </div>
    </div>
  )
}
