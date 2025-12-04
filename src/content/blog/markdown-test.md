---
title: "Test Markdown Rendering"
date: "2024-11-02"
category: "Test"
tags: ["Markdown", "HTML", "CSS", "JavaScript"]
excerpt: "Article de test pour vérifier le rendu Markdown avec coloration syntaxique."
readTime: "3 min"
---

# Test du rendu Markdown

Cet article teste toutes les fonctionnalités Markdown avec la nouvelle coloration syntaxique.

## Code HTML

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test HTML</title>
</head>
<body>
    <div class="container">
        <h1>Hello World!</h1>
        <p>Ceci est un paragraphe avec du <strong>texte en gras</strong>.</p>
    </div>
</body>
</html>
```

## Code CSS

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.container h1 {
  color: #ffffff;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
}
```

## Code JavaScript

```javascript
// Fonction moderne avec async/await
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    return null;
  }
}

// Utilisation avec destructuring
const { name, email, avatar } = await fetchUserData(123);
console.log(`Utilisateur: ${name} (${email})`);
```

## Code C#

```csharp
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace BlogApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticlesController : ControllerBase
    {
        private readonly IArticleService _articleService;
        
        public ArticlesController(IArticleService articleService)
        {
            _articleService = articleService ?? throw new ArgumentNullException(nameof(articleService));
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Article>> GetArticle(int id)
        {
            var article = await _articleService.GetByIdAsync(id);
            
            if (article == null)
            {
                return NotFound($"Article with ID {id} not found");
            }
            
            return Ok(article);
        }
    }
}
```

## Code Python

```python
import asyncio
import aiohttp
from typing import List, Optional

class ArticleManager:
    def __init__(self, base_url: str):
        self.base_url = base_url
        self.session: Optional[aiohttp.ClientSession] = None
    
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    async def fetch_articles(self, category: str = None) -> List[dict]:
        """Récupère les articles depuis l'API"""
        url = f"{self.base_url}/articles"
        params = {"category": category} if category else {}
        
        async with self.session.get(url, params=params) as response:
            response.raise_for_status()
            return await response.json()

# Utilisation
async def main():
    async with ArticleManager("https://api.example.com") as manager:
        articles = await manager.fetch_articles("tech")
        print(f"Trouvé {len(articles)} articles")

if __name__ == "__main__":
    asyncio.run(main())
```

## Configuration YAML

```yaml
# Configuration Docker Compose
version: '3.8'

services:
  web:
    build: 
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/myapp
    depends_on:
      - database
      - redis
    volumes:
      - ./uploads:/app/uploads
    restart: unless-stopped

  database:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: secretpassword
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

## Commandes Bash

```bash
#!/bin/bash

# Script de déploiement automatisé
set -e

echo "🚀 Début du déploiement..."

# Variables
APP_NAME="mon-blog"
DOCKER_IMAGE="$APP_NAME:latest"
CONTAINER_NAME="$APP_NAME-container"

# Arrêter le conteneur existant
if docker ps -q -f name=$CONTAINER_NAME | grep -q .; then
    echo "📦 Arrêt du conteneur existant..."
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
fi

# Construire la nouvelle image
echo "🔨 Construction de l'image Docker..."
docker build -t $DOCKER_IMAGE .

# Lancer le nouveau conteneur
echo "🎯 Lancement du nouveau conteneur..."
docker run -d \
    --name $CONTAINER_NAME \
    -p 3000:3000 \
    --restart unless-stopped \
    $DOCKER_IMAGE

echo "✅ Déploiement terminé avec succès!"
echo "🌐 Application disponible sur http://localhost:3000"
```

## Autres fonctionnalités

### Listes

- **Élément en gras**
- *Élément en italique*
- `Code inline`
- [Lien vers Google](https://google.com)

### Liste numérotée

1. Premier élément
2. Deuxième élément
3. Troisième élément avec `code inline`

### Citation

> "La simplicité est la sophistication suprême."
> — Leonardo da Vinci

### Tableau

| Langage    | Type       | Performance | Popularité |
|------------|------------|-------------|------------|
| JavaScript | Interprété | Moyenne     | ⭐⭐⭐⭐⭐    |
| Python     | Interprété | Moyenne     | ⭐⭐⭐⭐⭐    |
| C#         | Compilé    | Élevée      | ⭐⭐⭐⭐     |
| Rust       | Compilé    | Très élevée | ⭐⭐⭐      |

---

Voilà ! Le rendu Markdown devrait maintenant être parfait avec une belle coloration syntaxique ! 🎨