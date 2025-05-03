'use client'

import React, {useEffect, useState} from 'react'
import {ComboboxPopover} from "@/components/ui/combobox"
import {Input} from "@/components/ui/input"
import {DatePickerWithPresets} from "@/components/ui/datePicker"
import { Button } from "@/components/ui/button"
import { IoRemoveSharp as RemoveIcon } from "react-icons/io5";


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
type ComboboxValues = {
    label:string
    value:string
}
type Currency = {
    label:string 
    value:string
}
type Tobj = {
    comboboxPlaceholder:string,

    selectCustomerHeaderTxt:string,
    customerLabel:string,
    customer2Label:string,
    customerStreetLabel:string,
    customerStreetPlaceholder:string,
    customerCityLabel:string,
    customerCityPlaceholder:string,
    customerContactPersonLabel:string,
    customerContactPersonPlaceholder:string,
    
    selectSellerHeaderTxt:string,
    sellerLabel:string,
    seller2Label:string,
    sellerStreetLabel:string,
    sellerStreetPlaceholder:string,
    sellerCityLabel:string,
    sellerCityPlaceholder:string,
    sellerContactPersonLabel:string,
    sellerContactPersonPlaceholder:string,
    
    selectInvoiceHeaderTxt:string,
    invoiceDateLabel:string,
    invoiceDate2Label:string,
    invoiceDate:string,
    invoiceIDlabel:string,
    invoiceID:string,

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

type Price = {
    text:string,
    value:number
}

function page() {

    const [rows, setRows] = useState<RowData[]>([])
    const [item, setItem] = useState<RowData>({})
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
    const [netPrice, setNetPrice] = useState<Price>({text:"", value:0})
    const [vatValue, setVatValue] = useState<Price>({text:"", value:0})
    const [totalPrice, setTotalPrice] = useState<Price>({text:"", value:0})

    const customers: ComboboxValues[] =
    [
        { label: "Kunde A", value: "kunde_a" },
        { label: "Kunde B", value: "kunde_b" },
        { label: "Kunde C", value: "kunde_c" },
        { label: "Kunde D", value: "kunde_d" },
        { label: "Kunde E", value: "kunde_e" }
    ]
    const sellers:ComboboxValues[] = [
        { label: "Verkäufer 1", value: "verkaeufer_1" },
        { label: "Verkäufer 2", value: "verkaeufer_2" },
        { label: "Verkäufer 3", value: "verkaeufer_3" },
        { label: "Verkäufer 4", value: "verkaeufer_4" },
        { label: "Verkäufer 5", value: "verkaeufer_5" }
      ]
      
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

        selectCustomerHeaderTxt:  "Kunden Info",
        customerLabel: "Kunde",
        customer2Label: "Auswählen",
        customerStreetLabel:"Straße, Hausnummer",
        customerStreetPlaceholder:"Empfänger Straße, Empfänger Hausnummer",
        customerCityLabel:"PLZ, Ort",
        customerCityPlaceholder:"Empfänger PLZ, Empfänger Ort",
        customerContactPersonLabel:"Ansprechpartner",
        customerContactPersonPlaceholder:"Empfänger Ansprechpartner",

        selectSellerHeaderTxt: "Verkäufer Info",
        sellerLabel:"Verkäufer",
        seller2Label:"Auswählen",
        sellerStreetLabel:"Straße, Hausnummer",
        sellerStreetPlaceholder:"Z.B. Musterstraße, 5",
        sellerCityLabel:"PLZ, Ort",
        sellerCityPlaceholder:"Z.B. 000000, Musterstadt",
        sellerContactPersonLabel:"Ansprechpartner",
        sellerContactPersonPlaceholder:"Z.B. Frau Mustermann",

        selectInvoiceHeaderTxt:"Rechnungsinfo",
        invoiceDateLabel:"Datum Auswählen",
        invoiceDate2Label:"Datum",
        invoiceDate:"01.01.2026",
        invoiceIDlabel:"Rechunungsnummer",
        invoiceID:"2026-001",

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

    const addRow = (newRow:RowData) =>{
        setRows([...rows, newRow])
    } 
    const addItem = () =>{
        let totalPrice:any = calculateItemTotalPrice(Number(itemUi.price), Number(itemUi.quantity))
        let totalPriceTxt:string = formatPrice(totalPrice)
        let objekt = {...itemUi, totalPrice:totalPrice, totalPriceTxt:totalPriceTxt}
        // setItemUi(objekt)
        addRow(objekt)

        // Clear the item section 
        const initialPosition:number = (objekt?.position ?? 0) +1 
        const initialUnit:string = objekt?.unit ?? "Stück"
        const initialCurrency:string = objekt?.currency ?? "€"
        const initialValue : RowData = {
            position:initialPosition,
            quantity:0,
            unit:initialUnit,
            description:"",
            price:0,
            totalPrice:0,
            totalPriceTxt:"0",
            priceTxt:"0",
            currency:initialCurrency
        }
        setItemUi(initialValue)
    }
    const deleteRow = (index:number) =>{
        setRows(rows.filter((_, i)=> i!==index))
    }

    const changeItemUiPosition = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setItemUi({...itemUi, position:Number(e.target.value)})
    }
    const changeItemUiQuantity = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setItemUi({...itemUi, quantity:Number(e.target.value)})
    }
    const changeItemUiDescription = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setItemUi({...itemUi, description:e.target.value})
    }
    const changeItemUiPrice = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setItemUi({...itemUi, price:Number(e.target.value), priceTxt:formatPrice(Number(e.target.value))})
    }
    const changeItemUiUnit = (value?:string)=>{
        setItemUi({...itemUi, unit:value})
    }
    const changeItemUiCurrency = (value?:string)=>{
        setItemUi({...itemUi, currency:value})
    }
    const calculateItemTotalPrice = (x:number,y:number)=>{
        return  x*y
    }
    const calculateVAT = (z:number)=>{
        const vat = 19
        return z*vat/100
    }

    function formatPrice(value?: number): string {
        let val =  value?.toFixed(2).replace('.', ',') || "0"
        return val
    }

    useEffect(()=>{
        if(rows.length == 0){
            let zeroValue:Price = {text:"0", value:0}
            setNetPrice(zeroValue)
            setVatValue(zeroValue)
            setTotalPrice(zeroValue)
        }else{
            let netVal:number = 0
            rows.forEach((item,index)=>{netVal += Number(item.totalPrice)})
            setNetPrice({text:formatPrice(netVal), value:netVal})
            let vatVal:number = calculateVAT(netVal)
            setVatValue({text:formatPrice(vatVal), value:vatVal})
            let totalVal:number = netVal + vatVal
            setTotalPrice({text:formatPrice(totalVal), value:totalVal})
        }
        
        return()=>{
        }

    },[rows])


  return (
    <div className="w-[100%]">
        <main className=" flex flex-col gap-4 py-4 justify-center items-center w-[100%]">
            <div className="border-2 border-gray-600 rounded-2xl p-2 w-[100%] sm:w-[90%] flex flex-col gap-4">
                {/* Customer Section */}
                <h2 className="underline underline-offset-4">{obj.selectCustomerHeaderTxt}</h2>
                <div className="space-x-4 flex flex-row items-center">
                    <p className="text-sm">{obj.customerLabel}</p>
                    <ComboboxPopover placeholder={obj.comboboxPlaceholder} values={customers}/>
                </div>
                <div className="space-x-4 flex flex-row items-center">
                    <p className="text-sm">{obj.customerContactPersonLabel}</p>
                    <Input placeholder={obj.customerContactPersonPlaceholder} className="w-[300px]" />
                </div>
                <div className="space-x-4 flex flex-row items-center">
                    <p className="text-sm">{obj.customerStreetLabel}</p>
                    <Input placeholder={obj.customerStreetPlaceholder} className={"w-[300px]"}/>
                </div>
                <div className="space-x-4 flex flex-row items-center">
                    <p className="text-sm">{obj.customerCityLabel}</p>
                    <Input placeholder={obj.customerCityPlaceholder} className="w-[300px]" />
                </div>
            </div>
            {/* Seller Section */}
            <div className="border-2 border-gray-600 rounded-2xl p-2 w-[100%] sm:w-[90%] flex flex-col gap-4">
                <h2 className="underline underline-offset-4">{obj.selectSellerHeaderTxt}</h2>
                <div className="space-x-4 flex flex-row items-center">
                    <p className="text-sm">{obj.sellerLabel}</p>
                    <ComboboxPopover placeholder={obj.comboboxPlaceholder} values={sellers}/>
                </div>
                <div className="space-x-4 flex flex-row items-center">
                    <p className="text-sm">{obj.sellerContactPersonLabel}</p>
                    <Input placeholder={obj.sellerContactPersonPlaceholder} className="w-[300px]" />
                </div>
                <div className="space-x-4 flex flex-row items-center">
                    <p className="text-sm">{obj.sellerStreetLabel}</p>
                    <Input placeholder={obj.sellerStreetPlaceholder} className={"w-[300px]"}/>
                </div>
                <div className="space-x-4 flex flex-row items-center">
                    <p className="text-sm">{obj.sellerCityLabel}</p>
                    <Input placeholder={obj.sellerCityPlaceholder} className="w-[300px]" />
                </div>
            </div>
            {/* Invoice Section */}
            <div className="border-2 border-gray-600 rounded-2xl p-2 w-[100%] sm:w-[90%] flex flex-col gap-4">
                <h2 className="underline underline-offset-4">{obj.selectInvoiceHeaderTxt}</h2>
                <div className="space-x-4 flex flex-row items-center">
                    <p className="text-sm">{obj.invoiceDate2Label}</p>
                    <DatePickerWithPresets label={obj.invoiceDateLabel}/>
                </div>
                <div className="space-x-4 flex flex-row items-center">
                    <p className="text-sm">{obj.invoiceIDlabel}</p>
                    <Input placeholder={obj.invoiceID} className={"w-[300px]"}/>
                </div>
            </div>
            {/* Item Section */}
            <div className="border-2 border-gray-600 rounded-2xl p-2 w-[100%] sm:w-[90%] flex flex-col gap-4">
                <h2 className="underline underline-offset-4">{obj.selectItemHeaderTxt}</h2>
                <div className="space-x-4 flex flex-row items-center">
                    <p className="text-sm">{obj.itemPositionLabel}</p>
                    <Input type={"number"} placeholder={obj.itemPositionLabel} className={"w-[300px]"} onChange={(e)=>{changeItemUiPosition(e)}} value={itemUi.position}/>
                </div>
                <div className="space-x-4 flex flex-row items-center">
                    <p className="text-sm">{obj.itemQuantityLabel}</p>
                    <Input type={"number"} placeholder={obj.itemQuantityLabel} className={"w-[300px]"} onChange={(e)=>{changeItemUiQuantity(e)}} value={itemUi.quantity}/>
                </div>
                <div className="space-x-4 flex flex-row items-center">
                    <p className="text-sm">{obj.itemUnitLabel}</p>
                    <ComboboxPopover placeholder={obj.comboboxPlaceholder} handler={(value)=>{changeItemUiUnit(value)}} values={units} />
                </div>
                <div className="space-x-4 flex flex-row items-center">
                    <p className="text-sm">{obj.itemDescriptionLabel}</p>
                    <Input placeholder={obj.itemDescriptionLabel} className={"w-[300px]"} onChange={(e)=>{changeItemUiDescription(e)}} value={itemUi.description}/>
                </div>
                <div className="space-x-4 flex flex-row items-center">
                    <p className="text-sm">{obj.itemPriceLabel}</p>
                    <Input type={"number"} placeholder={obj.itemPriceLabel} className={"w-[300px]"} onChange={(e)=>{changeItemUiPrice(e)}} value={itemUi.price}/>
                    <ComboboxPopover placeholder={obj.itemCurrencyLabel} className="w-[60px]" handler={(value)=>{changeItemUiCurrency(value)}} values={currencies}  />
                </div>
                <div>
                    <Button onClick={()=>addItem()} className="cursor-pointer bg-white text-gray-800 hover:bg-gray-200 transition-all duration-200 ease-in border-[1px]">{obj.addNewItemLabel}</Button>
                </div>
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
                                { rows.length !== 0 &&
                                    rows.map((row,index)=>(
                                        <TableRow key={index}>
                                            <TableCell className="text-center">
                                                <Button size="icon" className="hover:cursor-pointer" variant="destructive" onClick={()=>deleteRow(index)}>
                                                    <RemoveIcon/>
                                                </Button>
                                            </TableCell>
                                            <TableCell className="text-center">{row.position}</TableCell>
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
                                <TableEmptyRow/>
                                <TableEmptyRow/>

                                <TablePriceRow txt={obj.tableRowNetPriceLabel} val={netPrice.text} className="border-b"/>
                                <TablePriceRow txt={obj.tableRowVATlabel} val={vatValue.text}/>
                                <TablePriceRow txt={obj.tableRowTotalPriceLabel} val={totalPrice.text} total={true}/>

                        </TableBody>
                    </Table>
                </div>
            </div>
        </main>
        <footer>

        </footer>
    </div>
  )
}



export default page