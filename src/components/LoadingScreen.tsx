import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { Howl } from 'howler';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const LoadingScreen: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    const app = new PIXI.Application({
      resizeTo: window,
      backgroundAlpha: 0,
      antialias: true,
    });

    if (canvasRef.current) {
      canvasRef.current.innerHTML = '';
      canvasRef.current.appendChild(app.view as HTMLCanvasElement);
    }

    const scene = new PIXI.Container();
    app.stage.addChild(scene);

    // 🎞️ Cinematic Black Bars
    const topBar = new PIXI.Graphics();
    topBar.beginFill(0x000000, 0.6).drawRect(0, 0, window.innerWidth, 60).endFill();
    scene.addChild(topBar);

    const bottomBar = new PIXI.Graphics();
    bottomBar.beginFill(0x000000, 0.6).drawRect(0, window.innerHeight - 60, window.innerWidth, 60).endFill();
    scene.addChild(bottomBar);

    // 🌅 Animated Gradient Sky
    const sky = new PIXI.Graphics();
    sky.beginFill(0xffe4b5).drawRect(0, 0, window.innerWidth, window.innerHeight).endFill();
    scene.addChild(sky);
    gsap.to(sky, {
      tint: 0xb0c4de,
      duration: 6,
      repeat: -1,
      yoyo: true,
    });

    // ⛰️ Parallax Hills
    const hills = new PIXI.Graphics();
    hills.beginFill(0x7fa57f);
    hills.moveTo(0, window.innerHeight * 0.75);
    hills.quadraticCurveTo(window.innerWidth * 0.3, window.innerHeight * 0.65, window.innerWidth * 0.6, window.innerHeight * 0.75);
    hills.quadraticCurveTo(window.innerWidth * 0.8, window.innerHeight * 0.8, window.innerWidth, window.innerHeight * 0.75);
    hills.lineTo(window.innerWidth, window.innerHeight);
    hills.lineTo(0, window.innerHeight);
    hills.endFill();
    scene.addChild(hills);

    // 🛖 Hut
    const hut = new PIXI.Graphics();
    hut.beginFill(0x8b5e3c).drawRect(0, 0, 60, 40).endFill();
    hut.beginFill(0x5a3d27).moveTo(0, 0).lineTo(30, -25).lineTo(60, 0).endFill();
    hut.x = window.innerWidth * 0.25;
    hut.y = window.innerHeight * 0.7;
    scene.addChild(hut);

    // 🔥 Campfire
    const fire = new PIXI.Graphics();
    fire.beginFill(0xff4500).drawCircle(0, 0, 12).endFill();
    fire.x = hut.x + 80;
    fire.y = hut.y + 30;
    scene.addChild(fire);
    if (!prefersReducedMotion) {
      gsap.to(fire.scale, {
        x: 1.2,
        y: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        duration: 0.5,
      });
    }

    // 🌬️ Smoke Loading Progress
    const smoke = new PIXI.Graphics();
    smoke.beginFill(0xffffff, 0.3).drawEllipse(0, 0, 10, 20).endFill();
    smoke.x = hut.x + 50;
    smoke.y = hut.y - 10;
    scene.addChild(smoke);

    gsap.to(smoke, {
      y: smoke.y - 50,
      alpha: 0,
      duration: 4,
      repeat: -1,
      onRepeat: () => {
        smoke.y = hut.y - 10;
        smoke.alpha = 0.3;
      },
    });

    // 👨 Man
    const man = new PIXI.Graphics();
    man.beginFill(0x3a3a3a).drawRect(0, 0, 10, 25).endFill();
    man.x = fire.x + 20;
    man.y = fire.y - 20;
    scene.addChild(man);

    // 🌿 Tree and grass
    const tree = new PIXI.Graphics();
    tree.beginFill(0x3a5f0b).drawCircle(0, 0, 30).endFill();
    tree.x = window.innerWidth * 0.7;
    tree.y = window.innerHeight * 0.67;
    scene.addChild(tree);

    if (!prefersReducedMotion) {
      gsap.to(tree, {
        rotation: 0.05,
        duration: 3,
        repeat: -1,
        yoyo: true,
      });
    }

    // 🐦 Birds
    const bird = new PIXI.Graphics();
    bird.beginFill(0x000000).moveTo(0, 0).lineTo(5, -5).lineTo(10, 0).endFill();
    scene.addChild(bird);
    bird.x = -20;
    bird.y = 90;
    gsap.to(bird, {
      x: window.innerWidth + 20,
      repeat: -1,
      ease: 'none',
      duration: 12,
      onRepeat: () => {
        bird.x = -20;
        bird.y = 80 + Math.random() * 40;
      },
    });

    // ✨ Particles
    for (let i = 0; i < 30; i++) {
      const particle = new PIXI.Graphics();
      particle.beginFill(0xffffff, 0.05).drawCircle(0, 0, Math.random() * 1.5 + 0.5).endFill();
      particle.x = Math.random() * window.innerWidth;
      particle.y = Math.random() * window.innerHeight;
      scene.addChild(particle);

      gsap.to(particle, {
        y: particle.y - 20,
        alpha: 0,
        duration: 5 + Math.random() * 5,
        repeat: -1,
        delay: Math.random() * 5,
        onRepeat: () => {
          particle.y = Math.random() * window.innerHeight;
          particle.alpha = 0.05;
        },
      });
    }

    // 🌞 Greeting
    const style = new PIXI.TextStyle({
      fontFamily: 'serif',
      fontSize: 36,
      fill: 'white',
      dropShadow: true,
      dropShadowBlur: 4,
      dropShadowAlpha: 0.3,
    });
    const greeting = new PIXI.Text(`Good morning, Jai 🌄`, style);
    greeting.x = window.innerWidth / 2 - 140;
    greeting.y = 70;
    scene.addChild(greeting);

    // 📼 Vintage Loading Bar
    const barBg = new PIXI.Graphics();
    barBg.beginFill(0x3a2e1f).drawRoundedRect(0, 0, 300, 20, 10).endFill();
    barBg.x = window.innerWidth / 2 - 150;
    barBg.y = window.innerHeight - 80;
    scene.addChild(barBg);

    const barFill = new PIXI.Graphics();
    barFill.beginFill(0xffa500).drawRoundedRect(0, 0, 0, 20, 10).endFill();
    barFill.x = barBg.x;
    barFill.y = barBg.y;
    scene.addChild(barFill);

    const updateProgress = () => {
      const newProgress = Math.min(progress + Math.random() * 5, 100);
      setProgress(newProgress);
      barFill.clear();
      barFill.beginFill(0xffa500).drawRoundedRect(0, 0, (newProgress / 100) * 300, 20, 10).endFill();
      if (newProgress < 100 && !skip) setTimeout(updateProgress, 200);
    };

    updateProgress();

    // 🔊 Ambient Audio
    if (!prefersReducedMotion) {
      const sound = new Howl({
        src: ['/sounds/dawn-ambience.mp3'],
        loop: true,
        volume: 0.3,
      });
      sound.play();
    }

    return () => {
      app.destroy(true, true);
    };
  }, [progress, skip]);

  return (
    <div
      ref={canvasRef}
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {progress >= 100 && !skip && (
        <button
          style={{
            position: 'absolute',
            right: 20,
            bottom: 20,
            padding: '10px 20px',
            background: 'rgba(0,0,0,0.6)',
            color: 'white',
            border: 'none',
            fontFamily: 'monospace',
            cursor: 'pointer',
          }}
          onClick={() => setSkip(true)}
        >
          Enter
        </button>
      )}
    </div>
  );
};

export default LoadingScreen;
