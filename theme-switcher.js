/* ========================================
   THEME SWITCHER
   Dark/Light Mode Toggle with Local Storage
   ======================================== */

class ThemeSwitcher {
    constructor() {
        this.STORAGE_KEY = 'portfolio-theme';
        this.LIGHT_THEME = 'light';
        this.DARK_THEME = 'dark';
        this.SYSTEM_THEME = 'system';
        
        this.init();
    }

    init() {
        // Set initial theme
        this.setInitialTheme();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Listen for system theme changes
        this.listenToSystemTheme();
    }

    /**
     * Set the initial theme based on saved preference or system preference
     */
    setInitialTheme() {
        const savedTheme = this.getSavedTheme();
        
        if (savedTheme === this.SYSTEM_THEME || !savedTheme) {
            this.applySystemTheme();
        } else {
            this.applyTheme(savedTheme);
        }
    }

    /**
     * Get saved theme from localStorage
     */
    getSavedTheme() {
        return localStorage.getItem(this.STORAGE_KEY);
    }

    /**
     * Save theme preference to localStorage
     */
    saveTheme(theme) {
        localStorage.setItem(this.STORAGE_KEY, theme);
    }

    /**
     * Apply system theme based on OS/browser preference
     */
    applySystemTheme() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = prefersDark ? this.DARK_THEME : this.LIGHT_THEME;
        this.applyTheme(theme);
    }

    /**
     * Apply theme to document
     */
    applyTheme(theme) {
        const root = document.documentElement;
        
        if (theme === this.DARK_THEME) {
            document.body.setAttribute('data-theme', this.DARK_THEME);
            root.style.colorScheme = 'dark';
        } else {
            document.body.setAttribute('data-theme', this.LIGHT_THEME);
            root.style.colorScheme = 'light';
        }
        
        // Update toggle buttons
        this.updateToggleButtons(theme);
        
        // Announce to screen readers
        this.announceThemeChange(theme);
    }

    /**
     * Toggle between light and dark themes
     */
    toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === this.DARK_THEME ? this.LIGHT_THEME : this.DARK_THEME;
        
        this.applyTheme(newTheme);
        this.saveTheme(newTheme);
    }

    /**
     * Listen for system theme preference changes
     */
    listenToSystemTheme() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            const savedTheme = this.getSavedTheme();
            
            // Only apply if user hasn't set a preference
            if (!savedTheme || savedTheme === this.SYSTEM_THEME) {
                this.applySystemTheme();
            }
        });
    }

    /**
     * Update theme toggle button states
     */
    updateToggleButtons(theme) {
        const toggleButtons = document.querySelectorAll('[data-theme-toggle]');
        
        toggleButtons.forEach(btn => {
            const buttonTheme = btn.getAttribute('data-theme-toggle');
            
            if (buttonTheme === theme) {
                btn.setAttribute('aria-pressed', 'true');
                btn.classList.add('active');
            } else {
                btn.setAttribute('aria-pressed', 'false');
                btn.classList.remove('active');
            }
        });
    }

    /**
     * Announce theme change to screen readers
     */
    announceThemeChange(theme) {
        const announcement = theme === this.DARK_THEME 
            ? 'Dark mode enabled' 
            : 'Light mode enabled';
        
        this.announceToScreenReader(announcement);
    }

    /**
     * Announce message to screen readers
     */
    announceToScreenReader(message) {
        let liveRegion = document.getElementById('theme-announcements');
        
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'theme-announcements';
            liveRegion.className = 'sr-only';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            document.body.insertBefore(liveRegion, document.body.firstChild);
        }
        
        liveRegion.textContent = message;
    }
}

// Initialize theme switcher when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.themeSwitcher = new ThemeSwitcher();
    });
} else {
    window.themeSwitcher = new ThemeSwitcher();
}

/**
 * Setup theme toggle buttons globally
 */
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButtons = document.querySelectorAll('[data-theme-toggle]');
    
    themeToggleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            window.themeSwitcher.toggleTheme();
        });
        
        // Keyboard accessibility
        button.addEventListener('keydown', (e) => {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                window.themeSwitcher.toggleTheme();
            }
        });
    });
});

/**
 * Example of how to use the theme switcher:
 * 
 * 1. Add theme toggle button to header:
 *    <button data-theme-toggle="dark" aria-pressed="false" aria-label="Toggle dark mode">
 *        🌙 Dark
 *    </button>
 * 
 * 2. The ThemeSwitcher class handles:
 *    - Detecting system preference
 *    - Saving preference to localStorage
 *    - Applying theme via data-theme attribute
 *    - Updating button states
 *    - Screen reader announcements
 */
