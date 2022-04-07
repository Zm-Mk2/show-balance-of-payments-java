import React, { useState } from 'react';
import styled from 'styled-components';
import { RechartsBar } from './components/RechartsBar'
import { Controller, useForm } from 'react-hook-form';
import { DatePicker } from './components/DatePicker';
import { AxiosError, AxiosResponse } from 'axios';
import { IncomeData } from './Tyeps';
import ImportCsv from './components/ImportCsv';

const Navbar = styled.nav`
  background: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: start;
  margin-bottom: 5vh;
`
const Button = styled.button`
  color: #000000;
  background: #ffffff;
  border: 1px solid #c0c0c0;
  border-radius: 5px;
  cursor: pointer;
  flex-shrink: 0;
`
const Chartbar = styled.nav`
  margin-top: 10vh;
`

type targetYm = {
    beginym: string
    endym:string
}

const initialIncomeData: IncomeData[] = [
    { yearmonth: '2021/04', amounts: -500, litem: '食費'},
    { yearmonth: '2021/05', amounts: -200, litem: '食費'},
    { yearmonth: '2021/06', amounts: -200, litem: '食費'},
    { yearmonth: '2021/07', amounts: -300, litem: '食費'},
    { yearmonth: '2021/08', amounts: -400, litem: '食費'},
    { yearmonth: '2021/04', amounts: -300, litem: '日用品費'},
    { yearmonth: '2021/05', amounts: -800, litem: '日用品費'},
    { yearmonth: '2021/06', amounts: -300, litem: '日用品費'},
    { yearmonth: '2021/07', amounts: -300, litem: '日用品費'},
    { yearmonth: '2021/07', amounts: -400, litem: '日用品費'},
    { yearmonth: '2021/08', amounts: -300, litem: '日用品費'},
    { yearmonth: '2021/07', amounts: -200, litem: '交際費'},
    { yearmonth: '2021/08', amounts: -235, litem: '交際費'},
    { yearmonth: '2021/04', amounts: 1654, litem: '収入'},
    { yearmonth: '2021/05', amounts: 1802, litem: '収入'},
    { yearmonth: '2021/06', amounts: 1903, litem: '収入'},
    { yearmonth: '2021/07', amounts: 1401, litem: '収入'},
    { yearmonth: '2021/08', amounts: 2105, litem: '収入'}
]

type FormValues = {
    beginYm: Date;
    endYm: Date;
}

export const Main = () => {

    const [datas, setDatas] = useState<IncomeData[]>(initialIncomeData)

    const axiosBase = require('axios')
    const axios = axiosBase.create({
        baseURL: process.env.REACT_APP_DEV_API_URL,
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-with': 'XMLHttpRequest'
        },
        ResponseType: 'json'
    })

    function thisYearMonthFirstDay () {
        let ymd = new Date()
        ymd.setDate(1)
        return ymd
    }

    function thisYearNextMonthFirstDay () {
        let ymd = new Date()
        ymd.setMonth(ymd.getMonth() + 1)
        ymd.setDate(1)
        return ymd
    }

    const { handleSubmit, control, formState: { errors }, getValues } = useForm<FormValues>(
        {defaultValues: {beginYm: thisYearMonthFirstDay(),
                         endYm: thisYearNextMonthFirstDay()}});

    function getTargetPeriod (data: FormValues) {
        let targetPeriod: targetYm
        targetPeriod = {beginym: data.beginYm.toISOString().slice(0, 10), 
            endym: data.endYm.toISOString().slice(0, 10)}
        return targetPeriod
    }
    
    function selectIncomeDatas (data: FormValues) {
        axios.get('/incomedatas', {params: getTargetPeriod(data)})
        .then((resp: AxiosResponse) => {
            console.log(resp.data)
            setDatas(resp.data)
        })
        .catch((e: AxiosError) => {
            console.log(e)
        })
    }

    const onSubmitSelect = ((data: FormValues) => {
        //console.log(`done:submit=${data.beginYm.toISOString().slice(0, 10)},${data.endYm.toISOString().slice(0, 10)}`)
        selectIncomeDatas(data)
    })

    const onSubmitDelete = ((data: FormValues) => {
        const sure: boolean = window.confirm("削除しますか?")
        if (sure) {
            axios.delete(`incomedatas/destroy_all`, {params: getTargetPeriod(data)})
            .then(() => {
                selectIncomeDatas(data)
            })
            .catch((e: AxiosError) => {
                console.log(e)
            })
        }
    })

    return (
        <div>
            <form>
                <Navbar>
                    <DatePicker
                        label="開始年月"
                        name="beginYm"
                        control={control}
                        error={errors.beginYm?.message}
                        anotherdate={getValues("endYm")}
                    />
                    <DatePicker
                        label="終了年月"
                        name="endYm"
                        control={control}
                        error={errors.endYm?.message}
                        anotherdate={getValues("beginYm")}
                    />
                    <Button onClick={handleSubmit(onSubmitSelect)}>取得</Button>
                    <Button onClick={handleSubmit(onSubmitDelete)}>削除</Button>
                </Navbar>
            </form>
            <ImportCsv />
            <Chartbar>
                <RechartsBar
                    datas={datas}
                />
            </Chartbar>
        </div>
    )
}

export default Main;