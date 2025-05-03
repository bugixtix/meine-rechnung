'use client'
import Image from "next/image";
import {Button} from "@/components/ui/button"
import {useRouter} from "next/navigation"

type Tobj = {
  createInvoiceTxt:string,
  createInvoiceURL:string,
  createInvoiceLiveTxt:string,
  createInvoiceLiveURL:string
}


export default function Home() {

  const router = useRouter()

  const obj:Tobj = {
    createInvoiceTxt:"Invoice Erstellen",
    createInvoiceURL:"/create-invoice",
    createInvoiceLiveTxt:"Invoice Live Erstellen",
    createInvoiceLiveURL:"/create-invoice-live"
  }
  const HandleButtonClick=(id:number):void=>{
    id === 1 ? router.push(obj.createInvoiceURL) : router.push(obj.createInvoiceLiveURL)
  }
  return (
    <div className="flex flex-col w-dvw overflow-x-hidden">
      <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center w-[100%] h-[90vh]">
        <Button id={"1"} onClick={()=>HandleButtonClick(1)} className={"cursor-pointer"}>{obj.createInvoiceTxt}</Button>
        <Button id={"2"} onClick={()=>HandleButtonClick(2)} className={"cursor-pointer"}>{obj.createInvoiceLiveTxt}</Button>

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        footer is here!
      </footer>
    </div>
  );
}
