export interface Informations {
    numbers: Numbers;
    info: Info;
}
export interface Numbers {
    datas: Datas;
    status: string;
}
export interface Datas {
    country: Country;
    ambulance: AmbulanceOrFireOrPoliceOrDispatch;
    fire: AmbulanceOrFireOrPoliceOrDispatch;
    police: AmbulanceOrFireOrPoliceOrDispatch;
    dispatch: AmbulanceOrFireOrPoliceOrDispatch;
    member_112: boolean;
    localOnly: boolean;
    nodata: boolean;
}
export interface Country {
    name: string;
    ISOCode: string;
    ISONumeric: string;
}
export interface AmbulanceOrFireOrPoliceOrDispatch {
    all?: string[] | null;
    gsm?: null;
    fixed?: null;
}
export interface Info {
    status: string;
    names: Names;
    currencies: Currencies;
    capital?: string[] | null;
    lenguages?: null;
    maps: Maps;
    flags: Flags;
    coatOfArms: CoatOfArms;
    altSpellings?: string[] | null;
}
export interface Names {
    common: string;
    official: string;
    nativeName: NativeName;
}
export interface NativeName {
    official: string;
    common: string;
}
export interface Currencies {
    /**
     * [KEY: STRING] PERMETTE DI SEGNALARE A TYPESCRIPT
     * CHE QUESTO OGGETTO (CURRENCIES) CONTIENE UNA
     * PROPRIETÀ DINAMICA CHE HA COME VALORE UN
     * OGGETTO
     */
    [key: string]: {
        name: string;
        symbol: string;
    };
}
export interface Maps {
    googleMaps: string;
    openStreetMaps: string;
}
export interface Flags {
    png: string;
    svg: string;
    alt: string;
}
export interface CoatOfArms {
    png: string;
    svg: string;
}