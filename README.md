# Harry Potter Characters Search

Aplicação web imersiva para pesquisar e explorar personagens do universo Harry Potter. A interface combina cards temáticos, busca instantânea e fundo em vídeo que muda dinamicamente conforme a casa de Hogwarts do personagem destacado.

## Funcionalidades
- **Busca em tempo real** por nome, casa ou ator (filtro instantâneo enquanto digita).
- **Listagem completa** de personagens da API pública com nome, ator, espécie, gênero, casa, data de nascimento, ancestralidade, cor do cabelo e dos olhos, detalhes da varinha e patrono.
- **Cards temáticos por casa** com pílulas de cor, hover com brilho e destaque visual.
- **Imagem do personagem** com fallback automático caso a API não forneça foto.
- **Fundo em vídeo dinâmico** que troca para um vídeo específico da casa ao passar o mouse sobre um card; volta ao padrão ao sair do hover.
- **Trilha sonora opcional** reproduzida em loop para criar ambiente imersivo.
- **Layout responsivo** baseado em Bootstrap 5, com barra de busca fixa no topo.

## Tecnologias
- **PHP** para consumir a API de personagens (curl) e injetar os dados no front-end.
- **JavaScript** para busca, renderização dos cards, alternância de vídeos e formatação de dados.
- **HTML + CSS (Bootstrap 5)** para estrutura e estilo responsivo, com temas específicos de cada casa.
- **Arquivos multimídia** (vídeos/áudios) usados como plano de fundo e ambientação.

## Estrutura dos principais arquivos
- `index.php`: carrega personagens da API (`https://hp-api.onrender.com/api/characters`) e entrega o HTML com o template dos cards e a barra de busca.
- `app.js`: renderiza os cards, aplica o filtro de busca e controla a troca de vídeos conforme a casa do personagem.
- `app.css`: estilos customizados, cores das casas, efeitos de hover e referências aos vídeos usados no plano de fundo.
- `img/`: assets de mídia, incluindo vídeos e imagens de apoio.
- `music.mp3`: trilha sonora reproduzida automaticamente (pode ser removida se não desejar áudio).

## Pré-requisitos
- PHP 8+ instalado no ambiente local (para consumo da API). Nenhum banco de dados é necessário.
- Conexão com a internet para acessar a API e as fontes externas do Google/Bootstrap.

## Como executar localmente
1. Clone o repositório:
   ```bash
   git clone https://github.com/AndersonC96/Harry-Potter-Characters-Search.git
   cd Harry-Potter-Characters-Search
   ```
2. Inicie um servidor PHP apontando para o diretório do projeto (exemplos):
   ```bash
   # Porta 8000
   php -S localhost:8000
   ```
3. Acesse no navegador:
   - http://localhost:8000/index.php

> Dica: se preferir, pode servir os arquivos por outro servidor (Apache/Nginx); basta que o PHP esteja habilitado para executar o `index.php`.

## Uso
1. Com a página aberta, utilize a barra superior para digitar nome, casa ou ator.
2. Os cards são filtrados em tempo real conforme o texto digitado.
3. Passe o mouse sobre um card para ver o fundo em vídeo correspondente à casa; saia do card para retornar ao vídeo padrão.
4. Clique/role para explorar todos os personagens e detalhes listados.

## Personalização
- **Vídeos por casa:** configure os caminhos em `app.css` (variáveis `--vid-...`).
- **Trilha sonora:** remova ou troque `music.mp3` conforme desejar (tag `<audio>` em `index.php`).
- **Estilo de cores e sombras:** ajustes em `app.css`, classes `.house-*` e `.character-card`.

## Licença
Este projeto é distribuído para fins educacionais e de demonstração. Consulte as políticas da API utilizada antes de uso comercial.
