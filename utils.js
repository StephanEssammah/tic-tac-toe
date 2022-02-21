export const players = (io, room) => {
  if(io.sockets.adapter.rooms.has(room)) return io.sockets.adapter.rooms.get(room).size
  return 'not found';
}

export const checkForWin = (array, symbol) => {
  const positions = [];
  array.forEach((number, index) => {
    if(number === symbol) {
      positions.push(index)
    }
  })

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  let win = false

  winningConditions.forEach(condition => {
    if(condition.every(number => positions.includes(number))) win = true
  })
  
  return win;
}

export const checkForFullBoard = (array) => !array.includes('')
