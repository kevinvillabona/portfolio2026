document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            renderHero(data.profile);
            renderBento(data);
            renderProjects(data.projects);
            renderExperience(data.experience);
            renderEducation(data.education);
            renderFooter(data.profile);
            
            // Inicializar animaciones DESPUÉS de renderizar el contenido
            AOS.init({
                duration: 800, // Duración suave
                once: true,    // Animar solo una vez al bajar
                offset: 100,   // Trigger un poco antes de aparecer
                easing: 'ease-out-cubic'
            });
        })
        .catch(error => console.error('Error cargando datos:', error));
});

function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const icon = themeToggleBtn.querySelector('i');
    
    const userPref = localStorage.getItem('theme');
    const systemPref = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (userPref === 'dark' || (!userPref && systemPref)) {
        document.documentElement.classList.add('dark');
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        document.documentElement.classList.remove('dark');
        icon.classList.replace('fa-sun', 'fa-moon');
    }

    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        icon.style.transform = 'rotate(180deg)';
        setTimeout(() => icon.style.transform = 'rotate(0deg)', 300);

        if (isDark) {
            localStorage.setItem('theme', 'dark');
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    });
}

function renderHero(profile) {
    const heroContent = document.getElementById('hero-content');
    heroContent.innerHTML = `
        <p class="uppercase tracking-widest text-xs text-[var(--text-secondary)] max-w-80 mb-6 font-semibold" data-aos="fade-down" data-aos-delay="200">
            ${profile.title}
        </p>
        <h1 class="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-tight text-[var(--text-primary)]" data-aos="fade-up" data-aos-delay="300">
            Transformando Ideas en<br>
            <span class="text-[var(--accent-color)]">Experiencias Digitales</span>
        </h1>
        <p class="text-[var(--text-secondary)] md:tracking-wider mb-10 text-sm md:text-lg lg:text-xl max-w-2xl" data-aos="fade-up" data-aos-delay="400">
            ${profile.summary}
        </p>
        <div class="flex gap-4" data-aos="fade-up" data-aos-delay="500">
            <a href="#projects" class="magic-btn-container group">
                <span class="magic-btn-border"></span>
                <span class="magic-btn-content group-hover:text-[var(--accent-color)]">
                    Ver Proyectos <i class="fas fa-code group-hover:translate-x-1 transition-transform"></i>
                </span>
            </a>
            
            <a href="${profile.cv_file}" download class="group px-8 py-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] hover:bg-[var(--bg-primary)] transition flex items-center gap-2 text-sm font-medium">
                Descargar CV <i class="fas fa-download group-hover:translate-y-1 transition-transform text-[var(--accent-color)]"></i>
            </a>
        </div>
    `;
}

function renderBento(data) {
    const grid = document.getElementById('bento-grid');
    const skillsHTML = data.skills_scroll.map(skill => 
        `<span class="py-2 lg:py-3 px-3 text-xs lg:text-sm rounded-lg text-center bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)] whitespace-nowrap">${skill}</span>`
    ).join('');

    grid.innerHTML = `
        <div class="md:col-span-3 lg:col-span-3 glow-card rounded-3xl min-h-[40vh] relative overflow-hidden flex flex-col justify-end p-8 group" data-aos="fade-right" data-aos-delay="100">
            <div class="absolute inset-0">
                 <img src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1000" class="w-full h-full object-cover opacity-20 dark:opacity-40 group-hover:scale-105 transition-transform duration-500">
                 <div class="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] to-transparent"></div>
            </div>
            <div class="relative z-10">
                <div class="inline-block px-3 py-1 mb-2 text-xs font-bold tracking-wider text-[var(--accent-color)] uppercase bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-full">Liderazgo</div>
                <h3 class="font-heading font-bold text-xl md:text-2xl mb-2 text-[var(--text-primary)]">Arquitectura & Estrategia</h3>
                <p class="text-sm text-[var(--text-secondary)]">Priorizo la escalabilidad, el código limpio y el liderazgo técnico efectivo.</p>
            </div>
        </div>

        <div class="md:col-span-3 lg:col-span-2 glow-card rounded-3xl min-h-[40vh] relative overflow-hidden flex flex-col p-8 items-start justify-start" data-aos="fade-left" data-aos-delay="200">
             <div class="absolute inset-0">
                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000" class="w-full h-full object-cover opacity-30 dark:opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <div class="absolute inset-0 bg-gradient-to-b from-[var(--bg-card)]/50 to-[var(--bg-card)]"></div>
             </div>
             <div class="relative z-20">
                <h3 class="font-heading font-bold text-xl md:text-2xl max-w-xs text-[var(--text-primary)]">Base en ${data.profile.location}</h3>
                <p class="text-sm text-[var(--text-secondary)] mt-2">Disponible para proyectos globales.</p>
             </div>
             <div class="relative z-20 mt-auto ml-auto">
                <span class="relative flex h-3 w-3">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-color)] opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-[var(--accent-color)]"></span>
                </span>
             </div>
        </div>

        <div class="md:col-span-3 lg:col-span-2 glow-card rounded-3xl relative overflow-hidden flex flex-col p-6 h-full justify-center" data-aos="fade-up" data-aos-delay="300">
            <p class="text-[var(--text-secondary)] text-sm mb-2 uppercase tracking-wider font-semibold">Tech Stack</p>
            <h3 class="font-heading font-bold text-2xl mb-6 text-[var(--text-primary)]">Mis Herramientas</h3>
            <div class="flex gap-2 lg:gap-3 w-fit absolute -right-3 lg:-right-2 h-full overflow-hidden mask-gradient-hero">
                <div class="flex flex-col gap-3 animate-scroll-vertical">${skillsHTML}${skillsHTML}</div>
                <div class="flex flex-col gap-3 animate-scroll-vertical" style="animation-delay: -5s;">${skillsHTML}${skillsHTML}</div>
            </div>
        </div>

        <div class="md:col-span-3 lg:col-span-3 glow-card rounded-3xl relative overflow-hidden flex flex-col items-center justify-center p-8 min-h-[30vh]" data-aos="zoom-in" data-aos-delay="400">
             <div class="font-mono text-[10px] absolute inset-0 text-[var(--text-secondary)] opacity-10 p-4 leading-relaxed overflow-hidden select-none">
                  import pandas as pd<br>model = Sequential()<br>model.compile(optimizer='adam')<br>loss='mse'
             </div>
             <div class="relative z-10 text-center">
                <p class="text-[var(--text-secondary)] text-sm mb-2 font-semibold">Estado Actual</p>
                <h3 class="font-heading font-bold text-2xl md:text-3xl text-[var(--accent-color)]">${data.status.current}</h3>
                <p class="text-sm mt-2 text-[var(--text-secondary)]">${data.status.description}</p>
             </div>
        </div>
    `;
}

function renderProjects(projects) {
    const container = document.getElementById('projects-grid');
    container.innerHTML = projects.map((proj, index) => {
        const tagsHTML = proj.tags.map(tag => 
            `<div class="w-8 h-8 rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-secondary)] flex items-center justify-center text-[10px] font-bold" title="${tag}">${tag}</div>`
        ).join('');
        // Staggered delay logic: index * 100ms
        return `
        <div class="flex flex-col items-center justify-center w-full" data-aos="fade-up" data-aos-delay="${index * 150}">
            <div class="w-full h-[300px] md:h-[400px] bg-[var(--bg-card)] rounded-3xl border border-[var(--border-color)] overflow-hidden relative mb-6 group">
                 <div class="w-full h-full p-6 flex items-center justify-center relative overflow-hidden">
                    <div class="absolute bottom-0 left-0 right-0 h-[90%] w-[90%] mx-auto bg-[var(--bg-primary)] rounded-t-xl border-t border-l border-r border-[var(--border-color)] overflow-hidden transition-transform duration-500 group-hover:translate-y-2 group-hover:scale-[1.02]">
                        <img src="${proj.image}" onerror="this.src='https://via.placeholder.com/800x600/ccc/333?text=${encodeURIComponent(proj.title)}'" alt="${proj.title}" class="w-full h-full object-cover object-top">
                    </div>
                 </div>
            </div>
            <h3 class="font-heading font-bold text-2xl md:text-3xl line-clamp-1 mb-2 text-[var(--text-primary)]">${proj.title}</h3>
            <p class="text-[var(--text-secondary)] line-clamp-2 text-sm md:text-base mb-4 font-light text-center px-4">${proj.desc}</p>
            <div class="flex items-center justify-between w-full mt-2 px-2">
                <div class="flex items-center -space-x-2">${tagsHTML}</div>
                <a href="${proj.link}" target="_blank" class="flex items-center text-[var(--accent-color)] text-sm md:text-base font-medium hover:underline">
                    Ver Proyecto <i class="fas fa-arrow-right ml-2 text-xs"></i>
                </a>
            </div>
        </div>
        `;
    }).join('');
}

let resizeTimeout;

function renderExperience(experience) {
    const container = document.getElementById('experience-grid');
    
    // Contenedor principal
    container.className = "timeline-container max-w-6xl mx-auto px-4 sm:px-6 pb-20";
    
    // Inyectamos el lienzo SVG (Oculto en móvil por CSS)
    container.innerHTML = `<svg id="timeline-canvas" class="timeline-svg"></svg>`;

    const content = experience.map((company, index) => {
        // Lógica Desktop:
        // Index Par (0, 2...) -> Tarjeta a la DERECHA (Espacio línea a la Izq)
        // Index Impar (1, 3...) -> Tarjeta a la IZQUIERDA (Espacio línea a la Der)
        // NOTA: Esto es inverso a tu código anterior para cumplir con tu pedido visual
        const isRightAligned = index % 2 === 0; 
        
        // En móvil siempre fade-up o right. En desktop alternamos.
        const fadeDir = isRightAligned ? "fade-left" : "fade-right";

        const rolesHTML = company.roles.map(role => `
            <div class="relative pl-6 border-l-2 border-[var(--border-color)] hover:border-[var(--accent-color)] transition-colors duration-300 mb-6 last:mb-0 group/role">
                <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--border-color)] group-hover/role:border-[var(--accent-color)] transition-colors"></div>
                <h4 class="text-lg font-bold text-[var(--text-primary)]">${role.title}</h4>
                <p class="text-xs font-mono text-[var(--accent-color)] mb-2 uppercase tracking-wide">${role.date}</p>
                <ul class="list-disc list-outside ml-4 text-sm text-[var(--text-secondary)] space-y-1">
                    ${role.tasks.map(task => `<li>${task}</li>`).join('')}
                </ul>
            </div>
        `).join('');

        return `
        <div class="timeline-card-wrapper relative w-full mb-16 md:mb-32 last:mb-0">
            
            <div class="mobile-line-gradient md:hidden"></div>

            <div id="dot-${index}" class="absolute top-0 w-6 h-6 rounded-full bg-[var(--bg-card)] border-[3px] border-[var(--accent-color)] shadow-[0_0_15px_rgba(var(--accent-color),0.8)] z-20
                /* Posición Móvil */
                left-[-10px]
                /* Posición Desktop */
                ${isRightAligned ? 'md:left-0' : 'md:left-auto md:right-0'}
            ">
                 <div class="absolute inset-0 m-auto w-2 h-2 rounded-full bg-[var(--text-primary)]"></div>
            </div>

            <div id="card-${index}" class="w-full pl-8 md:pl-0 md:w-[95%] 
                ${isRightAligned ? 'md:ml-auto' : 'md:mr-auto'}" 
                data-aos="${fadeDir}" data-aos-delay="100">
                
                <div class="glow-card p-6 md:p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-xl group hover:border-[var(--accent-color)] transition-all duration-300">
                    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-8 border-b border-[var(--border-color)] pb-6">
                        <div class="w-16 h-16 bg-[var(--bg-primary)] rounded-2xl p-3 border border-[var(--border-color)] flex items-center justify-center shrink-0 shadow-sm">
                            <img src="${company.logo}" alt="${company.company}" class="w-full h-full object-contain" onerror="this.style.display='none';">
                        </div>
                        <div>
                            <h3 class="font-heading text-2xl font-bold text-[var(--text-primary)] mb-1">${company.company}</h3>
                            <p class="text-sm font-medium text-[var(--text-secondary)] flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full bg-[var(--accent-color)]"></span>
                                ${company.location}
                            </p>
                        </div>
                    </div>
                    <div class="space-y-4">
                        ${rolesHTML}
                    </div>
                </div>
            </div>
        </div>
        `;
    }).join('');

    const wrapper = document.createElement('div');
    wrapper.innerHTML = content;
    while (wrapper.firstChild) {
        container.appendChild(wrapper.firstChild);
    }

    // Dibujar líneas SVG (Solo funcionará en desktop)
    setTimeout(() => drawTimelineLines(experience.length), 300);
    
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => drawTimelineLines(experience.length), 100);
    });
}

function drawTimelineLines(count) {
    const svg = document.getElementById('timeline-canvas');
    const container = document.getElementById('experience-grid');
    if (!svg || !container) return;

    // DETECCIÓN RESPONSIVE: Si es móvil, limpiar SVG y salir
    if (window.innerWidth < 768) {
        svg.innerHTML = '';
        return; 
    }

    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();
    svg.innerHTML = ''; 

    // Definir Gradiente
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.innerHTML = `
        <linearGradient id="snakeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#E2CBFF">
                <animate attributeName="stop-color" values="#E2CBFF; ${accentColor}; #E2CBFF" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stop-color="${accentColor}">
                <animate attributeName="stop-color" values="${accentColor}; #E2CBFF; ${accentColor}" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stop-color="#E2CBFF">
                <animate attributeName="stop-color" values="#E2CBFF; ${accentColor}; #E2CBFF" dur="3s" repeatCount="indefinite" />
            </stop>
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
    `;
    svg.appendChild(defs);

    const containerRect = container.getBoundingClientRect();
    const cornerRadius = 40; // Radio más amplio para que se vea elegante

    for (let i = 0; i < count - 1; i++) {
        const dot1 = document.getElementById(`dot-${i}`);
        const card1 = document.getElementById(`card-${i}`); 
        const dot2 = document.getElementById(`dot-${i+1}`);

        if (dot1 && dot2 && card1) {
            const r1 = dot1.getBoundingClientRect();
            const rCard1 = card1.getBoundingClientRect(); 
            const r2 = dot2.getBoundingClientRect();

            const x1 = r1.left + r1.width / 2 - containerRect.left;
            const y1 = r1.top + r1.height / 2 - containerRect.top;
            
            const x2 = r2.left + r2.width / 2 - containerRect.left;
            const y2 = r2.top + r2.height / 2 - containerRect.top;

            // Punto de giro: Final de la tarjeta + 50px de espacio
            const turnY = (rCard1.bottom - containerRect.top) + 50; 

            // Dibujo Ortogonal (Tubería)
            let d = `M ${x1} ${y1}`; 
            d += ` L ${x1} ${turnY - cornerRadius}`;
            
            const direction = x2 > x1 ? 1 : -1; // 1 = Derecha, -1 = Izquierda
            
            // Primera curva (90 grados)
            d += ` Q ${x1} ${turnY} ${x1 + (cornerRadius * direction)} ${turnY}`;
            
            // Línea horizontal cruzando la pantalla
            d += ` L ${x2 - (cornerRadius * direction)} ${turnY}`;
            
            // Segunda curva (90 grados hacia abajo)
            d += ` Q ${x2} ${turnY} ${x2} ${turnY + cornerRadius}`;
            
            // Línea final hacia el siguiente punto
            d += ` L ${x2} ${y2}`;

            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", d);
            path.setAttribute("stroke", "url(#snakeGradient)");
            path.setAttribute("stroke-width", "4");
            path.setAttribute("fill", "none");
            path.setAttribute("stroke-linecap", "round");
            path.setAttribute("filter", "url(#glow)");

            svg.appendChild(path);
        }
    }
    
    // Línea de desvanecimiento final (Desktop)
    const lastDot = document.getElementById(`dot-${count - 1}`);
    const lastCard = document.getElementById(`card-${count - 1}`);
    if (lastDot && lastCard) {
        const rLast = lastDot.getBoundingClientRect();
        const rLastCard = lastCard.getBoundingClientRect();
        const xLast = rLast.left + rLast.width / 2 - containerRect.left;
        const yStart = rLast.top + rLast.height / 2 - containerRect.top;
        const yEnd = (rLastCard.bottom - containerRect.top); 

        const fadePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        fadePath.setAttribute("d", `M ${xLast} ${yStart} L ${xLast} ${yEnd}`);
        
        const fadeId = "fadeGrad";
        if(!document.getElementById(fadeId)) {
             const g = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
             g.id = fadeId; g.setAttribute("x1","0"); g.setAttribute("y1","0"); g.setAttribute("x2","0"); g.setAttribute("y2","1");
             g.innerHTML = `<stop offset="0%" stop-color="${accentColor}"/><stop offset="100%" stop-color="${accentColor}" stop-opacity="0"/>`;
             defs.appendChild(g);
        }
        fadePath.setAttribute("stroke", `url(#${fadeId})`);
        fadePath.setAttribute("stroke-width", "4");
        fadePath.setAttribute("stroke-linecap", "round");
        svg.appendChild(fadePath);
    }
}

function renderEducation(edu) {
    const container = document.getElementById('education-grid');
    container.innerHTML = edu.map((item, index) => `
        <div class="glow-card p-6 rounded-2xl relative group hover:-translate-y-2 transition-transform" data-aos="zoom-in" data-aos-delay="${index * 100}">
            <div class="absolute top-4 right-4 text-[var(--accent-color)] opacity-50"><i class="fas fa-graduation-cap text-2xl"></i></div>
            <h3 class="font-heading font-bold text-lg mb-1 text-[var(--text-primary)]">${item.degree}</h3>
            <p class="text-sm text-[var(--text-secondary)] mb-2">${item.school}</p>
            <span class="text-xs font-mono text-[var(--accent-color)] bg-[var(--bg-primary)] border border-[var(--border-color)] px-2 py-1 rounded">${item.year}</span>
        </div>
    `).join('');
}

function renderFooter(profile) {
    const year = new Date().getFullYear();
    document.getElementById('copyright').innerText = `Copyright © ${year} ${profile.name}`;
    document.getElementById('footer-email').href = `mailto:${profile.email}`;
    document.getElementById('social-linkedin').href = profile.linkedin;
    document.getElementById('social-github').href = profile.github;
    document.getElementById('social-email').href = `mailto:${profile.email}`;
}