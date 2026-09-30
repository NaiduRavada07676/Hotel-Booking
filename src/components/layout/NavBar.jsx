import { useEffect, useState } from "react"
import { NavLink, Link, useLocation } from "react-router-dom"
import Logout from "../auth/Logout"


const NavBar = () => {
	const [showNavigation, setShowNavigation] = useState(false)
	const [showAccount, setShowAccount] = useState(false)
	const location = useLocation()

	useEffect(() => {
		setShowNavigation(false)
		setShowAccount(false)
	}, [location.pathname])

	const isLoggedIn = Boolean(localStorage.getItem("token"))
	const userRole = localStorage.getItem("userRole")

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-white px-3 px-lg-5 shadow-sm sticky-top">
			<div className="container-fluid">
				<Link to="/" className="navbar-brand">
					<span className="hotel-color">Lakeside Hotel</span>
				</Link>

				<button
					className={`navbar-toggler ${showNavigation ? "" : "collapsed"}`}
					type="button"
					onClick={() => setShowNavigation((isOpen) => !isOpen)}
					aria-controls="navbarScroll"
					aria-expanded={showNavigation}
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className={`collapse navbar-collapse ${showNavigation ? "show" : ""}`} id="navbarScroll">
					<ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
						<li className="nav-item">
							<NavLink className="nav-link" aria-current="page" to="/browse-all-rooms" onClick={() => setShowNavigation(false)}>
								Browse all rooms
							</NavLink>
						</li>

						{isLoggedIn && userRole === "ROLE_ADMIN" && (
							<li className="nav-item">
								<NavLink className="nav-link" aria-current="page" to="/admin" onClick={() => setShowNavigation(false)}>
									Admin
								</NavLink>
							</li>
						)}
					</ul>

					<ul className="d-flex navbar-nav">
						<li className="nav-item">
							<NavLink className="nav-link" to="/find-booking" onClick={() => setShowNavigation(false)}>
								Find my booking
							</NavLink>
						</li>

						<li className="nav-item dropdown">
							<button
								type="button"
								className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
								aria-expanded={showAccount}
								onClick={() => setShowAccount((isOpen) => !isOpen)}>
								Account
							</button>

							<ul
								className={`dropdown-menu ${showAccount ? "show" : ""}`}
								aria-labelledby="navbarDropdown">
								{isLoggedIn ? (
									<Logout />
								) : (
									<li>
										<Link className="dropdown-item" to="/login" onClick={() => setShowAccount(false)}>
											Login
										</Link>
									</li>
								)}
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default NavBar