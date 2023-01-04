import {createContext, useContext, useState} from "react";
import TripGroup from "../types/tripGroup";

const Context = createContext<[TripGroup | null, (tripGroup: TripGroup) => void]>([null, () => {}]);

export function TripGroupProvider({children}: { children: React.ReactNode }) {
    const [tripGroup, setTripGroup] = useState<TripGroup | null>(null);
    return <Context.Provider value={[tripGroup, setTripGroup]}> {children} </Context.Provider>;
}

export function useTripGroupContext() {
    return useContext(Context);
}