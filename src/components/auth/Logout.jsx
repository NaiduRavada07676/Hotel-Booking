import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "./useAuth"

const Logout = () => {
	const { handleLogout: clearSession } = useAuth()
	const navigate = useNavigate()

	const handleLogout = () => {
		clearSession()
		navigate("/", { state: { message: " You have been logged out!" } })
	}

	return (
		<>
			<li>
				<Link className="dropdown-item" to={"/profile"}>
					Profile
				</Link>
			</li>
			<li>
				<hr className="dropdown-divider" />
			</li>
			<li>
				<button className="dropdown-item" onClick={handleLogout}>
					Logout
				</button>
			</li>
		</>
	)
}

export const LogoutRoute = () => {
	const { handleLogout: clearSession } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		clearSession()
		navigate("/", { replace: true, state: { message: "You have been logged out." } })
	}, [clearSession, navigate])

	return <p className="container py-5" role="status">Signing out...</p>
}

export default Logout