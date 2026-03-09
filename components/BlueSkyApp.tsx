'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { UNITS, AVAILABLE_UNITS, Unit } from '@/data/units'

export default function BlueSkyApp() {
  const [activeUnit, setActiveUnit] = useState<Unit | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [inqOpen, setInqOpen] = useState(false)
  const [inqUnit, setInqUnit] = useState<Unit | null>(null)
  const [tipPos, setTipPos] = useState({ x: 0, y: 0 })
  const [debugMode, setDebugMode] = useState(false)
  const [zones, setZones] = useState<Array<Unit & { px: { top: number; left: number; width: number; height: number } }>>([])

  const imgRef = useRef<HTMLImageElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  // Form state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedUnit, setSelectedUnit] = useState('')
  const [notes, setNotes] = useState('')
  const [formErrors, setFormErrors] = useState({ firstName: false, email: false })

  const buildZones = useCallback(() => {
    const img = imgRef.current
    const stage = stageRef.current
    if (!img || !stage) return

    const ir = img.getBoundingClientRect()
    const sr = stage.getBoundingClientRect()
    const imgLeft = ir.left - sr.left
    const imgTop = ir.top - sr.top
    const imgW = ir.width
    const imgH = ir.height

    setZones(
      UNITS.map(u => ({
        ...u,
        px: {
          top: imgTop + imgH * u.top / 100,
          left: imgLeft + imgW * u.left / 100,
          width: imgW * u.w / 100,
          height: imgH * u.h / 100,
        },
      }))
    )
  }, [])

  useEffect(() => {
    const img = imgRef.current
    if (!img) return
    if (img.complete && img.naturalWidth) buildZones()
    else img.addEventListener('load', buildZones)
    window.addEventListener('resize', buildZones)
    return () => {
      img.removeEventListener('load', buildZones)
      window.removeEventListener('resize', buildZones)
    }
  }, [buildZones])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenuOpen(false); setInqOpen(false) }
      if (e.key === 'd' || e.key === 'D') setDebugMode(v => !v)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    setTipPos({ x: e.clientX + 14, y: e.clientY - 36 })
  }

  const openInq = (u: Unit) => {
    setInqUnit(u)
    setSelectedUnit(`Unit ${u.id} — ${u.name}`)
    setInqOpen(true)
  }

  const sendInquiry = () => {
    const errors = { firstName: !firstName.trim(), email: !email.trim() }
    setFormErrors(errors)
    if (errors.firstName || errors.email) return
    const subject = encodeURIComponent(`BlueSky Residences Inquiry${selectedUnit ? ' — ' + selectedUnit : ''}`)
    const body = encodeURIComponent(
      `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nInterested in: ${selectedUnit}\n\nNotes:\n${notes}`
    )
    window.location.href = `mailto:gloria@blueskypv.com?subject=${subject}&body=${body}`
  }

  return (
    <>
      {/* TOP BAR */}
      <header className="bar bar-top">
        <span className="bar-logo">BlueSky Residences</span>
        <div className={`bar-center ${activeUnit ? 'vis' : ''}`}>
          <span className="bar-center-num">
            {activeUnit?.status !== 'amenity' ? `Unit ${activeUnit?.id}` : ''}
          </span>
          <span className="bar-center-name">{activeUnit?.name}</span>
        </div>
        {activeUnit?.status === 'available' && (
          <button className="bar-right vis" onClick={() => activeUnit && openInq(activeUnit)}>
            <span>Information &nbsp;/&nbsp; Inquire</span>
            <svg width="18" height="9" viewBox="0 0 18 9" fill="none">
              <path d="M1 4.5H17M13 1L17 4.5L13 8" stroke="currentColor" strokeWidth="0.85" />
            </svg>
          </button>
        )}
        {activeUnit?.status !== 'available' && <div style={{ width: '160px' }} />}
      </header>

      {/* STAGE */}
      <div className="stage" ref={stageRef} onMouseMove={handleMouseMove}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src="/sketch.png"
          alt="BlueSky Residences building"
          draggable={false}
        />

        {/* ZONES */}
        <div className="zones">
          {zones.map(z => (
            <div
              key={z.id}
              className={`zone ${z.status}${debugMode ? ' debug' : ''}`}
              style={{
                top: z.px.top,
                left: z.px.left,
                width: z.px.width,
                height: z.px.height,
              }}
              onMouseEnter={() => setActiveUnit(z)}
              onMouseLeave={() => setActiveUnit(null)}
              onClick={() => z.status === 'available' && openInq(z)}
            />
          ))}
        </div>
      </div>

      {/* TOOLTIP */}
      <div
        className={`tooltip ${activeUnit ? 'vis' : ''}`}
        style={{ left: tipPos.x, top: tipPos.y }}
      >
        <div className={`tooltip-inner ${activeUnit?.status || ''}`}>
          {activeUnit?.status === 'available' ? 'Available'
            : activeUnit?.status === 'amenity' ? 'Shared Amenity'
            : 'Sold'}
        </div>
      </div>

      {/* BOTTOM BAR */}
      <footer className="bar bar-bottom">
        <button className="bar-menu" onClick={() => setMenuOpen(true)}>
          <span className="plus">+</span>
          <span>Menu</span>
        </button>
        <div className={`bar-center ${activeUnit ? 'vis' : ''}`}>
          <span className="bar-center-num">
            {activeUnit?.status !== 'amenity' ? `Unit ${activeUnit?.id}` : ''}
          </span>
          <span className="bar-center-name">{activeUnit?.name}</span>
        </div>
        {activeUnit?.status === 'available' ? (
          <button className="bar-right vis" onClick={() => activeUnit && openInq(activeUnit)}>
            <span>Information &nbsp;/&nbsp; Inquire</span>
            <svg width="18" height="9" viewBox="0 0 18 9" fill="none">
              <path d="M1 4.5H17M13 1L17 4.5L13 8" stroke="currentColor" strokeWidth="0.85" />
            </svg>
          </button>
        ) : (
          <div style={{ width: '160px' }} />
        )}
      </footer>

      {/* YEAR */}
      <div className="yr">Est. 2026</div>

      {/* MENU OVERLAY */}
      <div className={`overlay ${menuOpen ? 'open' : ''}`}>
        <button className="overlay-close" onClick={() => setMenuOpen(false)}>
          <span className="plus">+</span>
          <span>Close</span>
        </button>
        <div className="menu-inner">

          {/* Residences */}
          <div className="m-item-row">
            <span className="m-item-word">Residences</span>
            <div className="m-center">
              <span className="m-sub">11 Residences</span>
              <div className="m-divider" />
              <span className="m-sub gold">3 Available</span>
              <div className="m-divider" />
              {AVAILABLE_UNITS.map((u, i) => (
                <span key={u.id}>
                  {i > 0 && <span className="m-sep">·</span>}
                  <button className="m-unit" onClick={() => { setMenuOpen(false); openInq(u) }}>
                    {u.id}
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="m-item-row" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <span className="m-item-word">Amenities</span>
            <div style={{ marginLeft: 'auto', textAlign: 'right', flexShrink: 0 }}>
              <span className="m-secondary">
                <span>Rooftop Pool</span>
                <span className="m-pipe">|</span>
                <span>Wood Fired BBQ</span>
                <span className="m-pipe">|</span>
                <span>Elevator</span>
                <span className="m-pipe">|</span>
                <button className="m-link" onClick={() => { setMenuOpen(false); setInqUnit(null); setInqOpen(true) }}>
                  Inquire
                </button>
              </span>
            </div>
          </div>

          {/* Location */}
          <a
            className="m-item-row"
            style={{ display: 'flex', justifyContent: 'space-between', width: '100%', textDecoration: 'none' }}
            href="https://maps.google.com/?q=Calle+Ecuador+1074,+Puerto+Vallarta,+Mexico"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="m-item-word">Location</span>
            <div style={{ marginLeft: 'auto', textAlign: 'right', flexShrink: 0 }}>
              <span className="m-secondary">
                <span>Calle Ecuador 1074, Puerto Vallarta, Mexico</span>
              </span>
            </div>
          </a>

          {/* Construction */}
          <div className="m-item-row" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <span className="m-item-word">Construction</span>
            <div style={{ marginLeft: 'auto', textAlign: 'right', flexShrink: 0 }}>
              <span className="m-secondary">
                <span>Completion est. Spring 2026</span>
              </span>
            </div>
          </div>

          {/* Inquire */}
          <button
            className="m-item"
            style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', borderBottom: '1px solid rgba(0,0,0,0.07)', fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.8rem,4.5vw,4.2rem)', fontWeight: 400, lineHeight: 1.25, color: 'var(--dark)', padding: '0.7rem 0', transition: 'color 0.2s, letter-spacing 0.3s' }}
            onClick={() => { setMenuOpen(false); setInqUnit(null); setInqOpen(true) }}
          >
            Inquire
          </button>

          <div className="m-footer">
            <a href="https://hoa.blueskypv.com">Owners Portal →</a>
            <span><a href="tel:+523221020952" style={{ color: 'inherit', textDecoration: 'none' }}>+52 322 102 0952</a> — Gloria Palacios</span>
          </div>
        </div>
      </div>

      {/* INQUIRY OVERLAY */}
      <div className={`overlay ${inqOpen ? 'open' : ''}`}>
        <button className="overlay-close" onClick={() => setInqOpen(false)}>
          <span className="plus">+</span>
          <span>Close</span>
        </button>
        <div className="inq-grid">
          {/* LEFT */}
          <div className="inq-left">
            <div className="inq-eyebrow">
              {inqUnit ? 'Available Residence' : 'BlueSky Residences · Puerto Vallarta'}
            </div>
            <h2 className="inq-title">
              {inqUnit ? (
                <>{`Unit ${inqUnit.id}`}<br /><em>{inqUnit.name}</em></>
              ) : (
                <>Make an<br /><em>enquiry</em></>
              )}
            </h2>
            <div className="spec">
              <span className="spec-k">Configuration</span>
              <span className="spec-v">{inqUnit?.beds ?? 'All configurations available'}</span>
            </div>
            <div className="spec">
              <span className="spec-k">Area</span>
              <span className="spec-v">{inqUnit?.sqft ?? '97 – 274 m²'}</span>
            </div>
            <div className="spec">
              <span className="spec-k">Features</span>
              <span className="spec-v">{inqUnit?.feat ?? 'Custom finishes & layout'}</span>
            </div>
            <div className="spec">
              <span className="spec-k">Delivery</span>
              <span className="spec-v">2026</span>
            </div>
            <div className="spec">
              <span className="spec-k">Status</span>
              <span className="spec-v">{inqUnit?.finish ?? 'Completed · Move In Ready'}</span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="inq-right">
            <h3>Begin your<br /><em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>conversation</em></h3>
            <p>We respond within 24 hours with floor plan drawings<br />and payment options.</p>
            <div className="ff-row">
              <div>
                <div className="ff"><input placeholder="First name" value={firstName} onChange={e => { setFirstName(e.target.value); setFormErrors(fe => ({ ...fe, firstName: false })) }} /></div>
                {formErrors.firstName && <div className="ff-error">Required</div>}
              </div>
              <div className="ff"><input placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)} /></div>
            </div>
            <div className="ff-row">
              <div>
                <div className="ff"><input type="email" placeholder="Email address" value={email} onChange={e => { setEmail(e.target.value); setFormErrors(fe => ({ ...fe, email: false })) }} /></div>
                {formErrors.email && <div className="ff-error">Required</div>}
              </div>
              <div className="ff"><input type="tel" placeholder="Phone (optional)" value={phone} onChange={e => setPhone(e.target.value)} /></div>
            </div>
            <div className="ff">
              <select
                className={selectedUnit ? 'filled' : ''}
                value={selectedUnit}
                onChange={e => setSelectedUnit(e.target.value)}
              >
                <option value="" disabled>Interested in…</option>
                <option>Unit 202 — The Residence with a Private Pool</option>
                <option>Unit 302 — The Residence with Back Yard / Private Pool</option>
                <option>PH-2 (Unit 602) — Loft Penthouse</option>
                <option>General information</option>
              </select>
            </div>
            <div className="ff">
              <textarea placeholder="Questions or notes…" value={notes} onChange={e => setNotes(e.target.value)} />
            </div>
            <button className="fsub" onClick={sendInquiry}>Send Inquiry</button>
          </div>
        </div>
      </div>
    </>
  )
}
