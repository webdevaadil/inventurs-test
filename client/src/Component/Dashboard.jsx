import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light flex-column justify-content-center">
                {/* <a class="navbar-brand" href="#">Navbar</a> */}
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse " id="navbarNav">
                    <ul class="navbar-nav flex-column" >
                        <li class="nav-item active">
                            <a class="nav-link" href="#"> <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to={"/Add-Transaction"}>Add Transaction </Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/Transaction-List">Transaction List</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to={"/login"}>login</Link>
                        </li>

                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Dashboard
