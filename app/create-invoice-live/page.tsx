'use client'


import MyDocument from '@/app/create-invoice-live/document'
import { pdf } from "@react-pdf/renderer"
import React, { useState } from 'react'
import Image from 'next/image'
import Logo from '@/public/Assets/logo.png'
import { Input } from "@/components/ui/input"
import { ComboboxPopover } from "@/components/ui/combobox"
import { DatePickerWithPresets } from "@/components/ui/datePicker"
import { Button } from "@/components/ui/button"
import { IoRemoveSharp as RemoveIcon } from "react-icons/io5";
import { IoIosAdd as AddIcon } from "react-icons/io";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableEmptyRow,
    TablePriceRow
  } from "@/components/ui/table"


type Tobj = {
  comboboxPlaceholder:string,

  selectRecieverHeaderTxt:string,
  recieverLabel:string,
  reciever2Label:string,
  recieverStreetLabel:string,
  recieverStreetPlaceholder:string,
  recieverCityLabel:string,
  recieverCityPlaceholder:string,
  recieverContactPersonLabel:string,
  recieverContactPersonPlaceholder:string,
  
  selectSenderHeaderTxt:string,
  senderLabel:string,
  sender2Label:string,
  senderStreetLabel:string,
  senderStreetPlaceholder:string,
  senderCityLabel:string,
  senderCityPlaceholder:string,
  senderContactPersonLabel:string,
  senderContactPersonPlaceholder:string,
  
  selectInvoiceHeaderTxt:string,
  invoiceDateLabel:string,
  invoiceDate2Label:string,
  invoiceDate:string,
  invoiceIDlabel:string,
  invoiceID:string,
  invoiceDateNote:string,

  invoiceHeader:string,
  invoiceMessage:{
    salutation:string,
    firstSection:string,
    secondSection:string,
    thirdSection:string,
    closing:string,
    signOff:string
  }

  selectItemHeaderTxt:string,
  itemPositionLabel:string,
  itemQuantityLabel:string,
  itemUnitLabel:string,
  itemDescriptionLabel:string,
  itemPriceLabel:string,
  itemTotalPriceLabel:string,
  addNewItemLabel:string,
  itemCurrencyLabel:string,

  
  tableCaptionLabel:string,
  tableHeadPositionLabel:string,
  tableHeadQuantityLabel:string,
  tableHeadUnitLabel:string,
  tableHeadDescriptionLabel:string,
  tableHeadPriceLabel:string,
  tableHeadTotalPriceLabel:string,
  tableHeadRemoveLabel:string,
  tableRowNetPriceLabel:string,
  tableRowVATlabel:string,
  tableRowTotalPriceLabel:string,


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
type Price = {
  text?:string,
  value?:number
}
type Prices = {
  vat?:Price
  net?:Price
  total?:Price
}
type ComboboxValues = {
  label:string
  value:string
}
function page() {
  const [itemUiTotalPrice, setItemUiTotalPrice] = useState<Price>({text:"0", value:0})
  const [itemUi, setItemUi] = useState<RowData>({
    position:0,
    quantity:0,
    unit:"",
    description:"",
    price:0,
    totalPrice:0,
    totalPriceTxt:"0",
    priceTxt:"0",
    currency:"€"
  })
  const [price, setPrice] = useState<Prices>({
    net:{text:"0", value:0},
    vat:{text:"19", value:19},
    total:{text:"", value:0}
  })
  const [rows, setRows] = useState<RowData[]>([])
  const [companyInfoUi, setCompanyInfoUi] = useState<CompanyInfo>({
    bank:{
      name:"Commerzbank",
      iban:"DE24328567",
      bic:"COBADEFFXKXX",
      accountHolder:"Max Mustermann"
    },
    vat:{
      idTxt:"DE2432567",
      commercialRegister:"HRB",
      commercialRegisterID:"12345678",
      localCourt:"München",
      managingDirector:"Max Mustermann",
      website:"www.musterwebseite.de"
    }
  })
  const [invoiceMessageUi, setInvoiceMessageUi] = useState<InvoiceMessage>({
    salutation:"Sehr geehrter Herr Schmidt",
    firstSection:"vielen Dank, für Ihren Auftrag. Vereinbarungsgemäß berechnen wir Ihnen hiermit folgende Leistungen:",
    secondSection:"Bitte überwiesen Sie den Rechnungsbetrag innerhalb von 14 Tagen auf unser unten genanntes Konto.",
    thirdSection:"Für weitere Fragen stehen wir Ihnen sehr gerne zur Verfügung.",
    closing:"Mit freundlichen Grüßen,",
    signOff:"Max Mustermann"
  })
  const [invoiceUi, setInvoiceUi] = useState<InvoiceData>({
    date:"01.01.2000",
    id:0,
    idTxt:"2109-15",
    dateNote:"Rechnungsdatum entspricht Liefer-/Leistungsdatum"
  })
  const [recieverUi, setRecieverUi] = useState<ContactData>({
    address:"initial",
    contactPerson:"Herr Mustermann",
    company:"Bambi Frischkäse",
    street:"Musterstraße",
    houseNumber:1,
    houseNumberTxt:"1",
    zipCode:123456,
    zipCodeTxt:"123456",
    place:"Wangenhausen, DE",
  })
  const [senderUi, setSenderUi] = useState<ContactData>({
    address:"initial",
    contactPerson:"Frau Mustermann",
    company:"Musterkäse AG",
    street:"Musterstraße",
    houseNumber:2,
    houseNumberTxt:"2",
    zipCode:654321,
    zipCodeTxt:"654321",
    place:"Schönehausen, DE",
    tel:"0123456789",
    email:"max.mustermann@muster.de"
  })


  const changeRecieverUiAddress = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setRecieverUi({...recieverUi, address: e.target.value})
  }
  const changeRecieverUiCompany = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setRecieverUi({...recieverUi, company: e.target.value})
  }
  const changeRecieverUiStreet = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setRecieverUi({...recieverUi, street: e.target.value})
  }
  const changeRecieverUiHouseNumber = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const nr = Number(e.target.value)
    setRecieverUi({...recieverUi, houseNumber: nr, houseNumberTxt:e.target.value})
  }
  const changeRecieverUiZipCode = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const nr = Number(e.target.value)
    setRecieverUi({...recieverUi, zipCode:nr, zipCodeTxt: e.target.value})
  }
  const changeRecieverUiPlace = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setRecieverUi({...recieverUi, place: e.target.value})
  }
  const changeSenderUiCompany = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setSenderUi({...senderUi, company:e.target.value })
  }
  const changeSenderUiStreet = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setSenderUi({...senderUi, street:e.target.value })
  }
  const changeSenderUiHouseNumber = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const nr = Number(e.target.value)
    setSenderUi({...senderUi, houseNumber:nr, houseNumberTxt:e.target.value})
  }
  const changeSenderUiZipCode = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const nr = Number(e.target.value)
    setSenderUi({...senderUi, zipCode:nr, zipCodeTxt:e.target.value})
  }
  const changeSenderUiPlace = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setSenderUi({...senderUi, place:e.target.value })
  }
  const changeSenderUiTel = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setSenderUi({...senderUi, tel:e.target.value})
  }
  const changeSenderUiEmail = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setSenderUi({...senderUi, email:e.target.value})
  }
  const changeInvoiceUiDate = (val:string) =>{
    setInvoiceUi({...invoiceUi, date:val})
  }
  const changeInvoiceUiID = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setInvoiceUi({...invoiceUi, idTxt:e.target.value})
  }
  const changeInvoiceUiDateNote = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setInvoiceUi({...invoiceUi, dateNote:e.target.value})
  }
  const changeInvoiceMessageUiSalutation = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setInvoiceMessageUi({...invoiceMessageUi, salutation:e.target.value})
  }
  const changeInvoiceMessageUiFirstSection = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setInvoiceMessageUi({...invoiceMessageUi, firstSection:e.target.value})
  }
  const changeInvoiceMessageUiSecondSection = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setInvoiceMessageUi({...invoiceMessageUi, secondSection:e.target.value})
  }
  const changeInvoiceMessageUiThirdSection = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setInvoiceMessageUi({...invoiceMessageUi, thirdSection:e.target.value})
  }
  const changeInvoiceMessageUiClosing = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setInvoiceMessageUi({...invoiceMessageUi, closing:e.target.value})
  }
  const changeInvoiceMessageUiSignOff = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setInvoiceMessageUi({...invoiceMessageUi, signOff:e.target.value})
  }
  const changeCompanyInfoUiBankName = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setCompanyInfoUi((prev) =>({...prev, bank:{...prev.bank,name:e.target.value}}))
  }
  const changeCompanyInfoUiBankIban = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setCompanyInfoUi((prev) =>({...prev, bank:{...prev.bank,iban:e.target.value}}))
  }
  const changeCompanyInfoUiBankBic = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setCompanyInfoUi((prev) =>({...prev, bank:{...prev.bank,bic:e.target.value}}))
  }
  const changeCompanyInfoUiBankAccountHolder = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setCompanyInfoUi((prev) =>({...prev, bank:{...prev.bank,accountHolder:e.target.value}}))
  }
  const changeCompanyInfoUiVatIdTxt = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setCompanyInfoUi((prev) =>({...prev, vat:{...prev.vat,idTxt:e.target.value}}))
  }
  const changeCompanyInfoUiVatCommercialRegister = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setCompanyInfoUi((prev) =>({...prev, vat:{...prev.vat,commercialRegister:e.target.value}}))
  }
  const changeCompanyInfoUiVatCommercialRegisterID = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setCompanyInfoUi((prev) =>({...prev, vat:{...prev.vat,commercialRegisterID:e.target.value}}))
  }
  const changeCompanyInfoUiVatLocalCourt = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setCompanyInfoUi((prev) =>({...prev, vat:{...prev.vat,localCourt:e.target.value}}))
  }
  const changeCompanyInfoUiVatManagingDirector = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setCompanyInfoUi((prev) =>({...prev, vat:{...prev.vat,managingDirector:e.target.value}}))
  }
  const changeCompanyInfoUiVatWebsite = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setCompanyInfoUi((prev) =>({...prev, vat:{...prev.vat,website:e.target.value}}))
  }
  const changeItemUiPosition = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const nr = Number(e.target.value)
    setItemUi({...itemUi, position:nr})
  }
  const changeItemUiQuantity = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const nr = Number(e.target.value)
    setItemUi({...itemUi, quantity:nr})
  }
  const changeItemUiUnit = (value?:string)=>{
    setItemUi({...itemUi, unit:value})
  }
  const changeItemUiDescription = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setItemUi({...itemUi, description:e.target.value})
  }
  const changeItemUiPrice = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const nr = Number(e.target.value)
    setItemUi({...itemUi, price:nr, priceTxt:e.target.value})
  }
  const changeItemUiCurrency = (value?:string)=>{
    setItemUi({...itemUi, currency:value})
  }
  const changeItemUiTotalPrice = ()=>{
    const nr = calculateItemTotalPrice(itemUi.quantity??0, itemUi?.price??0)
    const str = nr.toString()
    setItemUiTotalPrice({text:str, value:nr})
  }
  const addRow = (newRow:RowData) =>{
    setRows([...rows, newRow])
  }
  const deleteRow = (index:number) =>{
    setRows(rows.filter((_, i)=> i!==index))
  }

  const calculateItemTotalPrice = (x:number,y:number)=>{
    return  x*y
  }
  const calculateVAT = (z:number):number=>{
      const vat = 19
      return z*vat/100
  }
  function formatPrice(value?: number): string {
      let val =  value?.toFixed(2).replace('.', ',') || "0"
      return val
  }
  React.useEffect(()=>{
      if(rows.length == 0){
          let zeroValue:Price = {text:"0", value:0}
          setPrice({net:zeroValue, vat:zeroValue, total:zeroValue })
      }else{
          let netVal:number = 0
          rows.forEach((item,index)=>{netVal += Number(item.totalPrice)})
          let vatVal:number = calculateVAT(netVal) ?? 0
          let totalVal:number = netVal + vatVal
          setPrice({net:{text:formatPrice(netVal), value:netVal}, vat:{text:formatPrice(vatVal), value:vatVal}, total:{text:formatPrice(totalVal), value:totalVal} })
      }
      
      return()=>{
      }

  },[rows])
  return (
    <div className="flex flex-row items-center justify-center">
      <PageUI 
        itemUiTotalPriceValue={itemUiTotalPrice}
        itemUiValue={itemUi}
        priceValue={price}
        rowsValue={rows}
        companyInfoUiValue={companyInfoUi}
        invoiceMessageUiValue={invoiceMessageUi}
        invoiceUiValue={invoiceUi}
        recieverUiValue={recieverUi}
        senderUiValue={senderUi}

        changeRecieverUiAddress={(e)=>{changeRecieverUiAddress(e)}}
        changeRecieverUiCompany={(e)=>{changeRecieverUiCompany(e)}}
        changeRecieverUiStreet={(e)=>{changeRecieverUiStreet(e)}}
        changeRecieverUiHouseNumber={(e)=>{changeRecieverUiHouseNumber(e)}}
        changeRecieverUiZipCode={(e)=>{changeRecieverUiZipCode(e)}}
        changeRecieverUiPlace={(e)=>{changeRecieverUiPlace(e)}}

        changeSenderUiCompany={(e)=>{changeSenderUiCompany(e)}}
        changeSenderUiStreet={(e)=>{changeSenderUiStreet(e)}}
        changeSenderUiHouseNumber={(e)=>{changeSenderUiHouseNumber(e)}}
        changeSenderUiZipCode={(e)=>{changeSenderUiZipCode(e)}}
        changeSenderUiPlace={(e)=>{changeSenderUiPlace(e)}}
        changeSenderUiTel={(e)=>{changeSenderUiTel(e)}}
        changeSenderUiEmail={(e)=>{changeSenderUiEmail(e)}}

        changeInvoiceUiDate={(val)=>{changeInvoiceUiDate(val)}}
        changeInvoiceUiID={(e)=>{changeInvoiceUiID(e)}}
        changeInvoiceUiDateNote={(e)=>{changeInvoiceUiDateNote(e)}}

        changeInvoiceMessageUiSalutation={(e)=>{changeInvoiceMessageUiSalutation(e)}}
        changeInvoiceMessageUiFirstSection={(e)=>{changeInvoiceMessageUiFirstSection(e)}}
        changeInvoiceMessageUiSecondSection={(e)=>{changeInvoiceMessageUiSecondSection(e)}}
        changeInvoiceMessageUiThirdSection={(e)=>{changeInvoiceMessageUiThirdSection(e)}}
        changeInvoiceMessageUiClosing={(e)=>{changeInvoiceMessageUiClosing(e)}}
        changeInvoiceMessageUiSignOff={(e)=>{changeInvoiceMessageUiSignOff(e)}}
        
        changeCompanyInfoUiBankName={(e)=>{changeCompanyInfoUiBankName(e)}}
        changeCompanyInfoUiBankIban={(e)=>{changeCompanyInfoUiBankIban(e)}}
        changeCompanyInfoUiBankBic={(e)=>{changeCompanyInfoUiBankBic(e)}}
        changeCompanyInfoUiBankAccountHolder={(e)=>{changeCompanyInfoUiBankAccountHolder(e)}}
        changeCompanyInfoUiVatIdTxt={(e)=>{changeCompanyInfoUiVatIdTxt(e)}}
        changeCompanyInfoUiVatCommercialRegister={(e)=>{changeCompanyInfoUiVatCommercialRegister(e)}}
        changeCompanyInfoUiVatCommercialRegisterID={(e)=>{changeCompanyInfoUiVatCommercialRegisterID(e)}}
        changeCompanyInfoUiVatLocalCourt={(e)=>{changeCompanyInfoUiVatLocalCourt(e)}}
        changeCompanyInfoUiVatManagingDirector={(e)=>{changeCompanyInfoUiVatManagingDirector(e)}}
        changeCompanyInfoUiVatWebsite={(e)=>{changeCompanyInfoUiVatWebsite(e)}}

        changeItemUiPosition={(e)=>changeItemUiPosition(e)}
        changeItemUiQuantity={(e)=>changeItemUiQuantity(e)}
        changeItemUiDescription={(e)=>changeItemUiDescription(e)}
        changeItemUiUnit={(val)=>changeItemUiUnit(val)}
        changeItemUiPrice={(e)=>changeItemUiPrice(e)}
        changeItemUiCurrency={(e)=>changeItemUiCurrency(e)}
        changeItemUiTotalPrice={()=>changeItemUiTotalPrice()}
        deleteRow={(index:number)=>{deleteRow(index)}}
      />
    </div>
  )
}
type PageUIProps = {
  itemUiTotalPriceValue:Price
  itemUiValue:RowData
  priceValue:Prices
  rowsValue:RowData[]
  companyInfoUiValue:CompanyInfo
  invoiceMessageUiValue:InvoiceMessage
  invoiceUiValue:InvoiceData
  recieverUiValue:ContactData
  senderUiValue:ContactData
  changeRecieverUiAddress:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeRecieverUiCompany:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeRecieverUiStreet:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeRecieverUiHouseNumber:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeRecieverUiZipCode:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeRecieverUiPlace:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeSenderUiCompany:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeSenderUiStreet:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeSenderUiHouseNumber:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeSenderUiZipCode:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeSenderUiPlace:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeSenderUiTel:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeSenderUiEmail:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeInvoiceUiDate:(val:string)=>void
  changeInvoiceUiID:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeInvoiceUiDateNote:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeInvoiceMessageUiSalutation:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeInvoiceMessageUiFirstSection:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeInvoiceMessageUiSecondSection:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeInvoiceMessageUiThirdSection:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeInvoiceMessageUiClosing:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeInvoiceMessageUiSignOff:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeCompanyInfoUiBankName:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeCompanyInfoUiBankIban:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeCompanyInfoUiBankBic:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeCompanyInfoUiBankAccountHolder:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeCompanyInfoUiVatIdTxt:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeCompanyInfoUiVatCommercialRegister:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeCompanyInfoUiVatCommercialRegisterID:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeCompanyInfoUiVatLocalCourt:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeCompanyInfoUiVatManagingDirector:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeCompanyInfoUiVatWebsite:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeItemUiPosition:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeItemUiQuantity:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeItemUiDescription:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeItemUiUnit:(val:string)=>void
  changeItemUiPrice:(e:React.ChangeEvent<HTMLInputElement>)=>void
  changeItemUiCurrency:(val:string)=>void
  changeItemUiTotalPrice:()=>void
  deleteRow:(index:number)=>void
} 
function PageUI({
  itemUiTotalPriceValue,
  itemUiValue,
  priceValue,
  rowsValue,
  companyInfoUiValue,
  invoiceMessageUiValue,
  invoiceUiValue,
  recieverUiValue, 
  senderUiValue,

  changeRecieverUiAddress,
  changeRecieverUiCompany,
  changeRecieverUiStreet,
  changeRecieverUiHouseNumber,
  changeRecieverUiZipCode,
  changeRecieverUiPlace,

  changeSenderUiCompany,
  changeSenderUiStreet,
  changeSenderUiHouseNumber,
  changeSenderUiZipCode,
  changeSenderUiPlace,
  changeSenderUiTel,
  changeSenderUiEmail,

  changeInvoiceUiDate,
  changeInvoiceUiID,
  changeInvoiceUiDateNote,
  changeInvoiceMessageUiSalutation,
  changeInvoiceMessageUiFirstSection,
  changeInvoiceMessageUiSecondSection,
  changeInvoiceMessageUiThirdSection,
  changeInvoiceMessageUiClosing,
  changeInvoiceMessageUiSignOff,

  changeCompanyInfoUiBankName,
  changeCompanyInfoUiBankIban,
  changeCompanyInfoUiBankBic,
  changeCompanyInfoUiBankAccountHolder,
  changeCompanyInfoUiVatIdTxt,
  changeCompanyInfoUiVatCommercialRegister,
  changeCompanyInfoUiVatCommercialRegisterID,
  changeCompanyInfoUiVatLocalCourt,
  changeCompanyInfoUiVatManagingDirector,
  changeCompanyInfoUiVatWebsite,

  changeItemUiPosition,
  changeItemUiQuantity,
  changeItemUiDescription,
  changeItemUiUnit,
  changeItemUiPrice,
  changeItemUiCurrency,
  changeItemUiTotalPrice,

  deleteRow,
}:PageUIProps){

  const units:ComboboxValues[] = [
    { label:"Meter", value:"m" },
    { label:"Kilogramm", value:"kg" },
    { label:"Stunde", value:"h" },
    { label:"Stück", value:"Stück" }
  ]
  const currencies:ComboboxValues[] = [
    { label:"€", value:"€" },
    { label:"$", value:"$" },
    { label:"¥", value:"¥" },
    { label:"£", value:"£" }
  ]
  const obj:Tobj = {
    comboboxPlaceholder:"Auswählen",

    selectRecieverHeaderTxt:  "Kunden Info",
    recieverLabel: "Kunde",
    reciever2Label: "Auswählen",
    recieverStreetLabel:"Straße, Hausnummer",
    recieverStreetPlaceholder:"Empfänger Straße, Empfänger Hausnummer",
    recieverCityLabel:"PLZ, Ort",
    recieverCityPlaceholder:"Empfänger PLZ, Empfänger Ort",
    recieverContactPersonLabel:"Ansprechpartner",
    recieverContactPersonPlaceholder:"Empfänger Ansprechpartner",

    selectSenderHeaderTxt: "Verkäufer Info",
    senderLabel:"Verkäufer",
    sender2Label:"Auswählen",
    senderStreetLabel:"Straße, Hausnummer",
    senderStreetPlaceholder:"Z.B. Musterstraße, 5",
    senderCityLabel:"PLZ, Ort",
    senderCityPlaceholder:"Z.B. 000000, Musterstadt",
    senderContactPersonLabel:"Ansprechpartner",
    senderContactPersonPlaceholder:"Z.B. Frau Mustermann",

    selectInvoiceHeaderTxt:"Rechnungsinfo",
    invoiceDateLabel:"Datum Auswählen",
    invoiceDate2Label:"Datum",
    invoiceDate:"01.01.2026",
    invoiceIDlabel:"Rechunungsnummer",
    invoiceID:"2026-001",
    invoiceDateNote:"Rechnungsdatum entspricht Liefer-/Leistungsdatum",

    invoiceHeader:"Rechnung",
    invoiceMessage:{
      salutation:"Sehr geehrter Herr Schmidt,",
      firstSection:"vielen Dank, für Ihren Auftrag. Vereinbarungsgemäß berechnen wir Ihnen hiermit folgende Leistungen:",
      secondSection:"Bitte überwiesen Sie den Rechnungsbetrag innerhalb von 14 Tagen auf unser unten genanntes Konto.",
      thirdSection:"Für weiter Fragen stehen wir Ihnen sehr gerne zur Verfügung.",
      closing:"Mit freundlichen Grüßen,",
      signOff:"Max Mustermann"
    },

    selectItemHeaderTxt:"Artikel Info",
    itemPositionLabel:"Position",
    itemQuantityLabel:"Anzahl",
    itemUnitLabel:"Einheit",
    itemDescriptionLabel:"Bezeichunung",
    itemPriceLabel:"Einzelpreis",
    itemTotalPriceLabel:"Gesamtpreis",
    addNewItemLabel:"Artikel Hinzufügen ➡️",
    itemCurrencyLabel:"€",

    tableCaptionLabel:"Alle von Ihnene hinzugefügten Artikeln.",
    tableHeadPositionLabel:"Position",
    tableHeadQuantityLabel:"Anzahl",
    tableHeadUnitLabel:"Einheit",
    tableHeadDescriptionLabel:"Bezeichunung",
    tableHeadPriceLabel:"Einzelpreis",
    tableHeadTotalPriceLabel:"Gesamtpreis",
    tableHeadRemoveLabel:"⬇️",

    tableRowNetPriceLabel:"Nettopreis",
    tableRowVATlabel:"Zzgl. 19% USt.",
    tableRowTotalPriceLabel:"Rechnungsbetrag"
}
  const A4Size = {
    _100:{w:"595px",h:"842px"},
    _90:{w:"535px", h:"758px"}
  }

  React.useEffect(()=>{
    if(itemUiValue?.quantity === 0 && itemUiValue.price === 0){
    // do something
    }else{
      changeItemUiTotalPrice?.()
    }
  },[itemUiValue])
  return(
    <div className={`w-[535px] h-[758px] border border-black flex flex-col`}>
      {/* Logo Section */}
      <div className="flex flex-row w-[100%] items-center justify-end p-2">
        <Image src={Logo} alt="Logo" />
      </div>
      {/* Reciever Section */}
      <div>
        <div>
          <Input type={"text"} placeholder={recieverUiValue?.address} className={"w-[300px]"} onChange={(e)=>{changeRecieverUiAddress?.(e)}} value={recieverUiValue?.address}/>
        </div>
        <div>
        <Input type={"text"} placeholder={recieverUiValue?.company} className={"w-[300px]"} onChange={(e)=>{changeRecieverUiCompany?.(e)}} value={recieverUiValue?.company}/>
        <Input type={"text"} placeholder={recieverUiValue?.street} className={"w-[300px]"} onChange={(e)=>{changeRecieverUiStreet?.(e)}} value={recieverUiValue?.street}/>
        <Input type={"text"} placeholder={recieverUiValue?.houseNumberTxt} className={"w-[300px]"} onChange={(e)=>{changeRecieverUiHouseNumber?.(e)}} value={recieverUiValue?.houseNumberTxt}/>
        <Input type={"text"} placeholder={recieverUiValue?.zipCodeTxt} className={"w-[300px]"} onChange={(e)=>{changeRecieverUiZipCode?.(e)}} value={recieverUiValue?.zipCodeTxt}/>
        <Input type={"text"} placeholder={recieverUiValue?.place} className={"w-[300px]"} onChange={(e)=>{changeRecieverUiPlace?.(e)}} value={recieverUiValue?.place}/>
        </div>
      </div>
      {/* Sender Section */}
      <div>
      <Input type={"text"} placeholder={senderUiValue?.company} className={"w-[300px]"} onChange={(e)=>{changeSenderUiCompany?.(e)}} value={senderUiValue?.company}/>
      <Input type={"text"} placeholder={senderUiValue?.street} className={"w-[300px]"} onChange={(e)=>{changeSenderUiStreet?.(e)}} value={senderUiValue?.street}/>
      <Input type={"text"} placeholder={senderUiValue?.houseNumberTxt} className={"w-[300px]"} onChange={(e)=>{changeSenderUiHouseNumber?.(e)}} value={senderUiValue?.houseNumberTxt}/>
      <Input type={"text"} placeholder={senderUiValue?.zipCodeTxt} className={"w-[300px]"} onChange={(e)=>{changeSenderUiZipCode?.(e)}} value={senderUiValue?.zipCodeTxt}/>
      <Input type={"text"} placeholder={senderUiValue?.place} className={"w-[300px]"} onChange={(e)=>{changeSenderUiPlace?.(e)}} value={senderUiValue?.place}/>
      </div>
      {/* Invoice Number Section */}
      <div>
        <div>
          <p className="text-[11px]">{obj.invoiceDateLabel}</p>
          <DatePickerWithPresets handler={(val:string)=>{changeInvoiceUiDate(val)}} label={obj.invoiceDateLabel}/>
        </div>
        <div>
          <p className="text-[11px]">{obj.invoiceIDlabel}</p>
          <Input type={"text"} placeholder={obj.invoiceIDlabel} className={"w-[300px]"} onChange={(e)=>{changeInvoiceUiID?.(e)}} value={invoiceUiValue?.idTxt}/>
        </div>
        <div>
          <Input type={"text"} placeholder={obj.invoiceDateNote} className={"w-[300px]"} onChange={(e)=>{changeInvoiceUiDateNote?.(e)}} value={invoiceUiValue?.dateNote}/>
        </div>
      </div>

      {/* Invoice Message First Part Section  */}
      <div>
        <h3>{obj.invoiceHeader}</h3>
        <Input type={"text"} placeholder={obj.invoiceMessage.salutation} className={"w-[300px]"} onChange={(e)=>{changeInvoiceMessageUiSalutation?.(e)}} value={invoiceMessageUiValue?.salutation}/>  
        <Input type={"text"} placeholder={obj.invoiceMessage.firstSection} className={"w-[300px]"} onChange={(e)=>{changeInvoiceMessageUiFirstSection?.(e)}} value={invoiceMessageUiValue?.firstSection}/>
      </div>
      {/* Items Table Section */}
      <div>
      <Table>
        <TableCaption>{obj.tableCaptionLabel}</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="text-center">{obj.tableHeadRemoveLabel}</TableHead>
            <TableHead className="text-center">{obj.tableHeadPositionLabel}</TableHead>
            <TableHead className="text-center">{obj.tableHeadQuantityLabel}</TableHead>
            <TableHead className="text-center">{obj.tableHeadUnitLabel}</TableHead>
            <TableHead >{obj.tableHeadDescriptionLabel}</TableHead>
            <TableHead className="text-center">{obj.tableHeadPriceLabel}</TableHead>
            <TableHead className="text-right pr-12">{obj.tableHeadTotalPriceLabel}</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
                {rowsValue.length !== 0 &&
                    rowsValue.map((row,index)=>(
                        <TableRow key={index}>
                            <TableCell className="text-center">
                                <Button size="icon" className="hover:cursor-pointer" variant="destructive" onClick={()=>deleteRow?.(index)}>
                                    <RemoveIcon/>
                                </Button>
                            </TableCell>
                            <TableCell className="text-center">
                              
                              {/* {row.position} */}
                            </TableCell>
                            <TableCell className="text-center">{row.quantity}</TableCell>
                            <TableCell className="text-center">{row.unit}</TableCell>
                            <TableCell className="max-w-[30%] sm:max-w-[600px] whitespace-pre-wrap overflow-y-auto break-words">
                            {row.description}
                            </TableCell>
                            <TableCell className="text-center">{row.priceTxt} {row?.currency}</TableCell>
                            <TableCell className="text-right pr-12">{row.totalPriceTxt} {row?.currency}</TableCell>
                        </TableRow>
                    ))
                }
                {/* Empty Row, to Fill and Add by User */}
                {
                  <TableRow>
                      <TableCell className="text-center" id="action">
                          <Button size="icon" className="hover:cursor-pointer bg-green-500 hover:bg-green-800 "  >
                              <AddIcon/>
                          </Button>
                      </TableCell>
                      <TableCell className="text-center" id="position">
                        <Input placeholder="text" className="w-[100%] h-[100%] rounded-none" value={itemUiValue?.position} onChange={(e)=>changeItemUiPosition(e)}/>
                      </TableCell>
                      <TableCell className="text-center" id="quantity">
                        <Input placeholder="text" className="w-[100%] h-[100%] rounded-none" value={itemUiValue?.quantity} onChange={(e)=>changeItemUiQuantity(e)}/>
                      </TableCell>
                      <TableCell className="text-center" id="unit">
                        <ComboboxPopover placeholder={obj.itemUnitLabel} className="w-[60px]" handler={(value)=>{changeItemUiUnit(value)}} values={units}  />
                      </TableCell>
                      <TableCell className="max-w-[30%] sm:max-w-[600px] whitespace-pre-wrap overflow-y-auto break-words" id="description">
                        <Input placeholder="text" className="w-[100%] h-[100%] rounded-none" value={itemUiValue?.description} onChange={(e)=>changeItemUiDescription(e)} />
                      </TableCell>
                      <TableCell className="text-center" id="price">
                        <div className="flex flex-row">
                          <Input placeholder="text" className="w-[60%] h-[100%] rounded-none px-1" value={itemUiValue?.priceTxt} onChange={(e)=>changeItemUiPrice(e)}/>
                          <ComboboxPopover placeholder={obj.itemCurrencyLabel} className="w-[60px]" handler={(value)=>{changeItemUiCurrency(value)}} values={currencies}  />
                        </div>
                      </TableCell>
                      <TableCell id="totalPrice">
                        <div className="flex flex-row">
                          <Input placeholder="text" className="w-[60%] h-[100%] rounded-none px-1" value={itemUiTotalPriceValue?.text} onChange={()=>{}} />
                          <ComboboxPopover placeholder={obj.itemCurrencyLabel} className="w-[60px]" handler={(value)=>{changeItemUiCurrency(value)}} values={currencies} />
                        </div>
                      </TableCell>
                  </TableRow> 
                }
                {/* <TableEmptyRow/> */}
                <TableEmptyRow/>

                <TablePriceRow txt={obj.tableRowNetPriceLabel} val={priceValue?.net?.text} className="border-b"/>
                <TablePriceRow txt={obj.tableRowVATlabel} val={priceValue?.vat?.text}/>
                <TablePriceRow txt={obj.tableRowTotalPriceLabel} val={priceValue?.total?.text} total={true}/>
          </TableBody>
      </Table>
      </div>
      {/* Invoice Message Second Part Section */}
      <div>
        <Input type={"text"} placeholder={obj.invoiceMessage.secondSection} className={"w-[300px]"} onChange={(e)=>{changeInvoiceMessageUiSecondSection?.(e)}} value={invoiceMessageUiValue?.secondSection}/>  
        <Input type={"text"} placeholder={obj.invoiceMessage.thirdSection} className={"w-[300px]"} onChange={(e)=>{changeInvoiceMessageUiThirdSection?.(e)}} value={invoiceMessageUiValue?.thirdSection}/>
        <Input type={"text"} placeholder={obj.invoiceMessage.closing} className={"w-[300px]"} onChange={(e)=>{changeInvoiceMessageUiClosing?.(e)}} value={invoiceMessageUiValue?.closing}/>  
        <Input type={"text"} placeholder={obj.invoiceMessage.signOff} className={"w-[300px]"} onChange={(e)=>{changeInvoiceMessageUiSignOff?.(e)}} value={invoiceMessageUiValue?.signOff}/>
      </div>
      {/* Bank Account Details Section */}
      <div className="flex flex-row">
        <div>
        <Input type={"text"} className={"w-[300px]"} onChange={(e)=>{changeSenderUiCompany?.(e)}} value={senderUiValue?.company}/>
        <Input type={"text"} className={"w-[300px]"} onChange={(e)=>{changeSenderUiStreet?.(e)}} value={senderUiValue?.street}/>
        <Input type={"text"} className={"w-[300px]"} onChange={(e)=>{changeSenderUiHouseNumber?.(e)}} value={senderUiValue?.houseNumberTxt}/>
        <Input type={"text"} className={"w-[300px]"} onChange={(e)=>{changeSenderUiZipCode?.(e)}} value={senderUiValue?.zipCodeTxt}/>
        <Input type={"text"} className={"w-[300px]"} onChange={(e)=>{changeSenderUiPlace?.(e)}} value={senderUiValue?.place}/>
        <Input type={"text"} className={"w-[300px]"} onChange={(e)=>{changeSenderUiTel?.(e)}} value={senderUiValue?.tel}/>
        <Input type={"text"} className={"w-[300px]"} onChange={(e)=>{changeSenderUiEmail?.(e)}} value={senderUiValue?.email}/>
        </div>

        <div>
        <Input type={"text"} className={"w-[300px]"} onChange={(e)=>{changeCompanyInfoUiBankName?.(e)}} value={companyInfoUiValue?.bank?.name}/>
        <Input type={"text"} className={"w-[300px]"} onChange={(e)=>{changeCompanyInfoUiBankIban?.(e)}} value={companyInfoUiValue?.bank?.iban}/>
        <Input type={"text"} className={"w-[300px]"} onChange={(e)=>{changeCompanyInfoUiBankBic?.(e)}} value={companyInfoUiValue?.bank?.bic}/>
        <Input type={"text"} className={"w-[300px]"} onChange={(e)=>{changeCompanyInfoUiBankAccountHolder?.(e)}} value={companyInfoUiValue?.bank?.accountHolder}/>
        </div>
        <div>
        <Input type={"text"} className={"w-[300px]"} onChange={(e)=>{changeCompanyInfoUiVatIdTxt?.(e)}} value={companyInfoUiValue?.vat?.idTxt}/>
        <Input type={"text"} className={"w-[300px]"} onChange={(e)=>{changeCompanyInfoUiVatCommercialRegister?.(e)}} value={companyInfoUiValue?.vat?.commercialRegister}/>
        <Input type={"text"} className={"w-[300px]"} onChange={(e)=>{changeCompanyInfoUiVatCommercialRegisterID?.(e)}} value={companyInfoUiValue?.vat?.commercialRegisterID}/>
        <Input type={"text"} className={"w-[300px]"} onChange={(e)=>{changeCompanyInfoUiVatLocalCourt?.(e)}} value={companyInfoUiValue?.vat?.localCourt}/>
        <Input type={"text"} className={"w-[300px]"} onChange={(e)=>{changeCompanyInfoUiVatManagingDirector?.(e)}} value={companyInfoUiValue?.vat?.managingDirector}/>
        <Input type={"text"} className={"w-[300px]"} onChange={(e)=>{changeCompanyInfoUiVatWebsite?.(e)}} value={companyInfoUiValue?.vat?.website}/>

        </div>
      </div>
    </div>
  )
}

export default page

// code to work afterwords with
// const [form, setForm] = useState({ name: "", email: "" });
// // const handleDownload = async () => {
// //   const blob = await pdf(<MyDocument />).toBlob();
// //   const url = URL.createObjectURL(blob);
// //   window.open(url); // öffnet PDF im neuen Tab
// //   // Alternativ: download starten
// //   // const link = document.createElement("a");
// //   // link.href = url;
// //   // link.download = "dokument.pdf";
// //   // link.click();
// // };

// const handleDownload = async () => {
//   const blob = await pdf(<MyDocument {...form} />).toBlob();
//   const url = URL.createObjectURL(blob);
//   window.open(url);
// };
// {/* <MyDocument/> */}

// <input
//   value={form.name}
//   onChange={(e) => setForm({ ...form, name: e.target.value })}
//   placeholder="Name"
// />
// <input
//   value={form.email}
//   onChange={(e) => setForm({ ...form, email: e.target.value })}
//   placeholder="Email"
// />
// <button name={"button"} type="button"  onClick={handleDownload}> download</button>