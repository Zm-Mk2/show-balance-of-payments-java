package com.example.api.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.Data;
import java.util.Date;

@Entity
@Table(name = "incomedatas")
@Data
public class IncomeData {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Temporal(TemporalType.DATE)
  @Column(nullable = false)
  private Date date;

  private String content;

  @Column(nullable = false)
  private int amount;

  @Column(nullable = false)
  private String litem;
  private String mitem;
  
  @Temporal(TemporalType.TIMESTAMP)
  private Date created_at;
  
  @Temporal(TemporalType.TIMESTAMP)
  private Date updated_at;

}