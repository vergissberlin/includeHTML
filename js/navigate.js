let lastClickedElement = null;

class Navigate {
    content = document.getElementById('content');
    lastClickedElement = null;

    constructor(url, title) {
        console.info('🤖\tNavigator loaded:', title, url);
        this.catchBackButton();
        this.load(url).then(html => {
            this.content.innerHTML = html;
            document.title = title;
            let element = document.querySelector(`[data-title='${title}']`)
            if (element) {
                element.classList.add('active');
                this.lastClickedElement = element;
            }
        });
    }

    /**
     * Navigate to a new url
     * @param {DOMElement} element 
     */
    navigateTo(element) {
        let file = element.getAttribute('data-file')
        let title = element.getAttribute('data-title')

        this.load(file).then(html => {
            document.title = title;
            this.content.innerHTML = html;
            if (this.lastClickedElement) {
                this.lastClickedElement.classList.remove('active');
            }
            this.lastClickedElement = element;
        });
    }

    catchBackButton() {
        window.onpopstate = function (event) {
            console.info('🤖\tBack button pressed', event);
            if (event.state?.url && event.state?.title) {
                let url = event.state?.url;
                let title = event.state?.title;
                let element = document.querySelector(`[data-title='${title}']`)
                if (element) {
                    element.classList.add('active');
                }
                this.load(url).then(html => {
                    this.content.innerHTML = html;
                    document.title = title;
                }
                );
            }
        }
    }


    async load(url) {
        let spinner = document.getElementById('spinner');
        spinner.classList.remove('visually-hidden');
        const response = await fetch(url).then(response => response.text());
        spinner.classList.add('visually-hidden');
        return response;
    }

}

