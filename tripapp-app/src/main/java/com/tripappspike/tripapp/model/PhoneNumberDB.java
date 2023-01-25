package com.tripappspike.tripapp.model;

import javax.persistence.*;

//import jakarta.persistence.*;

@Entity
@Table(name = "phonenumbers")
public class PhoneNumberDB {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @Column(name = "tag")
    private String tag;

    @Column(name = "phoneNumber")
    private Long phoneNumber;

    @Column(name = "description")
    private String description;

    public PhoneNumberDB(){

    }


    public long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getTag() {
        return this.tag;
    }
}
