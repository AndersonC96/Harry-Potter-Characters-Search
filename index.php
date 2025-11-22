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
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Inter:wght@400;600&display=swap"
        rel="stylesheet" />
    <link
        rel="shortcut icon"
        href="https://e7.pngegg.com/pngimages/576/813/png-clipart-hp-text-illustration-harry-potter-fandom-amazon-com-symbol-decal-harry-potter-angle-text-thumbnail.png" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <link rel="stylesheet" href="app.css" />
</head>

<body class="bg-night text-light">
    <audio src="./music.mp3" autoplay loop hidden></audio>
    <div id="dynamic-bg">
        <video id="dynamic-bg-video" autoplay muted loop playsinline preload="auto" poster="./img/hogwarts-poster.jpg">
            <source src="./img/hogwarts.mp4" type="video/mp4" />
        </video>
    </div>
    <div class="magic-overlay"></div>
    <div class="search-bar-top">
        <div class="container">
            <div class="input-group input-group-lg">
                <span class="input-group-text" aria-hidden="true">🔍</span>
                <input
                    type="text"
                    name="searchBar"
                    id="searchBar"
                    class="form-control form-control-lg border-0 bg-transparent"
                    placeholder="Buscar nome, casa ou ator" autocomplete="off" />
            </div>
        </div>
    </div>
    <div class="container py-5">
        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Hogwarts-Crest.png" alt="Brasão de Hogwarts" class="hogwarts-crest mb-3" />
        <h1 class="display-5 title-font text-gold">Personagens</h1>

        <div id="charactersList" class="row row-cols-1 row-cols-lg-3 g-4"></div>

        <template id="characterCardTemplate">
            <div class="col-12 col-lg-4">
                <div class="card h-100 shadow-lg character-card border-0">
                    <div class="card-header d-flex align-items-center justify-content-between border-0">
                        <div>
                            <h2 class="card-title h5 mb-1 title-font text-gold"></h2>
                            <p class="mb-0 small actor text-light opacity-75"></p>
                        </div>
                        <span class="badge house-pill"></span>
                    </div>
                    <div class="card-body pt-3 d-flex gap-3 flex-column flex-md-row">
                        <div class="portrait-wrap flex-shrink-0">
                            <img src="" class="rounded-3 shadow-sm character-image" alt="Imagem do personagem" />
                        </div>
                        <div class="flex-grow-1">
                            <ul class="list-unstyled mb-0 small">
                                <li class="mb-2"><strong style="color: rgb(255 222 132);">Espécie:</strong> <span style="color: rgb(248 249 250);" class=" species"></span></li>
                                <li class="mb-2"><strong style="color: rgb(255 222 132);">Gênero:</strong> <span style="color: rgb(248 249 250);" class="gender"></span></li>
                                <li class="mb-2"><strong style="color: rgb(255 222 132);">Casa:</strong> <span style="color: rgb(248 249 250);" class="house"></span></li>
                                <li class="mb-2"><strong style="color: rgb(255 222 132);">Nascimento:</strong> <span style="color: rgb(248 249 250);" class="date-of-birth"></span></li>
                                <li class="mb-2"><strong style="color: rgb(255 222 132);">Ancestralidade:</strong> <span style="color: rgb(248 249 250);" class="ancestry"></span></li>
                                <li class="mb-2"><strong style="color: rgb(255 222 132);">Cabelo:</strong> <span style="color: rgb(248 249 250);" class="hair-colour"></span></li>
                                <li class="mb-2"><strong style="color: rgb(255 222 132);">Olhos:</strong> <span style="color: rgb(248 249 250);" class="eye-colour"></span></li>
                                <li class="mb-2"><strong style="color: rgb(255 222 132);">Varinha:</strong> <span style="color: rgb(248 249 250);" class="wand-details"></span></li>
                                <li><strong style="color: rgb(255 222 132);">Patrono:</strong> <span style="color: rgb(248 249 250);" class="patronus"></span></li>
                            </ul>
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
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
</body>

</html>