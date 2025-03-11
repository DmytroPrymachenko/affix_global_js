import { particlesCursor } from "https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js";

document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Завантажуємо ефект космічного вогню...");

  const appContainer = document.getElementById("app");

  if (!appContainer) {
    console.error("❌ <div id='app'></div> ");
    return;
  }

  const pc = particlesCursor({
    el: appContainer,
    gpgpuSize: 512,
    color: 0x3a5ada,
    colors: [0x234fff, 0x445eff, 0x5a78ff],
    coordScale: 1.96,
    pointSize: 2.68,
    noiseIntensity: 0.00055,
    noiseTimeCoef: 0.0002,
    sleepRadius: 250,
    sleepRadiusY: 250,
    sleepTimeCoef: 0.0003,
    sleepTimeCoefY: 0.0002,
  });

  console.log("✨ Початкові налаштування ефекту:", pc.config);

  document.body.addEventListener("click", () => {
    const newColor = Math.random() * 0xffffff;
    const newCoordScale = 0.001 + Math.random() * 2;
    const newNoiseIntensity = 0.0001 + Math.random() * 0.001;
    const newPointSize = 1 + Math.random() * 10;

    pc.uniforms.uColor.value.set(newColor);
    pc.uniforms.uCoordScale.value = newCoordScale;
    pc.uniforms.uNoiseIntensity.value = newNoiseIntensity;
    pc.uniforms.uPointSize.value = newPointSize;

    // Логування нових параметрів
    console.log("🎨 Налаштування після кліку:");
    console.log(`🟡 Колір: #${Math.floor(newColor).toString(16)}`);
    console.log(`📏 Масштаб області: ${newCoordScale}`);
    console.log(`🔊 Інтенсивність шуму: ${newNoiseIntensity}`);
    console.log(`🔵 Розмір частинок: ${newPointSize}`);
  });
});
