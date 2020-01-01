import { Field, Projectile } from "../";
import { AXIS_EXCEPTION } from "../../utils/AxisExceptionEnum";
import { createCanvas } from "canvas";

describe("field business logic", () => {
  const spyField = jest.spyOn(Field.prototype, "rendererField");
  const field = new Field(500, 500, createCanvas(500, 500).getContext("2d"));

  it("after created field need to call the renderer method", () => {
    expect(spyField).toBeCalled();
  });

  it("on new instance of field the projectiles on field need to be []", () => {
    expect(field.projectiles).toStrictEqual([]);
  });

  it("add projectile on field need to up projectiles by 1 and call updatePosition of projectile after renderer", () => {
    const projectile = new Projectile(10, 10);
    const spyProjectile = jest.spyOn(projectile, "updatePosition");
    field.addProjectile(projectile);
    field.rendererField();

    expect(field.projectiles.length).toBe(1);
    expect(spyProjectile).toBeCalled();
  });

  it("method hasMarginsException need to return correctly AXIS_EXCEPTION when exceed margins", () => {
    const projectile = new Projectile(10, 10);
    projectile.x = 999;
    field.rendererField();

    expect(field.hasMarginsException(projectile)).toBe(AXIS_EXCEPTION.X);

    projectile.y = 999;
    projectile.x = 100;
    field.rendererField();

    expect(field.hasMarginsException(projectile)).toBe(AXIS_EXCEPTION.Y);

    projectile.x = 100;
    projectile.y = 100;
    field.rendererField();

    expect(field.hasMarginsException(projectile)).toBe(
      AXIS_EXCEPTION.NO_EXCEPTION
    );
  });
});
