import Helpers from "../utils/helpers";
import { AXIS_EXCEPTION } from "../utils/AxisExceptionEnum";

export default class Projectile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.timeLastPosition = new Date().getTime();
    this.xSpeed = this.randomSpeed();
    this.ySpeed = this.randomSpeed();
    this.size = Helpers.getRandomBetween(50, 100);
    this.color = Helpers.getRandomColor();
    this.radius = this.size / 2;
  }

  updatePosition(axisException, fixPosition) {
    const timeNewPosition = new Date().getTime();
    const frameTime = (timeNewPosition - this.timeLastPosition) / 1000;
    this.timeLastPosition = timeNewPosition;

    switch (axisException) {
      case AXIS_EXCEPTION.X:
        this.updateSpeedOnX();
        this.fixAxisPositionX(fixPosition);
        break;
      case AXIS_EXCEPTION.Y:
        this.updateSpeedOnY();
        this.fixAxisPositionY(fixPosition);
        break;
      default:
        break;
    }

    this.x += this.xSpeed * frameTime;
    this.y += this.ySpeed * frameTime - 0.5 * 9.8 * Math.pow(frameTime, 2);
  }

  fixAxisPositionX(position) {
    this.x = this.x - this.radius < 0 ? this.radius : position - this.radius;
  }

  fixAxisPositionY(position) {
    this.y = this.y - this.radius < 0 ? this.radius : position - this.radius;
  }

  updateSpeedOnX() {
    this.xSpeed -= this.xSpeed * 0.1;
    this.xSpeed = -this.xSpeed;
  }

  updateSpeedOnY() {
    this.ySpeed -= this.ySpeed * 0.1;
    this.ySpeed = -this.ySpeed;
  }

  randomSpeed() {
    const direction = !!Math.round(Math.random()) ? 1 : -1;
    return direction * Helpers.getRandomBetween(100, 1000);
  }
}
