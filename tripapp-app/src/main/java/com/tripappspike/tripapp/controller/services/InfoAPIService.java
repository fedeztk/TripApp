package com.tripappspike.tripapp.controller.services;

import com.tripappspike.tripapp.model.ClientInfoObject;
import com.tripappspike.tripapp.model.PhoneNumbers;
import com.tripappspike.tripapp.model.TextInfo;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;

@Service
public class InfoAPIService {



    public Optional<ClientInfoObject> getInfoByTAG(String tag) {
        Optional<TextInfo> textInfo = getTextInfo(tag) ;
        if (!textInfo.isPresent())
            return null;

        Optional<PhoneNumbers> phoneList = getPhnoneNumbers(textInfo.get().getCode());

        return Optional.of(new ClientInfoObject(phoneList, textInfo));

    }

    private Optional<TextInfo> getTextInfo(String stateName){
        //chiamata API
        String uri = "https://restcountries.com/v3.1/name/"+stateName;
        RestTemplate resttemplate = new RestTemplate();

        try{
            Object[] res = resttemplate.getForObject(uri, Object[].class);
            LinkedHashMap hm = (LinkedHashMap) res[0];
            return Optional.of(mapToTextInfo(hm));

        }catch (ClassCastException e) {
            System.out.println(e);
            System.out.println(e.getMessage());
        }catch (HttpClientErrorException e){
            System.out.println(e.getMessage());
            System.out.println(e.getStatusCode());
        }catch (Exception e){
            System.out.println(e);
            System.out.println(e.getCause());
        }
        return null;
    }

    private Optional<PhoneNumbers> getPhnoneNumbers(String stateName){
        //chiamata API
        String uri = "https://emergencynumberapi.com/api/country/"+stateName;
        RestTemplate resttemplate = new RestTemplate();


        try{
            LinkedHashMap res = resttemplate.getForObject(uri, LinkedHashMap.class);

            PhoneNumbers numbers = new PhoneNumbers((LinkedHashMap) res.getOrDefault("data",null) );

            return Optional.of(numbers);

        }catch (ClassCastException e) {
            System.out.println(e);
            System.out.println(e.getMessage());
        }catch (HttpClientErrorException e){
            System.out.println(e.getMessage());
            System.out.println(e.getStatusCode());
        }catch (Exception e){
            System.out.println(e);
            System.out.println(e.getCause());
        }
        return null;
    }

    private TextInfo mapToTextInfo(LinkedHashMap obj){
        LinkedHashMap def = null;
        TextInfo info = new TextInfo(
                (String) obj.getOrDefault("cca2",def),
                (LinkedHashMap) obj.getOrDefault("name",def),
                (LinkedHashMap) obj.getOrDefault("currencies",def),
                (ArrayList) obj.getOrDefault("capital",def),
                (LinkedHashMap) obj.getOrDefault("lenguages",def),
                (LinkedHashMap) obj.getOrDefault("maps",def),
                (LinkedHashMap) obj.getOrDefault("flags",def),
                (LinkedHashMap) obj.getOrDefault("coatOfArms",def),
                (ArrayList) obj.getOrDefault("altSpellings",def));
        return info;
    }

}
