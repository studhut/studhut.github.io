export var MapType;
(function (MapType) {
    MapType[MapType["NORMAL"] = 0] = "NORMAL";
    MapType[MapType["INTRO"] = 1] = "INTRO";
    MapType[MapType["OUTRO"] = 2] = "OUTRO";
    MapType[MapType["MIDTRO"] = 3] = "MIDTRO";
    MapType[MapType["STATUS"] = 4] = "STATUS";
    MapType[MapType["NEW_GAME"] = 5] = "NEW_GAME";
    MapType[MapType["LOAD_GAME"] = 6] = "LOAD_GAME";
    MapType[MapType["TEST"] = 7] = "TEST";
    MapType[MapType["SINGLE_FILE"] = 8] = "SINGLE_FILE";
})(MapType || (MapType = {}));
export class MapXml {
    setName(map_name) {
        this.name = map_name;
    }
    setMapFilesPath(map_files_path) {
        this.map_files_path = map_files_path;
    }
    setMapType(map_type) {
        this.map_type = map_type;
    }
    getMapType() {
        return this.map_type;
    }
    getFiles() {
        return this.files;
    }
    // no need for getAssociatedFiles function, file paths are already used as strings
    getLoadedModels() {
        return this.loaded_models;
    }
    getLoadedTextures() {
        return this.loaded_textures;
    }
    getName() {
        return this.name;
    }
    getPath() {
        return "Maps/" + this.getName(); // most likely for project file structure
    }
    getNamespace() {
        return "Project";
    }
}
