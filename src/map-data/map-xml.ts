import { MapType } from "./nu2-map-data.js";

export class MapXml {
    private name: string;
    private map_type: MapType;
    private map_files_path: string;
    private files: Array<string>;
    private loaded_models: Map<string, string>;
    private loaded_textures: Map<string, string>;

    public setName(map_name: string) {
        this.name = map_name;
    }

    public setMapFilesPath(map_files_path: string) {
        this.map_files_path = map_files_path;
    }

    public setMapType(map_type: MapType) {
        this.map_type = map_type;
    }

    public getMapType(): MapType {
        return this.map_type;
    }

    public getFiles(): Array<string> {
        return this.files;
    }

    // no need for getAssociatedFiles function, file paths are already used as strings

    public getLoadedModels(): Map<string, string> {
        return this.loaded_models;
    }

    public getLoadedTextures(): Map<string, string> {
        return this.loaded_textures;
    }

    public getName(): string {
        return this.name;
    }

    public getPath(): string {
        return "Maps/" + this.getName(); // most likely for project file structure
    }

    public getNamespace(): string { // idk what the point of this function is, I'll figure it out lol
        return "Project";
    }
}