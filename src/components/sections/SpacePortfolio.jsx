'use client'
import { useState, useEffect, useRef } from 'react'

// ── SECTIONS DATA ─────────────────────────────────────────────
const SECTIONS = [
  {
    icon: '🏆', name: 'ACHIEVEMENT', title: 'Achievements',
    color: '#f0a030', rgb: '240,160,48',
    desc: 'Competitive programming wins, academic excellence, and hackathon victories.',
    items: [
      { icon:'🥇', heading:'CodeFest 2K23 Winner',  sub:'1st place out of 400+ teams' },
      { icon:'💻', heading:'LeetCode 500+',          sub:'Problems solved, top percentile' },
      { icon:'🚀', heading:'SIH 2023 Finalist',      sub:'Smart India Hackathon' },
      { icon:'🎓', heading:'CGPA 8.9/10',            sub:'B.Tech Computer Science' },
    ],
    cta: '→ VIEW ALL ACHIEVEMENTS',
  },
  {
    icon: '🏢', name: 'INTERNSHIP', title: 'Internships',
    color: '#4cc8a0', rgb: '76,200,160',
    desc: 'Real-world engineering experience across multiple domains and tech stacks.',
    items: [
      { icon:'⚡', heading:'Software Intern',   sub:'REST APIs handling 50k req/day' },
      { icon:'🌐', heading:'Full Stack Dev',    sub:'React + Node · 10k active users' },
      { icon:'📊', heading:'ETL Pipeline',      sub:'Reduced processing time by 40%' },
      { icon:'☁️', heading:'AWS ECS CI/CD',    sub:'Automated deployment pipeline' },
    ],
    cta: '→ VIEW INTERNSHIP DETAILS',
  },
  {
    icon: '📋', name: 'RESUME', title: 'Resume',
    color: '#c080ff', rgb: '192,128,255',
    desc: 'ATS-optimised resume with complete skill matrix and coding profiles.',
    items: [
      { icon:'⚙️', heading:'Core Stack',       sub:'React / Node.js / Python / AWS' },
      { icon:'📄', heading:'Download PDF',      sub:'ATS-optimised, clean format' },
      { icon:'🧠', heading:'Skills Matrix',     sub:'DSA / Cloud / ML / System Design' },
      { icon:'👨‍💻', heading:'Coding Profiles', sub:'LeetCode · GitHub · CodeChef' },
    ],
    cta: '→ DOWNLOAD RESUME PDF',
  },
  {
    icon: '⚡', name: 'PROJECTS', title: 'Projects',
    color: '#8888ff', rgb: '136,136,255',
    desc: 'Production-grade projects spanning AI, blockchain, and full-stack web.',
    items: [
      { icon:'🤖', heading:'AI Task Manager',       sub:'NLP-powered · 500⭐ on GitHub' },
      { icon:'🌌', heading:'Space Portfolio',        sub:'Pure JS · No frameworks' },
      { icon:'🔗', heading:'Blockchain Voting',      sub:'DApp · Solidity · Web3' },
      { icon:'📈', heading:'ML Price Predictor',     sub:'92% accuracy · scikit-learn' },
    ],
    cta: '→ VIEW ALL PROJECTS',
  },
  {
    icon: '💼', name: 'EXPERIENCE', title: 'Experience',
    color: '#40b8ff', rgb: '64,184,255',
    desc: 'Professional engineering roles, teaching, and open source contributions.',
    items: [
      { icon:'🏗️', heading:'SDE @ StartupX',        sub:'2024–Present · Full Stack' },
      { icon:'🔧', heading:'Backend Intern',         sub:'Go microservices · 3× throughput' },
      { icon:'📚', heading:'Teaching Assistant',     sub:'80+ students mentored' },
      { icon:'🌍', heading:'Open Source',            sub:'300+ merged PRs across repos' },
    ],
    cta: '→ VIEW FULL EXPERIENCE',
  },
]

const RUNES = ['⬡','{}','</>','∞','01','⬢','λ','∴']
const SPELLS = [
  { name:'⚡ SPELL CAST!',        color:'#cc44ff' },
  { name:'👁 ALL SEEING EYE',     color:'#ffdd44' },
  { name:'🌀 PHANTOM SHIFT',      color:'#44ffee' },
  { name:'💀 DARK ARTS UNLEASH',  color:'#ff4444' },
  { name:'✨ ARCANE BURST',       color:'#44ff88' },
  { name:'🔮 DIMENSION BREACH',   color:'#ff44cc' },
]
const TERM_LINES = [
  '>_ initializing AK.portfolio',
  '> name: Abhishek Kumar Maurya',
  '> role: Full Stack Developer',
  '> stack: React · Node · AWS',
  '> cgpa: 8.9 / 10.0',
  '> leetcode: 500+ solved',
  '> github: 200+ commits',
  '> open to: SDE · Backend · ML',
  '> status: AVAILABLE ✓',
  '$ _',
]

// ── BLADE GEOMETRY ────────────────────────────────────────────
const HUB_R       = 42
const ROOT_R      = 54
const OUTER_R     = 230
const ROOT_L      = -0.14
const ROOT_R_A    = +0.14
const OUTER_L     = -1.18
const OUTER_R_A   = +0.60

function drawBlade(ctx, cx, cy, angle, sec, hovered) {
  const px = (r, a) => cx + Math.cos(angle + a) * r
  const py = (r, a) => cy + Math.sin(angle + a) * r
  const mid = (OUTER_L + OUTER_R_A) / 2

  ctx.save()
  ctx.beginPath()
  ctx.arc(cx, cy, ROOT_R, angle + ROOT_L, angle + ROOT_R_A)
  ctx.bezierCurveTo(
    px(ROOT_R*1.6, ROOT_L-0.3), py(ROOT_R*1.6, ROOT_L-0.3),
    px(OUTER_R*0.7, OUTER_L+0.4), py(OUTER_R*0.7, OUTER_L+0.4),
    px(OUTER_R, OUTER_L), py(OUTER_R, OUTER_L)
  )
  ctx.quadraticCurveTo(
    px(OUTER_R*1.06, mid), py(OUTER_R*1.06, mid),
    px(OUTER_R, OUTER_R_A), py(OUTER_R, OUTER_R_A)
  )
  ctx.bezierCurveTo(
    px(OUTER_R*0.7, OUTER_R_A-0.4), py(OUTER_R*0.7, OUTER_R_A-0.4),
    px(ROOT_R*1.6, ROOT_R_A+0.3), py(ROOT_R*1.6, ROOT_R_A+0.3),
    px(ROOT_R, ROOT_R_A), py(ROOT_R, ROOT_R_A)
  )
  ctx.closePath()

  const [r,g,b] = sec.rgb.split(',')
  const grd = ctx.createRadialGradient(cx, cy, HUB_R, cx, cy, OUTER_R)
  grd.addColorStop(0,   `rgba(${r},${g},${b},${hovered?0.48:0.22})`)
  grd.addColorStop(0.35,`rgba(13,28,52,0.88)`)
  grd.addColorStop(0.7, `rgba(8,15,30,0.93)`)
  grd.addColorStop(1,   `rgba(5,12,24,0.97)`)
  ctx.fillStyle = grd
  ctx.fill()

  if (hovered) { ctx.shadowColor=`rgba(${r},${g},${b},0.7)`; ctx.shadowBlur=22 }
  ctx.strokeStyle = hovered ? `rgba(${r},${g},${b},0.95)` : `rgba(${r},${g},${b},0.42)`
  ctx.lineWidth   = hovered ? 2.2 : 1.1
  ctx.stroke()
  ctx.shadowBlur = 0

  // Outer rim
  ctx.beginPath()
  ctx.moveTo(px(OUTER_R, OUTER_L), py(OUTER_R, OUTER_L))
  ctx.quadraticCurveTo(px(OUTER_R*1.06,mid), py(OUTER_R*1.06,mid), px(OUTER_R,OUTER_R_A), py(OUTER_R,OUTER_R_A))
  const rim = ctx.createLinearGradient(px(OUTER_R,OUTER_L),py(OUTER_R,OUTER_L),px(OUTER_R,OUTER_R_A),py(OUTER_R,OUTER_R_A))
  rim.addColorStop(0,`rgba(${r},${g},${b},0.65)`); rim.addColorStop(1,`rgba(${r},${g},${b},0.1)`)
  ctx.strokeStyle=rim; ctx.lineWidth=1.8; ctx.stroke()

  // Dashed connector
  ctx.setLineDash([3,5])
  ctx.beginPath()
  ctx.moveTo(cx+Math.cos(angle)*HUB_R, cy+Math.sin(angle)*HUB_R)
  ctx.lineTo(px(ROOT_R,(ROOT_L+ROOT_R_A)/2), py(ROOT_R,(ROOT_L+ROOT_R_A)/2))
  ctx.strokeStyle=`rgba(${r},${g},${b},0.28)`; ctx.lineWidth=1; ctx.stroke()
  ctx.setLineDash([])

  // Label — upright always
  const ld = (ROOT_R + OUTER_R) * 0.58
  const lx = cx + Math.cos(angle+mid)*ld
  const ly = cy + Math.sin(angle+mid)*ld

  ctx.save()
  ctx.translate(lx, ly)

  ctx.font='16px serif'
  ctx.textAlign='center'
  ctx.fillStyle=`rgba(${r},${g},${b},${hovered?1:0.88})`
  ctx.fillText(sec.icon, 0, -14)

  ctx.font=`bold 9px "Courier New"`
  ctx.fillStyle=`rgba(${r},${g},${b},${hovered?1:0.85})`
  ctx.fillText(sec.name, 0, 4)

  ctx.font='7px "Courier New"'
  ctx.fillStyle=`rgba(255,255,255,${hovered?0.75:0.45})`
  ctx.fillText(sec.title.toUpperCase(), 0, 17)

  ctx.restore()
  ctx.restore()
}

function hitTest(mx, my, cx, cy, orbitAngle) {
  const dx=mx-cx, dy=my-cy
  const dist=Math.sqrt(dx*dx+dy*dy)
  if(dist < ROOT_R*0.8 || dist > OUTER_R*1.06) return -1
  const mAngle = Math.atan2(dy,dx)
  for(let i=0;i<5;i++){
    const ba = orbitAngle + (i*Math.PI*2)/5
    let rel = ((mAngle - ba) % (Math.PI*2) + Math.PI*2) % (Math.PI*2)
    if(rel > Math.PI) rel -= Math.PI*2
    if(rel >= OUTER_L-0.1 && rel <= OUTER_R_A+0.1) return i
  }
  return -1
}

function initStars(W, H) {
  return Array.from({length:200},()=>({
    x:Math.random()*W, y:Math.random()*H,
    r:Math.random()*1.6+0.3,
    base:Math.random()*0.5+0.15,
    phase:Math.random()*Math.PI*2,
    spd:Math.random()*0.018+0.006,
  }))
}

export default function SpacePortfolio() {
  const bgRef   = useRef(null)
  const mainRef = useRef(null)
  const scRef   = useRef(null)
  const pcRef   = useRef(null)
  const charRef = useRef(null)
  const gshRef  = useRef(null)

  const pausedRef  = useRef(false)
  const orbitRef   = useRef(0)
  const mouseRef   = useRef({x:-9999,y:-9999})
  const animRef    = useRef(null)
  const floatT     = useRef(0)
  const starsRef   = useRef([])
  const rStarsRef  = useRef([])
  const shootRef   = useRef(null)
  const shootTimer = useRef(0)
  const hovRef     = useRef(-1)

  const [activePanel, setActivePanel] = useState(null)
  const [spellIdx,    setSpellIdx]    = useState(0)
  const [spellText,   setSpellText]   = useState('')
  const [utcTime,     setUtcTime]     = useState('')
  const [termLine,    setTermLine]    = useState(0)
  const [termChar,    setTermChar]    = useState(0)
  const [termDone,    setTermDone]    = useState(false)

  // UTC clock
  useEffect(()=>{
    const t=()=>setUtcTime(new Date().toUTCString().slice(17,25))
    t(); const id=setInterval(t,1000); return()=>clearInterval(id)
  },[])

  // Terminal
  useEffect(()=>{
    if(termDone){ const t=setTimeout(()=>{setTermLine(0);setTermChar(0);setTermDone(false)},5000); return()=>clearTimeout(t) }
    if(termLine>=TERM_LINES.length){ setTermDone(true); return }
    const line=TERM_LINES[termLine]
    if(termChar<line.length){ const t=setTimeout(()=>setTermChar(c=>c+1),30); return()=>clearTimeout(t) }
    else{ const t=setTimeout(()=>{setTermLine(l=>l+1);setTermChar(0)},150); return()=>clearTimeout(t) }
  },[termLine,termChar,termDone])

  // Pause on modal
  useEffect(()=>{ pausedRef.current=activePanel!==null },[activePanel])

  // Spell burst
  function burst(px,py){
    const pc=pcRef.current; if(!pc) return
    pc.width=pc.offsetWidth; pc.height=pc.offsetHeight
    const ctx=pc.getContext('2d')
    const pts=Array.from({length:38},()=>({
      x:px,y:py,
      vx:(Math.random()-0.5)*14,vy:(Math.random()-0.5)*14,
      life:1,r:Math.random()*3+1
    }))
    let af
    const draw=()=>{
      ctx.clearRect(0,0,pc.width,pc.height)
      let alive=false
      pts.forEach(p=>{
        p.x+=p.vx;p.y+=p.vy;p.vy+=0.15;p.life-=0.032
        if(p.life>0){alive=true;ctx.beginPath();ctx.arc(p.x,p.y,p.r*p.life,0,Math.PI*2);ctx.fillStyle=`rgba(180,80,255,${p.life*0.85})`;ctx.fill()}
      })
      if(alive) af=requestAnimationFrame(draw)
      else ctx.clearRect(0,0,pc.width,pc.height)
    }
    draw()
  }

  function castSpell(e){
    const rect=e.currentTarget.getBoundingClientRect()
    burst(e.clientX-rect.left, e.clientY-rect.top)
    const sp=SPELLS[spellIdx]
    setSpellText(sp.name); setTimeout(()=>setSpellText(''),1800)
    setSpellIdx(i=>(i+1)%SPELLS.length)
    const ch=charRef.current; if(!ch) return
    if(spellIdx===2){ch.style.opacity='0.08';setTimeout(()=>ch.style.opacity='1',750)}
    else if(spellIdx===3){ch.style.filter='hue-rotate(160deg)';setTimeout(()=>ch.style.filter='none',700)}
    else if(spellIdx===4){ch.style.transform='translate(-50%,0) rotate(360deg) scale(1.15)';setTimeout(()=>ch.style.transform='translate(-50%,0)',600)}
    else if(spellIdx===5){ch.style.transform='translate(-50%,-16px) scale(1.18)';ch.style.filter='brightness(1.6)';setTimeout(()=>{ch.style.transform='translate(-50%,0)';ch.style.filter='none'},700)}
  }

  // Main RAF
  useEffect(()=>{
    const bg=bgRef.current, main=mainRef.current
    if(!bg||!main) return
    const bgCtx=bg.getContext('2d'), mainCtx=main.getContext('2d')
    let W=0,H=0,CX=0,CY=0,RW=320

    function resize(){
      W=window.innerWidth; H=window.innerHeight; RW=320
      bg.width=main.width=W; bg.height=main.height=H
      CX=(W-RW)/2; CY=H/2
      starsRef.current=initStars(W-RW,H)
    }
    resize()
    window.addEventListener('resize',resize)

    const onMove=(e)=>{
      const r=main.getBoundingClientRect()
      mouseRef.current={x:e.clientX-r.left,y:e.clientY-r.top}
    }
    main.addEventListener('mousemove',onMove)

    const onClick=(e)=>{
      const r=main.getBoundingClientRect()
      const hit=hitTest(e.clientX-r.left,e.clientY-r.top,CX,CY,orbitRef.current)
      if(hit>=0) setActivePanel(hit)
    }
    main.addEventListener('click',onClick)

    let shootDelay=5000+Math.random()*4000  // 5–9s random, avg ~7s

    function loop(){
      if(!pausedRef.current) orbitRef.current+=Math.PI*2/90/60*1.5

      const T=performance.now()/1000
      const {x:mx,y:my}=mouseRef.current

      // ── BG CANVAS ──
      bgCtx.clearRect(0,0,W,H)
      // Deep space — only left area
      const sg=bgCtx.createRadialGradient(CX,CY,0,CX,CY,Math.max(W,H)*0.8)
      sg.addColorStop(0,'#060d1a'); sg.addColorStop(0.5,'#030810'); sg.addColorStop(1,'#010408')
      bgCtx.fillStyle=sg; bgCtx.fillRect(0,0,W-RW,H)

      // Right panel bg is handled by DOM
      bgCtx.fillStyle='rgba(3,8,20,0.98)'; bgCtx.fillRect(W-RW,0,RW,H)

      // Nebula
      const nb=bgCtx.createRadialGradient(CX*0.55,CY*0.65,0,CX*0.55,CY*0.65,W*0.32)
      nb.addColorStop(0,'rgba(0,109,109,0.07)'); nb.addColorStop(0.5,'rgba(0,80,120,0.04)'); nb.addColorStop(1,'rgba(0,0,0,0)')
      bgCtx.fillStyle=nb; bgCtx.fillRect(0,0,W-RW,H)

      // Stars
      starsRef.current.forEach(s=>{
        const op=s.base+Math.sin(T*s.spd*60+s.phase)*0.28
        bgCtx.beginPath(); bgCtx.arc(s.x,s.y,s.r,0,Math.PI*2)
        bgCtx.fillStyle=`rgba(200,225,255,${Math.max(0,Math.min(1,op))})`;bgCtx.fill()
      })

      // Sine waves
      for(let w=0;w<2;w++){
        bgCtx.beginPath()
        for(let x=0;x<W-RW;x+=3){
          const y=CY+Math.sin(x*0.006+T*0.4+w*1.5)*55*(1-w*0.3)
          x===0?bgCtx.moveTo(x,y):bgCtx.lineTo(x,y)
        }
        bgCtx.strokeStyle=`rgba(0,109,109,${0.04+w*0.02})`; bgCtx.lineWidth=1; bgCtx.stroke()
      }

      // Shooting star
      shootTimer.current+=16.67
      if(shootTimer.current>=shootDelay){
        shootRef.current={x:Math.random()*(W-RW)*0.6,y:Math.random()*H*0.28,vx:5.5,vy:5.5,life:1}
        shootTimer.current=0; shootDelay=5000+Math.random()*4000
      }
      if(shootRef.current?.life>0){
        const s=shootRef.current
        s.x+=s.vx; s.y+=s.vy; s.life-=0.02
        const tg=bgCtx.createLinearGradient(s.x-140,s.y-140,s.x,s.y)
        tg.addColorStop(0,'rgba(255,255,255,0)'); tg.addColorStop(1,`rgba(255,255,255,${s.life*0.9})`)
        bgCtx.beginPath(); bgCtx.moveTo(s.x-140,s.y-140); bgCtx.lineTo(s.x,s.y)
        bgCtx.strokeStyle=tg; bgCtx.lineWidth=1.5; bgCtx.stroke()
        bgCtx.beginPath(); bgCtx.arc(s.x,s.y,2.5,0,Math.PI*2)
        bgCtx.fillStyle=`rgba(255,255,255,${s.life})`;bgCtx.fill()
      }

      // ── MAIN CANVAS ──
      mainCtx.clearRect(0,0,W,H)

      const hov=hitTest(mx,my,CX,CY,orbitRef.current)
      hovRef.current=hov
      main.style.cursor=hov>=0?'pointer':'default'

      // Draw 5 blades
      for(let i=0;i<5;i++){
        drawBlade(mainCtx,CX,CY,orbitRef.current+(i*Math.PI*2)/5,SECTIONS[i],hov===i)
      }

      // Right panel stars
      const sc=scRef.current
      if(sc){
        const sw=sc.offsetWidth,sh=sc.offsetHeight
        if(sc.width!==sw||sc.height!==sh){sc.width=sw;sc.height=sh}
        const sctx=sc.getContext('2d')
        sctx.clearRect(0,0,sw,sh)
        sctx.fillStyle='rgba(3,5,18,1)';sctx.fillRect(0,0,sw,sh)
        // Purple nebula
        const pn=sctx.createRadialGradient(sw/2,sh*0.38,0,sw/2,sh*0.38,sw*0.75)
        pn.addColorStop(0,'rgba(90,25,150,0.22)'); pn.addColorStop(0.5,'rgba(50,15,100,0.12)'); pn.addColorStop(1,'rgba(0,0,0,0)')
        sctx.fillStyle=pn;sctx.fillRect(0,0,sw,sh)
        if(rStarsRef.current.length===0) rStarsRef.current=Array.from({length:70},()=>({x:Math.random()*sw,y:Math.random()*sh,r:Math.random()*1.2+0.2,phase:Math.random()*Math.PI*2,spd:Math.random()*0.025+0.01}))
        rStarsRef.current.forEach(s=>{
          const op=0.28+Math.sin(T*s.spd*60+s.phase)*0.28
          sctx.beginPath();sctx.arc(s.x,s.y,s.r,0,Math.PI*2)
          sctx.fillStyle=`rgba(200,180,255,${Math.max(0,op)})`;sctx.fill()
        })
      }

      // Float character
      floatT.current+=0.016
      const ft=floatT.current
      if(charRef.current&&!charRef.current.dataset.animating){
        charRef.current.style.transform=`translate(-50%,${Math.sin(ft*0.9)*9}px) rotate(${Math.sin(ft*0.6)*1.8}deg)`
      }
      if(gshRef.current){
        const sh=Math.abs(Math.sin(ft*0.9))
        gshRef.current.style.opacity=`${0.45-sh*0.22}`
        gshRef.current.style.width=`${95-sh*16}px`
      }

      animRef.current=requestAnimationFrame(loop)
    }
    animRef.current=requestAnimationFrame(loop)
    return()=>{
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize',resize)
      main.removeEventListener('mousemove',onMove)
      main.removeEventListener('click',onClick)
    }
  },[])

  return (
    <section id="space-portfolio" style={{
      position:'relative',width:'100vw',height:'100vh',
      background:'#010408',overflow:'hidden',
      scrollSnapAlign:'start',scrollSnapStop:'always',
      fontFamily:"'Courier New',monospace",
    }}>
      <style>{`
        @keyframes hubPulse{0%,100%{box-shadow:0 0 18px rgba(0,180,255,0.4),0 0 40px rgba(0,109,109,0.2)}50%{box-shadow:0 0 38px rgba(0,180,255,0.8),0 0 90px rgba(0,109,109,0.45)}}
        @keyframes ePulse{0%{width:64px;height:64px;opacity:0.7}100%{width:260px;height:260px;opacity:0}}
        @keyframes nebPulse{0%,100%{transform:scale(1);opacity:0.7}50%{transform:scale(1.08);opacity:1}}
        @keyframes runeFloat{0%,100%{transform:translateY(0) rotate(0deg);opacity:0.32}50%{transform:translateY(-7px) rotate(12deg);opacity:0.65}}
        @keyframes orbPulse{0%{transform:translate(-50%,-50%) scale(0.35);opacity:0.7}100%{transform:translate(-50%,-50%) scale(1.4);opacity:0}}
        @keyframes scanMove{0%{top:-2px}100%{top:100%}}
        @keyframes tapBlink{0%,100%{opacity:0.25}50%{opacity:0.65}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes spellFadeOut{0%{opacity:1;transform:translate(-50%,-50%) scale(1.2)}100%{opacity:0;transform:translate(-50%,-50%) scale(0.85)}}
        @keyframes modalIn{0%{opacity:0;transform:translateY(18px) scale(0.97)}100%{opacity:1;transform:translateY(0) scale(1)}}
        .sp-modal{animation:modalIn 0.45s cubic-bezier(0.16,1,0.3,1) forwards}
      `}</style>

      {/* BG canvas — stars, nebula, waves */}
      <canvas ref={bgRef} style={{position:'absolute',inset:0,zIndex:0,pointerEvents:'none'}}/>

      {/* Main canvas — blades */}
      <canvas ref={mainRef} style={{position:'absolute',inset:0,zIndex:10}}/>

      {/* Scanline */}
      <div style={{position:'absolute',inset:0,width:'calc(100% - 320px)',zIndex:90,pointerEvents:'none',backgroundImage:'repeating-linear-gradient(transparent,transparent 3px,rgba(0,0,0,0.022) 4px)',backgroundSize:'100% 4px'}}/>

      {/* HUB — DOM */}
      <div style={{
        position:'absolute',zIndex:20,
        width:64,height:64,borderRadius:'50%',
        background:'radial-gradient(circle at 38% 35%,rgba(40,140,255,0.92),rgba(0,60,120,0.96),rgba(0,20,60,1))',
        border:'1.5px solid rgba(80,160,240,0.68)',
        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
        animation:'hubPulse 4s ease-in-out infinite',
        left:'calc((100vw - 320px) / 2)',top:'50vh',
        transform:'translate(-50%,-50%)',
        pointerEvents:'none',
      }}>
        <span style={{fontSize:24,fontWeight:800,color:'#64c8ff',lineHeight:1}}>A</span>
        <span style={{fontSize:5.5,letterSpacing:2,color:'rgba(100,200,255,0.65)',marginTop:2}}>CORE</span>
      </div>

      {/* Pulse rings around hub */}
      {[0,1].map(i=>(
        <div key={i} style={{
          position:'absolute',borderRadius:'50%',
          border:'1px solid rgba(0,180,255,0.38)',
          animation:`ePulse 5s ease-out ${i*2500}ms infinite`,
          left:'calc((100vw - 320px) / 2)',top:'50vh',
          transform:'translate(-50%,-50%)',
          zIndex:15,pointerEvents:'none',
        }}/>
      ))}

      {/* HEADER */}
      <div style={{position:'absolute',top:0,left:0,right:320,zIndex:50,pointerEvents:'none',padding:'14px 16px'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{
            width:36,height:36,flexShrink:0,
            clipPath:'polygon(25% 0%,75% 0%,100% 25%,100% 75%,75% 100%,25% 100%,0% 75%,0% 25%)',
            background:'linear-gradient(135deg,rgba(0,60,100,0.92),rgba(0,30,60,0.96))',
            border:'1px solid rgba(100,200,255,0.42)',
            display:'flex',alignItems:'center',justifyContent:'center',
          }}>
            <span style={{fontSize:12,fontWeight:700,color:'#64c8ff'}}>AK</span>
          </div>
          <div>
            <div style={{fontSize:10.5,fontWeight:700,color:'#e8f4ff',letterSpacing:1}}>ABHISHEK KUMAR</div>
            <div style={{fontSize:6.5,color:'rgba(100,200,255,0.42)',textTransform:'uppercase',letterSpacing:2}}>CS Engineer</div>
          </div>
        </div>
        <div style={{marginTop:12,fontSize:6.5,letterSpacing:1.5,color:'rgba(100,200,255,0.28)'}}>SYS // NOMINAL / ORB-7 // SECTOR-4</div>
      </div>

      {/* Bottom HUD */}
      <div style={{position:'absolute',bottom:9,left:13,zIndex:50,pointerEvents:'none',fontSize:6.5,letterSpacing:1.5,color:'rgba(100,200,255,0.28)'}}>UPTIME // 99.98% / SIGNAL // STRONG</div>
      <div style={{position:'absolute',bottom:9,right:330,zIndex:50,pointerEvents:'none',fontSize:6.5,letterSpacing:1.5,color:'rgba(100,200,255,0.28)'}}>{utcTime} UTC // CYCLE ACTIVE</div>

      {/* ── RIGHT PANEL 320px ── */}
      <div style={{
        position:'absolute',right:0,top:0,
        width:320,height:'100vh',
        background:'rgba(3,8,20,0.98)',
        borderLeft:'1px solid rgba(80,40,140,0.3)',
        display:'flex',flexDirection:'column',
        zIndex:30,overflow:'hidden',
      }}>

        {/* TOP BAR */}
        <div style={{
          padding:'8px 14px',
          borderBottom:'1px solid rgba(80,40,140,0.25)',
          display:'flex',alignItems:'center',justifyContent:'space-between',
          background:'rgba(5,2,18,0.9)',
        }}>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <span style={{fontSize:7,letterSpacing:2,color:'rgba(160,80,255,0.5)'}}>PWR:</span>
            {[1,1,1,1,0].map((v,i)=>(
              <div key={i} style={{width:12,height:6,background:v?'rgba(160,80,255,0.7)':'rgba(80,40,120,0.3)',borderRadius:1,marginRight:1}}/>
            ))}
          </div>
          <span style={{fontSize:8,letterSpacing:3,color:'#cc44ff',fontWeight:700,textShadow:'0 0 12px #cc44ff66'}}>PHANTOM CODER</span>
          <span style={{fontSize:7,letterSpacing:1.5,color:'rgba(160,80,255,0.5)'}}>HP:100%</span>
        </div>

        {/* CHARACTER AREA — 48% */}
        <div onClick={castSpell} style={{
          height:'48%',position:'relative',cursor:'pointer',overflow:'hidden',flexShrink:0,
        }}>
          <canvas ref={scRef} style={{position:'absolute',inset:0,zIndex:0,width:'100%',height:'100%'}}/>
          <canvas ref={pcRef} style={{position:'absolute',inset:0,zIndex:6,width:'100%',height:'100%',pointerEvents:'none'}}/>

          {/* Nebula glow */}
          <div style={{
            position:'absolute',zIndex:1,
            width:200,height:200,
            left:'50%',top:'42%',
            transform:'translate(-50%,-50%)',
            borderRadius:'50%',
            background:'radial-gradient(circle,rgba(120,40,200,0.28),rgba(60,20,120,0.15),transparent 70%)',
            animation:'nebPulse 4s ease-in-out infinite',
            pointerEvents:'none',
          }}/>

          {/* Runes */}
          {RUNES.map((r,i)=>(
            <div key={i} style={{
              position:'absolute',zIndex:2,fontSize:10,
              color:'rgba(160,80,255,0.5)',
              left:`${8+Math.floor(i/2)*25}%`,
              top:`${6+i%4*22}%`,
              animation:`runeFloat 6s ease-in-out ${i*0.75}s infinite`,
              pointerEvents:'none',
            }}>{r}</div>
          ))}

          {/* Orb pulse rings */}
          {[0,1].map(i=>(
            <div key={i} style={{
              position:'absolute',zIndex:4,borderRadius:'50%',
              border:'1px solid rgba(140,60,220,0.35)',
              width:50,height:50,
              left:'50%',top:'42%',
              animation:`orbPulse 3s ease-out ${i*1500}ms infinite`,
              pointerEvents:'none',
            }}/>
          ))}

          {/* PHANTOM CHARACTER SVG — bigger */}
          <div ref={charRef} style={{
            position:'absolute',
            bottom:'10%',left:'50%',
            transform:'translate(-50%,0)',
            transformOrigin:'bottom center',
            zIndex:3,
            transition:'opacity 0.15s,filter 0.15s',
          }}>
            <svg width="130" height="185" viewBox="0 0 210 298" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="cg" cx="50%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#2a0a50"/>
                  <stop offset="60%" stopColor="#120828"/>
                  <stop offset="100%" stopColor="#050510"/>
                </radialGradient>
                <radialGradient id="og" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#cc44ff"/>
                  <stop offset="100%" stopColor="#550088"/>
                </radialGradient>
                <radialGradient id="og2" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#44aaff"/>
                  <stop offset="100%" stopColor="#004488"/>
                </radialGradient>
                <filter id="gw"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                <filter id="gs"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              </defs>
              {/* Cloak body */}
              <ellipse cx="105" cy="205" rx="72" ry="88" fill="url(#cg)"/>
              <ellipse cx="105" cy="190" rx="56" ry="72" fill="#0e0520"/>
              {/* Hood outer */}
              <path d="M60 100 Q55 45 105 35 Q155 45 150 100 Q145 115 105 118 Q65 115 60 100Z" fill="#1a0838"/>
              {/* Hood inner shadow */}
              <path d="M68 98 Q65 55 105 47 Q145 55 142 98 Q138 110 105 112 Q72 110 68 98Z" fill="#0d0420"/>
              {/* Face */}
              <ellipse cx="105" cy="92" rx="30" ry="32" fill="#08041a"/>
              {/* Eyes with glow */}
              <ellipse id="eyeL" cx="92" cy="87" rx="7" ry="5" fill="#9933ff" filter="url(#gs)"/>
              <ellipse id="eyeR" cx="118" cy="87" rx="7" ry="5" fill="#9933ff" filter="url(#gs)"/>
              <ellipse cx="92" cy="86" rx="3.5" ry="2.5" fill="#ffffff" opacity="0.8"/>
              <ellipse cx="118" cy="86" rx="3.5" ry="2.5" fill="#ffffff" opacity="0.8"/>
              {/* Mouth */}
              <path id="mouthP" d="M96 104 Q105 110 114 104" stroke="#664488" strokeWidth="1.8" fill="none" opacity="0.7"/>
              {/* Chest rune */}
              <text x="105" y="178" textAnchor="middle" fontSize="22" fill="rgba(150,80,240,0.55)" fontFamily="serif">⬡</text>
              {/* Shoulder lines */}
              <path d="M55 145 Q45 165 50 195" stroke="rgba(120,60,200,0.3)" strokeWidth="1.5" fill="none"/>
              <path d="M155 145 Q165 165 160 195" stroke="rgba(120,60,200,0.3)" strokeWidth="1.5" fill="none"/>
              {/* Scan line */}
              <rect x="62" y="78" width="86" height="2.5" fill="rgba(100,200,255,0.1)" style={{animation:'scanMove 3s linear infinite'}}/>
              {/* Left orb */}
              <circle id="orbL" cx="48" cy="168" r="18" fill="url(#og)" filter="url(#gw)" opacity="0.88"/>
              <circle cx="48" cy="164" r="8" fill="rgba(230,170,255,0.65)"/>
              <circle cx="44" cy="161" r="3" fill="rgba(255,255,255,0.5)"/>
              {/* Right orb */}
              <circle id="orbR" cx="162" cy="168" r="18" fill="url(#og2)" filter="url(#gw)" opacity="0.82"/>
              <circle cx="162" cy="164" r="8" fill="rgba(170,210,255,0.65)"/>
              <circle cx="158" cy="161" r="3" fill="rgba(255,255,255,0.5)"/>
              {/* Cloak bottom */}
              <path d="M33 258 Q55 298 105 300 Q155 298 177 258 Q168 292 105 295 Q42 292 33 258Z" fill="#06020f"/>
              {/* Cloak side folds */}
              <path d="M55 180 Q38 220 42 265" stroke="rgba(80,30,130,0.35)" strokeWidth="2" fill="none"/>
              <path d="M155 180 Q172 220 168 265" stroke="rgba(80,30,130,0.35)" strokeWidth="2" fill="none"/>
            </svg>
            {/* Ground shadow */}
            <div ref={gshRef} style={{
              width:95,height:11,borderRadius:'50%',
              background:'radial-gradient(ellipse,rgba(120,40,200,0.4),transparent 70%)',
              margin:'0 auto',transition:'width 0.1s,opacity 0.1s',
            }}/>
          </div>

          {/* Corner HUD labels */}
          {[
            {s:{top:8,left:6},t:'PHANTOM // ONLINE\nMANA // ████████'},
            {s:{top:8,right:6},t:'SPELL // READY\nDARK // ARTS',a:'right'},
            {s:{bottom:6,left:6},t:'COMMITS // 200+\nBUGS // HEXED'},
            {s:{bottom:6,right:6},t:'STACK // FULL\nVIBE // MAX',a:'right'},
          ].map((h,i)=>(
            <div key={i} style={{
              position:'absolute',zIndex:8,fontSize:5.5,
              color:'rgba(160,80,255,0.38)',lineHeight:1.7,
              whiteSpace:'pre',textAlign:h.a||'left',...h.s,
            }}>{h.t}</div>
          ))}

          {/* Bottom right version */}
          <div style={{position:'absolute',bottom:6,right:8,zIndex:8,fontSize:6,color:'rgba(160,80,255,0.3)',letterSpacing:1}}>v2.0</div>

          {/* Spell text */}
          {spellText&&(
            <div style={{
              position:'absolute',top:'50%',left:'50%',zIndex:9,
              fontSize:10,fontWeight:700,whiteSpace:'nowrap',
              color:SPELLS.find(s=>s.name===spellText)?.color||'#cc44ff',
              textShadow:`0 0 20px ${SPELLS.find(s=>s.name===spellText)?.color||'#cc44ff'}`,
              animation:'spellFadeOut 1.8s ease-out forwards',
              pointerEvents:'none',
            }}>{spellText}</div>
          )}

          {/* Tap hint */}
          <div style={{
            position:'absolute',bottom:6,left:'50%',transform:'translateX(-50%)',
            zIndex:9,fontSize:6,color:'rgba(160,80,255,0.45)',
            animation:'tapBlink 1.5s ease-in-out infinite',
            letterSpacing:1.5,whiteSpace:'nowrap',
          }}>TAP TO CAST</div>

          {/* Scanline */}
          <div style={{position:'absolute',inset:0,zIndex:10,pointerEvents:'none',overflow:'hidden'}}>
            <div style={{position:'absolute',left:0,right:0,height:2,background:'linear-gradient(to bottom,transparent,rgba(140,80,255,0.07),transparent)',animation:'scanMove 3s linear infinite'}}/>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div style={{flex:1,padding:'8px 12px 10px',display:'flex',flexDirection:'column',gap:7,overflow:'hidden',minHeight:0}}>
          <div style={{fontSize:5.5,letterSpacing:3,color:'rgba(0,200,200,0.32)',textTransform:'uppercase',flexShrink:0}}>// Core Metrics</div>

          {/* 2×2 metrics */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,flexShrink:0}}>
            {[
              {val:'500+',lbl:'LeetCode',sub:'problems solved',col:'#f0a030'},
              {val:'8.9', lbl:'CGPA / 10',sub:'B.Tech CSE',col:'#4cc8a0'},
              {val:'200+',lbl:'Git Commits',sub:'contributions',col:'#c080ff'},
              {val:'300+',lbl:'Merged PRs',sub:'open source',col:'#40b8ff'},
            ].map((m,i)=>(
              <div key={i} style={{
                background:'rgba(0,8,22,0.85)',
                border:'1px solid rgba(0,109,109,0.2)',
                borderTop:`2px solid ${m.col}`,
                borderRadius:6,padding:'7px 9px',
              }}>
                <div style={{fontSize:15,fontWeight:700,color:m.col,lineHeight:1,fontFamily:"'Courier New',monospace"}}>{m.val}</div>
                <div style={{fontSize:6,color:'rgba(255,255,255,0.55)',marginTop:2,letterSpacing:0.5}}>{m.lbl}</div>
                <div style={{fontSize:5,color:'rgba(255,255,255,0.28)',marginTop:1}}>{m.sub}</div>
              </div>
            ))}
          </div>

          {/* Terminal */}
          <div style={{
            flex:1,minHeight:0,
            background:'rgba(0,4,14,0.92)',
            border:'1px solid rgba(0,109,109,0.2)',
            borderRadius:6,overflow:'hidden',
            display:'flex',flexDirection:'column',
          }}>
            <div style={{
              padding:'5px 9px',
              background:'rgba(0,12,32,0.85)',
              borderBottom:'1px solid rgba(0,109,109,0.15)',
              display:'flex',alignItems:'center',gap:5,flexShrink:0,
            }}>
              {['#ff5f57','#febc2e','#28c840'].map((c,i)=>(
                <div key={i} style={{width:7,height:7,borderRadius:'50%',background:c}}/>
              ))}
              <span style={{fontSize:5.5,color:'rgba(100,200,255,0.5)',marginLeft:4,letterSpacing:1}}>AK@PORTFOLIO</span>
            </div>
            <div style={{flex:1,padding:'6px 9px',overflowY:'hidden',fontSize:6.5,lineHeight:1.95,fontFamily:"'Courier New',monospace"}}>
              {TERM_LINES.slice(0,termLine).map((line,i)=>(
                <div key={i} style={{color:line.startsWith('>')? 'rgba(0,210,155,0.75)':line.startsWith('$')?'rgba(100,200,255,0.9)':'rgba(100,200,255,0.55)'}}>{line}</div>
              ))}
              {termLine<TERM_LINES.length&&(
                <div style={{color:TERM_LINES[termLine].startsWith('>')?'rgba(0,210,155,0.75)':'rgba(100,200,255,0.55)'}}>
                  {TERM_LINES[termLine].slice(0,termChar)}
                  <span style={{display:'inline-block',width:4,height:8,background:'#64c8ff',verticalAlign:'middle',marginLeft:1,animation:'blink 0.9s step-end infinite'}}/>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── MODAL ── */}
      {activePanel!==null&&(
        <div onClick={()=>setActivePanel(null)} style={{
          position:'fixed',inset:0,zIndex:200,
          background:'rgba(1,5,15,0.92)',
          display:'flex',alignItems:'center',justifyContent:'center',padding:20,
        }}>
          <div className="sp-modal" onClick={e=>e.stopPropagation()} style={{
            width:520,maxWidth:'88vw',maxHeight:'82vh',overflowY:'auto',
            background:'rgba(3,10,26,0.98)',
            border:`1px solid ${SECTIONS[activePanel].color}44`,
            borderRadius:14,padding:'28px 32px',position:'relative',
            boxShadow:`0 0 70px ${SECTIONS[activePanel].color}1a,0 24px 80px rgba(0,0,0,0.85)`,
          }}>
            <button onClick={()=>setActivePanel(null)} style={{
              position:'absolute',top:14,right:16,background:'none',border:'none',
              color:'rgba(255,255,255,0.38)',fontSize:20,cursor:'pointer',
              transition:'color .2s',lineHeight:1,
            }}
              onMouseEnter={e=>e.currentTarget.style.color='#fff'}
              onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.38)'}
            >✕</button>
            <div style={{fontFamily:'monospace',fontSize:7,letterSpacing:2,color:SECTIONS[activePanel].color,textTransform:'uppercase',marginBottom:8}}>{SECTIONS[activePanel].name} // MODULE</div>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:'clamp(1.6rem,3vw,2.2rem)',fontWeight:800,color:'#fff',marginBottom:12,letterSpacing:'-0.02em'}}>{SECTIONS[activePanel].title}</h2>
            <div style={{height:2,width:36,marginBottom:18,background:`linear-gradient(90deg,${SECTIONS[activePanel].color},transparent)`}}/>
            <p style={{fontSize:13,color:'rgba(255,255,255,0.48)',lineHeight:1.78,marginBottom:24,fontFamily:"'Space Grotesk',sans-serif"}}>{SECTIONS[activePanel].desc}</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:24}}>
              {SECTIONS[activePanel].items.map((item,i)=>(
                <div key={i} style={{
                  background:'rgba(0,8,28,0.85)',
                  border:`1px solid ${SECTIONS[activePanel].color}22`,
                  borderLeft:`3px solid ${SECTIONS[activePanel].color}88`,
                  borderRadius:8,padding:'12px 14px',
                }}>
                  <div style={{fontSize:20,marginBottom:6}}>{item.icon}</div>
                  <div style={{fontSize:12,fontWeight:600,color:'rgba(255,255,255,0.88)',fontFamily:"'Space Grotesk',sans-serif",marginBottom:3}}>{item.heading}</div>
                  <div style={{fontSize:11,color:'rgba(255,255,255,0.38)',fontFamily:"'Space Grotesk',sans-serif",lineHeight:1.5}}>{item.sub}</div>
                </div>
              ))}
            </div>
            <button style={{
              width:'100%',padding:13,background:'transparent',
              border:`1px solid ${SECTIONS[activePanel].color}66`,
              borderRadius:8,color:SECTIONS[activePanel].color,
              fontFamily:"'Courier New',monospace",fontSize:11,letterSpacing:2,
              cursor:'pointer',transition:'all .3s',
            }}
              onMouseEnter={e=>{e.currentTarget.style.background=`${SECTIONS[activePanel].color}18`;e.currentTarget.style.borderColor=SECTIONS[activePanel].color}}
              onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.borderColor=`${SECTIONS[activePanel].color}66`}}
            >{SECTIONS[activePanel].cta}</button>
          </div>
        </div>
      )}
    </section>
  )
}