import React from 'react';
import { Link } from 'react-router-dom';

export default function PageHero({ eyebrow, title, text }) {
  return <section className="page-hero"><div className="container page-hero-inner"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>{title}</span></div></div></section>;
}
