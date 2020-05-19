import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { signin, authenticate } from '../auth'

class Signin extends Component {
    constructor() {
        super()
        this.state = {
            email: "", 
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false
        }
    }

    handleChange = (name) => (event) => {
        this.setState({ error: "" })
        this.setState({ [name]: event.target.value })
    }

    clickSubmit = (event) => {
        event.preventDefault()
        this.setState({ loading: true })
        const { email, password } = this.state
        const user = {
            email, 
            password
        }
        this.signin(user)
        .then(data => {
            if (data.error) this.setState({ 
                error: data.error, 
                loading: false
            })
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

    render() {
        if (this.state.redirectToReferer) {
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

                {this.state.loading? <div className="jumbotron text-center"> 
                    <h2>Loading...</h2>
                </div>: ""}

                {this.signinForm()}
            </div>
        )
    }
}

export default Signin