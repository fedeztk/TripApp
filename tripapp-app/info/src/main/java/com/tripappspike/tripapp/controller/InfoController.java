package com.tripappspike.tripapp.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tripappspike.tripapp.model.ClientInfoObject;
import com.tripappspike.tripapp.model.PhoneNumbers;
import com.tripappspike.tripapp.model.TextInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import javax.sound.sampled.Line;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Optional;

@RestController
@RequestMapping("/infos")
public class InfoController {

    @GetMapping("/ping/{id}")
    public ResponseEntity<String> ping(@PathVariable("id") String id){
        Optional<String> body = Optional.ofNullable(id);

        return new ResponseEntity(body, HttpStatus.OK);
    }


    @GetMapping("/{iso}")
    public ResponseEntity getInfo(@PathVariable("iso") String isoName) {

        RestTemplate resttemplate = new RestTemplate();
        Object body = null;
        HttpStatus status = HttpStatus.BAD_REQUEST;

        if (isoName != null) {
            PhoneNumbers num = getPhoneNumbers(isoName);
            TextInfo info = getTextInfo(isoName);
            body = new ClientInfoObject(num, info);
            status = HttpStatus.OK;
        }

        return new ResponseEntity(body, status);
    }


    private PhoneNumbers getPhoneNumbers(String stateName){
        //chiamata API
        String uri = "https://emergencynumberapi.com/api/country/"+stateName;
        RestTemplate resttemplate = new RestTemplate();
        PhoneNumbers pn = new PhoneNumbers();

        try{
            ResponseEntity<JsonNode> res = resttemplate.getForEntity(uri, JsonNode.class);
            pn.setStatus(res.getStatusCode().toString());

            ObjectMapper mapper = new ObjectMapper();
            JsonNode body = mapper.readTree(res.getBody().toString());
            pn.setDatas(body.path("data"));



        }catch (ClassCastException e) {
            System.out.println(e);
            System.out.println(e.getMessage());
            pn.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.toString());
        }catch (HttpClientErrorException e){
            System.out.println(e.getMessage());
            System.out.println(e.getStatusCode());
            pn.setStatus(e.getStatusCode().toString());
        }catch (Exception e){
            System.out.println(e);
            System.out.println(e.getCause());
            pn.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.toString());
        }
        return pn;
    }

    private TextInfo getTextInfo(String isoName){
        //chiamata API
        String uri = "https://restcountries.com/v3.1/alpha/"+isoName;
        RestTemplate resttemplate = new RestTemplate();
        TextInfo t = new TextInfo();

        try{
            ResponseEntity<JsonNode> res = resttemplate.getForEntity(uri, JsonNode.class);
            t.setStatus(res.getStatusCode().toString());

            ObjectMapper mapper = new ObjectMapper();
            JsonNode body = mapper.readTree(res.getBody().get(0).toString());

            t.setNames(body.path("name"));
            t.setCapital(body.path("capital"));
            t.setFlags(body.path("flags"));
            t.setCurrencies(body.path("currencies"));
            t.setMaps(body.path("maps"));
            t.setLenguages(body.path("lenguages"));
            t.setAltSpellings(body.path("altSpellings"));
            t.setCoatOfArms(body.path("coatOfArms"));



        }catch (ClassCastException e) {
            System.out.println(e);
            System.out.println(e.getMessage());
            t.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.toString());
        }catch (HttpClientErrorException e){
            System.out.println(e.getMessage());
            System.out.println(e.getStatusCode());
            t.setStatus(e.getStatusCode().toString());
        }catch (Exception e){
            System.out.println(e);
            System.out.println(e.getCause());
            t.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.toString());
        }
        return t;
    }



}
