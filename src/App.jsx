import { lazy, Suspense } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import NavBar from "./components/layout/NavBar"
import Footer from "./components/layout/Footer"
import { AuthProvider } from "./components/auth/AuthProvider"
import RequireAuth from "./components/auth/RequireAuth"
import { LogoutRoute } from "./components/auth/Logout"

const ExistingRooms = lazy(() => import("./components/room/ExistingRooms"))
const Home = lazy(() => import("./components/home/Home"))
const EditRoom = lazy(() => import("./components/room/EditRoom"))
const AddRoom = lazy(() => import("./components/room/AddRoom"))
const RoomListing = lazy(() => import("./components/room/RoomListing"))
const Admin = lazy(() => import("./components/admin/Admin"))
const Checkout = lazy(() => import("./components/booking/Checkout"))
const BookingSuccess = lazy(() => import("./components/booking/BookingSuccess"))
const Bookings = lazy(() => import("./components/booking/Bookings"))
const FindBooking = lazy(() => import("./components/booking/FindBooking"))
const Login = lazy(() => import("./components/auth/Login"))
const Registration = lazy(() => import("./components/auth/Registration"))
const Profile = lazy(() => import("./components/auth/Profile"))

function App() {
	return (
		<AuthProvider>
			<Router>
				<main>
					<NavBar />
					<Suspense fallback={<div className="container py-5" role="status">Loading page...</div>}>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/edit-room/:roomId" element={<EditRoom />} />
							<Route path="/existing-rooms" element={<ExistingRooms />} />
							<Route path="/add-room" element={<AddRoom />} />
							<Route
								path="/book-room/:roomId"
								element={
									<RequireAuth>
										<Checkout />
									</RequireAuth>
								}
							/>
							<Route path="/browse-all-rooms" element={<RoomListing />} />
							<Route path="/admin" element={<Admin />} />
							<Route path="/booking-success" element={<BookingSuccess />} />
							<Route path="/existing-bookings" element={<Bookings />} />
							<Route path="/find-booking" element={<FindBooking />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Registration />} />
							<Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
							<Route path="/logout" element={<LogoutRoute />} />
							<Route path="*" element={<Navigate to="/" replace />} />
						</Routes>
					</Suspense>
				</main>
					<Footer />
				</Router>
		</AuthProvider>
	)
}

export default App
