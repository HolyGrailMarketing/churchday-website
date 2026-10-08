/**
 * The motion primitives behind the homepage's touchable pieces.
 *
 * Springs, not CSS transitions, because a spring can be grabbed mid-flight and
 * re-targeted without a jump: it always continues from where it is on screen,
 * at the speed it is already going. Parameters follow Apple's designer-facing
 * pair rather than mass/stiffness/damping:
 *
 *   damping  — 1 settles without overshoot; below 1 bounces. Keep 1 unless the
 *              user's own gesture carried momentum (a flick), then ~0.85.
 *   response — roughly how long, in seconds, it takes to get there. Not a
 *              duration: settle time falls out of the physics.
 */
export type SpringConfig = { damping?: number; response?: number }

const STEP = 1 / 240 // fixed sub-step keeps the integration stable on slow frames
const REST_DELTA = 0.4 // px — below this, and slower than REST_SPEED, it has arrived
const REST_SPEED = 2

export class Spring {
  value: number
  velocity = 0
  target: number
  private damping = 1
  private response = 0.4
  private frame = 0
  private last = 0

  constructor(
    initial: number,
    private readonly onUpdate: (value: number) => void,
  ) {
    this.value = initial
    this.target = initial
  }

  get animating() {
    return this.frame !== 0
  }

  /** Re-targets from the current value and velocity — never from the old target. */
  to(target: number, config: SpringConfig & { velocity?: number } = {}) {
    this.target = target
    this.damping = config.damping ?? 1
    this.response = config.response ?? 0.4
    if (config.velocity !== undefined) this.velocity = config.velocity
    if (!this.frame) {
      this.last = performance.now()
      this.frame = requestAnimationFrame(this.tick)
    }
  }

  /** Puts the value somewhere directly, as a drag does. Stops any motion. */
  set(value: number) {
    this.stop()
    this.value = value
    this.target = value
    this.velocity = 0
    this.onUpdate(value)
  }

  stop() {
    if (this.frame) cancelAnimationFrame(this.frame)
    this.frame = 0
  }

  private tick = (now: number) => {
    // Clamp so a backgrounded tab doesn't come back and integrate a whole second.
    let dt = Math.min((now - this.last) / 1000, 1 / 20)
    this.last = now

    const stiffness = (2 * Math.PI / this.response) ** 2
    const friction = (4 * Math.PI * this.damping) / this.response
    while (dt > 0) {
      const h = Math.min(STEP, dt)
      const accel = -stiffness * (this.value - this.target) - friction * this.velocity
      this.velocity += accel * h
      this.value += this.velocity * h
      dt -= h
    }

    if (Math.abs(this.velocity) < REST_SPEED && Math.abs(this.value - this.target) < REST_DELTA) {
      this.value = this.target
      this.velocity = 0
      this.frame = 0
      this.onUpdate(this.value)
      return
    }

    this.onUpdate(this.value)
    this.frame = requestAnimationFrame(this.tick)
  }
}

/**
 * Where a flick would come to rest if left alone — Apple's projection from the
 * Designing Fluid Interfaces sample code. 0.998 is scroll-view feel; lower
 * values throw a shorter distance.
 */
export function project(velocity: number, decelerationRate = 0.998) {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate)
}

/** Progressive resistance past an edge: the further you pull, the less it follows. */
export function rubberband(overshoot: number, dimension: number, constant = 0.55) {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot))
}

/** px/s from the last ~100ms of pointer samples. */
export function velocityFrom(samples: { x: number; t: number }[]) {
  const latest = samples[samples.length - 1]
  if (!latest) return 0
  let oldest = latest
  for (let i = samples.length - 1; i >= 0; i--) {
    if (latest.t - samples[i].t > 100) break
    oldest = samples[i]
  }
  const dt = latest.t - oldest.t
  return dt > 0 ? ((latest.x - oldest.x) / dt) * 1000 : 0
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
