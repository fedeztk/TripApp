package com.tripappspike.tripapp.model;

import javax.persistence.*;
//import jakarta.persistence.*;

@Entity
@Table(name = "textinfos")
public class TextInfoDB {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "tag")
    private String tag;

    @Column(name = "text")
    private String text;

    public TextInfoDB(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getText() {
        return text;
    }


    public void setText(String text) {
        this.text = text;
    }


    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }
}
