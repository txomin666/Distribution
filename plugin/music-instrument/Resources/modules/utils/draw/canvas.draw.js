export class CanvasDraw {
    /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas: HTMLCanvasElement) {
    /**
     * Current canvas
     * @type {HTMLCanvasElement}
     */
    this.canvas = canvas

    /**
     * Context to draw on
     * @type {CanvasRenderingContext2D}
     */
    this.context = this.canvas.getContext('2d')
  }

  /**
   * Creates even position to avoid blur effect on lines.
   *
   * @param   {number} pos
   * @returns {number}
   */
  fixPosition(pos) {
    pos = Math.round(pos)
    if (0 === pos % 2) {
        pos += 1
    }

    return pos
  }

  /**
   * Set shadow option for context
   *
   * @param {number} offsetX
   * @param {number} offsetY
   * @param {number} blur
   * @param {string} color
   */
  setContextShadow(offsetX, offsetY, blur, color) {
    this.context.shadowOffsetX = offsetX
    this.context.shadowOffsetY = offsetY
    this.context.shadowBlur    = blur
    this.context.shadowColor   = color
  }

  /**
   *
   * @param {string|CanvasGradient} color
   */
  fillContext(color) {
    this.context.fillStyle = color
    this.context.fill()
  }

  /**
   *
   * @param {string|CanvasGradient} color
   * @param {number} lineWidth
   */
  strokeContext(color, lineWidth) {
    this.context.strokeStyle = color
    this.context.lineWidth   = lineWidth
    this.context.stroke()
  }
}
