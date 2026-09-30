import { Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

const Footer = () => {
	const today = new Date()
	return (
		<footer className="footer mt-auto">
			<Container>
				<Row className="align-items-center gy-2">
					<Col xs={12} md={6} className="text-center text-md-start">
						<p>&copy; {today.getFullYear()} Lakeside Hotel</p>
					</Col>
					<Col xs={12} md={6}>
						<nav className="footer-links" aria-label="Footer navigation">
							<Link to="/browse-all-rooms">Rooms</Link>
							<Link to="/find-booking">Find a booking</Link>
						</nav>
					</Col>
				</Row>
			</Container>
		</footer>
	)
}

export default Footer