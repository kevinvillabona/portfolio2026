gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            renderSystem(data);
            setTimeout(() => {
                initAnimations();
                ScrollTrigger.refresh();
            }, 100);
        })
        .catch(error => {
            console.error('Error del Sistema', error);
            document.getElementById('home').innerHTML = '<h1 class="text-xl text-red-500 font-mono">Error: data.json no cargado.</h1>';
        });

    setupThemeToggle();
});

function renderSystem(data) {
    // --- 1. CONFIG ---
    const cvBtn = document.getElementById('download-cv');
    if (data.profile.cv_file) cvBtn.href = data.profile.cv_file;

    // --- 2. HERO SECTION ---
    const heroHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div class="lg:col-span-8 order-2 lg:order-1 flex flex-col items-start text-left">
                <div class="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-brand-red/30 bg-brand-red/10 text-brand-red text-xs font-mono font-bold tracking-widest uppercase rounded-sm select-none">
                    <span class="w-2 h-2 bg-brand-red rounded-full animate-pulse"></span>
                    Disponible para Liderazgo
                </div>
                <h1 class="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-neutral-900 dark:text-white reveal-hero">
                    Arquitectura de <br>
                    <span class="text-brand-red">Sistemas Escalables</span>
                </h1>
                <p class="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mb-10 leading-relaxed border-l-4 border-neutral-300 dark:border-brand-surface2 pl-6 reveal-hero">
                    ${data.profile.summary.split('.')[0]}.<br>
                    <span class="text-sm font-mono mt-3 block opacity-70 text-brand-red">
                        // Especialista .NET // Arquitectura de Software
                    </span>
                </p>
                
                <div class="flex flex-col sm:flex-row items-center gap-8 reveal-hero w-full">
                    <a href="#projects" class="px-8 py-4 bg-neutral-900 dark:bg-brand-red text-white font-bold tracking-wide hover:bg-brand-red dark:hover:bg-white dark:hover:text-brand-red transition-all shadow-lg hover:-translate-y-1 rounded-sm w-full sm:w-auto text-center">
                        VER SISTEMAS <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                    
                    <div class="flex items-center gap-6">
                        <a href="mailto:${data.profile.email}" class="text-4xl text-neutral-400 dark:text-neutral-500 hover:text-brand-red dark:hover:text-brand-red transition-colors hover:scale-110 transform duration-300" aria-label="Email">
                            <i class="fas fa-envelope"></i>
                        </a>
                        <a href="${data.profile.linkedin}" target="_blank" class="text-4xl text-neutral-400 dark:text-neutral-500 hover:text-brand-red dark:hover:text-brand-red transition-colors hover:scale-110 transform duration-300" aria-label="LinkedIn">
                            <i class="fab fa-linkedin"></i>
                        </a>
                        <a href="${data.profile.github}" target="_blank" class="text-4xl text-neutral-400 dark:text-neutral-500 hover:text-brand-red dark:hover:text-brand-red transition-colors hover:scale-110 transform duration-300" aria-label="GitHub">
                            <i class="fab fa-github"></i>
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="lg:col-span-4 order-1 lg:order-2 flex justify-center lg:justify-end reveal-hero mb-8 lg:mb-0">
                <div class="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 avatar-container cursor-pointer">
                    <div class="absolute inset-0 border-2 border-neutral-200 dark:border-brand-surface2 rotate-6 transition-transform duration-500 hover:rotate-12"></div>
                    <div class="absolute inset-0 border-2 border-brand-red/20 -rotate-6 transition-transform duration-500 hover:-rotate-12"></div>
                    <div class="absolute inset-0 bg-neutral-100 dark:bg-brand-surface overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl rounded-sm">
                        <img src="${data.profile.avatar[0]}" alt="Kevin Villabona" class="w-full h-full object-cover">
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('home').innerHTML = heroHTML;

    // --- 3. PERFIL ---
    document.getElementById('profile').innerHTML = `
        <div class="std-container">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                <div>
                    <span class="font-mono text-brand-red text-sm font-bold tracking-wider mb-3 block">01. RESUMEN EJECUTIVO</span>
                    <h2 class="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">Autoridad Técnica & <br> Visión Estratégica</h2>
                    <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8 text-base md:text-lg text-justify">
                        ${data.profile.summary}
                    </p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div class="p-5 bg-neutral-50 dark:bg-brand-surface border-l-2 border-brand-red hover:bg-white dark:hover:bg-brand-surface2 transition-colors rounded-sm">
                            <h4 class="font-bold text-neutral-900 dark:text-white text-sm uppercase mb-1">Arquitectura</h4>
                            <p class="text-xs text-neutral-500">Soluciones .NET Escalables</p>
                        </div>
                        <div class="p-5 bg-neutral-50 dark:bg-brand-surface border-l-2 border-neutral-400 hover:bg-white dark:hover:bg-brand-surface2 transition-colors rounded-sm">
                            <h4 class="font-bold text-neutral-900 dark:text-white text-sm uppercase mb-1">Liderazgo</h4>
                            <p class="text-xs text-neutral-500">Gestión de Equipos & Roadmap</p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col justify-center space-y-6 font-mono text-sm border-t border-b border-neutral-200 dark:border-brand-surface2 py-8">
                    <div class="flex justify-between items-center group cursor-default p-3 hover:bg-neutral-50 dark:hover:bg-brand-surface transition-colors rounded-sm">
                        <span class="text-neutral-500 group-hover:text-brand-red transition-colors">Backend Engineering</span>
                        <span class="hidden sm:block w-1/3 h-px bg-neutral-200 dark:bg-brand-surface2 group-hover:bg-brand-red transition-colors"></span>
                        <span class="font-bold text-neutral-800 dark:text-white">Senior Level</span>
                    </div>
                    <div class="flex justify-between items-center group cursor-default p-3 hover:bg-neutral-50 dark:hover:bg-brand-surface transition-colors rounded-sm">
                        <span class="text-neutral-500 group-hover:text-brand-red transition-colors">Frontend Architecture</span>
                        <span class="hidden sm:block w-1/3 h-px bg-neutral-200 dark:bg-brand-surface2 group-hover:bg-brand-red transition-colors"></span>
                        <span class="font-bold text-neutral-800 dark:text-white">Avanzado</span>
                    </div>
                    <div class="flex justify-between items-center group cursor-default p-3 hover:bg-neutral-50 dark:hover:bg-brand-surface transition-colors rounded-sm">
                        <span class="text-neutral-500 group-hover:text-brand-red transition-colors">Data Science</span>
                        <span class="hidden sm:block w-1/3 h-px bg-neutral-200 dark:bg-brand-surface2 group-hover:bg-brand-red transition-colors"></span>
                        <span class="font-bold text-neutral-800 dark:text-white">Académico</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    // --- 4. EXPERIENCIA (LOGO AUMENTADO) ---
    let expHTML = `
        <div class="std-container">
            <div class="flex flex-col items-start mb-12">
                <span class="font-mono text-brand-red text-sm font-bold tracking-wider mb-3 block">02. TRAYECTORIA</span>
                <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">Línea de Tiempo Profesional</h2>
            </div>
            <div class="relative border-l border-neutral-300 dark:border-brand-surface2 ml-2 md:ml-3 space-y-12 md:space-y-16">
    `;
    
    data.experience.forEach((company, idx) => {
        let rolesHTML = '';
        company.roles.forEach(role => {
            rolesHTML += `
                <div class="mb-8 last:mb-0 relative pl-6 md:pl-8 group">
                    <span class="absolute left-[-5px] top-2 w-2.5 h-2.5 bg-neutral-200 dark:bg-brand-surface2 border border-neutral-400 dark:border-neutral-600 rounded-full group-hover:bg-brand-red transition-colors duration-300 group-hover:scale-125"></span>
                    <h4 class="text-lg font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-brand-red transition-colors">${role.title}</h4>
                    <span class="font-mono text-xs text-brand-red mb-3 block opacity-80">${role.date}</span>
                    <ul class="space-y-3 mt-3">
                        ${role.tasks.map(task => `
                            <li class="text-sm text-neutral-600 dark:text-neutral-400 flex items-start gap-3">
                                <span class="mt-1.5 w-1 h-1 bg-neutral-400 rounded-full shrink-0"></span>
                                <span class="leading-relaxed">${task}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
        });

        expHTML += `
            <div class="relative pl-6 md:pl-8 exp-item">
                <div class="absolute -left-3 top-0 w-6 h-6 bg-neutral-900 dark:bg-neutral-200 border-2 border-brand-red flex items-center justify-center text-[10px] font-bold text-white dark:text-neutral-900 z-10 shadow-md">
                    ${idx + 1}
                </div>

                <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 mb-6">
                    <div class="flex items-center gap-4">
                        ${company.logo ? `
                            <div class="w-16 h-16 p-1 bg-white dark:bg-brand-surface rounded-sm flex items-center justify-center border border-neutral-200 dark:border-neutral-700 shadow-sm shrink-0 hover:scale-105 transition-transform duration-300">
                                <img src="${company.logo}" alt="${company.company}" class="w-full h-full object-contain">
                            </div>
                        ` : ''}
                        
                        <h3 class="text-xl md:text-2xl font-extrabold text-neutral-900 dark:text-white uppercase tracking-tight">${company.company}</h3>
                    </div>
                    <span class="w-fit px-2 py-0.5 border border-neutral-300 dark:border-brand-surface2 text-[10px] font-mono uppercase text-neutral-500 rounded self-start sm:self-center">${company.location}</span>
                </div>

                <div class="bg-white dark:bg-brand-surface p-6 md:p-8 border border-neutral-200 dark:border-brand-surface2 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-sm">
                    ${rolesHTML}
                </div>
            </div>
        `;
    });
    expHTML += '</div></div>';
    document.getElementById('experience').innerHTML = expHTML;

    // --- 5. PROYECTOS ---
    if (data.projects && data.projects.length > 0) {
        let projHTML = `
            <div class="std-container">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div>
                        <span class="font-mono text-brand-red text-sm font-bold tracking-wider mb-3 block">03. SISTEMAS DE INGENIERÍA</span>
                        <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">Proyectos Destacados</h2>
                    </div>
                    <a href="${data.profile.github}" target="_blank" class="inline-flex items-center gap-2 font-mono text-xs border-b border-brand-red text-neutral-600 dark:text-neutral-400 hover:text-brand-red pb-1 transition-colors">
                        VER REPOSITORIOS <i class="fab fa-github"></i>
                    </a>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        `;

        data.projects.forEach((proj) => {
            const isInternal = proj.link === "#";
            const linkAction = isInternal 
                ? `<span class="text-xs font-mono text-neutral-400 cursor-not-allowed flex items-center gap-2"><i class="fas fa-lock text-brand-red"></i> ACTIVO INTERNO</span>`
                : `<a href="${proj.link}" target="_blank" class="text-xs font-bold font-mono text-brand-red hover:underline flex items-center gap-2">VER DEPLOY <i class="fas fa-external-link-alt"></i></a>`;

            const typeLabel = proj.type === "Herramienta Interna" ? "TOOLING" : proj.type.toUpperCase();

            const imageHTML = proj.image 
                ? `<div class="relative h-48 w-full overflow-hidden border-b border-neutral-200 dark:border-brand-surface2 group-hover:opacity-100 transition-opacity">
                     <div class="absolute inset-0 bg-neutral-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                     <img src="${proj.image}" alt="${proj.title}" class="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700 ease-out">
                     <span class="absolute top-3 right-3 z-20 font-mono text-[10px] uppercase tracking-widest bg-neutral-900/90 text-white backdrop-blur-sm px-2 py-1 rounded-sm border border-white/10 shadow-sm">${typeLabel}</span>
                   </div>`
                : `<div class="h-2 w-full bg-brand-red"></div>`;

            projHTML += `
                <article class="tech-card group bg-white dark:bg-brand-surface border border-neutral-200 dark:border-brand-surface2 rounded-sm shadow-sm hover:shadow-xl overflow-hidden h-full">
                    ${imageHTML}
                    
                    <div class="p-6 md:p-8 flex-grow flex flex-col">
                        <div class="flex justify-between items-start mb-4">
                            <h3 class="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-brand-red transition-colors">${proj.title}</h3>
                            <i class="fas fa-code-branch text-neutral-300 dark:text-neutral-600 group-hover:text-brand-red transition-colors text-lg"></i>
                        </div>
                        
                        <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 flex-grow">
                            ${proj.description}
                        </p>
                        
                        <div class="flex flex-wrap gap-2 mb-6">
                            ${proj.tags.slice(0, 4).map(t => `<span class="text-[10px] font-mono bg-neutral-100 dark:bg-brand-surface2 text-neutral-600 dark:text-neutral-300 px-2 py-1 rounded-sm border border-transparent dark:border-brand-surface2">${t}</span>`).join('')}
                        </div>
                        
                        <div class="pt-5 border-t border-neutral-100 dark:border-brand-surface2 mt-auto">
                            ${linkAction}
                        </div>
                    </div>
                </article>
            `;
        });
        projHTML += '</div></div>';

        document.getElementById('projects').innerHTML = projHTML;
    } else {
        document.getElementById('projects').innerHTML = '<div class="std-container"><p class="text-center font-mono text-neutral-500">No se encontraron proyectos.</p></div>';
    }

    // --- 6. SKILLS ---
    const skillIconsHTML = data.skills.map(skill => `
        <div class="flex flex-col items-center justify-center p-6 border border-neutral-200 dark:border-brand-surface2 hover:border-brand-red/50 transition-colors bg-white dark:bg-brand-surface group rounded-sm shadow-sm">
            <i class="${skill.icon} text-3xl md:text-4xl mb-4 text-neutral-400 dark:text-neutral-500 group-hover:text-brand-red transition-colors duration-300 group-hover:scale-110"></i>
            <span class="font-mono text-xs font-bold text-neutral-700 dark:text-neutral-300 text-center">${skill.name}</span>
        </div>
    `).join('');

    document.getElementById('skills').innerHTML = `
        <div class="std-container">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                <div class="lg:col-span-4">
                    <span class="font-mono text-brand-red text-sm font-bold tracking-wider mb-3 block">04. ARSENAL TÉCNICO</span>
                    <h2 class="text-3xl font-bold text-neutral-900 dark:text-white mb-6">Stack Tecnológico</h2>
                    <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed text-justify">
                        Manejo integral de tecnologías Microsoft .NET para arquitecturas críticas, complementado con herramientas modernas de Front-end y metodologías ágiles de gestión.
                    </p>
                    <div class="space-y-3 font-mono text-xs text-neutral-500 dark:text-neutral-400">
                        <p class="flex items-center gap-2"><i class="fas fa-check text-brand-red"></i> Clean Architecture</p>
                        <p class="flex items-center gap-2"><i class="fas fa-check text-brand-red"></i> CI/CD Pipelines</p>
                        <p class="flex items-center gap-2"><i class="fas fa-check text-brand-red"></i> Domain Driven Design</p>
                    </div>
                </div>
                <div class="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    ${skillIconsHTML}
                </div>
            </div>
        </div>
    `;

    // --- 7. CONTACTO ---
    document.getElementById('contact').innerHTML = `
        <div class="std-container">
            <div class="bg-neutral-900 dark:bg-brand-surface text-neutral-200 p-8 md:p-16 rounded-sm relative overflow-hidden shadow-2xl max-w-5xl mx-auto border dark:border-brand-surface2">
                <div class="absolute top-0 left-0 w-full h-1 bg-brand-red"></div>
                <div class="absolute -right-10 -bottom-10 text-9xl text-white opacity-5 rotate-12 select-none pointer-events-none">
                    <i class="fas fa-paper-plane"></i>
                </div>

                <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Iniciar Comunicación</h2>
                <p class="font-mono text-sm text-neutral-400 mb-10 max-w-xl mx-auto">
                    Disponible para discutir arquitectura, estrategia o roles de liderazgo técnico.
                </p>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-12 max-w-3xl mx-auto">
                    <div class="group cursor-pointer text-center md:text-left">
                        <span class="text-xs font-mono text-brand-red block mb-2 group-hover:translate-x-1 transition-transform">EMAIL</span>
                        <a href="mailto:${data.profile.email}" class="text-sm font-bold text-white hover:text-brand-red transition-colors break-all">${data.profile.email}</a>
                    </div>
                    <div class="group cursor-pointer text-center md:text-left">
                        <span class="text-xs font-mono text-brand-red block mb-2 group-hover:translate-x-1 transition-transform">LINKEDIN</span>
                        <a href="${data.profile.linkedin}" target="_blank" class="text-sm font-bold text-white hover:text-brand-red transition-colors">/in/kevinvillabona</a>
                    </div>
                    <div class="group cursor-pointer text-center md:text-left">
                        <span class="text-xs font-mono text-brand-red block mb-2 group-hover:translate-x-1 transition-transform">GITHUB</span>
                        <a href="${data.profile.github}" target="_blank" class="text-sm font-bold text-white hover:text-brand-red transition-colors">/kevinvillabona</a>
                    </div>
                </div>

                <a href="mailto:${data.profile.email}" class="inline-block px-10 py-4 border border-white/20 hover:bg-brand-red hover:border-brand-red text-white font-mono text-sm font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 rounded-sm">
                    Enviar Transmisión
                </a>
            </div>
        </div>
    `;
    
    document.getElementById('copyright-content').innerHTML = `
        ESTADO DEL SISTEMA: OPERATIVO // © ${new Date().getFullYear()} ${data.profile.name}. TODOS LOS DERECHOS RESERVADOS.
    `;
}

// --- ANIMACIONES GSAP ---
function initAnimations() {
    gsap.from(".reveal-hero", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out"
    });

    gsap.utils.toArray("h2").forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 90%",
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    gsap.utils.toArray(".exp-item").forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
            },
            x: -20,
            opacity: 0,
            duration: 0.8,
            delay: 0.1,
            ease: "power2.out"
        });
    });

    gsap.from(".tech-card", {
        scrollTrigger: {
            trigger: "#projects",
            start: "top 85%",
            toggleActions: "play none none none"
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        clearProps: "all",
        ease: "back.out(1.2)"
    });
}

function setupThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    toggleBtn.addEventListener('click', () => {
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.theme = 'light';
        } else {
            html.classList.add('dark');
            localStorage.theme = 'dark';
        }
    });
}