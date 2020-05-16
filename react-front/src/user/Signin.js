import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Signin extends Component {
    constructor() {
        super()
        this.state = {
            email: "", 
            password: "",
            error: "",
            redirectToReferer: false
        }
    }

    handleChange = (name) => (event) => {
        this.setState({ error: "" })
        this.setState({ [name]: event.target.value })
    }

    authenticate = (jwt, next) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("jwt", JSON.stringify(jwt))
            next()
        }
    }

    clickSubmit = (event) => {
        event.preventDefault()
        const { email, password } = this.state
        const user = {
            email, 
            password
        }
        this.signin(user)
        .then(data => {
            if (data.error) this.setState({ error: data.error })
            else {
                this.authenticate(data, () => {
                    this.setState({ redirectToReferer: true })
                })
            }
        })
    }

    signinForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input 
                    onChange={this.handleChange("email")} 
                    type="text" 
                    className="form-control"  
                    value={this.state.email}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input 
                    onChange={this.handleChange("password")} 
                    type="password" 
                    className="form-control"  
                    value={this.state.password}
                />
            </div>
            <button 
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Submit
            </button>
        </form>
    )

    signin = user => {
        return fetch(`${process.env.REACT_APP_API_URL}/signin`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .catch(err => console.log(err))
    }

    render() {
        if (redirectToReferer) {
            return <Redirect to="/" />
        }

        return (
            <div className="container">
                <h2 className="my-5">Signin</h2>

                <div 
                    className="alert alert-danger" 
                    style={{display: this.state.error? "" : "none"}}
                >
                    {this.state.error}
                </div>

                {this.signinForm()}
            </div>
        )
    }
}

export default Signin