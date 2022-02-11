


class MenuItemView {
    constructor(select: () => void) {

    }
}


class Application {

}

window.onload = function() {



    let menu = [
        {
            name: "About",
            isOpened: false,
            contentPartURL: "about",
            content: String,
            submenu: []
        },
        {
            // https://refactoring.guru/design-patterns/factory-method
            name: "Design patterns",
            isOpened: true,
            contentPartURL: "patterns",
            submenu: [
                // SLID 
                // YAGNI: https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it
                {
                    name: "Singleton",
                    isOpened: false,
                    submenu: []
                },
                {
                    name: "Abstract factory",
                    isOpened: false,
                    submenu: []
                },
                {
                    name: "Types",
                    isOpened: false,
                    submenu: []
                },
                {
                    name: "Expressions",
                    isOpened: false,
                    submenu: []
                },
                {
                    name: "Statements",
                    isOpened: false,
                    submenu: []
                },
                {
                    name: "Declarations",
                    isOpened: false,
                    submenu: []
                },
                {
                    name: "Attributes",
                    isOpened: true,
                    submenu: []
                },
                {
                    name: "Patterns",
                    isOpened: false,
                    submenu: []
                },
                {
                    name: "Generic Parameters and Arguments",
                    isOpened: false,
                    submenu: []
                }
            ]
        },
        {
            name: "Unit testing",
            isOpened: false,
            submenu: []
        }
    ]
    // https://pypi.org/project/marko/
    function createMenuItem(isCurrent: boolean, name: string, anchor: string) {
        let item = document.createElement("li")
        item.classList.add("test")
        item.classList = `toctree-l1 ${isCurrent?"current":""}`
        let link = document.createElement("a")
        link.classList = "reference internal"
        link.href = `#/${anchor}`
        link.innerHTML = name
        item.appendChild(link)
        return item
    }

    function createSubMenuItem(isCurrent: boolean, name: string, anchor: string) {
        let item = document.createElement("li")
        item.classList = `toctree-l2 ${isCurrent?"current":""}`
        let link = document.createElement("a")
        link.classList = `reference internal ${isCurrent?"current":""}`
        link.href = `#/${anchor}`
        link.innerHTML = name
        item.appendChild(link)
        return item
    }

    function generateMenu(items) {
        let menu = document.getElementById("menu")
        for (const item of items) {
            const tag = createMenuItem(item.isOpened, item.name, "category-name/article-title")
            menu.appendChild(tag)

            if (item.isOpened) {
                const list = document.createElement("ul")
                list.classList = "current"
                tag.appendChild(list)
                for(const submenuItem of item.submenu) {
                    const submenuTag = createSubMenuItem(submenuItem.isOpened, submenuItem.name, "category-name/article-title")
                    list.appendChild(submenuTag)
                }
            }
            
        }
        

        

    }

    generateMenu(menu)


    fetch("articles/about.md")
        .then(r=> {
            return r.text()
        })
        .then(mdText => new Markdown(mdText))
        .then(markdown => markdown.htmlText())
        .then(html => {
            const article = document.getElementById("article")
            article.innerHTML = html
        })

}
