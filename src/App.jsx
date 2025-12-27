
import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Calendar, MapPin, Phone, Instagram, 
  CheckCircle, ArrowRight, Smile, User, Star, ShieldCheck,
  Code2, ExternalLink, Activity 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ==============================================================================
 * ÁREA DE DADOS DO CLIENTE (EDITÁVEL)
 * ==============================================================================
 */
const DATA = {
  name: "Dr. Pedro Elino",
  title: "Cirurgião-Dentista | Especialista em Cirurgia Oral",
  cro: "CRO/RN 7949",
  university: "Formado pela UFRN",
  whatsapp: "5584991627325",
  instagram: "@pedroelino",
  instagramUrl: "https://instagram.com/pedroelino",
  //  dados de endereço múltiplos
  locations: [
    {
      city: "São Paulo do Potengi",
      address: "Rua Bento Urbano, 4026, sala 07 (No shopping de Apriginho)",
      link: "https://maps.app.goo.gl/8y1LEiuA2ARohon86"
    },
    {
      city: "Natal",
      address: "Rua Presidente José Bento, 721 (Na Clinica Odontomais)- Alecrim, Natal ",
      link: "https://maps.app.goo.gl/hJbLRhmYt4J9barKA"
    }
  ],
  colors: {
    primary: "text-teal-600",
    bgPrimary: "bg-teal-600",
    bgLight: "bg-teal-50"
  },
  images: {
    hero: "/drpedro2.jpg",
    profile: "/drpedro.jpg",
    environment: "/consul.jpeg"
  }
};

/**
 * DADOS DETALHADOS DOS SERVIÇOS
 * Usados para popular os cards e o modal de detalhes.
 */
const SERVICES = [
  {
    id: 1,
    title: "Cirurgia Oral Menor",
    shortDesc: "Extração de sisos e dentes inclusos com técnicas minimamente traumáticas.",
    fullDesc: "Realizamos procedimentos cirúrgicos de pequeno porte com alto rigor técnico e biossegurança. Nossa abordagem foca no conforto do paciente, utilizando técnicas minimamente invasivas para a extração de sisos, dentes inclusos e pequenas correções ósseas, garantindo uma recuperação mais rápida e tranquila.",
    benefits: [
      "Extração segura de dentes do siso impactados",
      "Recuperação acelerada com protocolos modernos",
      "Prevenção de inflamações, cistos e dores futuras",
      "Sedação consciente (opcional para pacientes ansiosos)"
    ],
    icon: User
  },
  {
    id: 2,
    title: "Profilaxia e Prevenção",
    shortDesc: "Limpeza profunda e check-ups regulares para manter seu sorriso saudável.",
    fullDesc: "A base de um sorriso bonito é a saúde. Nossas consultas de prevenção vão muito além de uma limpeza simples. Realizamos raspagem detalhada, polimento coronário e aplicação de flúor, além de diagnóstico precoce de cáries e doenças gengivais com equipamentos de alta precisão.",
    benefits: [
      "Remoção eficiente de tártaro e placa bacteriana",
      "Prevenção eficaz de gengivite e periodontite",
      "Hálito mais fresco e saudável",
      "Economia a longo prazo evitando tratamentos complexos"
    ],
    icon: Smile
  },
  {
    id: 3,
    title: "Estética Dental",
    shortDesc: "Clareamento e procedimentos estéticos para renovar sua autoestima.",
    fullDesc: "Transforme seu sorriso com tratamentos estéticos personalizados. Trabalhamos com clareamento dental seguro e eficaz, além de facetas que corrigem imperfeições de forma e cor. Nosso objetivo é entregar um resultado natural que harmonize com as características do seu rosto.",
    benefits: [
      "Sorriso visivelmente mais branco e iluminado",
      "Correção de pequenos diastemas (espaços) e fraturas",
      "Planejamento digital do sorriso para previsibilidade",
      "Aumento imediato da autoestima e confiança"
    ],
    icon: Star
  }
];

/**
 * ==============================================================================
 * VARIANTES DE ANIMAÇÃO (FRAMER MOTION)
 * ==============================================================================
 */

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

/**
 * ==============================================================================
 * COMPONENTE: ServiceModal
 * ==============================================================================
 * Modal detalhado que aparece ao clicar em "Saiba Mais".
 */
const ServiceModal = ({ service, onClose }) => {
  if (!service) return null;

  // Lógica para fechar modal com ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Redireciona para o WhatsApp com mensagem específica do serviço
  const handleSchedule = () => {
    const message = `*Olá, Dr. Pedro!*%0A%0AEstou no site e vi os detalhes sobre *${service.title}*.%0AGostaria de agendar uma avaliação para este tratamento.`;
    window.open(`https://wa.me/${DATA.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar dentro
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden relative"
      >
        {/* Header do Modal */}
        <div className="bg-teal-600 p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-teal-100 hover:text-white hover:bg-teal-500/50 p-1 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-md">
              <service.icon size={28} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold">{service.title}</h3>
          </div>
        </div>

        {/* Corpo do Modal */}
        <div className="p-6 md:p-8">
          <p className="text-slate-600 leading-relaxed mb-6 text-base">
            {service.fullDesc}
          </p>

          <h4 className="font-bold text-teal-700 mb-4 flex items-center gap-2">
            <Activity size={18} />
            Principais Benefícios
          </h4>
          
          <ul className="space-y-3 mb-8">
            {service.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-slate-700">
                <CheckCircle size={18} className="text-teal-500 mt-0.5 flex-shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={handleSchedule}
              className="flex-1 bg-teal-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-teal-600/20"
            >
              Agendar este tratamento
              <ArrowRight size={18} />
            </button>
            <button 
              onClick={onClose}
              className="flex-1 border border-slate-200 text-slate-600 font-semibold py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Voltar
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/**
 * ==============================================================================
 * COMPONENTE: DevPopup
 * ==============================================================================
 */
const DevPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="group bg-slate-900/95 backdrop-blur-md border border-slate-700/50 shadow-2xl rounded-2xl p-5 max-w-sm w-full relative overflow-hidden ring-1 ring-white/10">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all duration-1000"></div>

            <button 
              onClick={() => setShow(false)} 
              className="absolute top-3 right-3 text-slate-500 hover:text-white hover:bg-slate-800 transition-all p-1.5 rounded-full z-10"
            >
              <X size={14} />
            </button>

            <div className="flex items-start gap-4 relative z-0">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg shadow-blue-900/40 text-white flex-shrink-0">
                    <Code2 size={24} strokeWidth={2} />
                </div>

                <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="text-white font-bold text-sm tracking-wide">UiCode.dev</h5>
                      <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1.5 py-0.5 rounded font-mono font-medium">PRO</span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed mb-3">
                      Gostou deste site? Vamos criar uma presença digital profissional para o seu negócio.
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="https://wa.me/5511916474626" target="_blank" rel="noreferrer" className="text-xs font-semibold text-slate-300 hover:text-white hover:underline decoration-blue-500 underline-offset-4 transition-all flex items-center gap-1.5 group/link">
                            WhatsApp <ExternalLink size={10} className="opacity-50 group-hover/link:opacity-100 transition-opacity" />
                        </a>
                        <a href="https://instagram.com/uicode.dev" target="_blank" rel="noreferrer" className="text-xs font-semibold text-slate-300 hover:text-white hover:underline decoration-pink-500 underline-offset-4 transition-all flex items-center gap-1.5 group/link">
                            Instagram <ExternalLink size={10} className="opacity-50 group-hover/link:opacity-100 transition-opacity" />
                        </a>
                    </div>
                </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * ==============================================================================
 * COMPONENTE PRINCIPAL: App
 * ==============================================================================
 */
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null); // Estado para o modal de serviços
  
  useEffect(() => {
    document.title = `${DATA.name} | Cirurgião Dentista em SP do Potengi e Natal`;
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const message = `*Olá, Dr. Pedro!*%0A%0AMeu nome é *${data.name}*.%0AGostaria de agendar/saber mais sobre: *${data.service}*.%0APreferência de horário: ${data.date || 'A combinar'}%0A%0A_Enviado pelo site_`;
    window.open(`https://wa.me/${DATA.whatsapp}?text=${message}`, '_blank');
  };

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Sobre', href: '#about' },
    { name: 'Serviços', href: '#services' },
    { name: 'Ambiente', href: '#environment' },
    { name: 'Contato', href: '#contact' },
  ];

  const contactItems = [
    ...DATA.locations.map(loc => ({
      icon: MapPin,
      title: `Atendimento em ${loc.city}`,
      text: loc.address,
      link: loc.link,
      linkText: "Ver no mapa"
    })),
    { icon: Instagram, title: "Siga-nos", text: DATA.instagram, link: DATA.instagramUrl, linkText: null },
    { icon: Calendar, title: "Horário de Atendimento", text: "Segunda a Sexta: 08h às 18h", link: null, linkText: null }
  ];

  return (
    <div className="font-sans text-slate-800 bg-white overflow-x-hidden selection:bg-teal-100">
      
      {/* NAVBAR */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 ease-in-out border-b border-transparent
          ${isScrolled 
            ? 'py-2 bg-white/95 backdrop-blur-md shadow-md border-slate-100' 
            : 'py-6 bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-full">
            <div className={`transition-transform duration-500 origin-left ${isScrolled ? 'scale-90' : 'scale-100'}`}>
              <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="flex items-center gap-2 group">
                <motion.div 
                  whileHover={{ rotate: 15 }} 
                  className="bg-teal-000 text-white p-0 rounded-lg group-hover:bg-teal-000 transition-colors"
                >
<img
  src="/drpedro2-logo.png"
  width={48}
  height={24}
  alt="Smile"
/>                          </motion.div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none group-hover:text-teal-700 transition-colors">Dr. Pedro Elino</h1>
                  <span className="text-xs text-teal-600 font-semibold tracking-wider">CIRURGIÃO DENTISTA</span>
                </div>
              </a>
            </div>

            <div className="hidden md:flex space-x-8 items-center">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-slate-600 hover:text-teal-600 font-medium transition-colors text-sm uppercase tracking-wide relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-teal-600 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full"
                >
                  {link.name}
                </a>
              ))}
              <motion.a 
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-teal-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-teal-700 transition-colors shadow-lg shadow-teal-600/20 cursor-pointer"
              >
                Agendar
              </motion.a>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600 p-2">
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden absolute top-full left-0 w-full bg-white border-t shadow-xl overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="block px-3 py-4 text-base font-medium text-slate-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg border-b border-slate-50 last:border-0"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
            src={DATA.images.hero} 
            alt="Consultório" 
            className="w-full h-full object-cover brightness-[0.9]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent sm:via-white/60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-2xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={staggerItem} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-6">
                <Star size={14} className="fill-teal-800" />
                Excelência em Odontologia
              </motion.div>
              
              <motion.h1 variants={staggerItem} className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight mb-6">
                Seu sorriso merece <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">
                  Cuidado Especializado
                </span>
              </motion.h1>
              
              <motion.p variants={staggerItem} className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-lg">
                Atendimento humanizado e tecnologia de ponta em São Paulo do Potengi. 
                Recupere sua autoestima e saúde bucal com o Dr. Pedro Elino.
              </motion.p>
              
              <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4">
                <motion.a 
                  href="#contact" 
                  onClick={(e) => scrollToSection(e, '#contact')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-teal-600 hover:bg-teal-700 md:text-lg transition-all shadow-xl shadow-teal-600/30 cursor-pointer"
                >
                  Agendar Avaliação
                  <ArrowRight className="ml-2 -mr-1" size={20} />
                </motion.a>
                <motion.a 
                  href={`https://wa.me/${DATA.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-200 text-base font-medium rounded-xl text-slate-700 bg-white/50 backdrop-blur-sm hover:bg-white hover:border-teal-600 hover:text-teal-600 md:text-lg transition-all cursor-pointer"
                >
                  <Phone className="mr-2" size={20} />
                  Conversar no WhatsApp
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-teal-50 rounded-full blur-3xl opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="relative"
            >
              <div className="absolute inset-0 bg-teal-600 rounded-2xl transform translate-x-4 translate-y-4"></div>
              <img 
                src={DATA.images.profile} 
                alt="Dr. Pedro Elino" 
                className="relative rounded-2xl shadow-2xl w-full object-cover h-[500px]"
              />
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl max-w-xs hidden md:block"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-teal-100 p-3 rounded-full text-teal-600">
                    <ShieldCheck size={32} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Formado pela UFRN</p>
                    <p className="text-xs text-slate-500">Universidade Federal do Rio Grande do Norte</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 variants={staggerItem} className="text-teal-600 font-bold uppercase tracking-wide text-sm mb-2">Sobre o Especialista</motion.h2>
              <motion.h3 variants={staggerItem} className="text-4xl font-bold text-slate-900 mb-6">Dr. Pedro Elino</motion.h3>
              <motion.p variants={staggerItem} className="text-lg text-slate-600 mb-6 leading-relaxed">
                Referência em cirurgia oral em São Paulo do Potengi, o Dr. Pedro Elino combina excelência acadêmica com uma abordagem prática e acolhedora.
              </motion.p>
              <motion.p variants={staggerItem} className="text-slate-600 mb-8 leading-relaxed">
                Graduado por uma das instituições mais respeitadas do país (UFRN), dedica-se a devolver o conforto e a estética do sorriso aos seus pacientes através de procedimentos seguros e minimamente invasivos.
              </motion.p>
              
              <motion.ul variants={staggerItem} className="space-y-4 mb-8">
                {[
                  "Cirurgião-Dentista formado pela UFRN",
                  `Aperfeiçoamento em Cirurgia Oral`,
                  "Atendimento Humanizado e Personalizado",
                  "Protocolos rigorosos de biossegurança"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="text-teal-500 mt-1 flex-shrink-0" size={20} />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </motion.ul>

              <motion.div variants={staggerItem} className="flex items-center gap-6 pt-4 border-t border-slate-100">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-slate-900">500+</span>
                  <span className="text-sm text-slate-500">Pacientes Atendidos</span>
                </div>
                <div className="w-px h-12 bg-slate-200"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-slate-900">100%</span>
                  <span className="text-sm text-slate-500">Dedicação</span>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SERVIÇOS ATUALIZADO */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-teal-600 font-bold uppercase tracking-wide text-sm mb-2">Tratamentos</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Cuidado Integral para sua Saúde Bucal</h3>
            <p className="text-slate-600">
              Utilizamos as técnicas mais modernas para garantir resultados eficazes e uma recuperação tranquila.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {SERVICES.map((service) => (
              <motion.div 
                key={service.id} 
                variants={staggerItem}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-8 shadow-lg transition-all border border-slate-100 h-full group flex flex-col items-start"
              >
                <div className="w-16 h-16 bg-teal-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-teal-600/20 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
                <p className="text-slate-600 leading-relaxed mb-6 flex-grow">
                  {service.shortDesc}
                </p>
                <button 
                  onClick={() => setSelectedService(service)} 
                  className="text-teal-600 font-bold hover:text-teal-800 inline-flex items-center text-sm uppercase tracking-wider group/btn"
                >
                  Saiba mais <ArrowRight size={16} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AMBIENTE */}
      <section id="environment" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 variants={staggerItem} className="text-teal-600 font-bold uppercase tracking-wide text-sm mb-2">Nosso Espaço</motion.h2>
              <motion.h3 variants={staggerItem} className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Conforto e Tecnologia em São Paulo do Potengi</motion.h3>
              <motion.p variants={staggerItem} className="text-slate-600 mb-8">
                Nosso consultório foi projetado para eliminar a ansiedade típica de visitas ao dentista. Um ambiente climatizado, moderno e acolhedor espera por você.
              </motion.p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Ambiente Climatizado", "Wi-Fi Gratuito", 
                  "Estacionamento Fácil", "Equipamentos Digitais",
                  "Acessibilidade", "Sala de Espera Confortável"
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={staggerItem}
                    className="flex items-center gap-2 text-slate-700 bg-slate-50 p-3 rounded-lg hover:bg-teal-50 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                    <span className="text-sm font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src={DATA.images.environment} 
                  alt="Consultório" 
                  className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <p className="text-white font-medium text-lg flex items-center gap-2">
                    <MapPin size={20} className="text-teal-400" />
                    Localização privilegiada
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contact" className="py-24 bg-teal-900 relative">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 variants={staggerItem} className="text-teal-400 font-bold uppercase tracking-wide text-sm mb-2">Fale Conosco</motion.h2>
              <motion.h3 variants={staggerItem} className="text-4xl font-bold text-white mb-6">Pronto para transformar seu sorriso?</motion.h3>
              <motion.p variants={staggerItem} className="text-teal-100 mb-8 text-lg">
                Preencha o formulário ao lado e você será redirecionado automaticamente para o nosso WhatsApp já com a mensagem pronta. Simples e rápido.
              </motion.p>

              <motion.div variants={staggerContainer} className="space-y-6">
                {contactItems.map((item, idx) => (
                    <motion.div key={idx} variants={staggerItem} className="flex items-start gap-4 text-white">
                        <div className="bg-teal-800 p-3 rounded-lg"><item.icon /></div>
                        <div>
                            <h4 className="font-bold text-lg">{item.title}</h4>
                            {item.link ? (
                                item.linkText ? (
                                    <>
                                        <p className="text-teal-100">{item.text}</p>
                                        <a href={item.link} target="_blank" rel="noreferrer" className="text-teal-400 hover:text-white text-sm underline mt-1 block">{item.linkText}</a>
                                    </>
                                ) : (
                                    <a href={item.link} target="_blank" rel="noreferrer" className="text-teal-100 hover:text-white transition-colors text-lg">{item.text}</a>
                                )
                            ) : (
                                <p className="text-teal-100">{item.text}</p>
                            )}
                        </div>
                    </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <form onSubmit={handleFormSubmit} className="bg-white rounded-2xl p-8 shadow-2xl">
                <h4 className="text-2xl font-bold text-slate-900 mb-6">Agendamento Online</h4>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nome Completo</label>
                    <input type="text" name="name" required placeholder="Ex: Maria Silva" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Serviço de Interesse</label>
                    <select name="service" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all bg-white">
                      <option>Avaliação Geral</option>
                      {SERVICES.map(s => <option key={s.id}>{s.title}</option>)}
                      <option>Outros</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Data de Preferência (Opcional)</label>
                    <input type="date" name="date" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all" />
                  </div>

                  <motion.button 
                    type="submit" 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-600/30 flex items-center justify-center gap-2 group"
                  >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" className="w-5 h-5 filter brightness-0 invert" />
                    Agendar via WhatsApp
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </motion.button>
                  
                  <p className="text-xs text-center text-slate-400 mt-4">
                    Seus dados serão enviados diretamente para o WhatsApp do consultório.
                  </p>
                </div>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{DATA.name}</h2>
            <p className="text-sm">Cirurgião Dentista - <span className="text-teal-400 font-semibold">{DATA.cro}</span></p>
            <p className="text-sm mt-1">© {new Date().getFullYear()} Todos os direitos reservados.</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <a href="https://uicode.site" target="_blank" rel="noreferrer" className="text-sm hover:text-white transition-colors flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full">
              <span>Desenvolvido por <strong>UiCode.dev</strong></span>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            </a>
            <p className="text-xs text-slate-600">Alta Performance Web</p>
          </div>
        </div>
      </footer>

      {/* MODAL DE SERVIÇOS (AnimatePresence) */}
      <AnimatePresence>
        {selectedService && (
          <ServiceModal 
            service={selectedService} 
            onClose={() => setSelectedService(null)} 
          />
        )}
      </AnimatePresence>

      <DevPopup />
    </div>
  );
}