/**
 * Changes the website favicon dynamically
 * @param iconUrl - URL of the new favicon
 */
export const changeFavicon = (iconUrl: string): void => {
  let link = document.querySelector("link[rel~='shortcut icon']") as HTMLLinkElement;
  
  if (!link) {
    link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
  }
  
  if (!link) {
    link = document.createElement('link');
    link.rel = 'shortcut icon';
    document.head.appendChild(link);
  }
  
  link.href = iconUrl;
};
