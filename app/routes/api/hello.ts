import { createRoute } from 'honox/factory'

export default createRoute(c => {
  return c.json({
    message: 'Hello, Honox!',
    timestamp: new Date().toISOString(),
  })
})
