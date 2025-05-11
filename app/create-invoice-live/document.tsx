'use client'

import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import {useState} from 'react'
import {Input} from "@/components/ui/input"

const styles = StyleSheet.create({
    page: { padding: 60 },
    section: { marginBottom: 0 },
    label: { fontSize: 11, fontWeight: 'bold' },
    valueBox: {
      // border: '1pt solid #000',
      padding: 1,
      fontSize:9,
      // minHeight: 20,
      marginTop: 2,
    },
  });

type ContactData = {
  address?:string,
  contactPerson?:string,
  company?:string,
  street?:string,
  houseNumber?:number,
  houseNumberTxt:string,
  zipCode?:number,
  zipCodeTxt?:string,
  place?:string,
  tel?:string,
  email?:string,
}
type InvoiceData={
  date?:string,
  id?:number,
  idTxt?:string,
  dateNote?:string
}
type InvoiceMessage={
  salutation?:string,
  firstSection?:string,
  secondSection?:string,
  thirdSection?:string,
  closing?:string,
  signOff?:string
}
type CompanyInfo={
  bank?:{
    name?:string,
    iban?:string,
    bic?:string,
    accountHolder?:string
  },
  vat?:{
    idTxt?:string,
    commercialRegister?:string,
    commercialRegisterID?:string,
    localCourt?:string,
    managingDirector?:string,
    website?:string
  }
}
type RowData = {
  position?:number,
  quantity?:number,
  unit?:string|null,
  description?:string,
  price?:number,
  priceTxt?:string,
  totalPrice?:number,
  totalPriceTxt?:string,
  currency?:string,
}
type Price = {
  text?:string,
  value?:number
}
type Prices = {
  vat?:Price
  net?:Price
  total?:Price
}
type Form = {
  sender?:ContactData
  reciever?:ContactData
  invoice?:InvoiceData
  invoiceMessage?:InvoiceMessage
  company?:CompanyInfo
  rows?:RowData[]
  price?:Prices
}
function MyDocument({
    form,
  }: {
    form?:Form
  }){
    const [txtValue, setTxtValue] = useState<string>("")

    const handleTextChange = (e:any) =>{
        setTxtValue(e.target.value)
    } 
    const changeItemUiDescription = (e:React.ChangeEvent<HTMLInputElement>) =>{
            setTxtValue(p=>e.target.value)
    }

  const obj = {
    commaSpace:", "
  }
  return (

  <Document>
    <Page size="A4" style={{ padding: 30, fontSize: "11pt" }}>
      <View style={{display:"flex", flexDirection: "column",gap:"2px" ,marginBottom: 10 }}>
        {/* <Image src={form.icon} style={{ width: 40, height: 40 }} /> */}
        <View style={{display:"flex", flexDirection:"column", width:"300px", gap:"2px"}}>
          <Text style={{fontSize:"9pt", color:"#999999"}}>{form?.reciever?.address}</Text>
          <Text style={{fontSize:"11pt"}}>{form?.reciever?.company}</Text>
        </View>
        <View style={{display:"flex", flexDirection:"row", width:"300px", gap:"2px"}}>
          <Text style={{fontSize:"11pt"}}>{form?.reciever?.street}{obj.commaSpace}</Text>
          <Text style={{fontSize:"11pt"}}>{form?.reciever?.houseNumber}</Text>
        </View>
        <View style={{display:"flex", flexDirection:"row", width:"300px", gap:"2px"}}>
          <Text style={{fontSize:"11pt"}}>{form?.reciever?.zipCodeTxt}{obj.commaSpace}</Text>
          <Text style={{fontSize:"11pt"}}>{form?.reciever?.place}</Text>
        </View>
      </View>

      <View style={{display:"flex", flexDirection:"column", width:"100%", justifyContent:"flex-end", alignItems:"flex-end"}}>
        <View style={{display:"flex", flexDirection:"row", gap:"2px", textAlign:"right"}}>
          <Text style={{fontSize:"11pt"}}>{form?.sender?.company}</Text>
        </View>
        <View style={{display:"flex", flexDirection:"row", gap:"2px", textAlign:"right"}}>
          <Text style={{fontSize:"11pt"}}>{form?.sender?.street}{obj.commaSpace}</Text>
          <Text style={{fontSize:"11pt"}}>{form?.sender?.houseNumber}</Text>
        </View>
        <View style={{display:"flex", flexDirection:"row", gap:"2px", textAlign:"right"}}>
          <Text style={{fontSize:"11pt"}}>{form?.sender?.zipCodeTxt}{obj.commaSpace}</Text>
          <Text style={{fontSize:"11pt"}}>{form?.sender?.place}</Text>
        </View>
      </View>

  
      {/* <View style={{ marginTop: 20 }}>
        {form?.rows?.map((r: any, i: number) => (
          <View key={i} style={{ flexDirection: "row", borderBottom: 1 }}>
            {r.map((cell: string, j: number) => (
              <Text key={j} style={{ flex: 1 }}>{cell}</Text>
            ))}
          </View>
        ))}
      </View> */}
    </Page>
  </Document>
  )
}

export default MyDocument;