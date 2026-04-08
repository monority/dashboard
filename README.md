# Panneau Admin

Dashboard interne React + Vite, orienté efficacité d'usage, lisibilité du code, et performance perçue.

## Stack

- React 18
- Vite
- TypeScript strict
- React Router v7
- Zustand (etat UI + auth uniquement)
- TanStack Query (etat serveur)
- Axios (client HTTP + normalisation erreurs)
- CSS tokens + styles modulaires
- ESLint + Prettier + Husky + lint-staged

## Architecture

Structure principale du projet:

- `src/features/`
- `src/components/ui/`
- `src/components/layout/`
- `src/hooks/`
- `src/stores/`
- `src/services/`
- `src/types/`
- `src/utils/`
- `src/styles/`

Features migrees en structure feature-based:

- `dashboard`
- `mail`
- `order`
- `task`
- `reviews`
- `support`
- `settings`

Features partagees de donnees/metier:

- `users`
- `billing`

Regles de separation:

- Les composants UI ne contiennent pas de logique metier ni d'appel API.
- Les donnees serveur passent par TanStack Query.
- Zustand est reserve a l'etat UI global et l'etat auth.
- Les appels reseau passent par `src/services/http/client.ts`.
- Le code source applicatif est 100% TypeScript (`allowJs: false`).

## Routing

- Router base sur `createBrowserRouter`.
- Pages chargees en lazy par route avec fallback Skeleton.
- Prefetch des routes probables sur hover dans la navigation.

## Navigation UX

- Sidebar enrichie (libelle, meta, etat actif, raccourci affiche).
- Sidebar repliable en desktop avec adaptation de la grille shell.
- Sidebar masquee en mobile quand l'etat est replie.
- Breadcrumb contextuel dans le header selon la route active.

Raccourcis clavier disponibles:

- `Ctrl/Cmd + K`: focus direct sur la recherche globale.
- Sequence `G` puis une lettre:
- `G D`: Tableau de bord
- `G M`: Mail
- `G O`: Commandes
- `G T`: Taches
- `G R`: Avis
- `G S`: Support
- `G P`: Parametres

## Recherche globale

- Recherche centralisee avec suggestions sections + donnees metier mockees.
- Navigation clavier dans les suggestions (`ArrowUp`, `ArrowDown`, `Enter`, `Escape`).
- Annonce live de statut pour l'accessibilite (`aria-live`).

Sources de resultats actuellement branchees:

- sections tableau de bord
- fils mail
- taches
- support (FAQ + historique)
- avis
- collaborateurs commandes

## Deep-link des filtres

La navigation par recherche peut ouvrir des pages avec filtres pre-remplis via query params.

Synchro bidirectionnelle en place (etat UI <-> URL) sur:

- Tableau de bord: `range`, `team`, `search`
- Mail: `folder`, `search`
- Taches: `status`, `search`

Exemples:

- `/mail?folder=Inbox&search=emma`
- `/task?status=Pending&search=api`
- `/?range=30d&team=all&search=sla`

## Scripts

- `npm run dev`: lancement local Vite
- `npm run dev:mock`: lancement avec mode mock
- `npm run build`: build production
- `npm run preview`: preview du build
- `npm run typecheck`: verification TypeScript stricte
- `npm run lint`: controle ESLint
- `npm run lint:fix`: correction automatique ESLint
- `npm run format`: formatage Prettier
- `npm run format:check`: verification formatage
- `npm run test`: execution des tests unitaires
- `npm run test:watch`: execution des tests en mode watch
- `npm run test:coverage`: execution des tests avec couverture
- `npm run test:e2e`: execution des tests end-to-end
- `npm run test:e2e:ui`: execution des tests e2e avec interface
- `npm run test:e2e:debug`: execution des tests e2e en mode debug
- `npm run test:e2e:headed`: execution des tests e2e avec navigateur visible
- `npm run check`: verification complete (typecheck + lint + format)
- `npm run check:all`: verification complete avec tests
- `npm run analyze`: analyse du bundle avec visualisation

## Sécurité et Performance

### Authentification par Cookies HttpOnly

- Migration des tokens JWT vers des cookies HttpOnly sécurisés
- Protection contre les attaques XSS
- Configuration Axios avec `withCredentials: true`

### Compression

- Compression Gzip et Brotli configurée via `vite-plugin-compression2`
- Réduction de la taille des assets pour des temps de chargement plus rapides

### SEO

- Métadonnées Open Graph et Twitter Cards complètes
- Données structurées JSON-LD (WebApplication et WebSite)
- Support des schémas Schema.org pour une meilleure indexation

### Accessibilité

- Régions `aria-live` pour les annonces de lecteur d'écran
- Gestion du focus dans les modales
- Navigation au clavier complète
- Skip links pour la navigation au clavier

### Code Splitting Avancé

- Chargement paresseux (lazy loading) des routes
- Découpage des bundles par fonctionnalité
- Séparation des vendors React, data, charts, et websocket
- Plugin de visualisation du bundle (`rollup-plugin-visualizer`)

## Qualite et conventions

- TypeScript strict active (`strict`, `noUncheckedIndexedAccess`).
- ESLint configure avec:
- `@typescript-eslint`
- `react-hooks`
- `jsx-a11y`
- `import/order`
- Prettier active pour le formatage.
- Hook pre-commit Husky executant `lint-staged`.
- Validation recommandee avant push: `lint` + `typecheck` + `build`.

## Demarrage rapide

1. Installer les dependances

```bash
npm install
```

2. Lancer le projet

```bash
npm run dev
```

3. Verifier la qualite

```bash
npm run typecheck
npm run lint
```
