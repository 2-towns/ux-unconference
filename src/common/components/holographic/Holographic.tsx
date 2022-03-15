import React, { createRef } from 'react'
import init from './animation/init.js'

const HolographicAnimation = React.memo(() => {
  const ref = React.useRef<any>()

  React.useEffect(() => {
    const stop = init(ref.current)

    return stop
  })

  return <div ref={ref} id="#canvas-container"></div>
})

HolographicAnimation.displayName = 'HolographicAnimation'

export default HolographicAnimation
