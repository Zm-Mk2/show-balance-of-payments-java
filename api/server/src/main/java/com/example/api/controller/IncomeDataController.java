package com.example.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import com.example.api.dto.IncomeDataSummary;
import com.example.api.service.IncomeDataService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@CrossOrigin(origins = {"http://localhost:8000"})
public class IncomeDataController {

    @Autowired
    IncomeDataService incomeDataService;

    @GetMapping("/incomedatas")
    public List<IncomeDataSummary> incomedata(@RequestParam("beginym") String beginym, @RequestParam("endym") String endym) {
        return incomeDataService.getIncomeDataWithin(beginym, endym);
    }
}
