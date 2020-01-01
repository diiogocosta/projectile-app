<template>
  <div id="canvas">
    <h1>{{ title }}</h1>
    <canvas id="canvas-field" width="1000" height="600" @click="launchNewProjectile($event)"></canvas>
  </div>
</template>

<script>
import { Projectile, Field } from "../models";

export default {
  data() {
    return {
      title: "Projectile App",
      field: null
    };
  },
  mounted() {
    /**
     * Vue component that wrap canvas element to renderer projectiles in a field.
     * Html canvas.
     * canvas context.
     * field - Object has all business logic about the field.
     */
    /**
     * Represents a xxx.
     * @constructor
     */
    let c = document.getElementById("canvas-field");
    let ctx = c.getContext("2d");
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    this.field = new Field(600, 1000, ctx);
  },
  methods: {
    launchNewProjectile(event) {
      let projectile = new Projectile(event.offsetX, event.offsetY);
      this.field.addProjectile(projectile);
    }
  }
};
</script>

<style lang="scss">
body {
  background: #e2e1e0;
}

#canvas {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#canvas-field {
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
}
</style>
