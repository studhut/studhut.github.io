export class Project {
    public project_format: Object

    constructor() {
        this.project_format = FORMATS.LIJ1;
    }
}

export const FORMATS = {
    LIJ1: 0,
    TCS: 1,
};
