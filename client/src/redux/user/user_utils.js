
export const addRoom = (room,rooms) => {
    const roomExists = rooms.find(userRoom => userRoom._id === room._id)

    if(!roomExists) {
        return [
            ...rooms,room
        ]
    }
    return rooms
}