class Routes {
    constructor(
        title: string,
        path: string,
        icon: string,
        boxButton: boolean,
        navbar: boolean
    ) {
        this.title = title;
        this.path = path;
        this.icon = icon;
        this.boxButton = boxButton;
        this.navbar = navbar;
    }

    title: string;
    path: string;
    icon: string;
    boxButton: boolean;
    navbar: boolean;
}

const routes: Routes[] = [
    new Routes('tela inicial', '', '', false, true),
    new Routes('dados', 'spreadsheets', 'spreadsheets.png', true, true),
    new Routes('folhas de ponto', 'pointsheets', 'pointsheets.svg', true, true),
    new Routes('calendário letivo', 'calendar', 'calendar.svg', true, true),
    new Routes('Configurações', 'settings', 'settings.svg', true, true),
    new Routes('novo professor', 'teachers', '', false, false),
];

export {
    routes
};