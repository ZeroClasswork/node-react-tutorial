import React from 'react'
import { Link, withRouter } from "react-router-dom"
import { isAuthenticated, signout } from '../auth'

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return {
            backgroundColor: "#000000",
            color: "#dddddd",
            border: 0,
            flex: 1
        }
    }
    else {
        return {
            backgroundColor: "#222222",
            color: "#dddddd",
            border: 0,
            flex: 1
        }
    }
}

const Menu = ({history}) => (
    <ul 
        className="nav nav-tabs" 
        style={{
            backgroundColor: "#222222",
            display: "flex"
        }}
    >
        <li 
            className="nav-item"
            style={{
                display: "flex",
                flex: 1
            }}
        >
            <Link 
                style={isActive(history, "/")}
                className="nav-link" 
                to="/"
            >
                Home
            </Link>
        </li>
        {!isAuthenticated() && (
            <>
            <li 
                className="nav-item"
                style={{
                    display: "flex",
                    flex: 1
                }}
            >
                <Link 
                    style={isActive(history, "/signin")}
                    className="nav-link" 
                    to="/signin"
                >
                    Sign In
                </Link>
            </li>
            <li 
                className="nav-item"
                style={{
                    display: "flex",
                    flex: 1
                }}
            >
                <Link 
                    style={isActive(history, "/signup")}
                    className="nav-link" 
                    to="/signup"
                >
                    Sign Up
                </Link>
            </li>
            </>
        )}
        {isAuthenticated() &&
            <>
                <li 
                    className="nav-item"
                    style={{
                        display: "flex",
                        flex: 1
                    }}
                >
                    <Link 
                        style={isActive(history, "/signup")}
                        className="nav-link" 
                        onClick={() => {
                            signout(() => history.push('/'))
                        }}
                    >
                        Sign Out
                    </Link>
                </li>
                <li 
                    className="nav-item"
                    style={{
                        display: "flex",
                        flex: 1
                    }}
                >
                    <Link 
                        style={isActive(history, "/signup")}
                        className="nav-link" 
                    >
                        {isAuthenticated().user.name}
                    </Link>
                </li>
            </>
        }
    </ul>
)

export default withRouter(Menu)