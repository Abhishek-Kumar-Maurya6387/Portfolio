'use client'
import { useEffect, useRef, useState } from 'react'

const SKILLS = [
  { name:'React.js',   pct:92, cat:'Frontend' },
  { name:'Next.js',    pct:88, cat:'Frontend' },
  { name:'JavaScript', pct:90, cat:'Language' },
  { name:'TypeScript', pct:85, cat:'Language' },
  { name:'Node.js',    pct:85, cat:'Backend'  },
  { name:'Express',    pct:82, cat:'Backend'  },
  { name:'Tailwind',   pct:90, cat:'Frontend' },
  { name:'MongoDB',    pct:80, cat:'Database' },
  { name:'Python',     pct:80, cat:'Language' },
  { name:'PostgreSQL', pct:75, cat:'Database' },
  { name:'Git',        pct:90, cat:'Tools'    },
  { name:'Docker',     pct:70, cat:'DevOps'   },
]
const RINGS = [
  { idxs:[0,1,2,3],   rF:0.30, size:72 },  // ring 1 — more space, bigger orbs
  { idxs:[4,5,6,7,8], rF:0.46, size:62 },  // ring 2 — pushed out, less overlap
  { idxs:[9,10,11],   rF:0.60, size:55 },  // ring 3 — outermost, spacious
]

function BgAurora() {
  const c = useRef(null)
  useEffect(()=>{
    const el=c.current; if(!el) return
    const ctx=el.getContext('2d'); let t=0,raf
    const draw=()=>{
      el.width=el.offsetWidth; el.height=el.offsetHeight; ctx.clearRect(0,0,el.width,el.height)
      for(let b=0;b<4;b++){
        const g=ctx.createLinearGradient(0,el.height*.2,el.width,el.height*.8)
        const h=160+b*35+Math.sin(t+b)*20
        g.addColorStop(0,`hsla(${h},80%,40%,0)`)
        g.addColorStop(.4,`hsla(${h},80%,45%,.06)`)
        g.addColorStop(1,`hsla(${h+60},60%,40%,0)`)
        ctx.fillStyle=g; ctx.beginPath()
        for(let x=0;x<=el.width;x+=4){ const y=el.height*.3+Math.sin(x*.005+t+b*1.2)*el.height*.25; x===0?ctx.moveTo(x,y):ctx.lineTo(x,y) }
        ctx.lineTo(el.width,el.height); ctx.lineTo(0,el.height); ctx.closePath(); ctx.fill()
      }
      t+=.008; raf=requestAnimationFrame(draw)
    }
    draw(); return()=>cancelAnimationFrame(raf)
  },[])
  return <canvas ref={c} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0}}/>
}

function BgParticles() {
  const c = useRef(null)
  useEffect(()=>{
    const el=c.current; if(!el) return
    const ctx=el.getContext('2d'); let raf
    const pts=Array.from({length:40},()=>({x:Math.random()*900,y:Math.random()*600,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,r:Math.random()*2+1}))
    const draw=()=>{
      el.width=el.offsetWidth; el.height=el.offsetHeight; ctx.clearRect(0,0,el.width,el.height)
      pts.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy
        if(p.x<0)p.x=el.width; if(p.x>el.width)p.x=0
        if(p.y<0)p.y=el.height; if(p.y>el.height)p.y=0
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fillStyle='rgba(0,180,160,.25)'; ctx.fill()
      })
      raf=requestAnimationFrame(draw)
    }
    draw(); return()=>cancelAnimationFrame(raf)
  },[])
  return <canvas ref={c} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0}}/>
}

export default function Skills() {
  const stageRef = useRef(null)
  const svgRef   = useRef(null)
  const orbsRef  = useRef([])
  const rotRef   = useRef(0)
  const rafRef   = useRef(null)
  const builtRef = useRef(false)
  const [hovered, setHovered] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting){setVisible(true);obs.disconnect()} },{threshold:.15})
    if(stageRef.current) obs.observe(stageRef.current)
    return()=>obs.disconnect()
  },[])

  useEffect(()=>{
    if(!visible||builtRef.current) return
    builtRef.current=true
    build()
    startRotate()
    return()=>cancelAnimationFrame(rafRef.current)
  },[visible])

  function getPos(ri,j,total,rPx,angle=0){
    const stage=stageRef.current; if(!stage) return {x:0,y:0}
    const cx=stage.offsetWidth/2, cy=stage.offsetHeight/2
    const base=(j/total)*Math.PI*2-Math.PI/2
    const a=base+angle*(ri%2===0?1:-0.65)
    return {x:cx+Math.cos(a)*rPx, y:cy+Math.sin(a)*rPx}
  }

  function build(){
    const stage=stageRef.current, svg=svgRef.current; if(!stage||!svg) return
    stage.querySelectorAll('.sk-orb').forEach(e=>e.remove())
    svg.innerHTML=''
    const W=stage.offsetWidth, H=stage.offsetHeight
    svg.setAttribute('viewBox',`0 0 ${W} ${H}`)
    orbsRef.current=[]

    RINGS.forEach((ring,ri)=>{
      const rPx=Math.min(W,H)*ring.rF
      ring.idxs.forEach((si,j)=>{
        const s=SKILLS[si], fp=getPos(ri,j,ring.idxs.length,rPx,0)
        // Line
        const line=document.createElementNS('http://www.w3.org/2000/svg','line')
        line.setAttribute('x1',W/2); line.setAttribute('y1',H/2)
        line.setAttribute('x2',fp.x); line.setAttribute('y2',fp.y)
        line.setAttribute('stroke','rgba(0,160,160,.15)')
        line.setAttribute('stroke-width','1')
        line.setAttribute('stroke-dasharray','3,5')
        svg.appendChild(line)
        // Orb
        const orb=document.createElement('div')
        orb.className='sk-orb'
        orb.style.cssText=`position:absolute;border-radius:50%;cursor:pointer;z-index:6;width:${ring.size}px;height:${ring.size}px;left:${fp.x}px;top:${fp.y}px;display:flex;align-items:center;justify-content:center;transform:translate(-50%,-50%) scale(0);opacity:0;transition:opacity .5s ease;`
        orb.innerHTML=`<div class="orb-inner" style="width:100%;height:100%;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;border:1.5px solid rgba(0,200,200,.45);background:rgba(0,8,8,.85);backdrop-filter:blur(6px);position:relative;overflow:hidden;transition:all .3s;">
          <div style="position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 30% 30%,rgba(0,180,180,.22),transparent 60%);"></div>
          <div style="font-size:.58rem;font-weight:700;color:rgba(255,255,255,.92);text-align:center;line-height:1.2;padding:0 3px;position:relative;z-index:1;">${s.name}</div>
          <div style="font-size:.55rem;color:#00c0c0;font-family:monospace;position:relative;z-index:1;margin-top:1px;">${s.pct}%</div>
        </div>`
        orb.addEventListener('mouseenter',()=>{
          setHovered(s)
          orb.style.transform='translate(-50%,-50%) scale(1.25)'
          orb.querySelector('.orb-inner').style.boxShadow='0 0 30px rgba(0,210,210,.55),inset 0 0 20px rgba(0,109,109,.15)'
          orb.querySelector('.orb-inner').style.borderColor='#00e0e0'
        })
        orb.addEventListener('mouseleave',()=>{
          setHovered(null)
          orb.style.transform=''
          orb.querySelector('.orb-inner').style.boxShadow=''
          orb.querySelector('.orb-inner').style.borderColor='rgba(0,200,200,.45)'
        })
        stage.appendChild(orb)
        const gIdx=RINGS.slice(0,ri).reduce((s,r)=>s+r.idxs.length,0)+j
        setTimeout(()=>{ orb.style.transform='translate(-50%,-50%) scale(1)'; orb.style.opacity='1' },gIdx*90+400)
        orbsRef.current.push({orb,line,ri,j,total:ring.idxs.length,rPx,si})
      })
    })
  }

  function startRotate(){
    cancelAnimationFrame(rafRef.current)
    const tick=()=>{
      rotRef.current+=.003
      const stage=stageRef.current, svg=svgRef.current; if(!stage||!svg) return
      const W=stage.offsetWidth, H=stage.offsetHeight
      const lines=svg.querySelectorAll('line')
      orbsRef.current.forEach((o,idx)=>{
        if(o.orb.matches(':hover')) return
        const base=(o.j/o.total)*Math.PI*2-Math.PI/2
        const angle=rotRef.current*(o.ri%2===0?1:-0.65)
        const a=base+angle
        const rPx=Math.min(W,H)*RINGS[o.ri].rF
        const x=W/2+Math.cos(a)*rPx, y=H/2+Math.sin(a)*rPx
        o.orb.style.left=x+'px'; o.orb.style.top=y+'px'
        if(lines[idx]){lines[idx].setAttribute('x2',x);lines[idx].setAttribute('y2',y)}
      })
      rafRef.current=requestAnimationFrame(tick)
    }
    tick()
  }

  return (
    <section id="skills" style={{minHeight:'100vh',scrollSnapAlign:'start',scrollSnapStop:'always',background:'#000',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'5rem 2rem',position:'relative',overflow:'hidden'}}>
      <BgAurora/>
      <BgParticles/>
      {/* 3 ambient blobs */}
      {[{w:380,top:'15%',left:'10%'},{w:300,bottom:'10%',right:'5%'},{w:200,top:'50%',left:'52%'}].map((b,i)=>(
        <div key={i} style={{position:'absolute',width:b.w,height:b.w,borderRadius:'50%',background:'radial-gradient(circle,rgba(0,109,109,.1) 0%,transparent 70%)',filter:'blur(30px)',pointerEvents:'none',zIndex:1,...b}}/>
      ))}
      {/* Title */}
      <div style={{textAlign:'center',marginBottom:'1.5rem',position:'relative',zIndex:2,opacity:visible?1:0,transform:visible?'translateY(0)':'translateY(30px)',transition:'all .8s ease'}}>
        <p style={{fontFamily:"'JetBrains Mono',monospace",fontSize:'.7rem',color:'rgba(0,200,200,.5)',letterSpacing:'.22em',textTransform:'uppercase',marginBottom:'.4rem'}}>— Capabilities —</p>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:'clamp(2rem,5vw,3.2rem)',fontWeight:800,color:'#006D6D',letterSpacing:'-.02em',textShadow:'0 0 40px rgba(0,109,109,.55)'}}>Skills</h2>
        <div style={{width:55,height:2,background:'#006D6D',margin:'.5rem auto 0',boxShadow:'0 0 10px #006D6D'}}/>
      </div>
      {/* Stage */}
      <div ref={stageRef} style={{position:'relative',width:'100%',maxWidth:880,height:'clamp(360px,52vh,540px)',zIndex:2}}>
        <svg ref={svgRef} style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:3,width:'100%',height:'100%'}}/>
        {/* Pulse rings */}
        {[0,1].map(i=>(
          <div key={i} style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:90,height:90,borderRadius:'50%',border:'1px solid rgba(0,109,109,.3)',animation:`skPulse 2.5s ease-out ${i*.85}s infinite`,pointerEvents:'none',zIndex:4}}/>
        ))}
        {/* Center */}
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',textAlign:'center',zIndex:10,pointerEvents:'none',width:120}}>
          <div style={{fontSize:'.58rem',letterSpacing:'.15em',color:'rgba(0,200,200,.5)',textTransform:'uppercase',marginBottom:2,transition:'all .3s'}}>{hovered?hovered.cat:'Full Stack'}</div>
          <div style={{fontSize:'.82rem',fontWeight:700,color:'#fff',minHeight:20,transition:'all .3s'}}>{hovered?hovered.name:'Abhishek'}</div>
          <div style={{fontSize:'1.6rem',fontWeight:800,color:'#006D6D',textShadow:'0 0 25px rgba(0,109,109,.8)',minHeight:40,fontFamily:'monospace',transition:'all .3s'}}>{hovered?hovered.pct+'%':'Dev'}</div>
          {hovered&&(
            <div style={{width:90,height:3,background:'rgba(255,255,255,.06)',borderRadius:2,margin:'4px auto 0',overflow:'hidden'}}>
              <div style={{height:'100%',width:hovered.pct+'%',background:'linear-gradient(90deg,#006D6D,#00c8c8)',boxShadow:'0 0 8px rgba(0,109,109,.6)',transition:'width .5s ease'}}/>
            </div>
          )}
          {/* Tooltip below center */}
          {hovered&&(
            <div style={{marginTop:8,background:'rgba(0,15,15,.95)',border:'1px solid rgba(0,200,200,.25)',borderRadius:8,padding:'6px 12px',fontSize:'.7rem',fontFamily:'monospace',color:'rgba(0,200,200,.7)',whiteSpace:'nowrap',boxShadow:'0 0 20px rgba(0,109,109,.25)'}}>
              {hovered.cat} · {hovered.pct}% proficiency
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes skPulse{0%{transform:translate(-50%,-50%) scale(1);opacity:.6}100%{transform:translate(-50%,-50%) scale(3);opacity:0}}`}</style>
    </section>
  )
}