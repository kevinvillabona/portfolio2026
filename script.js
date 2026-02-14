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

function renderExperience(experience) {
    const container = document.getElementById('experience-grid');
    container.innerHTML = experience.map((job, index) => `
        <div class="glow-card p-6 md:p-8 rounded-2xl flex gap-6 items-start" data-aos="fade-left" data-aos-delay="${index * 150}">
            <div class="w-16 h-16 md:w-20 md:h-20 bg-[var(--bg-primary)] rounded-xl flex items-center justify-center shrink-0 border border-[var(--border-color)] overflow-hidden p-2">
                <img src="${job.logo}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" class="object-contain w-full h-full">
                <i class="fas fa-briefcase text-2xl text-[var(--text-secondary)]" style="display:none;"></i>
            </div>
            <div>
                <h3 class="font-heading text-xl md:text-2xl font-bold mb-1 text-[var(--text-primary)]">${job.role}</h3>
                <p class="text-[var(--accent-color)] font-semibold text-sm mb-2">${job.company} • ${job.date}</p>
                <p class="text-[var(--text-secondary)] text-sm leading-relaxed mb-3">${job.desc}</p>
            </div>
        </div>
    `).join('');
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