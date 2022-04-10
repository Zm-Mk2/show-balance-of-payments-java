package com.example.api.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.example.api.dto.IncomeDataSummary;
import com.example.api.entity.IncomeData;

@Repository
public interface IncomeDataRepository extends CrudRepository<IncomeData, Long> {

    public static final String WITHIN_PERIOD_CONDITIONS = "to_char(date, 'yyyy-mm-dd') > :beginym and to_char(date, 'yyyy-mm-dd') < :endym";

    public static final String SELECT_WITHIN_PERIDO_QUERY = "select to_char(date, 'yyyy/mm') as yearmonth, sum(amount) as amounts, litem " 
                                                          + "from incomedatas where " + WITHIN_PERIOD_CONDITIONS
                                                          + " group by yearmonth, litem order by yearmonth, amounts, litem";

    @Query(value = SELECT_WITHIN_PERIDO_QUERY, nativeQuery = true)
    List<IncomeDataSummary> findIncomeDatas(@Param("beginym") String beginym, @Param("endym") String endym) throws Exception;
    

    public static final String DELETE_WITHIN_PERIOD_QUERY = "delete from incomedatas where " + WITHIN_PERIOD_CONDITIONS;

    @Query(value = DELETE_WITHIN_PERIOD_QUERY, nativeQuery = true)
    @Modifying
    void deleteIncomeDatas(@Param("beginym") String beginym, @Param("endym") String endym) throws Exception;

}