class Routes {
    constructor(
        title: string,
        path: string,
        icon: string,
        boxButton: boolean,
        navbar: boolean,
        requireAdmin: boolean
    ) {
        this.title = title;
        this.path = path;
        this.icon = icon;
        this.boxButton = boxButton;
        this.navbar = navbar;
        this.requireAdmin = requireAdmin;
    }

    title: string;
    path: string;
    icon: string;
    boxButton: boolean;
    navbar: boolean;
    requireAdmin: boolean;
}

const routes: Routes[] = [
    new Routes('tela inicial', '', '', false, true, false),
    new Routes('dados', 'spreadsheets', 'spreadsheets.png', true, true, true),
    new Routes('folhas de ponto', 'pointsheets', 'pointsheets.svg', true, true, false),
    new Routes('calendário letivo', 'calendar', 'calendar.svg', true, true, true),
    new Routes('Configurações', 'settings', 'settings.svg', true, true, true),
    new Routes('novo professor', 'teachers', '', false, false, true),
];

export {
    routes
};