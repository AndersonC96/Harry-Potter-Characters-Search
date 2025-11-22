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
            return {
                wood: 'Madeira: não informada',
                core: 'Núcleo: não informado',
                length: 'Comprimento: não informado',
            };
        }

        return {
            wood: `Madeira: ${formatValue(wand.wood, 'não informada')}`,
            core: `| Núcleo: ${formatValue(wand.core, 'não informado')}`,
            length: `| Comprimento: ${formatValue(wand.length, 'não informado')}`,
        };
    };

    const buildCard = (character) => {
        const clone = cardTemplate.content.cloneNode(true);
        const { wood, core, length } = formatWand(character.wand);

        clone.querySelector('.card-title').textContent = formatValue(character.name, 'Personagem desconhecido');
        clone.querySelector('.actor').textContent = `Ator/Atriz: ${formatValue(character.actor)}`;
        clone.querySelector('.house').textContent = formatValue(character.house);
        clone.querySelector('.species').textContent = formatValue(character.species);
        clone.querySelector('.gender').textContent = formatValue(character.gender);
        clone.querySelector('.date-of-birth').textContent = formatValue(character.dateOfBirth);
        clone.querySelector('.ancestry').textContent = formatValue(character.ancestry);
        clone.querySelector('.hair-colour').textContent = formatValue(character.hairColour);
        clone.querySelector('.eye-colour').textContent = formatValue(character.eyeColour);
        clone.querySelector('.wand-wood').textContent = wood;
        clone.querySelector('.wand-core').textContent = core;
        clone.querySelector('.wand-length').textContent = length;
        clone.querySelector('.patronus').textContent = formatValue(character.patronus);

        const imageElement = clone.querySelector('.character-image');
        const imageUrl = formatValue(character.image, '');
        if (imageUrl) {
            imageElement.src = imageUrl;
            imageElement.alt = `Retrato de ${formatValue(character.name, 'personagem')}`;
        } else {
            imageElement.remove();
        }

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
