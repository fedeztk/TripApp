package com.tripappspike.tripapp.model;

//import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.LinkedHashMap;

public class TextInfo {

    private String code; //CCA2
    private LinkedHashMap names;
    private LinkedHashMap currencies;
    private ArrayList capital;
    private LinkedHashMap lenguages;
    private LinkedHashMap maps;
    private LinkedHashMap flags;
    private LinkedHashMap coatOfArms;



    private ArrayList altSpellings;

    public TextInfo(String code,LinkedHashMap names, LinkedHashMap currencies, ArrayList capital, LinkedHashMap lenguages, LinkedHashMap maps, LinkedHashMap flags, LinkedHashMap coatOfArms, ArrayList altSpellings) {
        this.code = code;
        this.names = names;
        this.currencies = currencies;
        this.capital = capital;
        this.lenguages = lenguages;
        this.maps = maps;
        this.flags = flags;
        this.coatOfArms = coatOfArms;
        this.altSpellings = altSpellings;
    }

    public TextInfo(){

    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
    public LinkedHashMap getNames() {
        return names;
    }

    public void setNames(LinkedHashMap names) {
        this.names = names;
    }

    public LinkedHashMap getCurrencies() {
        return currencies;
    }

    public void setCurrencies(LinkedHashMap currencies) {
        this.currencies = currencies;
    }

    public ArrayList getCapital() {
        return capital;
    }

    public void setCapital(ArrayList capital) {
        this.capital = capital;
    }

    public LinkedHashMap getLenguages() {
        return lenguages;
    }

    public void setLenguages(LinkedHashMap lenguages) {
        this.lenguages = lenguages;
    }

    public LinkedHashMap getMaps() {
        return maps;
    }

    public void setMaps(LinkedHashMap maps) {
        this.maps = maps;
    }

    public LinkedHashMap getFlags() {
        return flags;
    }

    public void setFlags(LinkedHashMap flags) {
        this.flags = flags;
    }

    public LinkedHashMap getCoatOfArms() {
        return coatOfArms;
    }

    public void setCoatOfArms(LinkedHashMap coatOfArms) {
        this.coatOfArms = coatOfArms;
    }

    public ArrayList getAltSpellings() {
        return altSpellings;
    }

    public void setAltSpellings(ArrayList altSpellings) {
        this.altSpellings = altSpellings;
    }
}
