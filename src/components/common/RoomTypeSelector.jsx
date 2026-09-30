import React, { useState, useEffect } from "react"
import { getRoomTypes } from "../utils/ApiFunctions"

const FALLBACK_ROOM_TYPES = ["Standard", "Deluxe", "Suite", "Family"]

const RoomTypeSelector = ({ handleRoomInputChange, newRoom, allowCreate = false }) => {
	const [roomTypes, setRoomTypes] = useState([])
	const [loadError, setLoadError] = useState("")
	const [usingFallback, setUsingFallback] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false)
	const [newRoomType, setNewRoomType] = useState("")

	useEffect(() => {
		let isMounted = true
		getRoomTypes()
			.then((data) => {
				if (isMounted) {
					const types = Array.isArray(data) ? data.filter((type) => typeof type === "string" && type.trim()) : []
					const availableTypes = [...new Set(types.map((type) => type.trim()))]
					setRoomTypes(availableTypes.length ? availableTypes : FALLBACK_ROOM_TYPES)
					setUsingFallback(availableTypes.length === 0)
				}
			})
			.catch(() => {
				if (isMounted) {
					if (allowCreate) {
						setLoadError("Room types could not be loaded.")
					} else {
						setRoomTypes(FALLBACK_ROOM_TYPES)
						setUsingFallback(true)
					}
				}
			})
			.finally(() => {
				if (isMounted) setIsLoading(false)
			})
		return () => {
			isMounted = false
		}
	}, [allowCreate])

	const handleNewRoomTypeInputChange = (e) => {
		setNewRoomType(e.target.value)
	}
	const useDirectEntry = allowCreate && !isLoading && roomTypes.length === 0

	const handleAddNewRoomType = () => {
		const roomType = newRoomType.trim()
		if (roomType !== "") {
			if (!roomTypes.some((existingType) => existingType.toLowerCase() === roomType.toLowerCase())) {
				setRoomTypes((currentTypes) => [...currentTypes, roomType])
			}
			handleRoomInputChange({ target: { name: "roomType", value: roomType } })
			setNewRoomType("")
			setShowNewRoomTypeInput(false)
		}
	}

	return (
		<>
			<div>
				{!useDirectEntry && (
					<select
						required
						className="form-select"
						name="roomType"
						disabled={isLoading || (!allowCreate && roomTypes.length === 0)}
						onChange={(e) => {
							if (e.target.value === "__add_room_type__") {
								setShowNewRoomTypeInput(true)
								return
							}
							setShowNewRoomTypeInput(false)
							handleRoomInputChange(e)
						}}
						value={newRoom.roomType}>
						<option value="">
							{isLoading ? "Loading room types..." : loadError ? "Room types unavailable" : "Select a room type"}
						</option>
						{allowCreate && <option value="__add_room_type__">Add a room type...</option>}
						{roomTypes.map((type) => (
							<option key={type} value={type}>
								{type}
							</option>
						))}
					</select>
				)}
				{useDirectEntry && (
					<input
						required
						type="text"
						className="form-control"
						id="roomType"
						name="roomType"
						aria-label="Enter room type"
						placeholder="Enter room type"
						value={newRoom.roomType}
						onChange={handleRoomInputChange}
					/>
				)}
				{allowCreate && !useDirectEntry && showNewRoomTypeInput && (
						<div className="mt-2">
							<div className="input-group">
								<input
									type="text"
									className="form-control"
									aria-label="Enter room type"
									placeholder="Enter room type"
									value={newRoomType}
									onChange={handleNewRoomTypeInputChange}
								/>
								<button
									className="btn btn-hotel"
									type="button"
									disabled={!newRoomType.trim()}
									onClick={handleAddNewRoomType}>
									Add
								</button>
							</div>
						</div>
				)}
			</div>
			{useDirectEntry && (
				<p className="form-text text-muted mt-2 mb-0" role="status">
					{loadError ? "Room catalog unavailable. Enter a type to continue." : "No room types exist yet. Enter one to continue."}
				</p>
			)}
			{loadError && !allowCreate && (
				<p className={`form-text mt-2 mb-0 ${allowCreate ? "text-muted" : "text-danger"}`} role={allowCreate ? "status" : "alert"}>
					Room types could not be loaded. Check the hotel service connection.
				</p>
			)}
			{usingFallback && !allowCreate && (
				<p className="form-text text-muted mt-2 mb-0" role="status">Using common room types while the catalog is unavailable.</p>
			)}
		</>
	)
}

export default RoomTypeSelector