(function () {
    const charactersList = document.getElementById('charactersList');
    const searchBar = document.getElementById('searchBar');
    const cardTemplate = document.getElementById('characterCardTemplate');
    const characters = Array.isArray(window.hpCharacters) ? window.hpCharacters : [];

    const formatValue = (value, fallback = 'Não informado') => {
        if (value === null || value === undefined || value === '') {
            return fallback;
        }

        return String(value);
    };

    const formatWand = (wand) => {
        if (!wand) {
            return 'Madeira não informada · Núcleo não informado · Comprimento não informado';
        }

        const parts = [
            `Madeira: ${formatValue(wand.wood, 'não informada')}`,
            `Núcleo: ${formatValue(wand.core, 'não informado')}`,
            `Comprimento: ${formatValue(wand.length, 'não informado')}`,
        ];

        return parts.join(' · ');
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

        clone.querySelector('.card-title').textContent = formatValue(character.name, 'Personagem desconhecido');
        clone.querySelector('.actor').textContent = `Ator/Atriz: ${formatValue(character.actor)}`;
        clone.querySelector('.house').textContent = formatValue(character.house);
        clone.querySelector('.species').textContent = formatValue(character.species);
        clone.querySelector('.gender').textContent = formatValue(character.gender);
        clone.querySelector('.date-of-birth').textContent = formatValue(character.dateOfBirth);
        clone.querySelector('.ancestry').textContent = formatValue(character.ancestry);
        clone.querySelector('.hair-colour').textContent = formatValue(character.hairColour);
        clone.querySelector('.eye-colour').textContent = formatValue(character.eyeColour);
        clone.querySelector('.wand-details').textContent = formatWand(character.wand);
        clone.querySelector('.patronus').textContent = formatValue(character.patronus);

        const housePill = clone.querySelector('.house-pill');
        housePill.textContent = badge || 'Casa desconhecida';
        if (className) {
            clone.querySelector('.character-card').classList.add(className);
        }

        const imageElement = clone.querySelector('.character-image');
        const imageUrl = formatValue(character.image, '');
        imageElement.src = imageUrl || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80';
        imageElement.alt = `Retrato de ${formatValue(character.name, 'personagem')}`;

        return clone;
    };

    const renderCharacters = (list) => {
        charactersList.innerHTML = '';
        if (!list.length) {
            charactersList.innerHTML = '<p class="text-light text-center">Nenhum personagem encontrado.</p>';
            return;
        }

        list.forEach((character) => {
            const card = buildCard(character);
            charactersList.appendChild(card);
        });
    };

    const matchesQuery = (character, query) => {
        if (!query) {
            return true;
        }

        const normalize = (value) => formatValue(value).toLowerCase();
        const searchableFields = [character.name, character.house, character.actor];

        return searchableFields.some((field) => normalize(field).includes(query));
    };

    searchBar?.addEventListener('input', (event) => {
        const query = event.target.value.trim().toLowerCase();
        const filtered = characters.filter((character) => matchesQuery(character, query));
        renderCharacters(filtered);
    });

    renderCharacters(characters);
})();
