import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {

    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
    let navigate = useNavigate()

    //synthetic event 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name, email: credentials.email, password: credentials.password,
                location: credentials.geolocation
            })
        });
        const json = await response.json();
        // console.log(json);
        if (json.success) {
            navigate("/login");
        }
        if (!json.success) {
            alert("Enter Valid Credentials");
        }
    }

    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    return (
        <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', opacity: '90%', backgroundSize: 'cover',height: '100vh' }}>
            <div>
                <Navbar />
            </div>
            <div className='container'>
                {/* on submitting the form handleSubmit function will be called */}
                <form className='w-50 m-auto mt-5 border p-5 text-white rounded' style={{backgroundColor: '#363535'}} onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} id="address" />
                    </div>
                    <button type="submit" to="/login" className="m-3 btn btn-success">SIGN UP</button>
                    <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
                </form>
            </div>
        </div>
    )
}

