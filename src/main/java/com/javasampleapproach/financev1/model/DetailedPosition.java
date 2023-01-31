package com.javasampleapproach.financev1.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetailedPosition {
    /**
     * It contains 2 list :
     * 1 with all total debt vs all the group
     * 1 with all total credit vs all the group
     *
     */
    private List<UserIdAmount> debtorAmountList;
    private List<UserIdAmount> creditorAmountList;
}
