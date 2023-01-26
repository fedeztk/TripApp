package com.tripappspike.tripapp.model;

//import jakarta.persistence.*;

import com.fasterxml.jackson.databind.JsonNode;

import java.util.ArrayList;

public class TextInfo {

    private String status;
    private JsonNode names;
    private JsonNode currencies;
    private JsonNode capital;
    private JsonNode lenguages;
    private JsonNode maps;
    private JsonNode flags;
    private JsonNode coatOfArms;

    private JsonNode altSpellings;



    public TextInfo(){

    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public JsonNode getNames() {
        return names;
    }

    public void setNames(JsonNode names) {
        this.names = names;
    }

    public JsonNode getCurrencies() {
        return currencies;
    }

    public void setCurrencies(JsonNode currencies) {
        this.currencies = currencies;
    }

    public JsonNode getCapital() {
        return capital;
    }

    public void setCapital(JsonNode capital) {
        this.capital = capital;
    }

    public JsonNode getLenguages() {
        return lenguages;
    }

    public void setLenguages(JsonNode lenguages) {
        this.lenguages = lenguages;
    }

    public JsonNode getMaps() {
        return maps;
    }

    public void setMaps(JsonNode maps) {
        this.maps = maps;
    }

    public JsonNode getFlags() {
        return flags;
    }

    public void setFlags(JsonNode flags) {
        this.flags = flags;
    }

    public JsonNode getCoatOfArms() {
        return coatOfArms;
    }

    public void setCoatOfArms(JsonNode coatOfArms) {
        this.coatOfArms = coatOfArms;
    }

    public JsonNode getAltSpellings() {
        return altSpellings;
    }

    public void setAltSpellings(JsonNode altSpellings) {
        this.altSpellings = altSpellings;
    }
}
