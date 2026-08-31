import React from 'react';

const paths = {
  sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/></>,
  home: <><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9"/><path d="M9 20v-6h6v6"/></>,
  building: <><path d="M4 21V5l8-2 8 2v16"/><path d="M8 7h1M15 7h1M8 11h1M15 11h1M8 15h1M15 15h1M10 21v-4h4v4"/></>,
  battery: <><rect x="3" y="6" width="16" height="12" rx="2"/><path d="M21 10v4M7 12h8M11 9v6"/></>,
  design: <><path d="M4 20V10l8-7 8 7v10"/><path d="M8 20v-6h8v6M9 10h.01M15 10h.01"/></>,
  wrench: <><path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18l3 3 5.3-5.3a5 5 0 0 0 6.4-6.4l-3.1 3.1-3-3z"/></>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
  check: <><path d="m5 12 4 4L19 6"/></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
  phone: <><path d="M6.5 3h3l1.5 4-2 1.5a14 14 0 0 0 4.5 4.5l1.5-2 4 1.5v3A2 2 0 0 1 17 18C9.3 18 6 14.7 6 7a2 2 0 0 1 .5-4z"/></>,
  pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="2.5"/></>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
  close: <><path d="m6 6 12 12M18 6 6 18"/></>,
  quote: <><path d="M8 10H5a2 2 0 0 0-2 2v5h5v-5H5c0-2 1-4 3-5zM21 10h-3a2 2 0 0 0-2 2v5h5v-5h-3c0-2 1-4 3-5z"/></>,
};

export default function Icon({ name, size = 22, strokeWidth = 1.8 }) {
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.sun}</svg>;
}
