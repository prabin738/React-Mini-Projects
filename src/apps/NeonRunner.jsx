import React, { useRef, useEffect, useState } from "react";

const NeonRunner = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameState, setGameState] = useState("START"); // START, PLAYING, GAMEOVER
  const [bossActive, setBossActive] = useState(false); // For UI indication

  // Mutable game state
  const state = useRef({
    playerX: 0,
    playerY: 0,
    enemies: [],
    particles: [],
    powerups: [],
    bullets: [], // New: Player projectiles
    boss: {
      active: false,
      x: 0,
      y: -100,
      hp: 100,
      maxHp: 100,
      dir: 1,
      cooldown: 0,
    }, // New: Boss Object
    keys: { ArrowLeft: false, ArrowRight: false, Space: false },
    speedMultiplier: 1,
    timeScale: 1.0,
    frameCount: 0,
    score: 0,
    shieldActive: false,
    slowMoTimer: 0,
    nextBossScore: 2000, // Trigger boss every 2000 points
  });

  // --- AUDIO ENGINE ---
  const audioCtxRef = useRef(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  const playSound = (type) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;

    if (type === "shoot") {
      // New: Laser sound
      osc.type = "square";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.15);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === "bossHit") {
      // New: Thud sound
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === "move") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === "score") {
      osc.type = "square";
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === "powerup") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.linearRampToValueAtTime(1200, now + 0.3);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === "explosion") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(100, now);
      osc.frequency.exponentialRampToValueAtTime(0.01, now + 0.5);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    }
  };

  // --- GAME LOGIC ---

  const resetGame = (canvas) => {
    state.current = {
      playerX: canvas.width / 2,
      playerY: canvas.height - 50,
      enemies: [],
      particles: [],
      powerups: [],
      bullets: [],
      boss: {
        active: false,
        x: canvas.width / 2,
        y: -100,
        hp: 50,
        maxHp: 50,
        dir: 1,
        cooldown: 0,
      },
      keys: { ArrowLeft: false, ArrowRight: false, Space: false },
      speedMultiplier: 1,
      timeScale: 1.0,
      frameCount: 0,
      score: 0,
      shieldActive: false,
      slowMoTimer: 0,
      nextBossScore: 2000,
    };
    setScore(0);
    setBossActive(false);
  };

  const spawnBullet = () => {
    const s = state.current;
    playSound("shoot");
    s.bullets.push({
      x: s.playerX,
      y: s.playerY,
      size: 5,
      speed: 15,
      color: "#ffff00",
    });
  };

  const spawnEnemy = (canvas, fromBoss = false, bossX = 0, bossY = 0) => {
    const size = 30;
    let x, y;

    if (fromBoss) {
      x = bossX + (Math.random() * 60 - 30); // Spawn near boss center
      y = bossY + 50;
    } else {
      x = Math.random() * (canvas.width - size);
      y = -size;
    }

    state.current.enemies.push({ x, y, size, color: "#ff0055" });
  };

  const spawnPowerup = (canvas) => {
    const type = Math.random() > 0.5 ? "SHIELD" : "SLOW";
    const size = 20;
    const x = Math.random() * (canvas.width - size);
    state.current.powerups.push({
      x,
      y: -size,
      size,
      type,
      color: type === "SHIELD" ? "#00ccff" : "#ffff00",
    });
  };

  const createExplosion = (x, y, color = null, size = 1) => {
    const particleCount = size === 1 ? 20 : 60; // Bigger explosion for boss
    for (let i = 0; i < particleCount; i++) {
      state.current.particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * (10 * size),
        vy: (Math.random() - 0.5) * (10 * size),
        life: 1.0,
        color: color || `hsl(${Math.random() * 60 + 10}, 100%, 50%)`,
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      canvas.width = Math.min(window.innerWidth, 600);
      canvas.height = 500;
      if (gameState === "START") {
        state.current.playerX = canvas.width / 2;
        state.current.playerY = canvas.height - 50;
      }
    };
    window.addEventListener("resize", resize);
    resize();

    // Input Handling
    const handleKeyDown = (e) => {
      if (e.code === "Space") state.current.keys.Space = true;
      if (state.current.keys.hasOwnProperty(e.code))
        state.current.keys[e.code] = true;
    };
    const handleKeyUp = (e) => {
      if (e.code === "Space") state.current.keys.Space = false;
      if (state.current.keys.hasOwnProperty(e.code))
        state.current.keys[e.code] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // --- MAIN LOOP ---
    const render = () => {
      if (gameState !== "PLAYING") return;

      const s = state.current;
      s.frameCount++;

      // Slow Mo Logic
      if (s.slowMoTimer > 0) {
        s.slowMoTimer--;
        s.timeScale = 0.4;
      } else {
        s.timeScale = 1.0;
      }

      const gameSpeed = s.speedMultiplier * s.timeScale;

      // 1. BACKGROUND & CLEAR
      ctx.fillStyle = s.boss.active
        ? "#220000"
        : s.slowMoTimer > 0
        ? "#111122"
        : "#111";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = s.boss.active ? "#440000" : "#222";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
      }
      ctx.stroke();

      // 2. DIFFICULTY & BOSS TRIGGER
      if (s.score >= s.nextBossScore && !s.boss.active) {
        s.boss.active = true;
        s.boss.y = -100;
        s.boss.hp = 50 + s.score / 100; // Boss gets stronger
        s.boss.maxHp = s.boss.hp;
        setBossActive(true); // Trigger React UI update
      }

      s.speedMultiplier = 1 + Math.floor(s.score / 500) * 0.2;

      // 3. PLAYER
      const playerSpeed = 7;
      if (s.keys.ArrowLeft && s.playerX > 15) s.playerX -= playerSpeed;
      if (s.keys.ArrowRight && s.playerX < canvas.width - 15)
        s.playerX += playerSpeed;

      // Shooting Logic
      if (s.keys.Space && s.frameCount % 10 === 0) {
        // Limit fire rate
        spawnBullet();
      }

      // Draw Player
      ctx.shadowBlur = 20;
      ctx.shadowColor = s.shieldActive ? "#00ccff" : "#00ffcc";
      ctx.fillStyle = s.shieldActive ? "#ffffff" : "#00ffcc";
      ctx.beginPath();
      ctx.moveTo(s.playerX, s.playerY);
      ctx.lineTo(s.playerX - 15, s.playerY + 30);
      ctx.lineTo(s.playerX + 15, s.playerY + 30);
      ctx.fill();

      // Shield Aura
      if (s.shieldActive) {
        ctx.strokeStyle = `rgba(0, 204, 255, ${
          0.5 + Math.sin(s.frameCount * 0.1) * 0.2
        })`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(s.playerX, s.playerY + 15, 35, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.shadowBlur = 0;

      // 4. BULLETS
      for (let i = s.bullets.length - 1; i >= 0; i--) {
        const b = s.bullets[i];
        b.y -= b.speed;

        ctx.fillStyle = b.color;
        ctx.fillRect(b.x - 2, b.y, 4, 10);

        // Check Boss Collision
        if (
          s.boss.active &&
          b.x > s.boss.x - 40 &&
          b.x < s.boss.x + 40 &&
          b.y > s.boss.y &&
          b.y < s.boss.y + 60
        ) {
          s.boss.hp -= 1;
          playSound("bossHit");
          createExplosion(b.x, b.y, "#ffaa00", 0.5);
          s.bullets.splice(i, 1);
          continue;
        }

        if (b.y < 0) s.bullets.splice(i, 1);
      }

      // 5. BOSS LOGIC
      if (s.boss.active) {
        // Entrance
        if (s.boss.y < 50) s.boss.y += 2;

        // Movement
        s.boss.x += 2 * s.boss.dir * s.speedMultiplier;
        if (s.boss.x > canvas.width - 50 || s.boss.x < 50) s.boss.dir *= -1;

        // Draw Boss
        ctx.fillStyle = "#ff0000";
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#ff0000";
        // Simple shape
        ctx.beginPath();
        ctx.moveTo(s.boss.x, s.boss.y + 60);
        ctx.lineTo(s.boss.x - 40, s.boss.y);
        ctx.lineTo(s.boss.x + 40, s.boss.y);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Boss Health Bar
        const hpPct = s.boss.hp / s.boss.maxHp;
        ctx.fillStyle = "#550000";
        ctx.fillRect(s.boss.x - 40, s.boss.y - 15, 80, 5);
        ctx.fillStyle = "#00ff00";
        ctx.fillRect(s.boss.x - 40, s.boss.y - 15, 80 * hpPct, 5);

        // Boss Attack (Spawns enemies faster)
        if (s.frameCount % 40 === 0) {
          spawnEnemy(canvas, true, s.boss.x, s.boss.y);
        }

        // Boss Death
        if (s.boss.hp <= 0) {
          s.boss.active = false;
          playSound("explosion");
          createExplosion(s.boss.x, s.boss.y, "#ff0000", 3); // Big explosion
          s.score += 1000;
          s.nextBossScore += 2500; // Next boss comes later
          setBossActive(false);
          // Clear all enemies as reward
          s.enemies = [];
        }
      } else {
        // Normal Spawning
        const spawnRate =
          Math.max(20, 60 - s.speedMultiplier * 5) / s.timeScale;
        if (s.frameCount % Math.floor(spawnRate) === 0) spawnEnemy(canvas);
      }

      // Powerups
      if (Math.random() < 0.005 * s.timeScale && !s.boss.active)
        spawnPowerup(canvas);

      // 6. ENTITIES & PHYSICS
      // Powerups
      for (let i = s.powerups.length - 1; i >= 0; i--) {
        const p = s.powerups[i];
        p.y += 4 * gameSpeed;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        if (p.type === "SHIELD")
          ctx.arc(
            p.x + p.size / 2,
            p.y + p.size / 2,
            p.size / 2,
            0,
            Math.PI * 2
          );
        else {
          ctx.moveTo(p.x + p.size / 2, p.y);
          ctx.lineTo(p.x + p.size, p.y + p.size / 2);
          ctx.lineTo(p.x + p.size / 2, p.y + p.size);
          ctx.lineTo(p.x, p.y + p.size / 2);
        }
        ctx.fill();

        // Collision
        if (
          s.playerX - 15 < p.x + p.size &&
          s.playerX + 15 > p.x &&
          s.playerY < p.y + p.size &&
          s.playerY + 30 > p.y
        ) {
          playSound("powerup");
          if (p.type === "SHIELD") s.shieldActive = true;
          if (p.type === "SLOW") s.slowMoTimer = 300;
          s.powerups.splice(i, 1);
          s.score += 50;
          setScore(s.score);
        }
        if (p.y > canvas.height) s.powerups.splice(i, 1);
      }

      // Enemies
      for (let i = s.enemies.length - 1; i >= 0; i--) {
        const e = s.enemies[i];
        e.y += 5 * gameSpeed;
        ctx.shadowBlur = 10;
        ctx.shadowColor = e.color;
        ctx.fillStyle = e.color;
        ctx.fillRect(e.x, e.y, e.size, e.size);
        ctx.shadowBlur = 0;

        // Collision
        if (
          s.playerX - 15 < e.x + e.size &&
          s.playerX + 15 > e.x &&
          s.playerY < e.y + e.size &&
          s.playerY + 30 > e.y
        ) {
          if (s.shieldActive) {
            playSound("explosion");
            createExplosion(e.x, e.y, "#00ccff");
            s.enemies.splice(i, 1);
            s.shieldActive = false;
          } else {
            playSound("explosion");
            createExplosion(s.playerX, s.playerY);
            setGameState("GAMEOVER");
            setHighScore((prev) => Math.max(prev, s.score));
          }
        }

        // Bullet Hit Enemy
        for (let j = s.bullets.length - 1; j >= 0; j--) {
          const b = s.bullets[j];
          if (
            b.x > e.x &&
            b.x < e.x + e.size &&
            b.y > e.y &&
            b.y < e.y + e.size
          ) {
            s.enemies.splice(i, 1);
            s.bullets.splice(j, 1);
            createExplosion(e.x, e.y, "#ff0055", 0.5);
            playSound("bossHit"); // Reuse hit sound
            s.score += 20;
            setScore(s.score);
            break;
          }
        }

        if (e.y > canvas.height) {
          s.enemies.splice(i, 1);
          s.score += 100;
          setScore(s.score);
          if (s.score % 1000 === 0) playSound("score");
        }
      }

      // Particles
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i];
        p.x += p.vx * s.timeScale;
        p.y += p.vy * s.timeScale;
        p.life -= 0.05;
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        if (p.life <= 0) s.particles.splice(i, 1);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    if (gameState === "PLAYING") {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameState]);

  // --- CONTROLS ---

  const startGame = () => {
    initAudio();
    resetGame(canvasRef.current);
    playSound("score");
    setGameState("PLAYING");
  };

  const handleFireStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    state.current.keys.Space = true;
  };
  const handleFireEnd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    state.current.keys.Space = false;
  };

  const onTouchStart = (e) => {
    // Only move if not touching the Fire button
    if (e.target.id === "fire-btn") return;
    e.preventDefault();
    const touchX = e.touches[0].clientX;
    const middle = window.innerWidth / 2;
    if (touchX < middle) state.current.keys.ArrowLeft = true;
    else state.current.keys.ArrowRight = true;
  };

  const onTouchEnd = (e) => {
    if (e.target.id === "fire-btn") return;
    e.preventDefault();
    state.current.keys.ArrowLeft = false;
    state.current.keys.ArrowRight = false;
  };

  return (
    <div
      onTouchStart={gameState === "PLAYING" ? onTouchStart : null}
      onTouchEnd={gameState === "PLAYING" ? onTouchEnd : null}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#050505",
        color: "white",
        fontFamily: '"Courier New", Courier, monospace',
        userSelect: "none",
        overflow: "hidden",
      }}
    >
      <h1
        style={{
          textShadow: "0 0 10px #00ffcc",
          marginBottom: "10px",
          fontSize: "2rem",
        }}
      >
        NEON RUNNER
      </h1>

      <div
        style={{
          position: "relative",
          border: "2px solid #333",
          boxShadow: "0 0 20px rgba(0,255,204,0.2)",
        }}
      >
        <canvas ref={canvasRef} style={{ display: "block" }} />

        {/* HUD */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            fontSize: "1.2rem",
            textShadow: "1px 1px 0 #000",
          }}
        >
          SCORE: <span style={{ color: "#00ffcc" }}>{score}</span>
        </div>
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            fontSize: "1.2rem",
            textShadow: "1px 1px 0 #000",
          }}
        >
          HIGH: <span style={{ color: "#ff0055" }}>{highScore}</span>
        </div>

        {/* BOSS WARNING */}
        {bossActive && (
          <div
            style={{
              position: "absolute",
              top: 50,
              width: "100%",
              textAlign: "center",
              color: "#ff0000",
              fontSize: "1.5rem",
              fontWeight: "bold",
              textShadow: "0 0 10px red",
              animation: "blink 0.5s infinite",
            }}
          >
            ⚠ BOSS APPROACHING ⚠
          </div>
        )}

        {/* OVERLAYS */}
        {gameState === "START" && (
          <div style={overlayStyle}>
            <h2>MISSION BRIEF</h2>
            <p>Move: Arrows / Touch Sides</p>
            <p>Shoot: SPACE / Fire Button</p>
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "10px",
                fontSize: "0.8rem",
              }}
            >
              <span style={{ color: "#00ccff" }}>● Shield</span>
              <span style={{ color: "#ffff00" }}>◆ Slow Mo</span>
            </div>
            <button onClick={startGame} style={buttonStyle}>
              LAUNCH
            </button>
          </div>
        )}

        {gameState === "GAMEOVER" && (
          <div style={overlayStyle}>
            <h2 style={{ color: "#ff0055", fontSize: "3rem" }}>CRASHED</h2>
            <p>Final Score: {score}</p>
            <button onClick={startGame} style={buttonStyle}>
              RETRY
            </button>
          </div>
        )}

        {/* MOBILE FIRE BUTTON */}
        {gameState === "PLAYING" && (
          <div
            id="fire-btn"
            onTouchStart={handleFireStart}
            onTouchEnd={handleFireEnd}
            style={{
              position: "absolute",
              bottom: 20,
              right: 20,
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              background: "rgba(255, 0, 85, 0.5)",
              border: "2px solid #ff0055",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
              fontWeight: "bold",
              color: "white",
              boxShadow: "0 0 15px #ff0055",
              cursor: "pointer",
              zIndex: 20,
            }}
          >
            FIRE
          </div>
        )}
      </div>

      <style>{`@keyframes blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }`}</style>
    </div>
  );
};

const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.85)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 10,
};

const buttonStyle = {
  marginTop: "20px",
  padding: "10px 30px",
  fontSize: "1.5rem",
  background: "transparent",
  color: "#00ffcc",
  border: "2px solid #00ffcc",
  cursor: "pointer",
  fontFamily: "inherit",
  textTransform: "uppercase",
  boxShadow: "0 0 10px #00ffcc",
  transition: "0.2s",
};

export default NeonRunner;
