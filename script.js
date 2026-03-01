document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSmoothScroll(); 
    initMobileMenu();
    initTimelineObserver(); 
    
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            renderHero(data.profile);
            renderMetrics(data.metrics);
            renderBento(data);
            renderExpertise(data.expertise);
            renderProjects(data.projects);
            renderSandbox(data.sandbox_projects);
            renderExperience(data.experience);
            renderFooter(data.profile);
            
            // ACTUALIZAR LINK DEL CV EN NAVBAR
            const navCvBtn = document.getElementById('nav-cv-btn');
            if (navCvBtn && data.profile.cv_file) {
                navCvBtn.href = data.profile.cv_file;
            }
            
            // Inicializar animaciones DESPUÉS de renderizar el contenido
            AOS.init({
                duration: 800, 
                once: true,    
                offset: 100,   
                easing: 'ease-out-cubic'
            });
        })
        .catch(error => {
            console.error('Error cargando datos:', error);
            document.getElementById('hero-content').innerHTML = '<p class="text-red-500">Error al cargar la información.</p>';
        });
});

// FUNCIÓN PARA EL MENÚ HAMBURGUESA
function initMobileMenu() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (!mobileBtn || !mobileMenu) return;

    function toggleMenu() {
        mobileBtn.classList.toggle('hamburger-active');
        mobileMenu.classList.toggle('mobile-menu-open');
        document.body.classList.toggle('no-scroll');
    }

    mobileBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('mobile-menu-open')) {
                toggleMenu();
            }
        });
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
}

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
    const randomNum = Math.floor(Math.random() * 5) + 1;
    
    heroContent.innerHTML = `
         <div class="relative w-32 h-32 md:w-40 md:h-40 mb-6 mx-auto group" data-aos="zoom-in" data-aos-delay="100">
            <div class="absolute inset-0 bg-gradient-to-tr from-[var(--accent-color)] to-[#E2CBFF] rounded-3xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
            <div class="relative w-full h-full rounded-3xl overflow-hidden border border-[var(--border-color)] shadow-xl">
               <video 
                autoplay 
                loop 
                muted 
                playsinline
                poster="images/final_1.png"
                class="w-full h-full object-cover z-10 relative filter drop-shadow-md group-hover:drop-shadow-lg transition-all duration-500"
                >
                    <source src="videos/video_animacion_${randomNum}.webm" type="video/webm">
                    <source src="videos/video_animacion_${randomNum}.mov" type='video/mp4; codecs="hvc1"'>
                    Tu navegador no soporta este video.
                </video>
            </div>
        </div>
        <p class="uppercase tracking-widest text-xs text-[var(--text-secondary)] mb-4 font-bold mx-auto" data-aos="fade-down" data-aos-delay="200">${profile.title}</p>
        <h1 class="font-heading text-[clamp(3rem,8vw,6rem)] font-[800] tracking-[-2px] leading-[1.1] mb-6 max-w-[900px] mx-auto text-[var(--text-primary)]" data-aos="fade-up" data-aos-delay="300">
            ${profile.name}<br><span class="text-[var(--accent-color)]">${profile.surname}</span>
        </h1>
        <p class="mb-10 text-[1.2rem] text-[var(--text-secondary)] max-w-[600px] mx-auto leading-[1.6]" data-aos="fade-up" data-aos-delay="400">${profile.summary}</p>
        <div class="flex gap-4 justify-center" data-aos="fade-up" data-aos-delay="400">
            <a href="#contact" class="magic-btn-container group">
                <span class="magic-btn-border"></span>
                <span class="magic-btn-content group-hover:text-[var(--accent-color)]">Contactame <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i></span>
            </a>
        </div>
    `;
}

function renderMetrics(metrics) {
    const container = document.getElementById('metrics-container');
    if (!container || !metrics) return;
    
    container.innerHTML = `
        <div class="grid grid-cols-3 gap-2 md:gap-6 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-4 md:p-8 relative overflow-hidden" data-aos="fade-up" data-aos-delay="500">
            <div class="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>
            ${metrics.map((m, i) => `
                <div class="flex flex-col items-center justify-center text-center relative z-10 px-1 md:px-0 ${i !== metrics.length - 1 ? 'border-r border-[var(--border-color)]' : ''}">
                    <span class="font-heading text-2xl sm:text-3xl md:text-5xl font-extrabold text-[var(--accent-color)] mb-1 md:mb-2 drop-shadow-sm">${m.value}</span>
                    <span class="text-[0.6rem] sm:text-[0.7rem] md:text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider md:tracking-widest leading-tight">${m.label}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function renderExpertise(expertise) {
    const container = document.getElementById('expertise-grid');
    if (!container || !expertise) return;
    
    container.innerHTML = expertise.map((exp, index) => `
        <div class="glow-card p-5 md:p-8 rounded-3xl flex flex-col items-start group hover:-translate-y-1 md:hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden h-full" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 mb-3 md:mb-0 w-full z-10">
                <div class="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center md:mb-6 shrink-0 group-hover:border-[var(--accent-color)] transition-all duration-300 group-hover:bg-[var(--accent-color)] group-hover:text-white text-[var(--accent-color)] shadow-sm group-hover:shadow-md md:group-hover:scale-110">
                    <i class="${exp.icon} text-xl md:text-2xl"></i>
                </div>
                <h3 class="font-heading text-lg md:text-xl font-[800] text-[var(--text-primary)] md:mb-3 leading-tight">${exp.title}</h3>
            </div>
            <p class="text-[var(--text-secondary)] text-sm leading-relaxed z-10">${exp.desc}</p>
        </div>
    `).join('');
}

function renderBento(data) {
    const grid = document.getElementById('bento-grid');
    
    const shuffleArray = (array) => {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    const shuffledSkills1 = shuffleArray(data.skills_scroll || []);
    const shuffledSkills2 = shuffleArray(data.skills_scroll || []);

    const createSkillTags = (skills) => skills.map(skill => {
        const iconClass = skill.icon || "fas fa-code";
        const skillName = skill.name || "-";
        
        return `
        <span class="py-1.5 px-3 text-xs font-mono font-medium rounded text-center bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)] whitespace-nowrap hover:border-[var(--accent-color)] hover:text-[var(--text-primary)] transition-all cursor-default flex items-center justify-center gap-2 group/skill">
            <i class="${iconClass} text-base opacity-70 group-hover/skill:opacity-100 group-hover/skill:text-[var(--accent-color)] transition-colors group-hover/skill:scale-110"></i> 
            ${skillName}
        </span>`;
    }).join('');

    const skillsHTML1 = createSkillTags(shuffledSkills1);
    const skillsHTML2 = createSkillTags(shuffledSkills2);
    
    const educationHTML = (data.education || []).map(edu => `
    <div class="flex items-start gap-4 mb-2 py-2 px-3 rounded-xl hover:bg-[var(--bg-primary)] border border-transparent hover:border-[var(--border-color)] transition-all duration-300 group/edu">
        <div class="mt-1 min-w-[36px] h-[36px] rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-color)] group-hover/edu:scale-110 group-hover:bg-[var(--accent-color)] shadow-sm transition-all duration-300">
            <i class="fas fa-graduation-cap text-sm"></i>
        </div>
        <div>
            <h4 class="text-base font-bold text-[var(--text-primary)] leading-tight mb-1">${edu.degree}</h4>
            <p class="text-sm !text-[var(--text-secondary)] !leading-tight">${edu.school}</p>
            <span class="text-[10px] font-mono font-semibold text-[var(--text-secondary)] group-hover/edu:text-[var(--accent-color)] mt-1.5 inline-block tracking-widest uppercase transition-colors">${edu.year}</span>
        </div>
    </div>
`).join('');

    grid.innerHTML = `
        <div class="md:col-span-3 lg:col-span-3 glow-card rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-between" data-aos="fade-right" data-aos-delay="100">
            <div class="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><div class="absolute top-0 right-0 text-[var(--accent-color)] rotate-[-20deg] scale-150"><i class="fas fa-graduation-cap text-8xl"></i></div></div>
            <div class="relative z-10">
                <div class="flex items-center justify-between mb-5"><h3 class="font-heading font-[800] text-[1.5rem] text-[var(--text-primary)]">Formación <span class="text-[var(--accent-color)]">Académica</span></h3></div>
                <div class="flex flex-col justify-center">${educationHTML}</div>
            </div>
        </div>
        <div class="md:col-span-3 lg:col-span-2 glow-card rounded-3xl relative overflow-hidden flex flex-col p-6 md:p-8 h-full justify-center min-h-[300px]" data-aos="fade-left" data-aos-delay="200">
            <div class="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none"></div>
            <div class="relative z-10 mb-auto"><p class="text-[var(--text-secondary)] text-xs mb-2 uppercase tracking-widest font-bold">Habilidades Técnicas</p><h3 class="font-heading font-[800] text-[1.5rem] text-[var(--text-primary)]">Stack Principal</h3></div>
            <div class="flex gap-2 w-fit absolute right-4 h-[120%] -top-[10%] overflow-hidden mask-gradient-hero py-4">
                <div class="marquee-vertical" style="--marquee-duration: 25s;">
                    <div class="marquee-content">${skillsHTML1}</div>
                    <div class="marquee-content" aria-hidden="true">${skillsHTML1}</div>
                </div>
                <div class="marquee-vertical" style="--marquee-duration: 35s;">
                    <div class="marquee-content">${skillsHTML2}</div>
                    <div class="marquee-content" aria-hidden="true">${skillsHTML2}</div>
                </div>
            </div>
        </div>
        <div class="md:col-span-3 lg:col-span-2 glow-card rounded-3xl relative overflow-hidden flex flex-col p-6 md:p-8 min-h-[200px]" data-aos="fade-up" data-aos-delay="300">
             <div class="font-mono text-[10px] absolute inset-0 text-[var(--text-secondary)] opacity-10 p-4 leading-relaxed overflow-hidden select-none z-0">import pandas as pd<br>df = pd.read_csv('data.csv')<br>model.fit(X_train, y_train)<br># Future Loading...</div>
             <div class="relative z-10 flex flex-col h-full">
                <div><div class="inline-block px-2.5 py-1 mb-3 text-[10px] font-bold tracking-wider text-[var(--accent-color)] uppercase bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-full shadow-sm"><i class="fas fa-circle text-[6px] mr-1.5 animate-pulse"></i> Activo</div><h3 class="font-heading font-[800] text-[1.5rem] text-[var(--text-primary)]">${data.status?.current || ''}</h3></div>
                <div class="mt-4"><p class="mb-4 text-sm text-[var(--text-secondary)]">${data.status?.description || ''}</p><a href="${data.profile.github}" target="_blank" rel="noopener noreferrer" class="text-sm font-[600] text-[var(--text-primary)] hover:text-[var(--accent-color)] flex items-center gap-2 transition-colors">Ver actividad en GitHub <i class="fas fa-arrow-right"></i></a></div>
             </div>
        </div>
        <div class="md:col-span-3 lg:col-span-3 glow-card rounded-3xl relative overflow-hidden group cursor-pointer" onclick="document.getElementById('nav-cv-btn').click()" data-aos="zoom-in" data-aos-delay="400">
            <div class="absolute inset-0"><img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop" alt="Clean Code" class="w-full h-full object-cover opacity-20 dark:opacity-10 group-hover:scale-105 group-hover:opacity-30 transition-all duration-700 ease-out"><div class="absolute inset-0 bg-gradient-to-r from-[var(--bg-card)] via-[var(--bg-card)]/90 to-transparent"></div></div>
            <div class="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 h-full">
                <div class="max-w-lg w-full"><h3 class="font-heading font-[800] text-[1.5rem] text-[var(--text-primary)]">Arquitectura y Estrategia</h3><p class="mt-3 text-sm text-[var(--text-secondary)]">Priorizo la escalabilidad, el código limpio y el liderazgo técnico efectivo.</p></div>
                <div class="flex-shrink-0 flex md:flex-col items-center justify-center"><div class="w-14 h-14 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-primary)] group-hover:bg-[var(--accent-color)] group-hover:text-white group-hover:border-[var(--accent-color)] group-hover:scale-110 shadow-[0_0_20px_rgba(0,0,0,0.05)] transition-all duration-300"><i class="fas fa-download text-xl"></i></div><p class="text-[10px] text-center md:mt-3 font-[800] uppercase tracking-widest text-[var(--text-primary)] group-hover:text-[var(--accent-color)] transition-all duration-300 ms-3 md:ms-0">Descargar CV</p></div>
            </div>
            <div class="absolute inset-0 border-2 border-transparent group-hover:border-[var(--accent-color)]/30 rounded-3xl transition-colors pointer-events-none"></div>
        </div>
    `;
}

function renderProjects(projects) {
    const container = document.getElementById('projects-grid');
    const filterContainer = document.getElementById('projects-filter');
    
    let allTags = new Set(["Todos"]);
    projects.forEach(p => p.tags.forEach(tag => allTags.add(tag)));
    
    filterContainer.innerHTML = Array.from(allTags).map((tag, index) => `
        <button class="filter-btn px-4 py-1.5 rounded text-xs font-[600] border border-[var(--border-color)] transition-all ${index === 0 ? 'bg-[var(--accent-color)] text-white border-[var(--accent-color)]' : 'bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:border-[var(--accent-color)]'}" data-filter="${tag}">
            ${tag}
        </button>
    `).join('');

    const renderCards = (filterTag) => {
        const filteredProjects = filterTag === "Todos" ? projects : projects.filter(p => p.tags.includes(filterTag));
        
        container.innerHTML = filteredProjects.map((proj, index) => {
            const tagsHTML = proj.tags.map(tag => `<span class="px-3 py-1.5 text-xs font-mono font-medium rounded bg-[var(--bg-primary)]/90 backdrop-blur-md border border-[var(--border-color)] text-[var(--text-secondary)] whitespace-nowrap shadow-sm">${tag}</span>`).join('');
            const isGithub = proj.link.toLowerCase().includes("github");
            const btnText = isGithub ? "Ver Repo" : "Ver Sitio";
            const btnIcon = isGithub ? "fab fa-github" : "fas fa-arrow-right";

            return `
            <div class="glow-card rounded-3xl relative overflow-hidden h-[420px] flex flex-col justify-end p-6 md:p-8 group animate-fade-in border border-[var(--border-color)]">
                <div class="absolute inset-0 z-0">
                     <img src="${proj.image}" 
                        loading="lazy" 
                        decoding="async" 
                        onerror="this.src='https://via.placeholder.com/800x600/ccc/333?text=${encodeURIComponent(proj.title)}'" 
                        alt="${proj.title}" 
                        class="w-full h-full object-cover opacity-40 transform transition-all duration-700 group-hover:scale-105 group-hover:opacity-90">
                     <div class="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-[var(--bg-card)]/95 to-transparent transition-opacity duration-500"></div>
                </div>
                <div class="relative z-10 flex flex-col h-full justify-end">
                    <h3 class="font-heading font-[800] text-[1.5rem] mb-3 text-[var(--text-primary)] drop-shadow-sm line-clamp-1">${proj.title}</h3>
                    <p class="line-clamp-2 mb-6 drop-shadow-sm text-sm text-[var(--text-secondary)]">${proj.desc}</p>
                    <div class="flex flex-row items-center justify-between gap-4 mt-2">
                        <div class="flex flex-wrap gap-2">${tagsHTML}</div>
                        <a href="${proj.link}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-[var(--accent-color)] text-sm font-[600] group/btn hover:brightness-110 hover:border-[var(--accent-color)] transition-all cursor-pointer bg-[var(--bg-primary)]/80 backdrop-blur-sm px-5 py-2.5 rounded-full border border-[var(--border-color)] text-nowrap shadow-sm">
                            ${btnText} <i class="${btnIcon} transition-transform duration-300 group-hover/btn:translate-x-1"></i>
                        </a>
                    </div>
                </div>
            </div>
            `;
        }).join('');
    };

    renderCards("Todos");

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => {
                b.classList.remove('bg-[var(--accent-color)]', 'text-white', 'border-[var(--accent-color)]', 'shadow-md');
                b.classList.add('bg-[var(--bg-primary)]', 'text-[var(--text-secondary)]');
            });
            e.target.classList.remove('bg-[var(--bg-primary)]', 'text-[var(--text-secondary)]');
            e.target.classList.add('bg-[var(--accent-color)]', 'text-white', 'border-[var(--accent-color)]', 'shadow-md');
            
            const filterValue = e.target.getAttribute('data-filter');
            renderCards(filterValue);
        });
    });
}

function renderSandbox(sandboxProjects) {
    const section = document.getElementById('sandbox');
    const grid = document.getElementById('sandbox-grid');
    const navLink = document.getElementById('nav-sandbox');
    const mobileMenuLinks = document.getElementById('mobile-menu-links');

    if (!sandboxProjects || sandboxProjects.length === 0) {
        section.classList.add('hidden');
        if (navLink) navLink.classList.add('hidden');
        return;
    }

    const visibleProjects = sandboxProjects.filter(proj => proj.visible !== false);

    if (visibleProjects.length === 0) {
        section.classList.add('hidden');
        if (navLink) navLink.classList.add('hidden');
        return;
    }

    section.classList.remove('hidden');
    if (navLink) navLink.classList.remove('hidden');

    if (!document.getElementById('mobile-sandbox-link')) {
        const mobileLink = document.createElement('a');
        mobileLink.href = "#sandbox";
        mobileLink.id = "mobile-sandbox-link";
        mobileLink.className = "mobile-link hover:text-[var(--accent-color)] transition-colors hover:scale-110 transform duration-300";
        mobileLink.innerText = "Sandbox";
        mobileMenuLinks.insertBefore(mobileLink, mobileMenuLinks.lastElementChild);
    }

    grid.innerHTML = visibleProjects.map((proj, index) => {
        const tagsHTML = proj.tags
            .map(tag => `<span class="px-3 py-1.5 text-xs font-mono font-medium rounded bg-[var(--bg-primary)]/90 backdrop-blur-md border border-[var(--border-color)] text-[var(--text-secondary)] whitespace-nowrap shadow-sm">${tag}</span>`)
            .join('');

        return `
        <div class="glow-card rounded-3xl relative overflow-hidden h-[380px] flex flex-col justify-end p-6 md:p-8 group" data-aos="fade-up" data-aos-delay="${index * 150}">
            <div class="absolute inset-0 z-0">
                 <img src="${proj.image}" 
                    loading="lazy" 
                    decoding="async"
                    onerror="this.src='https://via.placeholder.com/800x600/ccc/333?text=Sandbox'" 
                    alt="${proj.title}" 
                    class="w-full h-full object-cover opacity-20 dark:opacity-30 transform transition-all duration-700 group-hover:scale-105 group-hover:opacity-70 grayscale group-hover:grayscale-0">
                 <div class="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-[var(--bg-card)]/95 to-transparent"></div>
            </div>
            <div class="relative z-10 flex flex-col h-full justify-end">
                <h3 class="font-heading font-[800] text-[1.5rem] mb-3 text-[var(--text-primary)] line-clamp-1">${proj.title}</h3>
                <p class="line-clamp-2 mb-6 text-sm text-[var(--text-secondary)]">${proj.desc}</p>
                <div class="flex flex-row items-center justify-between gap-4 mt-2">
                    <div class="flex flex-wrap gap-2">${tagsHTML}</div>
                    <a href="${proj.link}" target="_blank" rel="noopener noreferrer" aria-label="Ver código en GitHub" class="w-11 h-11 flex items-center justify-center rounded-full bg-[var(--bg-primary)]/80 backdrop-blur-sm border border-[var(--border-color)] text-[var(--text-primary)] hover:text-[var(--accent-color)] hover:border-[var(--accent-color)] hover:scale-110 transition-all shadow-sm">
                        <i class="fab fa-github text-xl"></i>
                    </a>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

// === CONTROL DE LÍNEA DE TIEMPO Y OPTIMIZACIÓN (INTERSECTION OBSERVER) ===
let timelineSegments = [];
let animationFrameId = null;
let isExperienceVisible = false;

function initTimelineObserver() {
    const experienceSection = document.getElementById('experience');
    if (!experienceSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isExperienceVisible = entry.isIntersecting;
            
            if (isExperienceVisible) {
                // Si entra en vista y no se está animando, la arrancamos
                if (!animationFrameId && timelineSegments.length > 0) {
                    loopAnimation();
                }
            } else {
                // Si sale de la vista, paramos la animación para ahorrar recursos
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }
            }
        });
    }, { rootMargin: '200px 0px' }); // Activamos un poco antes de que sea visible

    observer.observe(experienceSection);
}

function renderExperience(experience) {
    const container = document.getElementById('experience-grid');
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
    
    container.className = "timeline-container max-w-6xl mx-auto px-4 sm:px-6";
    container.innerHTML = `<svg id="timeline-canvas" class="timeline-svg"></svg>`;

    const content = experience.map((company, index) => {
        const isRightAligned = index % 2 === 0; 
        const fadeDir = isRightAligned ? "fade-left" : "fade-right";
        const rolesHTML = company.roles.map(role => {
        const isPresent = role.date.toLowerCase().includes("presente");
        return `
            <div class="relative pl-6 border-l-2 border-[var(--border-color)] transition-colors duration-300 mb-8 last:mb-0 group/role">
                <div class="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full ${isPresent ? 'bg-[var(--accent-color)]' : 'bg-[var(--bg-primary)]'} border-2 border-[var(--border-color)] group-hover/role:border-[var(--accent-color)] transition-colors"></div>
                <h4 class="text-[1.2rem] font-[600] text-[var(--text-primary)] mb-1">${role.title}</h4>
                <p class="text-xs font-mono font-semibold ${isPresent ? 'text-[var(--accent-color)]' : 'text-[var(--text-secondary)]'} mb-3 uppercase tracking-widest">${role.date}</p>
                <ul class="list-disc list-outside ml-4 space-y-2">
                    ${role.tasks.map(task => `<li class="text-[var(--text-secondary)] pl-1"><p class="inline-block !mb-0 text-sm">${task}</p></li>`).join('')}
                </ul>
            </div>
        `;}).join('');

        return `
        <div class="timeline-card-wrapper relative w-full mb-24 md:mb-40 last:mb-0">
            <div id="mobile-line-${index}" class="mobile-line-gradient md:hidden"></div>
            <div id="dot-${index}" class="timeline-dot absolute top-0 w-7 h-7 rounded-full bg-[var(--bg-card)] border-[3px] border-[var(--accent-color)] shadow-[0_0_20px_rgba(var(--accent-color),0.6)] z-20 left-[-11px] ${isRightAligned ? 'md:left-0' : 'md:left-auto md:right-0'}">
                 <div class="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-[var(--text-primary)]"></div>
            </div>
            <div id="card-${index}" class="w-full pl-8 md:pl-0 md:w-[92%] ${isRightAligned ? 'md:ml-auto' : 'md:mr-auto'}" data-aos="${fadeDir}" data-aos-delay="100">
                <div class="glow-card p-6 md:p-10 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] group transition-all duration-300">
                    <div class="flex flex-row items-start sm:items-center gap-5 mb-8 border-b border-[var(--border-color)] pb-8">
                        <div class="w-16 h-16 bg-[var(--bg-primary)] rounded-full p-1 border border-[var(--border-color)] flex items-center justify-center shrink-0 shadow-sm">
                            <img src="${company.logo}" alt="${company.company}" class="w-full h-full object-contain rounded-full" onload="initTimelineLines(${experience.length})" onerror="this.style.display='none';">
                        </div>
                        <div>
                            <h3 class="font-heading text-[1.5rem] font-[800] text-[var(--text-primary)] mb-1">${company.company}</h3>
                            <p class="text-xs font-[600] text-[var(--text-secondary)] flex items-center gap-2"><i class="fa-solid fa-location-dot text-[var(--accent-color)]"></i> ${company.location}</p>
                        </div>
                    </div>
                    <div class="space-y-4">${rolesHTML}</div>
                </div>
            </div>
        </div>
        `;
    }).join('');

    const wrapper = document.createElement('div');
    wrapper.innerHTML = content;
    while (wrapper.firstChild) { container.appendChild(wrapper.firstChild); }
    setTimeout(() => initTimelineLines(experience.length), 300);
    new ResizeObserver(() => { initTimelineLines(experience.length); }).observe(container);
}

function initTimelineLines(count) {
    const svg = document.getElementById('timeline-canvas');
    const container = document.getElementById('experience-grid');
    if (!svg || !container) return;

    timelineSegments = [];
    const containerTop = container.getBoundingClientRect().top + window.scrollY;

    if (window.innerWidth >= 768) {
        const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();
        svg.innerHTML = ''; 
        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        defs.innerHTML = `
            <linearGradient id="snakeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#E2CBFF"><animate attributeName="stop-color" values="#E2CBFF; ${accentColor}; #E2CBFF" dur="3s" repeatCount="indefinite" /></stop>
                <stop offset="50%" stop-color="${accentColor}"><animate attributeName="stop-color" values="${accentColor}; #E2CBFF; ${accentColor}" dur="3s" repeatCount="indefinite" /></stop>
                <stop offset="100%" stop-color="#E2CBFF"><animate attributeName="stop-color" values="#E2CBFF; ${accentColor}; #E2CBFF" dur="3s" repeatCount="indefinite" /></stop>
            </linearGradient>
        `;
        svg.appendChild(defs);

        const containerRect = container.getBoundingClientRect();
        const cornerRadius = 50; 

        for (let i = 0; i < count - 1; i++) {
            const dot1 = document.getElementById(`dot-${i}`);
            const card1 = document.getElementById(`card-${i}`); 
            const dot2 = document.getElementById(`dot-${i+1}`);

            if (dot1 && dot2 && card1 && card1.offsetHeight > 0) {
                const r1 = dot1.getBoundingClientRect();
                const rCard1 = card1.getBoundingClientRect(); 
                const r2 = dot2.getBoundingClientRect();

                const x1 = r1.left + r1.width / 2 - containerRect.left;
                const y1 = r1.top + r1.height / 2 - containerRect.top;
                const x2 = r2.left + r2.width / 2 - containerRect.left;
                const y2 = r2.top + r2.height / 2 - containerRect.top;
                const turnY = (rCard1.bottom - containerRect.top) + 60; 

                let d = `M ${x1} ${y1}`; 
                d += ` L ${x1} ${turnY - cornerRadius}`;
                const direction = x2 > x1 ? 1 : -1; 
                d += ` Q ${x1} ${turnY} ${x1 + (cornerRadius * direction)} ${turnY}`;
                d += ` L ${x2 - (cornerRadius * direction)} ${turnY}`;
                d += ` Q ${x2} ${turnY} ${x2} ${turnY + cornerRadius}`;
                d += ` L ${x2} ${y2}`;

                const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                path.setAttribute("d", d);
                path.setAttribute("stroke", "url(#snakeGradient)");
                path.setAttribute("stroke-width", "5"); 
                path.setAttribute("fill", "none");
                path.setAttribute("stroke-linecap", "round");
                
                const length = path.getTotalLength();
                path.style.strokeDasharray = length;
                path.style.strokeDashoffset = length; 
                svg.appendChild(path);

                timelineSegments.push({ type: 'desktop', element: path, length: length, currentLength: 0, targetLength: 0, startDot: dot1, endDot: dot2, absStartY: containerTop + y1, absEndY: containerTop + y2 });
            }
        }
    } else {
        for (let i = 0; i < count; i++) {
            const line = document.getElementById(`mobile-line-${i}`);
            const dot = document.getElementById(`dot-${i}`);
            const card = document.getElementById(`card-${i}`);
            if (line && dot && card) {
                const startY = dot.getBoundingClientRect().top + window.scrollY;
                const endY = card.getBoundingClientRect().bottom + window.scrollY + 40; 
                timelineSegments.push({ type: 'mobile', element: line, currentProgress: 0, targetProgress: 0, startDot: dot, absStartY: startY, absEndY: endY });
            }
        }
    }
    
    // Solo arrancamos el bucle si la sección está visible
    if (!animationFrameId && isExperienceVisible) {
        loopAnimation();
    }
}

function loopAnimation() {
    // Validación extra: si la sección dejó de estar visible, detenemos el frame
    if (!isExperienceVisible) {
        animationFrameId = null;
        return;
    }

    const triggerPoint = window.scrollY + (window.innerHeight * 0.5);
    timelineSegments.forEach(segment => {
        const totalDist = segment.absEndY - segment.absStartY;
        let scrollDist = triggerPoint - segment.absStartY;
        let targetRatio = Math.max(0, Math.min(1, scrollDist / totalDist));
        
        if (segment.type === 'desktop') {
            segment.targetLength = targetRatio * segment.length;
            segment.currentLength += (segment.targetLength - segment.currentLength) * 0.1;
            segment.element.style.strokeDashoffset = segment.length - segment.currentLength;
            const currentRatio = segment.currentLength / segment.length;
            if (currentRatio > 0.01) segment.startDot.classList.add('visible');
            if (currentRatio > 0.98) segment.endDot.classList.add('visible');
        } else {
            segment.targetProgress = targetRatio;
            segment.currentProgress += (segment.targetProgress - segment.currentProgress) * 0.1;
            segment.element.style.height = `${segment.currentProgress * 100}%`;
            if (segment.currentProgress > 0.01) segment.startDot.classList.add('visible');
        }
    });
    
    const firstDot = document.getElementById('dot-0');
    if (firstDot && window.scrollY > 0) firstDot.classList.add('visible');
    
    animationFrameId = requestAnimationFrame(loopAnimation);
}

function renderFooter(profile) {
    const year = new Date().getFullYear();
    document.getElementById('copyright').innerText = `Copyright © ${year} ${profile.name} ${profile.surname}. Todos los derechos reservados.`;
    document.getElementById('social-linkedin').href = profile.linkedin;
    document.getElementById('social-github').href = profile.github;
}

// === MANEJO DEL FORMULARIO DE CONTACTO ===
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const form = this;
    const btn = form.querySelector('button[type="submit"]');
    const btnContent = btn.querySelector('.magic-btn-content');
    const originalBtnHTML = btnContent.innerHTML;
    const formInputs = form.querySelectorAll('input, textarea');

    btnContent.innerHTML = 'Enviando... <i class="fas fa-circle-notch fa-spin ml-2"></i>';
    btn.disabled = true;
    formInputs.forEach(input => {
        input.disabled = true;
        input.classList.add('opacity-70', 'cursor-not-allowed'); // Feedback visual
    });

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    const scriptURL = 'https://script.google.com/macros/s/AKfycbwKM4OOz2iB2ahn4sfFhXTFy8v0avnO4rb0lqnjQl62JCEeBKLwDyOJWlyU8MEIrdXTqA/exec';

    fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'text/plain;charset=utf-8',
        }
    })
    .then(response => {
        showToast();
        form.reset(); 
    })
    .catch(error => {
        console.error('Error al enviar el mensaje:', error);
        alert("Hubo un problema de conexión al enviar el mensaje. Por favor, intenta de nuevo.");
    })
    .finally(() => {
        btnContent.innerHTML = originalBtnHTML;
        btn.disabled = false;
        formInputs.forEach(input => {
            input.disabled = false;
            input.classList.remove('opacity-70', 'cursor-not-allowed');
        });
    });
});

function showToast() {
    const toast = document.getElementById('toast-notification');
    toast.classList.remove('translate-y-24', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-24', 'opacity-0');
    }, 4500);
}