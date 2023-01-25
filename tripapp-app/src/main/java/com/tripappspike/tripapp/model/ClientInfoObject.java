package com.tripappspike.tripapp.model;

import java.util.Optional;

public class ClientInfoObject {

    private Optional<PhoneNumbers> numbers;

    private Optional<TextInfo> info;

    public ClientInfoObject(Optional<PhoneNumbers> numbers, Optional<TextInfo> info){
        this.numbers=numbers;
        this.info=info;
    }

    public Optional<TextInfo> getInfo() {
        return info;
    }

    public void setInfo(Optional<TextInfo> info) {
        this.info = info;
    }

    public Optional<PhoneNumbers> getNumbers() {
        return numbers;
    }

    public void setNumbers(Optional<PhoneNumbers> numbers) {
        this.numbers = numbers;
    }
}
