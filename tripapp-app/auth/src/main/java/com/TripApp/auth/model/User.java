package com.TripApp.auth.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.BSONTimestamp;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Document("users")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    @Id
    @Field(targetType = FieldType.OBJECT_ID)
    private String id;
    private String email;
    private String image;
    private BSONTimestamp emailVerified;
    private String name;
}
