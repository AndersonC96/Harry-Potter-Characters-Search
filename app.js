(function () {
    const charactersList = document.getElementById('charactersList');
    const searchBar = document.getElementById('searchBar');
    const cardTemplate = document.getElementById('characterCardTemplate');
    // Elementos de fundo (vídeo dinâmico)
    const bgVideo = document.getElementById('dynamic-bg-video');
    const characters = Array.isArray(window.hpCharacters) ? window.hpCharacters : [];

    // Mapeamento de Casas para vídeos (usando variáveis CSS como caminho)
    const houseVideos = {
        Gryffindor: getComputedStyle(document.documentElement).getPropertyValue('--vid-gryffindor').trim(),
        Slytherin: getComputedStyle(document.documentElement).getPropertyValue('--vid-slytherin').trim(),
        Ravenclaw: getComputedStyle(document.documentElement).getPropertyValue('--vid-ravenclaw').trim(),
        Hufflepuff: getComputedStyle(document.documentElement).getPropertyValue('--vid-hufflepuff').trim()
    };
    const defaultVideo = getComputedStyle(document.documentElement).getPropertyValue('--vid-default').trim();

    const swapVideo = (src) => {
        if (!bgVideo || !src) return;
        const current = bgVideo.getAttribute('data-current');
        if (current === src) return;
        bgVideo.style.opacity = 0;
        setTimeout(() => {
            bgVideo.src = src;
            bgVideo.setAttribute('data-current', src);
            bgVideo.load();
            bgVideo.play().catch(() => {});
            bgVideo.style.opacity = 1;
        }, 220);
    };

    // Inicializa vídeo padrão
    if (bgVideo) {
        swapVideo(defaultVideo);
    }

    // ... (funções formatValue e formatWand permanecem iguais) ...
    const formatValue = (value, fallback = 'Não informado') => {
        if (value === null || value === undefined || value === '') return fallback;
        return String(value);
    };
    
    const formatWand = (wand) => {
         if (!wand) return 'Desconhecida';
         return [wand.wood, wand.core, wand.length].filter(Boolean).join(' · ') || 'Detalhes desconhecidos';
    };

    const houseStyles = {
        Gryffindor: { badge: 'Grifinória', className: 'house-gryffindor' },
        Hufflepuff: { badge: 'Lufa-Lufa', className: 'house-hufflepuff' },
        Ravenclaw: { badge: 'Corvinal', className: 'house-ravenclaw' },
        Slytherin: { badge: 'Sonserina', className: 'house-slytherin' },
    };

    const buildCard = (character) => {
        const clone = cardTemplate.content.cloneNode(true);
        const { className, badge } = houseStyles[character.house] ?? { className: '', badge: formatValue(character.house) };
        
        // Referência ao elemento card dentro do template
        const cardElement = clone.querySelector('.character-card');

        clone.querySelector('.card-title').textContent = formatValue(character.name, 'Desconhecido');
        clone.querySelector('.actor').textContent = formatValue(character.actor);
        
        // Preenchimento dos dados (igual ao anterior...)
        clone.querySelector('.species').textContent = formatValue(character.species);
        clone.querySelector('.gender').textContent = formatValue(character.gender);
        clone.querySelector('.house').textContent = formatValue(character.house);
        clone.querySelector('.date-of-birth').textContent = formatValue(character.dateOfBirth);
        clone.querySelector('.ancestry').textContent = formatValue(character.ancestry);
        clone.querySelector('.hair-colour').textContent = formatValue(character.hairColour);
        clone.querySelector('.eye-colour').textContent = formatValue(character.eyeColour);
        clone.querySelector('.wand-details').textContent = formatWand(character.wand);
        clone.querySelector('.patronus').textContent = formatValue(character.patronus);

        const housePill = clone.querySelector('.house-pill');
        housePill.textContent = badge || 'Desconhecida';
        
        if (className) {
            cardElement.classList.add(className);
        }

        const imageElement = clone.querySelector('.character-image');
        imageElement.src = character.image || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80';
        imageElement.alt = character.name;

        // Background em vídeo conforme a casa
        cardElement.addEventListener('mouseenter', () => {
            const vid = houseVideos[character.house];
            if (vid) swapVideo(vid);
        });
        cardElement.addEventListener('mouseleave', () => {
            swapVideo(defaultVideo);
        });

        return clone;
    };

    const renderCharacters = (list) => {
        charactersList.innerHTML = '';
        if (!list.length) {
            charactersList.innerHTML = '<p class="text-center w-100 text-light">Nenhum bruxo encontrado.</p>';
            return;
        }
        list.forEach((character) => {
            charactersList.appendChild(buildCard(character));
        });
    };

    // ... (Lógica de busca permanece igual) ...
    const matchesQuery = (character, query) => {
        if (!query) return true;
        const normalize = (value) => formatValue(value).toLowerCase();
        return [character.name, character.house, character.actor].some(field => normalize(field).includes(query));
    };

    searchBar?.addEventListener('input', (event) => {
        const query = event.target.value.trim().toLowerCase();
        renderCharacters(characters.filter(c => matchesQuery(c, query)));
    });

    renderCharacters(characters);
})();