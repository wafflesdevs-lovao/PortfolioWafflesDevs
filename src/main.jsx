import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import emailjs from '@emailjs/browser';
import { ArrowDown, ArrowLeft, ArrowUpRight, Braces, Check, Code2, Layers3, Mail, Menu, MousePointer2, Palette, Sparkles, X, Zap } from 'lucide-react';
import './styles.css';
 
const nav = [
  ['Inicio', 'inicio'],
  ['Quiénes somos', 'nosotros'],
  ['Servicios', 'servicios'],
  ['Proyectos', 'proyectos'],
];

const projects = [ 
  {
    slug: 'el-kioskero',
    title: 'El Kioskero',
    type: 'Sistema web',
    description: 'Sistema POS (Point of Sale) para Kiosko, con gestion de inventario y ventas. Consulta los detalles contactandonos',
    image: '/assets/captures/elkioskero/capture1.png',
    imageAlt: 'Pantalla de inicio de sesión del sistema El Kioskero',
    captures: [
      { src: '/assets/captures/elkioskero/capture1.png', alt: 'Pantalla de inicio de sesión del sistema El Kioskero' },
      { src: '/assets/captures/elkioskero/capture2.png', alt: 'Panel principal del sistema El Kioskero' },
    ],
  },
  {
    slug: 'distribuidorapp',
    title: 'DistribuidorApp',
    type: 'Sistema web',
    description: 'Sistema de gestión de pedidos, asignación de repartidores y seguimiento de entregas.',
    image: '/assets/captures/distribuidorapp/login.png',
    imageAlt: 'Pantalla de inicio de sesión de DistribuidorApp',
    captures: [
      {
        src: '/assets/captures/distribuidorapp/login.png',
        alt: 'Pantalla de inicio de sesión de DistribuidorApp',
        title: 'Inicio de sesión',
        description: 'Podés acceder al sistema según tu perfil: cliente, administrador o repartidor.',
      },
      {
        src: '/assets/captures/distribuidorapp/cliente.png',
        alt: 'Panel de cliente de DistribuidorApp',
        title: 'Cliente',
        description: 'Como cliente, podés pedir uno o varios productos y hacer el seguimiento de tu pedido.',
      },
      {
        src: '/assets/captures/distribuidorapp/admin.png',
        alt: 'Panel de administración de DistribuidorApp',
        title: 'Administrador',
        description: 'Como administrador, podés gestionar los pedidos y asignarlos a los repartidores.',
      },
      {
        src: '/assets/captures/distribuidorapp/repartidor.png',
        alt: 'Panel de repartidor de DistribuidorApp',
        title: 'Repartidor',
        description: 'Como repartidor, podés seguir la ruta de los pedidos pendientes y actualizar el estado de cada entrega.',
      },
    ],
  },
];

function ProjectDetail({ project }) {
  const [expandedCapture, setExpandedCapture] = useState(null);

  useEffect(() => {
    document.title = `${project.title} — WafflesDevs`;
  }, [project.title]);

  useEffect(() => {
    if (!expandedCapture) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setExpandedCapture(null);
    };

    document.body.classList.add('lightbox-open');
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.classList.remove('lightbox-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [expandedCapture]);

  const backToProjects = (event) => {
    event.preventDefault();
    window.location.assign('/#proyectos');
  };

  return (
    <div className="project-page">
      <header className="header header--solid project-header">
        <a className="brand" href="/#inicio" aria-label="WafflesDevs, inicio">
          <span className="brand-mark"><img src="/assets/logos/WAFLLES DEVS.png" alt="" /></span>
          <span>Waffles<span>Devs</span></span>
        </a>
        <a className="back-link" href="/#proyectos" onClick={backToProjects}><ArrowLeft size={17} /> <span>Volver a proyectos</span></a>
      </header>
      <main className="project-detail">
        <div className="section-label"><span>01</span> Proyecto</div>
        <div className="project-detail-heading">
          <div><p className="eyebrow"><span /> {project.type}</p><h1>{project.title}</h1></div>
          <p>{project.description}</p>
        </div>
        <div className="project-gallery">
          {project.captures.map((capture) => (
            <figure className="project-detail-image" key={capture.src}>
              <button
                className="project-image-expand"
                type="button"
                onClick={() => setExpandedCapture(capture)}
                aria-label={`Ampliar: ${capture.alt}`}
              >
                <img src={capture.src} alt={capture.alt} />
                <span aria-hidden="true">Ampliar imagen</span>
              </button>
              {capture.description && (
                <figcaption>
                  {capture.title && <strong>{capture.title}</strong>}
                  <p>{capture.description}</p>
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </main>
      {expandedCapture && (
        <div
          className="project-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Vista ampliada: ${expandedCapture.alt}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setExpandedCapture(null);
          }}
        >
          <button
            className="project-lightbox-close"
            type="button"
            onClick={() => setExpandedCapture(null)}
            aria-label="Cerrar imagen ampliada"
            autoFocus
          >
            <X />
          </button>
          <div className="project-lightbox-content">
            <img src={expandedCapture.src} alt={expandedCapture.alt} />
            {expandedCapture.description && (
              <div className="project-lightbox-caption">
                {expandedCapture.title && <strong>{expandedCapture.title}</strong>}
                <p>{expandedCapture.description}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState('idle');
  const form = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    if (window.location.hash) {
      requestAnimationFrame(() => document.querySelector(window.location.hash)?.scrollIntoView());
    }
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    const onKeyDown = (event) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('menu-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  const sendEmail = async (event) => {
    event.preventDefault();
    if (!form.current || form.current.company.value) return;

    // Estos nombres coinciden con las variables configuradas en la plantilla de EmailJS.
    form.current.title.value = `Consulta de ${form.current.name.value.trim()}`;
    form.current.time.value = new Intl.DateTimeFormat('es-AR', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date());

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('Faltan las variables de entorno de EmailJS.');
      setFormStatus('config-error');
      return;
    }

    setFormStatus('sending');
    try {
      await emailjs.sendForm(serviceId, templateId, form.current, { publicKey });
      setFormStatus('success');
      form.current.reset();
    } catch (error) {
      console.error('No se pudo enviar el mensaje con EmailJS:', error?.text || error);
      setFormStatus('error');
    }
  };

  return (
    <>
      <header className={`header ${scrolled ? 'header--solid' : ''} ${open ? 'header--menu-open' : ''}`}>
        <a className="brand" href="#inicio" onClick={close} aria-label="WafflesDevs, inicio">
          <span className="brand-mark"><img src="/assets/logos/WAFLLES DEVS.png" alt="" /></span>
          <span>Waffles<span>Devs</span></span>
        </a>
        <nav id="main-navigation" className={open ? 'nav nav--open' : 'nav'} aria-label="Navegación principal">
          {nav.map(([label, id]) => <a href={`#${id}`} onClick={close} key={id}>{label}</a>)}
          <a className="nav-cta" href="#contacto" onClick={close}>Hablemos <ArrowUpRight size={16} /></a>
        </nav>
        <button className="menu" type="button" onClick={() => setOpen(!open)} aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="main-navigation">
          {open ? <X /> : <Menu />}
        </button>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy reveal">
            <div className="eyebrow"><span /> Desarrollo web creativo</div>
            <h1>Ideas frescas.<br />Código <em>bien hecho.</em></h1>
            <p>Diseñamos experiencias digitales que conectan, funcionan y hacen crecer tu marca.</p>
            <div className="hero-actions">
              <a className="button button--primary" href="#contacto">Crear algo juntos <ArrowUpRight size={19} /></a>
              <a className="button button--ghost" href="#nosotros">Conocenos <ArrowDown size={18} /></a>
            </div>
            <div className="hero-note"><span className="avatars"><i>W</i><i>D</i><i>+</i></span><span><strong>Un equipo pequeño</strong><br />con grandes ideas</span></div>
          </div>
          <div className="hero-art reveal delay-1">
            <div className="orbit orbit--one" /><div className="orbit orbit--two" />
            <span className="code-pill pill-one">{'{ }'}</span><span className="code-pill pill-two">&lt;/&gt;</span>
            <div className="art-glow" />
            <img src="/assets/hero/wafflesdevs-hero.png" alt="Tres personajes waffle programando en sus computadoras" />
          </div>
          <a className="scroll-cue" href="#nosotros" aria-label="Ir a quiénes somos"><span>SCROLL</span><i><ArrowDown size={16} /></i></a>
        </section>

        <section className="ticker" aria-label="Nuestras especialidades">
          <div><span>DISEÑO WEB</span><Sparkles /><span>DESARROLLO</span><Sparkles /><span>EXPERIENCIAS DIGITALES</span><Sparkles /><span>IDEAS QUE CONECTAN</span><Sparkles /><span>DISEÑO WEB</span></div>
        </section>

        <section className="about section" id="nosotros">
          <div className="section-label"><span>01</span> Quiénes somos</div>
          <div className="about-heading">
            <h2>No hacemos páginas.<br />Creamos <em>experiencias.</em></h2>
            <div><p>Somos WafflesDevs, un equipo que mezcla diseño, tecnología y una buena dosis de creatividad para dar vida a productos digitales memorables.</p><a href="#contacto">Conocé nuestra forma de trabajar <ArrowUpRight size={17} /></a></div>
          </div>
          <div className="values">
            <article><span><Palette /></span><h3>Diseño con intención</h3><p>Cada detalle tiene un propósito: comunicar, emocionar y convertir.</p></article>
            <article><span><Code2 /></span><h3>Código que escala</h3><p>Construimos soluciones rápidas, accesibles y preparadas para crecer.</p></article>
            <article><span><Zap /></span><h3>Trabajo cercano</h3><p>Menos vueltas, más colaboración. Tu visión es parte de todo el proceso.</p></article>
          </div>
        </section>

        <section className="services section" id="servicios">
          <div className="services-top">
            <div><div className="section-label light"><span>02</span> Servicios</div><h2>Lo que sabemos<br /><em>hacer mejor.</em></h2></div>
            <p>Podemos adaptar una solución existente a las necesidades de tu negocio o crear un producto completamente desde cero. Muy pronto vas a poder conocer todos nuestros servicios.</p>
          </div>
          <div className="service-list">
            <article><b>01</b><span className="service-icon"><Braces /></span><h3>Desarrollo web</h3><a className="service-link" href="#proyectos">Ver proyectos <ArrowUpRight size={15} /></a></article>
            <article><b>02</b><span className="service-icon"><MousePointer2 /></span><h3>Diseño UI/UX</h3><span className="soon">Próximamente</span></article>
            <article><b>03</b><span className="service-icon"><Layers3 /></span><h3>Productos digitales</h3><span className="soon">Próximamente</span></article>
          </div>
        </section>

        <section className="projects section" id="proyectos">
          <div className="projects-heading">
            <div><div className="section-label"><span>03</span> Proyectos</div><h2>Ideas convertidas<br />en <em>productos.</em></h2></div>
            <p>Conocé algunos de los sistemas y experiencias digitales que desarrollamos.</p>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.slug}>
                <a className="project-image" href={`/proyectos/${project.slug}`} aria-label={`Ver detalles de ${project.title}`}>
                  <img src={project.image} alt={project.imageAlt} />
                </a>
                <div className="project-card-body">
                  <div><span className="project-type">{project.type}</span><h3>{project.title}</h3><p>{project.description}</p></div>
                  <a className="project-arrow" href={`/proyectos/${project.slug}`} aria-label={`Ver detalles de ${project.title}`}><ArrowUpRight /></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="process section">
          <div className="section-label"><span>04</span> Cómo trabajamos</div>
          <div className="process-grid">
            <div><h2>Simple, claro<br />y <em>sin sorpresas.</em></h2><p>Un proceso transparente para avanzar juntos desde la primera idea hasta el último detalle.</p></div>
            <ol>
              <li><span>01</span><div><h3>Escuchamos</h3><p>Entendemos tu idea, objetivos y necesidades.</p></div><Check /></li>
              <li><span>02</span><div><h3>Diseñamos</h3><p>Convertimos la estrategia en una experiencia visual.</p></div><Check /></li>
              <li><span>03</span><div><h3>Construimos</h3><p>Damos vida al producto con tecnología sólida.</p></div><Check /></li>
              <li><span>04</span><div><h3>Lanzamos</h3><p>Probamos, optimizamos y salimos al mundo.</p></div><Sparkles /></li>
            </ol>
          </div>
        </section>

        <section className="contact section" id="contacto">
          <div className="contact-inner">
            <div className="section-label light"><span>05</span> Contacto</div>
            <h2>¿Tenés una idea?<br /><em>Hagámosla realidad.</em></h2>
            <p>Contanos qué tenés en mente y recibiremos tu mensaje directamente en nuestro correo.</p>
            <form ref={form} className="contact-form" onSubmit={sendEmail}>
              <div className="form-row">
                <label htmlFor="name">Nombre<input id="name" name="name" type="text" placeholder="Tu nombre" autoComplete="name" minLength="2" maxLength="80" required /></label>
                <label htmlFor="email">Email<input id="email" name="email" type="email" placeholder="tu@email.com" autoComplete="email" maxLength="120" required /></label>
              </div>
              <label htmlFor="message">¿En qué podemos ayudarte?<textarea id="message" name="message" placeholder="Contanos brevemente sobre tu idea o negocio…" minLength="10" maxLength="1200" rows="4" required /></label>
              <input name="title" type="hidden" />
              <input name="time" type="hidden" />
              <label className="honey" aria-hidden="true">Empresa<input name="company" type="text" tabIndex="-1" autoComplete="off" /></label>
              <div className="form-submit">
                <button className="button button--cream" type="submit" disabled={formStatus === 'sending'}><Mail size={19} /> {formStatus === 'sending' ? 'Enviando…' : 'Enviar mensaje'} <ArrowUpRight size={19} /></button>
                <a href="mailto:wafflesdevs@gmail.com">wafflesdevs@gmail.com</a>
              </div>
              <div className="form-feedback" role="status" aria-live="polite">
                {formStatus === 'success' && <p className="form-status success">¡Mensaje enviado correctamente! Te responderemos pronto.</p>}
                {formStatus === 'error' && <p className="form-status error">No pudimos enviar el mensaje. Intentá nuevamente o escribinos por Gmail.</p>}
                {formStatus === 'config-error' && <p className="form-status error">El formulario aún no está configurado. Podés escribirnos directamente por Gmail.</p>}
              </div>
            </form>
            <div className="contact-decoration">W<span>D</span></div>
          </div>
        </section>
      </main>

      <footer><a className="brand" href="#inicio"><span className="brand-mark"><img src="/assets/logos/WAFLLES DEVS.png" alt="" /></span><span>Waffles<span>Devs</span></span></a><p>© {new Date().getFullYear()} WafflesDevs. Hecho con código y un poco de syrup.</p><a href="#inicio">Volver arriba <ArrowUpRight size={15} /></a></footer>
    </>
  );
}

const projectSlug = window.location.pathname.match(/^\/proyectos\/([^/]+)\/?$/)?.[1];
const activeProject = projects.find((project) => project.slug === projectSlug);

createRoot(document.getElementById('root')).render(activeProject ? <ProjectDetail project={activeProject} /> : <App />);
