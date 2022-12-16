const tabs = document.querySelectorAll('[role="tab"]');
const tabList = document.querySelector('[role="tablist"]');

// Add a click event handler to each tab
tabs.forEach(tab => {
    tab.addEventListener('click', changeTabs);
});

let toggled = 1;

function changeTabs(e) {
    e.preventDefault();
    const target = e.target;
    const parent = target.parentNode;
    const grandparent = parent.parentNode;
    const child = grandparent.parentNode.querySelector(`#${target.getAttribute('aria-controls')}`);
    const grandchild = child.querySelector(".tabContent__link");
    const mainContent = document.getElementById('mainContent');
    const chevron = target.querySelector(".open");
    const close = target.querySelector(".close");

    if (toggled === 1) {
        // Remove all current selected tabs
        parent
            .querySelectorAll('[aria-selected="true"]')
            .forEach(t => t.setAttribute('aria-selected', false));

        parent
            .querySelectorAll('[aria-selected="false"]')
            .forEach(t => t.classList.add("inactive"));

        // Set this tab as selected
        setTimeout(() => {
            target.setAttribute('aria-selected', true);
        }, 500)
        target.classList.remove("inactive");

        // Hide all tab panels
        grandparent
            .querySelectorAll('[role="tabpanel"]')
            .forEach(p => p.setAttribute('aria-hidden', true));

        // Remove from view
        grandparent
            .querySelectorAll('[role="tabpanel"]')
            .forEach(p => p.classList.remove('appear'));

        // Show the selected panel
        child.removeAttribute('aria-hidden');

        // Animate in view
        child.classList.add('appear');

        // Set link inside to focusable
        grandchild.setAttribute('tabindex', 0);

        chevron.classList.add('opened');
        close.classList.add('closed');


        toggled = 0;
    } else {
        parent
            .querySelectorAll('[aria-selected="true"]')
            .forEach(t => t.setAttribute('aria-selected', false));
        parent
            .querySelectorAll('[aria-selected="false"]')
            .forEach(t => t.classList.remove("inactive"));
        grandparent
            .querySelectorAll('[role="tabpanel"]')
            .forEach(p => p.setAttribute('aria-hidden', true));
        grandparent
            .querySelectorAll('[role="tabpanel"]')
            .forEach(p => p.classList.remove('appear'));
        grandchild.setAttribute('tabindex', -1);
        chevron.classList.remove('opened');
        close.classList.remove('closed');

        toggled = 1;
    }


    // Close everything when click outisde main
    document.addEventListener('click', function handleClickOutside(event) {
        if (!mainContent.contains(event.target)) {
            parent
                .querySelectorAll('[aria-selected="true"]')
                .forEach(t => t.setAttribute('aria-selected', false));
            parent
                .querySelectorAll('[aria-selected="false"]')
                .forEach(t => t.classList.remove("inactive"));
            grandparent
                .querySelectorAll('[role="tabpanel"]')
                .forEach(p => p.setAttribute('aria-hidden', true));
            grandparent
                .querySelectorAll('[role="tabpanel"]')
                .forEach(p => p.classList.remove('appear'));
            grandchild.setAttribute('tabindex', -1);
            chevron.classList.remove('opened');
            close.classList.remove('closed');
        }
    });


    document.querySelectorAll(".tabContent__link").forEach((element, index) => {
        element.addEventListener('keydown', (e) => {
            if (e.shiftKey && e.keyCode === 9 || e.keyCode === 9) {
                parent
                    .querySelectorAll('[aria-selected="true"]')
                    .forEach(t => t.setAttribute('aria-selected', false));
                parent
                    .querySelectorAll('[aria-selected="false"]')
                    .forEach(t => t.classList.remove("inactive"));
                grandparent
                    .querySelectorAll('[role="tabpanel"]')
                    .forEach(p => p.setAttribute('aria-hidden', true));
                grandparent
                    .querySelectorAll('[role="tabpanel"]')
                    .forEach(p => p.classList.remove('appear'));
                grandchild.setAttribute('tabindex', -1);
                chevron.classList.remove('opened');
                close.classList.remove('closed');
            }
        });
    });

}


// Enable arrow navigation between tabs in the tab list
let tabFocus = 0;

document.querySelectorAll(".tabBtn").forEach((element, index) => {
    element.addEventListener('keydown', (e) => {
        if (e.keyCode === 39 || e.keyCode === 37) {
            tabs[tabFocus].setAttribute('tabindex', -1);

            if (e.keyCode === 39) {
                tabFocus++;
                // If we're at the end, go to the start
                if (tabFocus >= tabs.length) {
                    tabFocus = 0;
                }
                // Move left
            } else if (e.keyCode === 37) {
                tabFocus--;
                // If we're at the start, move to the end
                if (tabFocus < 0) {
                    tabFocus = tabs.length - 1;
                }
            }

            tabs[tabFocus].setAttribute('tabindex', 0);
            tabs[tabFocus].focus();
        }
    });
});



