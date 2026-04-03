import { uiStore } from '@/stores';

export const Header = () => {
    const toggleSidebar = uiStore((state) => state.toggleSidebar);

    return (
        <div className="app-header">
            <button type="button" onClick={toggleSidebar} aria-label="Ouvrir ou fermer la barre laterale">
                Menu
            </button>
            <div className="app-header__actions">
                <input type="search" placeholder="Rechercher..." aria-label="Recherche globale" />
            </div>
        </div>
    );
};
