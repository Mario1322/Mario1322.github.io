// formacion_dropdown.js

function initFormacionDropdown() {
    const columns = document.querySelectorAll('.education-column');
    
    // Configurable number of items to show by default
    const ITEMS_TO_SHOW = 4;
    
    const isEnglish = document.documentElement.lang.toLowerCase().startsWith('en');
    
    columns.forEach(column => {
        const items = column.querySelectorAll('.education-box');
        
        if (items.length > ITEMS_TO_SHOW) {
            // Create a wrapper for hidden items
            const hiddenWrapper = document.createElement('div');
            hiddenWrapper.className = 'hidden-education-wrapper';
            
            // Create inner container for the grid trick to work (one explicit item)
            const hiddenInner = document.createElement('div');
            hiddenInner.className = 'hidden-education-inner';
            hiddenWrapper.appendChild(hiddenInner);
            
            const itemsToHide = Array.from(items).slice(ITEMS_TO_SHOW);
            
            const lastVisibleItem = items[ITEMS_TO_SHOW - 1];
            if (lastVisibleItem && lastVisibleItem.parentNode) {
                lastVisibleItem.parentNode.insertBefore(hiddenWrapper, lastVisibleItem.nextSibling);
            }
            
            // Append items to the inner wrapper
            itemsToHide.forEach(item => {
                hiddenInner.appendChild(item);
            });
            
            // Create the toggle button container
            const btnContainer = document.createElement('div');
            btnContainer.className = 'dropdown-btn-container';
            
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'dropdown-btn';
            toggleBtn.type = 'button';
            toggleBtn.innerHTML = isEnglish ? 'Show More <i class="bx bx-chevron-down"></i>' : 'Ver más <i class="bx bx-chevron-down"></i>';
            
            btnContainer.appendChild(toggleBtn);
            column.appendChild(btnContainer);
            
            // Add click listener
            toggleBtn.addEventListener('click', () => {
                const isExpanded = hiddenWrapper.classList.contains('expanded');
                
                if (isExpanded) {
                    hiddenWrapper.classList.remove('expanded');
                    toggleBtn.innerHTML = isEnglish ? 'Show More <i class="bx bx-chevron-down"></i>' : 'Ver más <i class="bx bx-chevron-down"></i>';
                } else {
                    hiddenWrapper.classList.add('expanded');
                    toggleBtn.innerHTML = isEnglish ? 'Show Less <i class="bx bx-chevron-up"></i>' : 'Ver menos <i class="bx bx-chevron-up"></i>';
                }
            });
        }
    });
}

// Execute immediately if DOM is already ready, otherwise wait for it
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFormacionDropdown);
} else {
    initFormacionDropdown();
}
