import { AXIS_EXCEPTION } from "../utils/AxisExceptionEnum";

export default class Field {
  /**
   * Create a new Book.
   * @class
   * @param {string} title - The title of the book.
   */
  constructor(height, width, canvasContext) {
    this.height = height;
    this.width = width;
    this.projectiles = [];
    this.ctx = canvasContext;

    this.rendererField();
  }

  addProjectile(projectile) {
    this.projectiles.push(projectile);
  }

  rendererField() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.projectiles.map(projectile => {
      this.ctx.strokeStyle = projectile.color;
      this.ctx.lineWidth = projectile.size;
      this.ctx.beginPath();
      this.ctx.moveTo(projectile.x, projectile.y);
      this.ctx.lineTo(projectile.x, projectile.y);
      this.ctx.stroke();

      const axisException = this.hasMarginsException(projectile);
      const fixPosition =
        axisException === AXIS_EXCEPTION.X ? this.width : this.height;
      projectile.updatePosition(axisException, fixPosition);
    });

    requestAnimationFrame(this.rendererField.bind(this));
  }

  hasMarginsException(projectile) {
    const xWithRadius = projectile.x + projectile.radius;
    const yWithRadius = projectile.y + projectile.radius;
    const xWithoutRadius = projectile.x - projectile.radius;
    const yWithoutRadius = projectile.y - projectile.radius;

    if (xWithRadius >= this.width || xWithoutRadius <= 0) {
      return AXIS_EXCEPTION.X;
    }

    if (yWithRadius >= this.height || yWithoutRadius <= 0) {
      return AXIS_EXCEPTION.Y;
    }

    return AXIS_EXCEPTION.NO_EXCEPTION;
  }
}
