package com.tripappspike.tripapp.model;

import java.util.LinkedHashMap;

//import jakarta.persistence.*;


public class PhoneNumbers {




    private LinkedHashMap datas;


    public PhoneNumbers(){

    }

    public PhoneNumbers(LinkedHashMap datas) {
        this.datas = datas;
    }



    public LinkedHashMap getDatas() {
        return datas;
    }

    public void setDatas(LinkedHashMap datas) {
        this.datas = datas;
    }
}
