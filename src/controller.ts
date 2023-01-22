import { mouse, left, right, up, down } from '@nut-tree/nut-js'
import { drawCircle } from './drawing/circle'
import { drawRectangular } from './drawing/rectangle'
import { drawSquare } from './drawing/square'
import { parseData } from './utils/parseData'

export async function controller(data: string, ws: any) {
  const parsedData = parseData(data)
  const [direction, offset, figureLength] = parsedData
  switch (direction) {
    case 'mouse_up':
      await mouse.move(up(+offset))
      ws.send(direction)
      break
    case 'mouse_right':
      await mouse.move(right(+offset))
      ws.send(direction)
      break
    case 'mouse_left':
      await mouse.move(left(+offset))
      ws.send(direction)
      break
    case 'mouse_down':
      await mouse.move(down(+offset))
      ws.send(direction)
      break
    case 'mouse_position':
      const position = await mouse.getPosition()
      ws.send(`mouse_position ${position.x},${position.y}`)
      break
    case 'draw_square':
      await drawSquare(+offset)
      ws.send(direction)
      break
    case 'draw_rectangle':
      await drawRectangular(+offset, +figureLength)
      ws.send(direction)
      break
    case 'draw_circle':
      await drawCircle(+offset)
      ws.send(direction)
      break

    default:
      console.log('Unknown command')
      break
  }
}
