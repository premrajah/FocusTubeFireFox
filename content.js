function removeShorts() {
  // Find the div with id="content" and class="style-scope ytd-rich-section-renderer"
  // const contentDiv = document.querySelector('div#content.style-scope.ytd-rich-section-renderer');
  const contentDiv = document.querySelector('grid-shelf-view-model');

  if (contentDiv) {
    console.log('FocusTube: Found and removing content div');
    contentDiv.remove();
  } else {
    console.log('FocusTube: Content div not found');
  }
}

function decreaseThumbnailSize() {
  // Create or update the style element
  let styleElement = document.getElementById('youtube-content-remover-styles');

  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = 'youtube-content-remover-styles';
    document.head.appendChild(styleElement);
  }

  // Add the custom styles
  styleElement.textContent = `
    .yt-lockup-view-model__content-image {
      opacity: 0.5 !important;
      overflow: hidden !important;
      margin: auto !important;
      width: 100px !important;
    }
  `;

  console.log('FocusTube: Applied custom styles to .yt-lockup-view-model__content-image');
}

// Run immediately when script loads
removeShorts();
decreaseThumbnailSize();

// Also run when DOM changes (for dynamic content)
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.type === 'childList') {
      removeShorts();
      decreaseThumbnailSize();
    }
  });
});

// Start observing
observer.observe(document.body, {
  childList: true,
  subtree: true
});
