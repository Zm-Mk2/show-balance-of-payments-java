import 'react-datepicker/dist/react-datepicker.css'
import React from "react";
import ReactDatePicker from "react-datepicker";
import { Control, Controller, Path } from 'react-hook-form'

type Props<T> = {
    label: string
    name: Path<T>
    error?: string
    control: Control<T>
    anotherdate: Date
}

const ymRangeErrorMessage: string = "開始 < 終了の期間を設定してください"

export const DatePicker = <T,>({
    label,
    name,
    control,
    error,
    anotherdate
}: Props<T>) => {
    return (
        <>
            <label htmlFor={name}>
                {label}
            </label>
            <div>
                <Controller
                    control={control}
                    name={name}
                    rules={{ required: '年月を選択してください', 
                             validate: {
                                message: (value) => (
                                    name === "beginYm" 
                                        // 開始年月のvalidate
                                        ? value < anotherdate ? true : ymRangeErrorMessage 
                                        // 終了年月のvalidate
                                        : value > anotherdate ? true : ymRangeErrorMessage)}
                          }}
                    render={({ field: { onChange, value } }) => (
                        <ReactDatePicker
                            dateFormat="yyyy/MM"
                            onChange={onChange}
                            selected={value as Date}
                            showMonthYearPicker
                        />
                    )}
                />
                <small>{error}</small>
            </div>
            {/*console.log(`contents=${label},${name},${error},${anotherdate}`)*/}
        </>
    )
}