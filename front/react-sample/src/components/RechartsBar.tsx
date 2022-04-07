import { BarChart, XAxis, CartesianGrid, Tooltip, Legend, YAxis, Bar } from 'recharts';
import { IncomeData, Datas } from '../Tyeps';

type associativeArray = {
    [index: string]: string | number
}

type litemBarList = {
    litem: string
    amountdivison: string
}

type ColorDic = {
    [index: string]: string
}

const fillColor: ColorDic = {
    "食費": "#8884d8",
    "日用品費": "#82ca9d",
    "交際費":  "#cd5c5c",
    "収入": "#669999"
}

const positiveConst: string = "Positive"
const negativeConst: string = "Negative"

export const RechartsBar = ({ datas }: Datas) => {

    const setBalanceInfo = (datas: IncomeData[]) => {
        const dateGroupList: associativeArray[] = []
        //連想配列{'yearMonth': 年月, '${大項目名}'：金額}を返す
        //console.log("start")
        datas.map((data) => {
            const foundIndex: number = dateGroupList.findIndex(({yearmonth}) => (yearmonth === data.yearmonth))
            if (foundIndex > -1) {
                dateGroupList[foundIndex][data.litem] = Math.abs(data.amounts) // 絶対値
            } else {
                dateGroupList.push({'yearmonth': data.yearmonth, [data.litem]: Math.abs(data.amounts)}) // 絶対値
            }   
        })
        //console.log("end")
        return dateGroupList
    }

    function getLitemBarList (datas: IncomeData[]) {
        // forEachの場合、rechartsコンポーネントの
        // 設定に失敗するためリストに再格納する
        let litemBarList: litemBarList[] = []
        // 正負を判定し金額区分を持つリストの作成
        datas.map(function(data) {
            let amountdivision = data.amounts < 0 ? negativeConst : positiveConst
            litemBarList.push({'litem': data.litem, 'amountdivison': amountdivision})
        })
        // 重複行削除
        const distinctionLitemBarList = litemBarList.filter((element, index, self) =>
                                            self.findIndex(list => 
                                                list.litem === element.litem &&
                                                list.amountdivison === element.amountdivison) === index)
        return distinctionLitemBarList
    }


    return (
        <div>
            <BarChart
                width={700}
                height={500}
                data={setBalanceInfo(datas)}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="yearmonth" />
                <YAxis />
                <Tooltip />
                <Legend />
                {getLitemBarList(datas).map((litemBarList) => {
                    return (
                        <Bar
                            dataKey={litemBarList.litem}
                            stackId={litemBarList.amountdivison}
                            fill={fillColor[litemBarList.litem]}
                        />
                    )
                })}
            </BarChart>
        </div>
    )
}