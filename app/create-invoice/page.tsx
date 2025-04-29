
import React from 'react'
import {ComboboxPopover} from "@/components/ui/combobox"

type Tobj = {
    customerHeaderTxt:string,
    selectCustomerLabel:string,
    selectCustomer2Label:string,
}

function page() {

    const obj:Tobj = {
        customerHeaderTxt:  "Kunden Info",
        selectCustomerLabel: "Kunde",
        selectCustomer2Label: "Auswählen",
    }

  return (
    <div className="w-screen">
        <main className=" flex flex-col justify-center items-center w-[100%]">
            <div className="border-2 border-gray-600 rounded-2xl p-2 w-[100%] sm:w-[90%] ">
                <h2 className="underline underline-offset-4">{obj.customerHeaderTxt}</h2>
                <ComboboxPopover className="p-4" label={obj.selectCustomerLabel} comboboxLabel={obj.selectCustomer2Label}></ComboboxPopover>
            </div>
        </main>
        <footer>

        </footer>
    </div>
  )
}

export default page