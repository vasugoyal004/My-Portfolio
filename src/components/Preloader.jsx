import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

const TEXT = 'VASU GOYAL';
const POOL = '01<>/{}#$%&';
const LOGS = [
  [0, '> initializing design system...'],
  [18, '> compiling liquid glass refractions...'],
  [45, '> hydrating components...'],
  [70, '> mounting 3d scene...'],
  [92, '> optimizing 60 fps...'],
  [100, '> ready.'],
];

export default function Preloader({ onComplete }) {
  const [isDone, setIsDone] = useState(false);
  const [isOut, setIsOut] = useState(false);

  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const orbRef = useRef(null);
  const nameRef = useRef(null);
  const ringRef = useRef(null);
  const pcRef = useRef(null);
  const numRef = useRef(null);
  const fillRef = useRef(null);
  const logRef = useRef(null);
  const lblRef = useRef(null);
  const stRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let P = 0;
    let running = false;
    let t0 = 0;
    let done = false;
    let lastLog = -1;
    let animId = null;

    // 1. Build name letters with masked slide-up
    const nameEl = nameRef.current;
    if (nameEl) {
      nameEl.innerHTML = TEXT.split('')
        .map((ch) =>
          ch === ' '
            ? '<span class="loader-m loader-sp"></span>'
            : '<span class="loader-m"><span class="loader-c">' + ch + '</span></span>'
        )
        .join('');
    }
    const cs = nameEl ? Array.from(nameEl.querySelectorAll('.loader-c')) : [];

    function reveal() {
      cs.forEach((c, i) => {
        c.style.transitionDelay = i * 45 + 'ms';
      });
      requestAnimationFrame(() => {
        if (nameEl) nameEl.classList.add('in');
      });
    }

    function scramble() {
      const n = cs.length;
      cs.forEach((c, i) => {
        const real = TEXT.replace(/ /g, '')[i];
        const th = ((i + 1) / n) * 88;
        if (P >= th || reduce) {
          c.textContent = real;
          c.classList.remove('scr');
        } else {
          c.textContent = POOL[(Math.random() * POOL.length) | 0];
          c.classList.add('scr');
        }
      });
    }

    // 2. Three.js Orb with transparent background
    const orb = orbRef.current;
    const G = 0x0f8a5f;
    const R = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    R.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    R.setSize(260, 260);

    // Prepend canvas inside orb container behind badge
    if (orb) {
      orb.prepend(R.domElement);
    }

    const S = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
    cam.position.z = 7;
    S.add(new THREE.AmbientLight(0xffffff, 0.9));
    const dl = new THREE.DirectionalLight(0xffffff, 0.9);
    dl.position.set(3, 4, 5);
    S.add(dl);

    const grp = new THREE.Group();
    S.add(grp);

    const geo = new THREE.IcosahedronGeometry(1.5, 1);
    const core = new THREE.Mesh(
      geo,
      new THREE.MeshStandardMaterial({
        color: 0x2fd49b,
        flatShading: true,
        transparent: true,
        opacity: 0.16,
        metalness: 0.2,
        roughness: 0.3,
      })
    );
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geo),
      new THREE.LineBasicMaterial({ color: G, transparent: true, opacity: 0.75 })
    );
    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.05, 2),
      new THREE.MeshBasicMaterial({ color: G, wireframe: true, transparent: true, opacity: 0.12 })
    );
    grp.add(core, edges, shell);

    const rings = [];
    const dots = [];
    [
      [2.55, 0.5, 0],
      [2.8, 1.2, 0.9],
      [3.05, -0.7, 1.9],
    ].forEach((r, i) => {
      const pv = new THREE.Group();
      pv.rotation.set(r[1], r[2], 0);
      pv.add(
        new THREE.Mesh(
          new THREE.TorusGeometry(r[0], 0.012, 8, 160),
          new THREE.MeshBasicMaterial({
            color: i === 1 ? 0x14110f : G,
            transparent: true,
            opacity: 0.5,
          })
        )
      );
      const d = new THREE.Mesh(
        new THREE.SphereGeometry(0.09, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0x2fd49b })
      );
      pv.add(d);
      grp.add(pv);
      rings.push(pv);
      dots.push({ m: d, r: r[0], s: 0.8 + i * 0.45, o: i * 2 });
    });

    const N = 260;
    const pa = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const u = Math.random() * 6.283;
      const v = Math.acos(2 * Math.random() - 1);
      const rr = 3.2 + Math.random() * 1.2;
      pa[i * 3] = rr * Math.sin(v) * Math.cos(u);
      pa[i * 3 + 1] = rr * Math.sin(v) * Math.sin(u);
      pa[i * 3 + 2] = rr * Math.cos(v);
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute('position', new THREE.BufferAttribute(pa, 3));
    const pts = new THREE.Points(
      pg,
      new THREE.PointsMaterial({ color: G, size: 0.05, transparent: true, opacity: 0.6 })
    );
    grp.add(pts);

    // 3. Mouse pointer listener
    let mx = 0;
    let my = 0;
    let sx = 0;
    let sy = 0;
    const ld = containerRef.current;
    const stage = stageRef.current;

    const handlePointerMove = (e) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      if (ld) {
        ld.style.setProperty('--mx', e.clientX + 'px');
        ld.style.setProperty('--my', e.clientY + 'px');
      }
    };
    window.addEventListener('pointermove', handlePointerMove);

    // 4. Paint & UI Updates
    function addLog(i) {
      const l = logRef.current;
      if (l) {
        const d = document.createElement('div');
        d.textContent = LOGS[i][1];
        l.appendChild(d);
        while (l.children.length > 3) {
          l.removeChild(l.firstChild);
        }
      }
      if (lblRef.current) {
        lblRef.current.textContent = LOGS[i][1].slice(2).toUpperCase();
      }
    }

    function paint() {
      const p = Math.floor(P);
      if (numRef.current) numRef.current.textContent = p + ' / 100';
      if (pcRef.current) pcRef.current.textContent = p + '%';
      if (fillRef.current) fillRef.current.style.width = P + '%';
      if (ringRef.current) ringRef.current.style.strokeDashoffset = 289 * (1 - P / 100);

      if (stRef.current) {
        const spans = stRef.current.querySelectorAll('span');
        spans.forEach((s) => {
          const t = Number(s.dataset.t);
          s.classList.toggle('on', (P >= t && P > 0) || (s.dataset.t === '0' && P > 1));
        });
      }

      for (let i = LOGS.length - 1; i >= 0; i--) {
        if (P >= LOGS[i][0]) {
          if (i !== lastLog) {
            lastLog = i;
            addLog(i);
          }
          break;
        }
      }

      if (!reduce && p % 2 === 0) {
        scramble();
      }
    }

    function finish() {
      scramble();
      if (orb) orb.classList.add('flash');
      if (nameEl) nameEl.classList.add('big');

      setTimeout(() => {
        setIsOut(true);
        if (ld) ld.classList.add('out');
        setTimeout(() => {
          setIsDone(true);
          if (onComplete) onComplete();
        }, 1100);
      }, 900);
    }

    // 5. 60FPS RAF Frame Loop
    function frame(ts) {
      animId = requestAnimationFrame(frame);
      const clock = ts / 1000;
      sx += (mx - sx) * 0.06;
      sy += (my - sy) * 0.06;
      const boost = 1 + P / 40;

      if (!reduce) {
        grp.rotation.y = clock * 0.25 * boost + sx * 1.2;
        grp.rotation.x = sy * 0.9 + Math.sin(clock * 0.5) * 0.1;
        core.rotation.y = -clock * 0.3;
        shell.rotation.y = clock * 0.15;
        pts.rotation.y = -clock * 0.05;
      }

      const sc = 0.7 + 0.3 * (P / 100);
      core.scale.setScalar(sc);
      edges.scale.setScalar(sc);

      dots.forEach((d) => {
        const a = clock * d.s + d.o;
        d.m.position.set(Math.cos(a) * d.r, Math.sin(a) * d.r, 0);
      });

      R.render(S, cam);

      if (stage) {
        stage.style.transform = 'translate(' + -sx * 10 + 'px,' + -sy * 8 + 'px)';
      }

      if (running) {
        // Natural smooth progression: 4.5 seconds
        const t = Math.min((ts - t0) / 4500, 1);
        P = 100 * (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
        if (t >= 1 && !done) {
          P = 100;
          done = true;
          finish();
        }
        paint();
      }
    }

    // Start Sequence
    P = 0;
    done = false;
    lastLog = -1;
    if (logRef.current) logRef.current.innerHTML = '';
    if (orb) orb.classList.remove('flash');
    if (nameEl) {
      nameEl.classList.remove('big', 'in');
      void nameEl.offsetWidth;
    }

    reveal();
    scramble();
    paint();

    animId = requestAnimationFrame(frame);

    const startTimer = setTimeout(() => {
      t0 = performance.now();
      running = true;
    }, 400);

    return () => {
      clearTimeout(startTimer);
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      R.dispose();
      geo.dispose();
      pg.dispose();
      if (R.domElement && R.domElement.parentNode) {
        R.domElement.parentNode.removeChild(R.domElement);
      }
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      id="loader-exact"
      ref={containerRef}
      className={`loader-root ${isOut ? 'out' : ''}`}
    >
      {/* Background FX: Dotted mask, cursor glow, floating blobs, grain */}
      <div className="loader-exact-bg loader-dots" />
      <div className="loader-exact-bg loader-glow" />
      <div className="loader-blob loader-b1" />
      <div className="loader-blob loader-b2" />
      <div className="loader-exact-bg loader-grain" />

      {/* Top Telemetry */}
      <div className="loader-top">
        <div className="loader-pill">
          <span className="loader-ping" />
          PORTFOLIO BOOT // 2026 EDITION
        </div>
        <div className="loader-mm">
          DELHI NCR // 28.6139° N &nbsp;•&nbsp; 60 FPS ACTIVE
        </div>
      </div>

      {/* Center Stage: Three.js Orb, Ring, Logo, Scramble Name, Ticker */}
      <div className="loader-stage" id="stage" ref={stageRef}>
        <div id="loader-orb" ref={orbRef}>
          {/* Transparent Canvas is prepended via Three.js */}
          <div className="loader-badge">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="none" stroke="var(--track)" strokeWidth="3" />
              <circle
                ref={ringRef}
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="var(--g)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="289"
                strokeDashoffset="289"
              />
            </svg>
            <div className="loader-vg">
              VG<i>.</i>
            </div>
            <div className="loader-pc" ref={pcRef}>
              0%
            </div>
          </div>
        </div>

        <div className="loader-role">FULL-STACK SOFTWARE ENGINEER &amp; WEB ARCHITECT</div>

        <h1 className="loader-h1" id="name" ref={nameRef} aria-label="Vasu Goyal" />

        <p className="loader-tag">
          Crafting high-throughput enterprise portals, liquid-glass aesthetics, and resilient web ecosystems.
        </p>

        <div className="loader-ticker">
          <div>
            <span>REACT</span>
            <span>NEXT.JS</span>
            <span>NODE</span>
            <span>TYPESCRIPT</span>
          </div>
        </div>
      </div>

      {/* Bottom Liquid Glass Card */}
      <div className="loader-card">
        <div className="loader-log" ref={logRef} />
        <div className="loader-row">
          <span ref={lblRef}>COMPILING LIQUID GLASS REFRACTIONS...</span>
          <b ref={numRef}>0 / 100</b>
        </div>
        <div className="loader-bar">
          <div className="loader-fill" ref={fillRef} />
        </div>
        <div className="loader-st" ref={stRef}>
          <span data-t="0">BOOT // 00</span>
          <span data-t="45">COMPILED // 45</span>
          <span data-t="80">HYDRATED // 80</span>
          <span data-t="100">READY // 100</span>
        </div>
      </div>
    </div>
  );
}
