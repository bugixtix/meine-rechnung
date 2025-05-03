'use client'

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import {useState} from 'react'
import {Input} from "@/components/ui/input"

const styles = StyleSheet.create({
    page: { padding: 30 },
    section: { marginBottom: 10 },
    label: { fontSize: 12, fontWeight: 'bold' },
    valueBox: {
      border: '1pt solid #000',
      padding: 5,
      minHeight: 20,
      marginTop: 2,
    },
  });


function MyDocument({
    name,
    email,
  }: {
    name: string;
    email: string;
  }){
    const [txtValue, setTxtValue] = useState<string>("")

    const handleTextChange = (e:any) =>{
        setTxtValue(e.target.value)
    } 
    const changeItemUiDescription = (e:React.ChangeEvent<HTMLInputElement>) =>{
            setTxtValue(p=>e.target.value)
        }
  return (
    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.label}>Name</Text>
        <View style={styles.valueBox}><Text>{name}</Text></View>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.valueBox}><Text>{email}</Text></View>
      </View>
    </Page>
  </Document>
  )
}

export default MyDocument;