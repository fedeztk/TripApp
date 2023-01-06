import {createContext, useContext, useState} from "react";
import {Section} from "../types/section";

const Context = createContext<[Section | null, (section: Section | null) => void]>([null, () => { }]);

export function SectionProvider({children}: { children: React.ReactNode }) {
    const [section, setSection] = useState<Section | null>(null);
    return <Context.Provider value={[section, setSection]}> {children} </Context.Provider>;
}

export function useSectionContext() {
    return useContext(Context);
}