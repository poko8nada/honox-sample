import { createRoute } from 'honox/factory'
import PostLike from './$post-like'

export default createRoute(c => {
  const id = c.req.param('id')
  return c.render(
    <div>
      <title>Post {id}</title>
      <h1>Post ID: {id}</h1>
      <PostLike />
    </div>,
  )
})
