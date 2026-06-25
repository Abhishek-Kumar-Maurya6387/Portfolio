'use client'
import { useEffect, useRef, useState } from 'react'
import { FaGithub, FaLinkedin, FaInstagram, FaXTwitter, FaEnvelope } from 'react-icons/fa6'

function useCanvas(drawFn) {
  const ref = useRef(null)
  useEffect(()=>{
    const c=ref.current; if(!c) return
    const ctx=c.getContext('2d'); let t=0,raf
    const loop=()=>{ c.width=c.offsetWidth; c.height=c.offsetHeight; drawFn(ctx,c.width,c.height,t); t+=.016; raf=requestAnimationFrame(loop) }
    loop(); return()=>cancelAnimationFrame(raf)
  },[])
  return ref
}
function BgAurora(){
  const ref=useCanvas((ctx,W,H,t)=>{
    ctx.clearRect(0,0,W,H)
    for(let b=0;b<4;b++){
      const g=ctx.createLinearGradient(0,H*.2,W,H*.8)
      const h=160+b*35+Math.sin(t*.5+b)*20
      g.addColorStop(0,`hsla(${h},80%,40%,0)`); g.addColorStop(.4,`hsla(${h},80%,45%,.07)`); g.addColorStop(1,`hsla(${h+60},60%,40%,0)`)
      ctx.fillStyle=g; ctx.beginPath()
      for(let x=0;x<=W;x+=4){ const y=H*.3+Math.sin(x*.005+t*.5+b*1.2)*H*.25; x===0?ctx.moveTo(x,y):ctx.lineTo(x,y) }
      ctx.lineTo(W,H); ctx.lineTo(0,H); ctx.closePath(); ctx.fill()
    }
  })
  return <canvas ref={ref} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0}}/>
}
function BgParticles(){
  const pts=useRef(Array.from({length:35},()=>({x:Math.random()*900,y:Math.random()*600,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,r:Math.random()*2+1})))
  const ref=useCanvas((ctx,W,H)=>{
    ctx.clearRect(0,0,W,H)
    pts.current.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy
      if(p.x<0)p.x=W; if(p.x>W)p.x=0; if(p.y<0)p.y=H; if(p.y>H)p.y=0
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle='rgba(0,180,160,.25)'; ctx.fill()
    })
    for(let i=0;i<pts.current.length;i++) for(let j=i+1;j<pts.current.length;j++){
      const d=Math.hypot(pts.current[i].x-pts.current[j].x,pts.current[i].y-pts.current[j].y)
      if(d<80){ ctx.beginPath(); ctx.moveTo(pts.current[i].x,pts.current[i].y); ctx.lineTo(pts.current[j].x,pts.current[j].y); ctx.strokeStyle=`rgba(0,180,140,${.1*(1-d/80)})`; ctx.lineWidth=.5; ctx.stroke() }
    }
  })
  return <canvas ref={ref} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0}}/>
}
function BgWave(){
  const ref=useCanvas((ctx,W,H,t)=>{
    ctx.clearRect(0,0,W,H)
    for(let w=0;w<5;w++){
      ctx.beginPath()
      for(let x=0;x<=W;x+=3){ const y=H/2+Math.sin(x*.008+t*1.1+w*.7)*(35+w*15)+Math.sin(x*.014+t*1.3)*18; x===0?ctx.moveTo(x,y):ctx.lineTo(x,y) }
      ctx.strokeStyle=`rgba(0,${148+w*12},${148+w*12},${.035+w*.01})`; ctx.lineWidth=1.2; ctx.stroke()
    }
  })
  return <canvas ref={ref} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0}}/>
}

const SOCIALS=[
  {Icon:FaGithub,   label:'GitHub',      href:'https://github.com/Abhishek-Kumar-Maurya6387',                     handle:'@Abhishek-Kumar-Maurya6387'},
  {Icon:FaLinkedin, label:'LinkedIn',    href:'https://www.linkedin.com/in/abhishek-kumar-maurya-1a1597329',       handle:'Abhishek Kumar Maurya'},
  {Icon:FaInstagram,label:'Instagram',   href:'https://www.instagram.com/raja_banarasi63',                         handle:'@raja_banarasi63'},
  {Icon:FaXTwitter, label:'X (Twitter)',href:'https://x.com/raja_banarasi63',                                     handle:'@raja_banarasi63'},
  {Icon:FaEnvelope, label:'Email',       href:'mailto:your.email@gmail.com',                                       handle:'your.email@gmail.com'},
]

const CORNERS=[
  {top:20,left:20,borderTop:'2px solid',borderLeft:'2px solid'},
  {top:20,right:20,borderTop:'2px solid',borderRight:'2px solid'},
  {bottom:20,left:20,borderBottom:'2px solid',borderLeft:'2px solid'},
  {bottom:20,right:20,borderBottom:'2px solid',borderRight:'2px solid'},
]

const iStyle={width:'100%',background:'rgba(0,109,109,.04)',border:'1px solid rgba(0,109,109,.2)',borderRadius:8,padding:'12px 16px',color:'rgba(255,255,255,.8)',fontFamily:"'Space Grotesk',sans-serif",fontSize:'.9rem',outline:'none',boxSizing:'border-box',transition:'border-color .3s'}
const lStyle={display:'block',fontFamily:"'JetBrains Mono',monospace",fontSize:'.7rem',color:'#006D6D',letterSpacing:'.12em',marginBottom:'.5rem',textTransform:'uppercase'}

export default function Contact() {
  const [vis, setVis] = useState(false)
  const [form,setForm]= useState({name:'',email:'',message:''})
  const [sent,setSent]= useState(false)
  const ref = useRef(null)

  useEffect(()=>{
    const el=ref.current; if(!el) return
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true)},{threshold:.12})
    obs.observe(el); return()=>obs.disconnect()
  },[])

  const send=()=>{
    window.open(`mailto:your.email@gmail.com?subject=Portfolio Contact from ${form.name}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${form.email}`)
    setSent(true); setTimeout(()=>setSent(false),3000)
  }

  return (
    <section ref={ref} id="contact" style={{position:'relative',minHeight:'100vh',scrollSnapAlign:'start',scrollSnapStop:'always',background:'#000',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',padding:'5rem 2rem'}}>
      <BgWave/><BgAurora/><BgParticles/>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at center,rgba(0,0,0,.45) 0%,rgba(0,0,0,.82) 100%)',zIndex:1,pointerEvents:'none'}}/>

      {/* HUD */}
      <div style={{position:'absolute',inset:0,zIndex:2,pointerEvents:'none'}}>
        {CORNERS.map((c,i)=><div key={i} style={{position:'absolute',width:28,height:28,borderColor:'rgba(0,200,200,.35)',...c}}/>)}
        <div style={{position:'absolute',top:18,left:'50%',transform:'translateX(-50%)',fontFamily:'monospace',fontSize:'.62rem',color:'rgba(0,200,200,.45)',letterSpacing:'.2em'}}>CONTACT.INIT</div>
        <div style={{position:'absolute',inset:0,overflow:'hidden'}}><div style={{position:'absolute',left:0,right:0,height:2,background:'linear-gradient(to bottom,transparent,rgba(0,200,200,.04),transparent)',animation:'scanline 6s linear infinite'}}/></div>
      </div>

      {/* Content */}
      <div style={{position:'relative',zIndex:5,width:'100%',maxWidth:980,opacity:vis?1:0,transform:vis?'translateY(0)':'translateY(40px)',transition:'all .9s ease'}}>
        {/* Title */}
        <div style={{textAlign:'center',marginBottom:'3rem'}}>
          <p style={{fontFamily:"'JetBrains Mono',monospace",fontSize:'.7rem',color:'rgba(0,200,200,.5)',letterSpacing:'.22em',textTransform:'uppercase',marginBottom:'.5rem'}}>— Get In Touch —</p>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:'clamp(2.8rem,6vw,5rem)',fontWeight:700,color:'rgba(255,255,255,0.92)',letterSpacing:'-.02em',lineHeight:1,marginBottom:'.3rem'}}>
            Let's <span style={{color:'#006D6D',textShadow:'0 0 30px rgba(0,109,109,.55)'}}>Connect</span>
          </h2>
          <div style={{width:55,height:2,background:'#006D6D',margin:'.6rem auto 0',boxShadow:'0 0 10px #006D6D'}}/>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(290px,1fr))',gap:'3rem'}}>
          {/* Form */}
          <div>
            <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:'1.1rem',fontWeight:600,color:'rgba(255,255,255,.65)',marginBottom:'1.4rem'}}>Send a Message</h3>
            {[{k:'name',l:'Your Name',t:'text',ph:'Abhishek Maurya'},{k:'email',l:'Your Email',t:'email',ph:'you@example.com'}].map(f=>(
              <div key={f.k} style={{marginBottom:'1rem'}}>
                <label style={lStyle}>{f.l}</label>
                <input type={f.t} placeholder={f.ph} value={form[f.k]}
                  onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))}
                  style={iStyle}
                  onFocus={e=>e.target.style.borderColor='#006D6D'}
                  onBlur={e=>e.target.style.borderColor='rgba(0,109,109,.2)'}
                />
              </div>
            ))}
            <div style={{marginBottom:'1.4rem'}}>
              <label style={lStyle}>Message</label>
              <textarea rows={5} placeholder="Tell me about your project..." value={form.message}
                onChange={e=>setForm(p=>({...p,message:e.target.value}))}
                style={{...iStyle,resize:'vertical'}}
                onFocus={e=>e.target.style.borderColor='#006D6D'}
                onBlur={e=>e.target.style.borderColor='rgba(0,109,109,.2)'}
              />
            </div>
            <button onClick={send} data-hover style={{width:'100%',background:sent?'rgba(0,109,109,.3)':'#006D6D',border:'none',color:'#fff',padding:14,borderRadius:10,fontFamily:"'Syne',sans-serif",fontSize:'1rem',fontWeight:600,cursor:'pointer',transition:'all .3s',boxShadow:'0 0 20px rgba(0,109,109,.3)',letterSpacing:'.04em'}}
              onMouseEnter={e=>{e.currentTarget.style.background='#008585';e.currentTarget.style.boxShadow='0 0 30px rgba(0,109,109,.5)'}}
              onMouseLeave={e=>{e.currentTarget.style.background=sent?'rgba(0,109,109,.3)':'#006D6D';e.currentTarget.style.boxShadow='0 0 20px rgba(0,109,109,.3)'}}
            >{sent?'✓ Message Sent!':'Send Message →'}</button>
          </div>

          {/* Socials */}
          <div>
            <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:'1.1rem',fontWeight:600,color:'rgba(255,255,255,.65)',marginBottom:'1.4rem'}}>Find Me On</h3>
            <div style={{display:'flex',flexDirection:'column',gap:'.7rem'}}>
              {SOCIALS.map(({Icon,label,href,handle})=>(
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" data-hover>
                  <div style={{display:'flex',alignItems:'center',gap:'1rem',padding:'.85rem 1.1rem',background:'rgba(0,109,109,.04)',border:'1px solid rgba(0,109,109,.15)',borderRadius:10,transition:'all .3s ease'}}
                    onMouseEnter={e=>Object.assign(e.currentTarget.style,{borderColor:'rgba(0,109,109,.42)',background:'rgba(0,109,109,.09)',transform:'translateX(7px)'})}
                    onMouseLeave={e=>Object.assign(e.currentTarget.style,{borderColor:'rgba(0,109,109,.15)',background:'rgba(0,109,109,.04)',transform:'translateX(0)'})}
                  >
                    <div style={{width:40,height:40,borderRadius:'50%',background:'rgba(0,109,109,.12)',border:'1.5px solid rgba(0,109,109,.35)',display:'flex',alignItems:'center',justifyContent:'center',color:'#006D6D',fontSize:'1.15rem',flexShrink:0}}><Icon/></div>
                    <div>
                      <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,color:'rgba(255,255,255,.8)',fontSize:'.88rem'}}>{label}</div>
                      <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:'.68rem',color:'rgba(0,109,109,.65)'}}>{handle}</div>
                    </div>
                    <div style={{marginLeft:'auto',color:'rgba(0,109,109,.45)',fontSize:'.8rem'}}>→</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{textAlign:'center',marginTop:'4rem',paddingTop:'2rem',borderTop:'1px solid rgba(0,109,109,.1)'}}>
          <p style={{fontFamily:"'JetBrains Mono',monospace",fontSize:'.7rem',color:'rgba(255,255,255,.15)',letterSpacing:'.1em'}}>© 2025 Abhishek Kumar Maurya — Built with Next.js & ❤️</p>
        </div>
      </div>
      <style>{`@keyframes scanline{0%{top:-2px}100%{top:100%}}`}</style>
    </section>
  )
}