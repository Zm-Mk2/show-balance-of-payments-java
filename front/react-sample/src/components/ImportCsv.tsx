import React, { useState, useRef } from 'react'
import { appendErrors, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { AxiosError, AxiosResponse } from 'axios'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { isObjectLiteralElement, setTokenSourceMapRange } from 'typescript';
import { SSL_OP_EPHEMERAL_RSA } from 'constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loading } from './Loading';
import styled from 'styled-components';

const ImportBar = styled.nav`
  display: flex;
  justify-content: start;
  padding-left: 15px;
`
const Title = styled.div`
  text-align: left;
  padding-left: 10px;
`

const ErrMsg = styled.div`
  text-align: left;
  padding-left: 20px;
`

const Button = styled.button`
  color: #000000;
  background: #ffffff;
  border: 1px solid #c0c0c0;
  border-radius: 5px;
  cursor: pointer;
`

const ImportCsv = () => {

    const [isLoading, setIsLoading] = useState<Boolean>(false)
    const importFile = useRef<HTMLInputElement | null>(null)

    const axiosBase = require('axios')
    const axios = axiosBase.create({
        baseURL: process.env.REACT_APP_DEV_API_URL,
        hedaers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    const schema = yup.object().shape({
        csvfile: yup.mixed()
        .test('required', "csvファイルの選択は必須です", (value) => {
            return value && value.length
        })
        .test('type', "csvファイルのみ対応しています", (value) => {
            return value && value[0] && value[0].type === "text/csv"
        })
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const { ref, ...rest } = register('csvfile')

    const onSubmit: SubmitHandler<any> = () => {
        //console.log(importFile.current!.files![0])
        const form = new FormData()
        form.append('file', importFile.current!.files![0])
        setIsLoading(true)
        axios.post('/incomedatas/import', form)
        .then((resp: AxiosResponse) => {
            console.log(resp.data)
            if (resp.data.length > 0) {
                toast.warning(`内容に誤りがあるため以下行番号は登録できませんでした${resp.data.toString()}`)
            } else {
                toast.success('インポートが完了しました')
            }
            setIsLoading(false)
        })
        .catch((e: AxiosError) => {
            console.log(e)
            setIsLoading(false)
        })
    }

  return (
    <>
        <ToastContainer 
            position='top-center'
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
        />
        
        <Title>収支データ登録</Title>
        <ImportBar>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/*<input id="csvfile" {...register('csvfile')} type="file" ref={importFile}/>*/}
                {/*↑registerでrefを使用しているため動作しない ↓ref共有方法 */}
                <input {...rest} id="csvfile" type="file" ref={(inputRef) => {
                    ref(inputRef)
                    importFile.current = inputRef
                }}/>

                <Button>インポート</Button>
            </form>
            {isLoading && (
                <Loading />
            )}
        </ImportBar>
        {errors.csvfile && <ErrMsg><small>{errors.csvfile.message}</small></ErrMsg>}
    </>
  )
}

export default ImportCsv