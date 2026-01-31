import { useState } from 'hono/jsx'

export default function PostLike() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p>Likes:{count}</p>
      <button type='button' onClick={() => setCount(count + 1)}>
        Like
      </button>
    </div>
  )
}
