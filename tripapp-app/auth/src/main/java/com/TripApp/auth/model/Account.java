package com.TripApp.auth.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Document("accounts")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Account {
    @Id
    @Field(targetType = FieldType.OBJECT_ID)
    private String id;
    private String provider;
    @Field("token_type")
    private String tokenType;
    @Field("access_token")
    private String accessToken;
    private String providerAccountId;
    private String type;
    private String scope;
    @Field(targetType = FieldType.OBJECT_ID)
    private String userId;
}
