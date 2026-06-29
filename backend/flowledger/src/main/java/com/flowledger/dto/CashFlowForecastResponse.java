package com.flowledger.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CashFlowForecastResponse {

    private Double currentCash;

    private Double expectedInflows;

    private Double expectedOutflows;

    private Double projectedCash;
}
