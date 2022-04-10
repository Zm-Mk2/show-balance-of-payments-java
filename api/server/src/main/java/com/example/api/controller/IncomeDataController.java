package com.example.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import com.example.api.dto.IncomeDataSummary;
import com.example.api.service.IncomeDataService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@CrossOrigin(origins = {"http://localhost:8000"})
public class IncomeDataController {

    @Autowired
    IncomeDataService incomeDataService;

    @GetMapping("/incomedatas")
    public List<IncomeDataSummary> selectIncomeDatas(@RequestParam("beginym") String beginym, @RequestParam("endym") String endym) throws Exception {
        return incomeDataService.getIncomeDatasWithin(beginym, endym);
    }

    @DeleteMapping("/incomedatas/destroy_all")
    public void deleteIncomeDatas(@RequestParam("beginym") String beginym, @RequestParam("endym") String endym) throws Exception {
        incomeDataService.deleteIncomeDatasWithin(beginym, endym);
    }

    @PostMapping("/incomedatas/import")
    public List<String> importIncomeDatas(@RequestParam("file") MultipartFile csvFile) throws Exception {
        return incomeDataService.importIncomeDatas(csvFile);
    }

}
