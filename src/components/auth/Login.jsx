import React, { useState } from "react"
import { loginUser } from "../utils/ApiFunctions"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "./useAuth"

const Login = () => {
	const [errorMessage, setErrorMessage] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [login, setLogin] = useState({
		email: "",
		password: ""
	})

	const navigate = useNavigate()
	const auth = useAuth()
	const location = useLocation()
	const redirectUrl = location.state?.path || "/"

	const handleInputChange = (e) => {
		setLogin({ ...login, [e.target.name]: e.target.value })
		setErrorMessage("")
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsSubmitting(true)
		try {
			const result = await loginUser(login)
			if (result?.token) {
				auth.handleLogin(result.token)
				navigate(redirectUrl, { replace: true })
			} else {
				setErrorMessage("Unable to sign in. Check your credentials and service connection.")
			}
		} catch {
			setErrorMessage("Unable to sign in. Check your credentials and service connection.")
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<section className="container auth-form-container mt-5 mb-5">
			{errorMessage && <p className="alert alert-danger" role="alert">{errorMessage}</p>}
			<h2>Login</h2>
			<form onSubmit={handleSubmit} aria-busy={isSubmitting}>
				<div className="row mb-3">
					<label htmlFor="email" className="col-sm-2 col-form-label">
						Email
					</label>
					<div>
						<input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							required
							className="form-control"
							value={login.email}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="row mb-3">
					<label htmlFor="password" className="col-sm-2 col-form-label">
						Password
					</label>
					<div>
						<input
							id="password"
							name="password"
							type="password"
							autoComplete="current-password"
							required
							className="form-control"
							value={login.password}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="mb-3">
					<button type="submit" className="btn btn-hotel" disabled={isSubmitting}>
						{isSubmitting ? "Signing in..." : "Login"}
					</button>
					<span className="ms-3">
						Don&apos;t have an account yet? <Link to="/register">Register</Link>
					</span>
				</div>
			</form>
		</section>
	)
}

export default Login