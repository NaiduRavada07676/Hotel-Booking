import React, { useEffect, useState } from "react"
import { deleteUser, getBookingsByUserId, getUser } from "../utils/ApiFunctions"
import { useNavigate } from "react-router-dom"
import moment from "moment"
import { FaUserCircle } from "react-icons/fa"
import { useAuth } from "./useAuth"

const Profile = () => {
	const [user, setUser] = useState(null)
	const [bookings, setBookings] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [errorMessage, setErrorMessage] = useState("")
	const navigate = useNavigate()
	const { handleLogout } = useAuth()

	const userId = localStorage.getItem("userId")
	const token = localStorage.getItem("token")

	useEffect(() => {
		let isMounted = true
		const fetchUser = async () => {
			try {
				const userData = await getUser(userId, token)
				if (isMounted) setUser(userData)
			} catch (error) {
				if (isMounted) setErrorMessage(error.message)
			} finally {
				if (isMounted) setIsLoading(false)
			}
		}

		fetchUser()
		return () => {
			isMounted = false
		}
	}, [userId, token])

	useEffect(() => {
		let isMounted = true
		const fetchBookings = async () => {
			try {
				const response = await getBookingsByUserId(userId, token)
				if (isMounted) setBookings(Array.isArray(response) ? response : [])
			} catch (error) {
				if (isMounted) setErrorMessage(error.message)
			}
		}

		fetchBookings()
		return () => {
			isMounted = false
		}
	}, [userId, token])

	const handleDeleteAccount = async () => {
		const confirmed = window.confirm(
			"Are you sure you want to delete your account? This action cannot be undone."
		)
		if (confirmed) {
			try {
				await deleteUser(userId)
				handleLogout()
				navigate("/", { replace: true, state: { message: "Your account has been deleted." } })
			} catch (error) {
				setErrorMessage(error.message)
			}
		}
	}

	return (
		<div className="container">
			{errorMessage && <p className="alert alert-danger" role="alert">{errorMessage}</p>}
			{isLoading ? (
				<p role="status">Loading profile...</p>
			) : user ? (
				<div className="card p-5 mt-5" style={{ backgroundColor: "whitesmoke" }}>
					<h4 className="card-title text-center">User Information</h4>
					<div className="card-body">
						<div className="col-md-10 mx-auto">
							<div className="card mb-3 shadow">
								<div className="row g-0">
									<div className="col-md-2">
										<div className="d-flex justify-content-center align-items-center mb-4">
											<FaUserCircle size={112} className="text-secondary" aria-hidden="true" />
										</div>
									</div>

									<div className="col-md-10">
										<div className="card-body">
											<div className="form-group row">
												<label className="col-md-2 col-form-label fw-bold">ID:</label>
												<div className="col-md-10">
													<p className="card-text">{user.id}</p>
												</div>
											</div>
											<hr />

											<div className="form-group row">
												<label className="col-md-2 col-form-label fw-bold">First Name:</label>
												<div className="col-md-10">
													<p className="card-text">{user.firstName}</p>
												</div>
											</div>
											<hr />

											<div className="form-group row">
												<label className="col-md-2 col-form-label fw-bold">Last Name:</label>
												<div className="col-md-10">
													<p className="card-text">{user.lastName}</p>
												</div>
											</div>
											<hr />

											<div className="form-group row">
												<label className="col-md-2 col-form-label fw-bold">Email:</label>
												<div className="col-md-10">
													<p className="card-text">{user.email}</p>
												</div>
											</div>
											<hr />

											<div className="form-group row">
												<label className="col-md-2 col-form-label fw-bold">Roles:</label>
												<div className="col-md-10">
													<ul className="list-unstyled">
														{user.roles.map((role) => (
															<li key={role.id} className="card-text">
																{role.name}
															</li>
														))}
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<h4 className="card-title text-center">Booking History</h4>

							{bookings.length > 0 ? (
								<table className="table table-bordered table-hover shadow">
									<thead>
										<tr>
											<th scope="col">Booking ID</th>
											<th scope="col">Room ID</th>
											<th scope="col">Room Type</th>
											<th scope="col">Check In Date</th>
											<th scope="col">Check Out Date</th>
											<th scope="col">Confirmation Code</th>
											<th scope="col">Status</th>
										</tr>
									</thead>
									<tbody>
										{bookings.map((booking, index) => (
											<tr key={index}>
												<td>{booking.id}</td>
												<td>{booking.room.id}</td>
												<td>{booking.room.roomType}</td>
												<td>
													{moment(booking.checkInDate).format("MMM Do, YYYY")}
												</td>
												<td>
													{moment(booking.checkOutDate).format("MMM Do, YYYY")}
												</td>
												<td>{booking.bookingConfirmationCode}</td>
												<td className="text-success">On-going</td>
											</tr>
										))}
									</tbody>
								</table>
							) : (
								<p>You have not made any bookings yet.</p>
							)}

							<div className="d-flex justify-content-center">
								<div className="mx-2">
									<button className="btn btn-danger btn-sm" onClick={handleDeleteAccount}>
										Close account
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<p role="status">No user profile could be loaded.</p>
			)}
		</div>
	)
}

export default Profile