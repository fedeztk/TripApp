package com.TripApp.auth.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("accounts")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Account {
    @Id
    private String id;
    private String provider;
    @Field("token_type")
    private String tokenType;
    @Field("access_token")
    private String accessToken;
    private String providerAccountId;
    private String type;
    private String scope;
    private String userId;
}
