import { Field, Projectile } from "../";
import { createCanvas } from "canvas";
import { AXIS_EXCEPTION } from "../../utils/AxisExceptionEnum";

describe("projectile business logic", () => {
  const field = new Field(500, 500, createCanvas(200, 200).getContext("2d"));
  const projectile = new Projectile(10, 10);

  it("each time renderer is called by Field, the projectile needs to update the position", () => {
    let initialX = projectile.x;
    let initialY = projectile.y;
    const spyProjectile = jest.spyOn(projectile, "updatePosition");

    field.addProjectile(projectile);
    field.rendererField();

    expect(spyProjectile).toBeCalled();
    expect(initialX !== projectile.x).toBeTruthy();
    expect(initialY !== projectile.y).toBeTruthy();

    initialX = projectile.x;
    initialY = projectile.y;

    field.rendererField();

    expect(spyProjectile).toBeCalled();
    expect(initialX !== projectile.x).toBeTruthy();
    expect(initialY !== projectile.y).toBeTruthy();
  });

  it("when projectile exceed margins of field, reduce speed in exceeded axis and inverse direction", () => {
    const xPositiveDirection = projectile.xSpeed > 0;
    const yPositiveDirection = projectile.ySpeed > 0;

    let initialXSpeed = projectile.xSpeed;
    let initialYSpeed = projectile.ySpeed;

    let spyUpdateX = jest.spyOn(projectile, "updateSpeedOnX");
    let spyUpdateY = jest.spyOn(projectile, "updateSpeedOnY");

    projectile.updatePosition(AXIS_EXCEPTION.X, 0);

    expect(spyUpdateX).toBeCalled();
    expect(xPositiveDirection).not.toBe(projectile.xSpeed > 0);
    expect(Math.abs(projectile.xSpeed)).toBeLessThan(Math.abs(initialXSpeed));

    projectile.updatePosition(AXIS_EXCEPTION.Y, 0);

    expect(spyUpdateY).toBeCalled();
    expect(yPositiveDirection).not.toBe(projectile.ySpeed > 0);
    expect(Math.abs(projectile.ySpeed)).toBeLessThan(Math.abs(initialYSpeed));

    spyUpdateY.mockClear();
    spyUpdateX.mockClear();

    projectile.updatePosition(AXIS_EXCEPTION.NO_EXCEPTION, 0);

    expect(spyUpdateX).not.toBeCalled();
    expect(spyUpdateY).not.toBeCalled();
  });
});
