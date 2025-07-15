import { MapXml } from "./map-xml.js";

export type Nu2MapData = Readonly<{
    xml_data: MapXml,
    scene,
    gizmo, // gizmo data
    terrain, // terrain data
    ai, // ai data
    txt, // level/area txt data
    git, // git data
    rtl // lighting data
}>;

export enum MapType {
    NORMAL,
    INTRO,
    OUTRO,
    MIDTRO,
    STATUS,
    NEW_GAME,
    LOAD_GAME,
    TEST,
    SINGLE_FILE
}