import { MapXml } from "./map-xml";

export abstract class MapData {
    name(): string {
        return this.xmlData().getName();
    }

    abstract xmlData(): MapXml;

    
}