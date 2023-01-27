package com.tripappspike.tripapp.model;

import java.util.Optional;

public class ClientInfoObject {

    private PhoneNumbers numbers;

    private TextInfo info;


    public ClientInfoObject(PhoneNumbers numbers, TextInfo info){
        this.numbers=numbers;
        this.info=info;
    }

    public TextInfo getInfo() {
        return info;
    }

    public void setInfo(TextInfo info) {
        this.info = info;
    }

    public PhoneNumbers getNumbers() {
        return numbers;
    }

    public void setNumbers(PhoneNumbers numbers) {
        this.numbers = numbers;
    }
}
