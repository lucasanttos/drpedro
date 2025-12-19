/**
 * IMPORTAÇÕES
 * React: Biblioteca principal para construção da interface.
 * Lucide-react: Biblioteca de ícones moderna e leve.
 */
import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Calendar, MapPin, Phone, Instagram, 
  CheckCircle, ArrowRight, Smile, User, Star, ShieldCheck,
  Code2, ExternalLink 
} from 'lucide-react';

/**
 * ==============================================================================
 * ÁREA DE DADOS DO CLIENTE (EDITÁVEL)
 * ==============================================================================
 * Altere as informações abaixo para atualizar o site sem mexer no layout.
 */
const DATA = {
  name: "Dr. Pedro Elino",
  title: "Cirurgião-Dentista | Especialista em Cirurgia Oral",
  cro: "CRO/RN 7949", // Número do registro profissional
  university: "Formado pela UFRN",
  whatsapp: "5584991627325", // Apenas números, com código do país (55) e DDD
  instagram: "@pedroelino",
  instagramUrl: "https://instagram.com/pedroelino",
  address: "São Paulo do Potengi - RN",
  mapsLink: "https://goo.gl/maps/placeholder", // Link do Google Maps do consultório
  
  // Configuração básica de cores (usadas em algumas partes lógicas)
  colors: {
    primary: "text-teal-600",
    bgPrimary: "bg-teal-600",
    bgLight: "bg-teal-50"
  },
  
  // URLs das imagens (Troque pelas URLs reais ou caminhos locais como '/assets/foto.jpg')
  images: {
    hero: "/public/drpedro2.jpg", // Banner principal
    profile: "/public/drpedro.jpg", // Foto do Doutor
    environment: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000" // Foto do consultório
  }
};

/**
 * ==============================================================================
 * COMPONENTE: FadeInSection
 * ==============================================================================
 * Responsável por fazer os elementos aparecerem suavemente (Fade In) quando
 * o usuário rola a página até eles.
 * * @param {children} - O conteúdo que será animado.
 * @param {delay} - Tempo de atraso para iniciar a animação (útil para listas em cascata).
 */
const FadeInSection = ({ children, delay = 0 }) => {
  const [isVisible, setVisible] = useState(false); // Estado para saber se o elemento está visível
  const domRef = useRef(); // Referência ao elemento DOM

  useEffect(() => {
    // IntersectionObserver: API do navegador que detecta quando um elemento entra na tela
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true); // Ativa a animação
        }
      });
    });
    const currentElement = domRef.current;
    if (currentElement) observer.observe(currentElement);
    
    // Limpeza do observador quando o componente desmonta
    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, []);

  return (
    <div
      ref={domRef}
      // Classes do Tailwind para transição de opacidade e posição
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/**
 * ==============================================================================
 * COMPONENTE: DevPopup
 * ==============================================================================
 * Popup discreto no canto inferior direito com créditos do desenvolvedor.
 * Possui estilo "Glassmorphism" (vidro) e animações de entrada/saída.
 */
const DevPopup = () => {
  const [mounted, setMounted] = useState(false); // Controla se o componente existe na DOM
  const [visible, setVisible] = useState(false); // Controla a opacidade visual

  useEffect(() => {
    // Timer para mostrar o popup após 4 segundos (4000ms)
    const timer = setTimeout(() => {
      setMounted(true);
      // Pequeno delay para garantir que a transição CSS funcione
      setTimeout(() => setVisible(true), 100); 
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Função para fechar o popup suavemente
  const handleClose = () => {
    setVisible(false); // Inicia animação de desaparecimento
    setTimeout(() => setMounted(false), 700); // Remove da tela após a animação
  };

  if (!mounted) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) transform ${
      visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
    }`}>
      {/* Container principal com efeito de vidro (backdrop-blur) */}
      <div className="group bg-slate-900/95 backdrop-blur-md border border-slate-700/50 shadow-2xl rounded-2xl p-5 max-w-sm w-full relative overflow-hidden ring-1 ring-white/10">
        
        {/* Efeito de brilho decorativo no fundo */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all duration-1000"></div>

        {/* Botão de fechar (X) */}
        <button 
          onClick={handleClose} 
          className="absolute top-3 right-3 text-slate-500 hover:text-white hover:bg-slate-800 transition-all p-1.5 rounded-full z-10"
        >
          <X size={14} />
        </button>

        <div className="flex items-start gap-4 relative z-0">
            {/* Ícone da marca */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg shadow-blue-900/40 text-white flex-shrink-0">
                <Code2 size={24} strokeWidth={2} />
            </div>

            {/* Texto e Links */}
            <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <h5 className="text-white font-bold text-sm tracking-wide">UiCode.dev</h5>
                  <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1.5 py-0.5 rounded font-mono font-medium">PRO</span>
                </div>
                
                <p className="text-slate-400 text-xs leading-relaxed mb-3">
                  Gostou deste site? Vamos criar uma presença digital profissional para o seu negócio.
                </p>
                
                <div className="flex items-center gap-4">
                    <a 
                        href="https://wa.me/5511916474626" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-xs font-semibold text-slate-300 hover:text-white hover:underline decoration-blue-500 underline-offset-4 transition-all flex items-center gap-1.5 group/link"
                    >
                        WhatsApp 
                        <ExternalLink size={10} className="opacity-50 group-hover/link:opacity-100 transition-opacity" />
                    </a>
                    <a 
                        href="https://instagram.com/uicode.dev" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-xs font-semibold text-slate-300 hover:text-white hover:underline decoration-pink-500 underline-offset-4 transition-all flex items-center gap-1.5 group/link"
                    >
                        Instagram
                        <ExternalLink size={10} className="opacity-50 group-hover/link:opacity-100 transition-opacity" />
                    </a>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

/**
 * ==============================================================================
 * COMPONENTE PRINCIPAL: App
 * ==============================================================================
 * Contém toda a estrutura da Landing Page.
 */
export default function App() {
  // Estados para controle da interface
  const [isScrolled, setIsScrolled] = useState(false); // Detecta se o usuário rolou a página
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Controle do menu mobile
  
  /**
   * EFEITO: Configuração Inicial e SEO
   * Define o título da aba e monitora o scroll.
   */
  useEffect(() => {
    document.title = `${DATA.name} | Cirurgião Dentista em São Paulo do Potengi`;
    
    // Função que verifica a posição do scroll para mudar o estilo da navbar
    const handleScroll = () => {
      // Se rolar mais que 50px, ativa o estado "scrolled"
      setIsScrolled(window.scrollY > 50);
    };
    
    // Adiciona o evento de scroll
    window.addEventListener('scroll', handleScroll);
    
    // Remove o evento ao sair (limpeza de memória)
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * FUNÇÃO: Scroll Suave (Smooth Scroll)
   * Redireciona para a seção correta compensando a altura da navbar fixa.
   */
  const scrollToSection = (e, href) => {
    e.preventDefault(); // Evita o pulo seco padrão do navegador
    setMobileMenuOpen(false); // Fecha o menu mobile se estiver aberto
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 100; // Espaço extra para o título não ficar escondido atrás do menu
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth" // Ativa a rolagem suave
      });
    }
  };

  /**
   * FUNÇÃO: Envio do Formulário para WhatsApp
   * Captura os dados, formata uma mensagem e abre o link da API do WhatsApp.
   */
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Construção da mensagem formatada (usando * para negrito no WhatsApp)
    const message = `*Olá, Dr. Pedro!*%0A%0A` +
      `Meu nome é *${data.name}*.%0A` +
      `Gostaria de agendar/saber mais sobre: *${data.service}*.%0A` +
      `Preferência de horário: ${data.date || 'A combinar'}%0A%0A` +
      `_Enviado pelo site_`;

    window.open(`https://wa.me/${DATA.whatsapp}?text=${message}`, '_blank');
  };

  // Links de navegação do menu
  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Sobre', href: '#about' },
    { name: 'Serviços', href: '#services' },
    { name: 'Ambiente', href: '#environment' },
    { name: 'Contato', href: '#contact' },
  ];

  return (
    <div className="font-sans text-slate-800 bg-white overflow-x-hidden selection:bg-teal-100">
      
      {/* ==============================================================================
        1. NAVBAR (Menu de Navegação)
        ==============================================================================
        Possui efeito de zoom-out e blur quando a página é rolada.
      */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 ease-in-out border-b border-transparent
          ${isScrolled 
            ? 'py-2 bg-white/95 backdrop-blur-md shadow-md border-slate-100' // Estilo quando rolado
            : 'py-6 bg-transparent' // Estilo no topo
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-full">
            
            {/* LOGOTIPO */}
            <div className={`transition-transform duration-500 origin-left ${isScrolled ? 'scale-90' : 'scale-100'}`}>
              <a 
                href="#home" 
                onClick={(e) => scrollToSection(e, '#home')}
                className="flex items-center gap-2 group"
              >
                <div className="bg-teal-00 text-white p-0 rounded-lg group-hover:bg-teal-00 transition-colors">
<img
  src="/drpedro2-logo.png"
  width={48}
  height={24}
  alt="Smile"
/>                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none group-hover:text-teal-700 transition-colors">Dr. Pedro Elino</h1>
                  <span className="text-xs text-teal-600 font-semibold tracking-wider">CIRURGIÃO DENTISTA</span>
                </div>
              </a>
            </div>

            {/* MENU DESKTOP */}
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
              {/* Botão de Destaque na Navbar */}
              <a 
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="bg-teal-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 hover:-translate-y-0.5 transform active:translate-y-0"
              >
                Agendar
              </a>
            </div>

            {/* BOTÃO DO MENU MOBILE (Hambúrguer) */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600 p-2">
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* MENU MOBILE EXPANSÍVEL */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-white border-t shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
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
        </div>
      </nav>

      {/* ==============================================================================
        2. HERO SECTION (Banner Principal)
        ==============================================================================
      */}
      <section id="home" className="relative min-h-screen flex items-center pt-20">
        {/* Imagem de Fundo com Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={DATA.images.hero} 
            alt="Consultório odontológico moderno" 
            className="w-full h-full object-cover brightness-[0.9]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent sm:via-white/60"></div>
        </div>

        {/* Conteúdo do Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-2xl">
            <FadeInSection>
              {/* Etiqueta de Destaque */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-6">
                <Star size={14} className="fill-teal-800" />
                Excelência em Odontologia
              </div>
              
              {/* Título Principal */}
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight mb-6">
                Seu sorriso merece <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">
                  Cuidado Especializado
                </span>
              </h1>
              
              {/* Subtítulo */}
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-lg">
                Atendimento humanizado e tecnologia de ponta em São Paulo do Potengi. 
                Recupere sua autoestima e saúde bucal com o Dr. Pedro Elino.
              </p>
              
              {/* Botões de Ação (CTA) */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#contact" 
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-teal-600 hover:bg-teal-700 md:text-lg transition-all shadow-xl shadow-teal-600/30 hover:-translate-y-1"
                >
                  Agendar Avaliação
                  <ArrowRight className="ml-2 -mr-1" size={20} />
                </a>
                <a 
                  href={`https://wa.me/${DATA.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-200 text-base font-medium rounded-xl text-slate-700 bg-white/50 backdrop-blur-sm hover:bg-white hover:border-teal-600 hover:text-teal-600 md:text-lg transition-all"
                >
                  <Phone className="mr-2" size={20} />
                  Conversar no WhatsApp
                </a>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ==============================================================================
        3. SEÇÃO SOBRE (O Profissional)
        ==============================================================================
      */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        {/* Elemento Decorativo (Bolha de fundo) */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-teal-50 rounded-full blur-3xl opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            {/* Coluna da Imagem */}
            <FadeInSection>
              <div className="relative">
                <div className="absolute inset-0 bg-teal-600 rounded-2xl transform translate-x-4 translate-y-4"></div>
                <img 
                  src={DATA.images.profile} 
                  alt="Dr. Pedro Elino" 
                  className="relative rounded-2xl shadow-2xl w-full object-cover h-[500px]"
                />
                {/* Card Flutuante na Imagem */}
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl max-w-xs hidden md:block">
                  <div className="flex items-center gap-4">
                    <div className="bg-teal-100 p-3 rounded-full text-teal-600">
                      <ShieldCheck size={32} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Formado pela UFRN</p>
                      <p className="text-xs text-slate-500">Universidade Federal do Rio Grande do Norte</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>

            {/* Coluna do Texto */}
            <FadeInSection delay={200}>
              <h2 className="text-teal-600 font-bold uppercase tracking-wide text-sm mb-2">Sobre o Especialista</h2>
              <h3 className="text-4xl font-bold text-slate-900 mb-6">Dr. Pedro Elino</h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Referência em cirurgia oral em São Paulo do Potengi, o Dr. Pedro Elino combina excelência acadêmica com uma abordagem prática e acolhedora.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Graduado por uma das instituições mais respeitadas do país (UFRN), dedica-se a devolver o conforto e a estética do sorriso aos seus pacientes através de procedimentos seguros e minimamente invasivos.
              </p>
              
              {/* Lista de Diferenciais */}
              <ul className="space-y-4 mb-8">
                {[
                  "Cirurgião-Dentista formado pela UFRN",
                  `Especialista em Cirurgia Oral`,
                  "Atendimento Humanizado e Personalizado",
                  "Protocolos rigorosos de biossegurança"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="text-teal-500 mt-1 flex-shrink-0" size={20} />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Estatísticas */}
              <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-slate-900">500+</span>
                  <span className="text-sm text-slate-500">Pacientes Atendidos</span>
                </div>
                <div className="w-px h-12 bg-slate-200"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-slate-900">100%</span>
                  <span className="text-sm text-slate-500">Dedicação</span>
                </div>
              </div>
            </FadeInSection>

          </div>
        </div>
      </section>

      {/* ==============================================================================
        4. SEÇÃO DE SERVIÇOS
        ==============================================================================
      */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeInSection>
              <h2 className="text-teal-600 font-bold uppercase tracking-wide text-sm mb-2">Tratamentos</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Cuidado Integral para sua Saúde Bucal</h3>
              <p className="text-slate-600">
                Utilizamos as técnicas mais modernas para garantir resultados eficazes e uma recuperação tranquila.
              </p>
            </FadeInSection>
          </div>

          {/* Grid de Cards de Serviço */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Cirurgia Oral Menor",
                desc: "Extração de sisos e dentes inclusos com técnicas minimamente traumáticas.",
                icon: <User className="w-8 h-8 text-white" />
              },
              {
                title: "Profilaxia e Prevenção",
                desc: "Limpeza profunda e check-ups regulares para manter seu sorriso saudável.",
                icon: <Smile className="w-8 h-8 text-white" />
              },
              {
                title: "Estética Dental",
                desc: "Clareamento e procedimentos estéticos para renovar sua autoestima.",
                icon: <Star className="w-8 h-8 text-white" />
              }
            ].map((service, index) => (
              <FadeInSection key={index} delay={index * 150}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100 h-full group">
                  <div className="w-16 h-16 bg-teal-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-teal-600/20 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {service.desc}
                  </p>
                  <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="text-teal-600 font-bold hover:text-teal-800 inline-flex items-center text-sm uppercase tracking-wider">
                    Saiba mais <ArrowRight size={16} className="ml-1" />
                  </a>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================================================
        5. SEÇÃO AMBIENTE (Infraestrutura)
        ==============================================================================
      */}
      <section id="environment" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Lista de Comodidades */}
            <FadeInSection>
              <h2 className="text-teal-600 font-bold uppercase tracking-wide text-sm mb-2">Nosso Espaço</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Conforto e Tecnologia em São Paulo do Potengi</h3>
              <p className="text-slate-600 mb-8">
                Nosso consultório foi projetado para eliminar a ansiedade típica de visitas ao dentista. Um ambiente climatizado, moderno e acolhedor espera por você.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Ambiente Climatizado", "Wi-Fi Gratuito", 
                  "Estacionamento Fácil", "Equipamentos Digitais",
                  "Acessibilidade", "Sala de Espera Confortável"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-700 bg-slate-50 p-3 rounded-lg hover:bg-teal-50 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </FadeInSection>

            {/* Imagem do Local */}
            <FadeInSection delay={200}>
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
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ==============================================================================
        6. SEÇÃO CONTATO E AGENDAMENTO
        ==============================================================================
      */}
      <section id="contact" className="py-24 bg-teal-900 relative">
        {/* Padrão de fundo pontilhado (CSS puro) */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Informações de Contato (Esquerda) */}
            <FadeInSection>
              <h2 className="text-teal-400 font-bold uppercase tracking-wide text-sm mb-2">Fale Conosco</h2>
              <h3 className="text-4xl font-bold text-white mb-6">Pronto para transformar seu sorriso?</h3>
              <p className="text-teal-100 mb-8 text-lg">
                Preencha o formulário ao lado e você será redirecionado automaticamente para o nosso WhatsApp já com a mensagem pronta. Simples e rápido.
              </p>

              <div className="space-y-6">
                {/* Item Endereço */}
                <div className="flex items-start gap-4 text-white">
                  <div className="bg-teal-800 p-3 rounded-lg"><MapPin /></div>
                  <div>
                    <h4 className="font-bold text-lg">Endereço</h4>
                    <p className="text-teal-100">{DATA.address}</p>
                    <a href={DATA.mapsLink} target="_blank" rel="noreferrer" className="text-teal-400 hover:text-white text-sm underline mt-1 block">Ver no mapa</a>
                  </div>
                </div>

                {/* Item Instagram */}
                <div className="flex items-start gap-4 text-white">
                  <div className="bg-teal-800 p-3 rounded-lg"><Instagram /></div>
                  <div>
                    <h4 className="font-bold text-lg">Siga-nos</h4>
                    <a href={DATA.instagramUrl} target="_blank" rel="noreferrer" className="text-teal-100 hover:text-white transition-colors text-lg">
                      {DATA.instagram}
                    </a>
                  </div>
                </div>

                {/* Item Horário */}
                <div className="flex items-start gap-4 text-white">
                  <div className="bg-teal-800 p-3 rounded-lg"><Calendar /></div>
                  <div>
                    <h4 className="font-bold text-lg">Horário de Atendimento</h4>
                    <p className="text-teal-100">Segunda a Sexta: 08h às 18h</p>
                  </div>
                </div>
              </div>
            </FadeInSection>

            {/* Formulário (Direita) */}
            <FadeInSection delay={200}>
              <form onSubmit={handleFormSubmit} className="bg-white rounded-2xl p-8 shadow-2xl">
                <h4 className="text-2xl font-bold text-slate-900 mb-6">Agendamento Online</h4>
                
                <div className="space-y-5">
                  {/* Campo Nome */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nome Completo</label>
                    <input 
                      type="text" 
                      name="name" 
                      required
                      placeholder="Ex: Maria Silva" 
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    />
                  </div>

                  {/* Campo Serviço (Select) */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Serviço de Interesse</label>
                    <select 
                      name="service" 
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all bg-white"
                    >
                      <option>Avaliação Geral</option>
                      <option>Cirurgia de Siso</option>
                      <option>Implantes</option>
                      <option>Clareamento</option>
                      <option>Outros</option>
                    </select>
                  </div>

                  {/* Campo Data */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Data de Preferência (Opcional)</label>
                    <input 
                      type="date" 
                      name="date"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                    />
                  </div>

                  {/* Botão Submit */}
                  <button 
                    type="submit" 
                    className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/30 flex items-center justify-center gap-2 group"
                  >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" className="w-5 h-5 filter brightness-0 invert" />
                    Agendar via WhatsApp
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </button>
                  
                  <p className="text-xs text-center text-slate-400 mt-4">
                    Seus dados serão enviados diretamente para o WhatsApp do consultório.
                  </p>
                </div>
              </form>
            </FadeInSection>

          </div>
        </div>
      </section>

      {/* ==============================================================================
        7. FOOTER (Rodapé)
        ==============================================================================
      */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          
          {/* Copyright e CRO */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{DATA.name}</h2>
            <p className="text-sm">Cirurgião Dentista - <span className="text-teal-400 font-semibold">{DATA.cro}</span></p>
            <p className="text-sm mt-1">© {new Date().getFullYear()} Todos os direitos reservados.</p>
          </div>

          {/* Créditos Fixos no Rodapé */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <a 
              href="https://uicode-dev.netlify.app" 
              target="_blank" 
              rel="noreferrer" 
              className="text-sm hover:text-white transition-colors flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full"
            >
              <span>Desenvolvido por <strong>UiCode.dev</strong></span>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            </a>
            <p className="text-xs text-slate-600">Alta Performance Web</p>
          </div>

        </div>
      </footer>

      {/* Popup de Créditos Flutuante */}
      <DevPopup />
    </div>
  );
}