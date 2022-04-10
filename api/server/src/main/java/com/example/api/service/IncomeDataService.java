package com.example.api.service;

import com.example.api.dto.IncomeDataSummary;
import com.example.api.entity.IncomeData;
import com.example.api.repository.IncomeDataRepository;
import com.example.api.util.Const;
import com.example.api.util.ImportFileCheck;
import static com.example.api.util.Const.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.Date;
import java.text.SimpleDateFormat;

@Service
@Transactional
public class IncomeDataService {

    @Autowired
    IncomeDataRepository incomeDataRepository;

    public List<IncomeDataSummary> getIncomeDatasWithin(String beginym, String endym) throws Exception {
        return incomeDataRepository.findIncomeDatas(beginym, endym);
    }

    public void deleteIncomeDatasWithin(String beginym, String endym) throws Exception {
        incomeDataRepository.deleteIncomeDatas(beginym, endym);
    }

    public List<String> importIncomeDatas(MultipartFile csvFile) throws Exception {
        String line = null;
        Long nowRow = 0L;
        List<IncomeData> incomedatas = new ArrayList<IncomeData>();
        List<String> errList = new ArrayList<String>();

        InputStream stream = csvFile.getInputStream();
        Reader reader = new InputStreamReader(stream);
        BufferedReader br = new BufferedReader(reader);

        while ((line = br.readLine()) != null) {

            nowRow++;
            final String[] columns = line.split(Const.commma);

            if (ImportFileCheck.fileIsNormal(columns)) {

                // 正常行の場合
                IncomeData incomedata = new IncomeData();
                Date currentDate = new Date();
                SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");

                incomedata.setDate(format.parse(columns[dateIndex].replaceAll("[-/]", "")));
                incomedata.setContent(columns[contentIndex]);
                incomedata.setAmount(Integer.parseInt(columns[amountIndex]));
                incomedata.setLitem(columns[litemIndex]);
                incomedata.setMitem(columns[mitemIndex]);
                incomedata.setCreated_at(currentDate);
                incomedata.setUpdated_at(currentDate);

                // リストに追加
                incomedatas.add(incomedata);

            } else {

                // エラー行番号をリストに追加
                errList.add(nowRow.toString());

            }
        }
        // 正常レコードが1行以上存在する場合insert
        if (incomedatas.size() > 0) {
            incomeDataRepository.saveAll(incomedatas);
        }

        return errList;
    }
}
