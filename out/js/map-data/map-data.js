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
