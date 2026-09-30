import roomFallback from "../../assets/images/room7.jpg"

export const getRoomImageSrc = (photo) => {
	if (typeof photo !== "string" || !photo.trim()) return roomFallback
	return `data:image/jpeg;base64,${photo.trim()}`
}
