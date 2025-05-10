/**
 * SearchPlaceholderFix.js
 * This script fixes the placeholder text in search inputs
 */

// Function to fix placeholder text
const fixSearchPlaceholder = () => {
  // Get all search inputs
  const searchInputs = document.querySelectorAll('.search-form__input, .mobile-search-input');

  // Update placeholder text
  searchInputs.forEach(input => {
    input.placeholder = "Tìm sản phẩm";
  });

  // Fix search buttons
  const desktopButtons = document.querySelectorAll('.desktop-search-button');
  const mobileButtons = document.querySelectorAll('.mobile-search-button');

  // Fix desktop search buttons
  desktopButtons.forEach(button => {
    button.style.margin = '0';
    button.style.padding = '0';
    button.style.borderRadius = '0 8px 8px 0';
    button.style.display = 'flex';
    button.style.alignItems = 'center';
    button.style.justifyContent = 'center';
  });

  // Fix mobile search buttons
  mobileButtons.forEach(button => {
    button.style.margin = '0';
    button.style.padding = '0';
    button.style.borderRadius = '50%';
    button.style.display = 'flex';
    button.style.alignItems = 'center';
    button.style.justifyContent = 'center';
  });
};

// Run on page load
document.addEventListener('DOMContentLoaded', fixSearchPlaceholder);

// Run on any DOM changes (for single page applications)
const observer = new MutationObserver(() => {
  setTimeout(fixSearchPlaceholder, 100);
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

export default fixSearchPlaceholder;
