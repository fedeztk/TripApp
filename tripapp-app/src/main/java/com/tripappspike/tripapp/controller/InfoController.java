package com.tripappspike.tripapp.controller;

import com.tripappspike.tripapp.controller.services.InfoAPIService;
import com.tripappspike.tripapp.controller.services.InfoService;
import com.tripappspike.tripapp.model.ClientInfoObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class InfoController {

    @Autowired
    private InfoAPIService service;

    @GetMapping("/ping/{id}")
    public ResponseEntity<String> ping(@PathVariable("id") String id){
        Optional<String> body = Optional.ofNullable(id);

        return new ResponseEntity(body, HttpStatus.OK);
    }


    @GetMapping("/info/{tag}")
    public ResponseEntity getInfo(@PathVariable("tag") String tag){
        Optional<ClientInfoObject> body = null;
        HttpStatus status = HttpStatus.BAD_REQUEST;

        if(tag!=null){
            body = service.getInfoByTAG(tag);
            if(!body.isPresent())
                status = HttpStatus.NOT_FOUND;
            else
                status = HttpStatus.OK;
        }

        return new ResponseEntity(body, status);
    }


}
