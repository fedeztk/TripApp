package com.tripappspike.tripapp.controller.services;

import com.tripappspike.tripapp.model.ClientInfoObject;
import com.tripappspike.tripapp.model.PhoneNumbers;
import com.tripappspike.tripapp.model.TextInfo;
import com.tripappspike.tripapp.repo.PhoneNumberRepo;
import com.tripappspike.tripapp.repo.TextInfoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

@Service
public class InfoService {

    @Autowired
    private PhoneNumberRepo phoneRepo;

    @Autowired
    private TextInfoRepo textRepo;

    public Optional<ClientInfoObject> getInfoByTAG(String tag) {

        Optional<PhoneNumbers> phoneList = this.phoneRepo.findByTag(tag);
        Optional<TextInfo> textInfo = this.textRepo.findByTag(tag);

        System.out.println(phoneList);
        System.out.println(textInfo);
        return Optional.of(new ClientInfoObject(phoneList, textInfo));
    }

}