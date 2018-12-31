export class Menu {
    constructor () {
        // navs
        this.oMenuTop =  document.querySelector('.top-menu')
        // Otros
        this.aMenuItems = document.querySelectorAll("nav.top-menu ul li a")
        this.aMobileMenuItems = document.querySelectorAll("nav.mobile-top-menu ul li a")
        this.aSections = document.querySelectorAll("section")
        this.menuBtn = document.querySelector('.menu-btn')
        this.oOffsets = []
        // Manejadores de eventos
        this.aMenuItems.forEach(
            (item) => { item.addEventListener('click', function (e) {
                e.preventDefault();
                let selector = this.getAttribute('href')+" header"
                document.querySelector(selector).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        this.aMobileMenuItems.forEach(
            (item) => { item.addEventListener('click', function (e) {
                e.preventDefault();
                let selector = this.getAttribute('href')+" header"
                document.querySelector(selector).scrollIntoView({
                    behavior: 'smooth'
                });
                document.querySelector('.mobile-top-menu').style.display = 'none'
                document.querySelector('.menu-btn').classList.remove("change")
            });
        });
        window.addEventListener('scroll', this.changeMenuStyle.bind(this))
        this.menuBtn.addEventListener('click', this.modificateBtn.bind(this))
        window.addEventListener('resize', function(){
            document.querySelector('.mobile-top-menu').style.display = 'none'
            document.querySelector('.menu-btn').classList.remove("change")
            
        })
        this.prepararNavegacion()
    }
    modificateBtn(){
        this.menuBtn.classList.toggle("change")
        if (document.querySelector('.mobile-top-menu').style.display == 'block'){
            document.querySelector('.mobile-top-menu').style.display = 'none'  
        }else {
            document.querySelector('.mobile-top-menu').style.display = 'block'
        }

    }

    changeMenuStyle () {
        let pageOffset = window.pageYOffset
        let menuItem = 0
        if (pageOffset >=  this.oOffsets['#inicio'] && pageOffset < this.oOffsets['#estudios']) {
            menuItem = 0
        } else if (pageOffset >= this.oOffsets['#estudios']-2 && pageOffset < this.oOffsets['#experiencia']) {
            menuItem = 1
        } else if (pageOffset >= this.oOffsets['#experiencia']-2 && pageOffset < this.oOffsets['#sobreMi']) {
            menuItem = 2
        } else if (pageOffset >= this.oOffsets['#sobreMi']-2 && pageOffset < this.oOffsets['#contacto']) {
            menuItem = 3
        } else {
            menuItem = 4
        }
        this.aMenuItems.forEach(
            (item) => item.classList.remove('active')
        )
        this.aMenuItems[menuItem].classList.add('active')
        this.aMobileMenuItems.forEach(
            (item) => item.classList.remove('active')
        )
        this.aMobileMenuItems[menuItem].classList.add('active')
    }

    prepararNavegacion() {
        this.aSections.forEach(
            (item) => {
                let cumulative =  this.cumulativeOffset(item);
                this.oOffsets['#'+item.id] = cumulative;
            }
        )

    }

    cumulativeOffset (element) {
        var top = 0;
        do {
            top += element.offsetTop || 0;
            element = element.offsetParent;
        } while(element);
        return top;
    };
}