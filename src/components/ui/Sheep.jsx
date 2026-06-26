import React from 'react'

export default function Sheep() {
  return (
    <svg
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-28 md:w-36 h-auto"
      aria-hidden="true"
    >
      {/* Body (fluffy cloud) */}
      <ellipse cx="60" cy="90" rx="40" ry="30" fill="#F5F0E8" stroke="#D4BC8E" strokeWidth="1.5" />
      {/* Fluff bumps */}
      <circle cx="32" cy="85" r="14" fill="#F5F0E8" stroke="#D4BC8E" strokeWidth="1" />
      <circle cx="50" cy="72" r="16" fill="#F5F0E8" stroke="#D4BC8E" strokeWidth="1" />
      <circle cx="72" cy="68" r="15" fill="#F5F0E8" stroke="#D4BC8E" strokeWidth="1" />
      <circle cx="88" cy="82" r="13" fill="#F5F0E8" stroke="#D4BC8E" strokeWidth="1" />
      <circle cx="86" cy="98" r="12" fill="#F5F0E8" stroke="#D4BC8E" strokeWidth="1" />
      <circle cx="34" cy="98" r="11" fill="#F5F0E8" stroke="#D4BC8E" strokeWidth="1" />

      {/* Head */}
      <ellipse cx="60" cy="58" rx="18" ry="16" fill="#F5F0E8" stroke="#2D1F14" strokeWidth="1.5" />
      {/* Ears */}
      <ellipse cx="42" cy="50" rx="6" ry="10" fill="#F5F0E8" stroke="#2D1F14" strokeWidth="1.5" transform="rotate(-20 42 50)" />
      <ellipse cx="78" cy="50" rx="6" ry="10" fill="#F5F0E8" stroke="#2D1F14" strokeWidth="1.5" transform="rotate(20 78 50)" />
      {/* Eyes */}
      <circle cx="52" cy="55" r="2.5" fill="#2D1F14" />
      <circle cx="68" cy="55" r="2.5" fill="#2D1F14" />
      <circle cx="53" cy="54" r="1" fill="white" />
      <circle cx="69" cy="54" r="1" fill="white" />
      {/* Nose */}
      <ellipse cx="60" cy="62" rx="3" ry="2" fill="#E8C4B4" />

      {/* Legs */}
      <line x1="42" y1="112" x2="38" y2="140" stroke="#2D1F14" strokeWidth="3" strokeLinecap="round" />
      <line x1="54" y1="116" x2="52" y2="142" stroke="#2D1F14" strokeWidth="3" strokeLinecap="round" />
      <line x1="66" y1="116" x2="68" y2="142" stroke="#2D1F14" strokeWidth="3" strokeLinecap="round" />
      <line x1="78" y1="112" x2="82" y2="140" stroke="#2D1F14" strokeWidth="3" strokeLinecap="round" />

      {/* Tail */}
      <ellipse cx="96" cy="90" rx="5" ry="8" fill="#F5F0E8" stroke="#D4BC8E" strokeWidth="1" transform="rotate(15 96 90)" />
    </svg>
  )
}
