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
    TableEmptyCell
  } from "@/components/ui/table"

type RowData = {
    position:string,
    quantity:string,
    unit:string,
    description:string,
    price:string,
    totalPrice:string
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

    
    tableCaptionLabel:string,
    tableHeadPositionLabel:string,
    tableHeadQuantityLabel:string,
    tableHeadUnitLabel:string,
    tableHeadDescriptionLabel:string,
    tableHeadPriceLabel:string,
    tableHeadTotalPriceLabel:string,
    tableHeadRemoveLabel:string
}

function page() {

    const [rows, setRows] = useState<RowData[]>([])

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

        tableCaptionLabel:"Alle von Ihnene hinzugefügten Artikeln.",
        tableHeadPositionLabel:"Position",
        tableHeadQuantityLabel:"Anzahl",
        tableHeadUnitLabel:"Einheit",
        tableHeadDescriptionLabel:"Bezeichunung",
        tableHeadPriceLabel:"Einzelpreis",
        tableHeadTotalPriceLabel:"Gesamtpreis",
        tableHeadRemoveLabel:"⬇️"
    }

    const addRow = (newRow:RowData) =>{
        setRows([...rows, newRow])
    } 
    const deleteRow = (index:number) =>{
        setRows(rows.filter((_, i)=> i!==index))
    }
    const example = {
        position:"1",
        quantity:"2",
        unit:"Stück",
        description:"Artikel",
        price:"200€",
        totalPrice:"400€"
    }
  return (
    <div className="w-[100%]">
        <main className=" flex flex-col gap-4 py-4 justify-center items-center w-[100%]">
            <div className="border-2 border-gray-600 rounded-2xl p-2 w-[100%] sm:w-[90%] flex flex-col gap-4">
                {/* Customer Section */}
                <h2 className="underline underline-offset-4">{obj.selectCustomerHeaderTxt}</h2>
                <div className="space-x-4 flex flex-row items-center">
                    <p className="text-sm">{obj.customerLabel}</p>
                    <ComboboxPopover placeholder={obj.comboboxPlaceholder}/>
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
                    <ComboboxPopover placeholder={obj.comboboxPlaceholder}/>
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
                    <Input placeholder={obj.itemPositionLabel} className={"w-[300px]"}/>
                </div>
                <div className="space-x-4 flex flex-row items-center">
                    <p className="text-sm">{obj.itemQuantityLabel}</p>
                    <Input placeholder={obj.itemQuantityLabel} className={"w-[300px]"}/>
                </div>
                <div className="space-x-4 flex flex-row items-center">
                    <p className="text-sm">{obj.itemUnitLabel}</p>
                    <ComboboxPopover placeholder={obj.comboboxPlaceholder}/>
                </div>
                <div className="space-x-4 flex flex-row items-center">
                    <p className="text-sm">{obj.itemDescriptionLabel}</p>
                    <Input placeholder={obj.itemDescriptionLabel} className={"w-[300px]"}/>
                </div>
                <div className="space-x-4 flex flex-row items-center">
                    <p className="text-sm">{obj.itemPriceLabel}</p>
                    <Input placeholder={obj.itemPriceLabel} className={"w-[300px]"}/>
                </div>
                <div>
                    <Button onClick={()=>addRow(example)} className="cursor-pointer bg-white text-gray-800 hover:bg-gray-200 transition-all duration-200 ease-in border-[1px]">{obj.addNewItemLabel}</Button>
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
                            <TableHead className="text-center">{obj.tableHeadTotalPriceLabel}</TableHead>
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
                                            <TableCell className="text-center">{row.price}</TableCell>
                                            <TableCell className="text-center">{row.totalPrice}</TableCell>

                                        </TableRow>
                                    ))
                                }
                                <TableEmptyCell/>
                                <TableEmptyCell/>

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