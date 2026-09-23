"use client";

import { useEffect } from "react";

export function Oneko() {
  useEffect(() => {
    // Prevent duplicate cat instances
    if (document.getElementById("oneko")) return;

    const nekoEl = document.createElement("div");
    let nekoPosX = 32;
    let nekoPosY = 32;
    let mousePosX = 32;
    let mousePosY = 32;
    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation: string | null = null;
    let idleAnimationFrame = 0;
    const nekoSpeed = 130;
    let animationFrameId = 0;
    let lastTimestamp = 0;
    let spriteElapsed = 100;

    const spriteSets: Record<string, [number, number][]> = {
      idle: [[-3, -3]],
      alert: [[-7, -3]],
      scratch: [
        [-5, 0],
        [-6, 0],
        [-7, 0],
      ],
      tired: [[-3, -2]],
      sleeping: [
        [-2, 0],
        [-2, -1],
      ],
      N: [
        [-1, -2],
        [-1, -3],
      ],
      NE: [
        [0, -2],
        [0, -3],
      ],
      E: [
        [-3, 0],
        [-3, -1],
      ],
      SE: [
        [-5, -1],
        [-5, -2],
      ],
      S: [
        [-6, -3],
        [-7, -2],
      ],
      SW: [
        [-5, -3],
        [-6, -1],
      ],
      W: [
        [-4, -2],
        [-4, -3],
      ],
      NW: [
        [-1, 0],
        [-1, -1],
      ],
    };

    function setSprite(name: string, frame: number) {
      const set = spriteSets[name];
      if (!set) return;
      const sprite = set[frame % set.length];
      nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    }

    function resetIdleAnimation() {
      idleAnimation = null;
      idleAnimationFrame = 0;
    }

    function idle() {
      idleTime += 1;
      if (
        idleTime > 10 &&
        Math.floor(Math.random() * 200) === 0 &&
        idleAnimation == null
      ) {
        idleAnimation = ["sleeping", "scratch"][Math.floor(Math.random() * 2)];
      }

      switch (idleAnimation) {
        case "sleeping":
          if (idleAnimationFrame < 8) {
            setSprite("tired", 0);
            break;
          }
          setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
          if (idleAnimationFrame > 192) {
            resetIdleAnimation();
          }
          break;
        case "scratch":
          setSprite("scratch", idleAnimationFrame);
          if (idleAnimationFrame > 9) {
            resetIdleAnimation();
          }
          break;
        default:
          setSprite("idle", 0);
          return;
      }
      idleAnimationFrame += 1;
    }

    function frame(timestamp: number) {
      const delta = Math.min(timestamp - lastTimestamp || 16, 50);
      lastTimestamp = timestamp;
      spriteElapsed += delta;

      const diffX = nekoPosX - mousePosX;
      const diffY = nekoPosY - mousePosY;
      const distance = Math.sqrt(diffX * diffX + diffY * diffY);

      // Cat is close enough to cursor — stay in / enter idle state
      if (distance < 32) {
        if (spriteElapsed >= 100) {
          frameCount += 1;
          spriteElapsed = 0;
          idle();
        }
        animationFrameId = requestAnimationFrame(frame);
        return;
      }

      idleAnimation = null;
      idleAnimationFrame = 0;

      // Brief wake-up alert delay when transitioning from static idle
      if (idleTime > 1) {
        if (spriteElapsed >= 100) {
          setSprite("alert", 0);
          idleTime = Math.min(idleTime, 2);
          idleTime -= 1;
          spriteElapsed = 0;
        }
        animationFrameId = requestAnimationFrame(frame);
        return;
      }

      // Cat is awake and actively chasing cursor
      idleTime = 0;

      let direction = diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";

      if (spriteElapsed >= 100) {
        frameCount += 1;
        setSprite(direction || "idle", frameCount);
        spriteElapsed = 0;
      }

      // Smooth step towards cursor
      const step = Math.min(distance, nekoSpeed * delta / 1000);
      nekoPosX -= (diffX / distance) * step;
      nekoPosY -= (diffY / distance) * step;

      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
      animationFrameId = requestAnimationFrame(frame);
    }

    nekoEl.id = "oneko";
    nekoEl.style.width = "32px";
    nekoEl.style.height = "32px";
    nekoEl.style.position = "fixed";
    nekoEl.style.backgroundImage = 'url("/images/decorative/oneko.gif")';
    nekoEl.style.imageRendering = "pixelated";
    nekoEl.style.left = "16px";
    nekoEl.style.top = "16px";
    nekoEl.style.pointerEvents = "none";
    nekoEl.style.zIndex = "9999";

    document.body.appendChild(nekoEl);

    const handleMouseMove = (event: MouseEvent) => {
      mousePosX = event.clientX;
      mousePosY = event.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);
    animationFrameId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("mousemove", handleMouseMove);
      if (document.body.contains(nekoEl)) {
        document.body.removeChild(nekoEl);
      }
    };
  }, []);

  return null;
}
