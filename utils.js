export const players = (io, room) => {
  if(io.sockets.adapter.rooms.has(room)) return io.sockets.adapter.rooms.get(room).size
  return 'not found';
}