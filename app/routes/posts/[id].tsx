import { createRoute } from 'honox/factory'

export default createRoute(c => {
  const id = c.req.param('id')
  return c.render(
    <div>
      <title>Post {id}</title>
      <h1>Post ID: {id}</h1>
    </div>,
  )
})
