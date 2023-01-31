package com.javasampleapproach.financev1.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class UserIdAmount {
    /**
     * components:
     * -user
     * -amount due
     */

    private String userId;
    private float amount;

}