/**
 * Settings Loader
 * Loads configuration from settings.json
 */

class SettingsLoader {
  constructor() {
    this.settings = null;
    this.loaded = false;
  }

  async load() {
    if (this.loaded) return this.settings;

    try {
      const response = await fetch('/config/settings.json');
      if (!response.ok) {
        throw new Error(`Failed to load settings: ${response.status}`);
      }
      this.settings = await response.json();
      this.loaded = true;
      return this.settings;
    } catch (error) {
      console.error('Error loading settings:', error);
      // Return default settings if loading fails
      return this.getDefaultSettings();
    }
  }

  getDefaultSettings() {
    return {
      social: {
        twitter: {
          url: 'https://x.com/mythOfTragedy',
          title: 'X',
          enabled: true,
        },
        discord: {
          url: 'https://discord.gg/wunxU8cy',
          title: 'Discord',
          enabled: true,
        },
        opensea: {
          url: 'https://opensea.io/collection/the-mythical-cursed-nightmare',
          title: 'OpenSea',
          enabled: true,
        },
      },
      deeplink: {
        domain: 'tragedy-nft.github.io',
      },
    };
  }

  async getSocialLinks() {
    const settings = await this.load();
    return Object.entries(settings.social)
      .filter(([key, value]) => value.enabled)
      .map(([key, value]) => ({
        key,
        url: value.url,
        title: value.title,
      }));
  }

  async getDeeplinkDomain() {
    const settings = await this.load();
    return settings.deeplink?.domain || 'tragedy-nft.github.io';
  }
}

// Create singleton instance
const settingsLoader = new SettingsLoader();

// Function to render social links
async function renderSocialLinks(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const socialLinks = await settingsLoader.getSocialLinks();

  container.innerHTML = socialLinks
    .map(
      (link) => `
    <a href="${link.url}" class="social-link" title="${link.title}" target="_blank">
      <span>${link.title}</span>
    </a>
  `
    )
    .join('');
}
