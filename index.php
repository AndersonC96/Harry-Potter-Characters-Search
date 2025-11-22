<?php

declare(strict_types=1);

const API_ENDPOINT = 'https://hp-api.onrender.com/api/characters';

/**
 * Retrieve characters from the HP API.
 */
function fetchCharacters(string $endpoint): array
{
    $curl = curl_init($endpoint);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_TIMEOUT, 10);

    $response = curl_exec($curl);

    if ($response === false) {
        curl_close($curl);

        return [];
    }

    $statusCode = (int) curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);

    if ($statusCode !== 200) {
        return [];
    }

    $data = json_decode($response, true);

    if (!is_array($data)) {
        return [];
    }

    return $data;
}

$characters = fetchCharacters(API_ENDPOINT);
?>
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>Harry Potter Characters</title>
        <link
            rel="shortcut icon"
            href="https://e7.pngegg.com/pngimages/576/813/png-clipart-hp-text-illustration-harry-potter-fandom-amazon-com-symbol-decal-harry-potter-angle-text-thumbnail.png"
        />
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-Tb44grt+gPX40P4nIW8N3st3XPm+KDC+PfcM1l/8y5zZoJYcs1VYKgYKKU0Uodm6"
            crossorigin="anonymous"
        />
        <link rel="stylesheet" href="app.css" />
    </head>
    <body class="bg-navy">
        <audio src="./music.mp3" autoplay loop hidden></audio>
        <div class="container py-5">
            <div class="text-center mb-4">
                <h1 class="display-5 text-light">✨ Harry Potter Characters ✨</h1>
                <p class="text-light opacity-75">
                    Busque personagens e descubra detalhes diretamente da API de Harry Potter.
                </p>
            </div>
            <div class="card shadow border-0 mb-4">
                <div class="card-body">
                    <label for="searchBar" class="form-label fw-semibold">Pesquisar personagens</label>
                    <div class="input-group">
                        <span class="input-group-text" aria-hidden="true">🔍</span>
                        <input
                            type="text"
                            name="searchBar"
                            id="searchBar"
                            class="form-control"
                            placeholder="Buscar por nome, casa ou ator"
                            autocomplete="off"
                        />
                    </div>
                </div>
            </div>
            <div id="charactersList" class="row g-4"></div>
            <template id="characterCardTemplate">
                <div class="col-12 col-md-6">
                    <div class="card h-100 shadow-sm character-card">
                        <div class="row g-0 h-100">
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h2 class="card-title h5 mb-2"></h2>
                                    <p class="mb-1 text-muted actor"></p>
                                    <p class="mb-1"><strong>Casa:</strong> <span class="house"></span></p>
                                    <p class="mb-1"><strong>Espécie:</strong> <span class="species"></span> | <strong>Gênero:</strong> <span class="gender"></span></p>
                                    <p class="mb-1"><strong>Nascimento:</strong> <span class="date-of-birth"></span></p>
                                    <p class="mb-1"><strong>Ancestralidade:</strong> <span class="ancestry"></span></p>
                                    <p class="mb-1"><strong>Cabelo:</strong> <span class="hair-colour"></span> | <strong>Olhos:</strong> <span class="eye-colour"></span></p>
                                    <p class="mb-1">
                                        <strong>Varinha:</strong>
                                        <span class="wand-wood"></span>
                                        <span class="wand-core"></span>
                                        <span class="wand-length"></span>
                                    </p>
                                    <p class="mb-0"><strong>Patrono:</strong> <span class="patronus"></span></p>
                                </div>
                            </div>
                            <div class="col-md-4 d-flex align-items-stretch">
                                <img src="" class="img-fluid rounded-end object-fit-cover w-100 character-image" alt="Imagem do personagem" />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <script>
            window.hpCharacters = <?php echo json_encode($characters, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); ?>;
        </script>
        <script src="app.js"></script>
        <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-EDBnVzdp8+fChlZFWvSmh5UqkqD2tZg3euyzXhwZ3I9hf7daMJC/4kWMGAIkTVmx"
            crossorigin="anonymous"
        ></script>
    </body>
</html>
