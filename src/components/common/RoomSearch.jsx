import React, { useState } from "react"
import { Form, Button, Row, Col, Container } from "react-bootstrap"
import moment from "moment"
import { getAvailableRooms } from "../utils/ApiFunctions"
import RoomSearchResults from "./RoomSearchResult"
import RoomTypeSelector from "./RoomTypeSelector"

const RoomSearch = () => {
	const [searchQuery, setSearchQuery] = useState({
		checkInDate: "",
		checkOutDate: "",
		roomType: ""
	})

	const [errorMessage, setErrorMessage] = useState("")
	const [availableRooms, setAvailableRooms] = useState(null)
	const [isLoading, setIsLoading] = useState(false)

	const handleSearch = async (e) => {
		e.preventDefault()
		const checkInMoment = moment(searchQuery.checkInDate)
		const checkOutMoment = moment(searchQuery.checkOutDate)
		if (!checkInMoment.isValid() || !checkOutMoment.isValid()) {
			setErrorMessage("Please enter valid dates")
			return
		}
		if (!checkOutMoment.isAfter(checkInMoment, "day")) {
			setErrorMessage("Check-out date must be after check-in date")
			return
		}
		setErrorMessage("")
		setIsLoading(true)
		try {
			const response = await getAvailableRooms(
				searchQuery.checkInDate,
				searchQuery.checkOutDate,
				searchQuery.roomType
			)
			setAvailableRooms(response.data || [])
		} catch {
			setAvailableRooms(null)
			setErrorMessage("We could not search for rooms. Check your connection and try again.")
		} finally {
			setIsLoading(false)
		}
	}

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setSearchQuery((currentQuery) => ({ ...currentQuery, [name]: value }))
		setErrorMessage("")
		setAvailableRooms(null)
	}
	const handleClearSearch = () => {
		setSearchQuery({
			checkInDate: "",
			checkOutDate: "",
			roomType: ""
		})
		setAvailableRooms(null)
	}

	return (
		<>
			<Container className="shadow mt-n5 mb-5 py-5">
				<Form onSubmit={handleSearch}>
					<Row className="justify-content-center">
						<Col xs={12} md={3}>
							<Form.Group controlId="checkInDate">
								<Form.Label>Check-in Date</Form.Label>
								<Form.Control
									type="date"
									name="checkInDate"
									value={searchQuery.checkInDate}
									onChange={handleInputChange}
									required
									min={moment().format("YYYY-MM-DD")}
								/>
							</Form.Group>
						</Col>
						<Col xs={12} md={3}>
							<Form.Group controlId="checkOutDate">
								<Form.Label>Check-out Date</Form.Label>
								<Form.Control
									type="date"
									name="checkOutDate"
									value={searchQuery.checkOutDate}
									onChange={handleInputChange}
									required
									min={searchQuery.checkInDate || moment().add(1, "day").format("YYYY-MM-DD")}
								/>
							</Form.Group>
						</Col>
						<Col xs={12} md={3}>
							<Form.Group controlId="roomType">
								<Form.Label>Room Type</Form.Label>
								<div className="d-flex">
									<RoomTypeSelector
										handleRoomInputChange={handleInputChange}
										newRoom={searchQuery}
									/>
									<Button variant="secondary" type="submit" className="ms-2" disabled={isLoading}>
										{isLoading ? "Searching..." : "Search rooms"}
									</Button>
								</div>
							</Form.Group>
						</Col>
					</Row>
				</Form>

				{isLoading && <p className="mt-4" role="status">Searching available rooms...</p>}
				{availableRooms !== null && !isLoading && (
					<RoomSearchResults results={availableRooms} onClearSearch={handleClearSearch} />
				)}
				{errorMessage && <p className="text-danger mt-3" role="alert">{errorMessage}</p>}
			</Container>
		</>
	)
}

export default RoomSearch