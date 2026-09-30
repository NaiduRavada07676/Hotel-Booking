import { useCallback, useState } from "react"
import jwt_decode from "jwt-decode"
import { AuthContext } from "./AuthContext"

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(() => {
		const token = localStorage.getItem("token")
		if (!token) return null

		try {
			const decodedUser = jwt_decode(token)
			if (decodedUser.exp && decodedUser.exp * 1000 <= Date.now()) {
				throw new Error("Session expired")
			}
			return decodedUser
		} catch {
			localStorage.removeItem("userId")
			localStorage.removeItem("userRole")
			localStorage.removeItem("token")
			return null
		}
	})

	const handleLogin = useCallback((token) => {
		const decodedUser = jwt_decode(token)
		localStorage.setItem("userId", decodedUser.sub)
		localStorage.setItem("userRole", decodedUser.roles)
		localStorage.setItem("token", token)
		setUser(decodedUser)
	}, [])

	const handleLogout = useCallback(() => {
		localStorage.removeItem("userId")
		localStorage.removeItem("userRole")
		localStorage.removeItem("token")
		setUser(null)
	}, [])

	return (
		<AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
			{children}
		</AuthContext.Provider>
	)
}


