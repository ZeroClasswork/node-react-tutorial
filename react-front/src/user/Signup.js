import React, { Component } from 'react'
import { signup } from '../auth'

class Signup extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            email: "", 
            password: "",
            error: "",
            open: false
        }
    }

    handleChange = (name) => (event) => {
        this.setState({ error: "" })
        this.setState({ [name]: event.target.value })
    }

    clickSubmit = (event) => {
        event.preventDefault()
        const { name, email, password } = this.state
        const user = {
            name, 
            email, 
            password
        }
        this.signup(user)
        .then(data => {
            if (data.error) this.setState({ error: data.error })
            else this.setState({
                error: "",
                name: "",
                email: "",
                password: "",
                open: true
            })
        })
    }

    signupForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input 
                    onChange={this.handleChange("name")} 
                    type="text" 
                    className="form-control" 
                    value={this.state.name}
                />
            </div>
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
        return (
            <div className="container">
                <h2 className="my-5">Signup</h2>

                <div 
                    className="alert alert-danger" 
                    style={{display: this.state.error? "" : "none"}}
                >
                    {this.state.error}
                </div>

                <div 
                    className="alert alert-success" 
                    style={{display: this.state.open? "" : "none"}}
                >
                    Account created successfully! Please login.
                </div>

                {this.signupForm()}
            </div>
        )
    }
}

export default Signup