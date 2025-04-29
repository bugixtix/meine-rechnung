'use client'
import Image from "next/image";
import {Button} from "@/components/ui/button"
import {useRouter} from "next/navigation"

type Tobj = {
  createInvoiceTxt:string,
  createInvoiceURL:string
}


export default function Home() {

  const router = useRouter()

  const obj:Tobj = {
    createInvoiceTxt:"Invoice Erstellen",
    createInvoiceURL:"/create-invoice"
  }
  const HandleButtonClick=():void=>{
    router.push(obj.createInvoiceURL)
  }
  return (
    <div className="flex flex-col w-dvw overflow-x-hidden">
      <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center w-[100%] h-[90vh]">
        <Button onClick={HandleButtonClick} className={"cursor-pointer"}>{obj.createInvoiceTxt}</Button>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        footer is here!
      </footer>
    </div>
  );
}
