package com.example.api.service;

import com.example.api.dto.IncomeDataSummary;
import com.example.api.repository.IncomeDataRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class IncomeDataService {
    @Autowired
    IncomeDataRepository incomeDataRepository;

    public List<IncomeDataSummary> getIncomeDataWithin(String beginym, String endym) {
        return incomeDataRepository.findIncomeDatas(beginym, endym);
    }
}
