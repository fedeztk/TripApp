package com.tripappspike.tripapp.model;

import com.fasterxml.jackson.databind.JsonNode;

import java.util.LinkedHashMap;

//import jakarta.persistence.*;


public class PhoneNumbers {




    private JsonNode datas;



    private String status;


    public PhoneNumbers(){

    }


    public JsonNode getDatas() {
        return datas;
    }

    public void setDatas(JsonNode datas) {
        this.datas = datas;
    }
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
