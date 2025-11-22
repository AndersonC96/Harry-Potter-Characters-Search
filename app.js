(function () {
    const charactersList = document.getElementById('charactersList');
    const searchBar = document.getElementById('searchBar');
    const cardTemplate = document.getElementById('characterCardTemplate');
    // Pegamos o elemento de fundo
    const dynamicBg = document.getElementById('dynamic-bg'); 
    const characters = Array.isArray(window.hpCharacters) ? window.hpCharacters : [];

    // Mapeamento de Casas para Variáveis CSS
    const houseBackgrounds = {
        Gryffindor: 'var(--bg-gryffindor)',
        Slytherin: 'var(--bg-slytherin)',
        Ravenclaw: 'var(--bg-ravenclaw)',
        Hufflepuff: 'var(--bg-hufflepuff)'
    };
    const defaultBackground = 'var(--bg-default)';

    // ... (funções formatValue e formatWand permanecem iguais) ...
    const formatValue = (value, fallback = 'Não informado') => {
        if (value === null || value === undefined || value === '') return fallback;
        return String(value);
    };
    
    const formatWand = (wand) => {
         if (!wand) return 'Desconhecida';
         return [wand.wood, wand.core].filter(Boolean).join(' · ') || 'Detalhes desconhecidos';
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

        // --- NOVA MÁGICA DE BACKGROUND ---
        // Quando o mouse entra no card
        cardElement.addEventListener('mouseenter', () => {
            if (houseBackgrounds[character.house]) {
                dynamicBg.style.backgroundImage = houseBackgrounds[character.house];
            }
        });

        // Quando o mouse sai do card
        cardElement.addEventListener('mouseleave', () => {
            dynamicBg.style.backgroundImage = defaultBackground;
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