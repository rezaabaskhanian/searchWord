import React, { useState,useCallback,useEffect } from 'react'
import {ActivityIndicator ,View, Text, StyleSheet, TextInput, FlatList, SafeAreaView,ScrollView ,Document,TouchableOpacity, BackHandler, Modal ,ToastAndroid} from 'react-native'
import Data from '../../dataBase/Data'

import DocumentPicker, { types } from 'react-native-document-picker';

import RNHTMLtoPDF from 'react-native-html-to-pdf';

import  Axios  from 'axios';

 import * as RNFS from 'react-native-fs';


 import { Extractor, Patterns } from 'react-native-pdf-extractor';

const Home = (props) => {
    const [data, setData] = useState(Data)
    const [text, onChangeText] = useState(null)
    const [find, setFind] = useState(null)
    const [newWorld, setNewWorld] = useState(null)
    const [persianWorld, setPersianWorld] = useState(null)
    const [isVisable, setVisable] = useState(false)
    const [fileResponse, setFileResponse] = useState(null);
    const [parsedText, setParsedText] = useState('');
    const [visableActivity, setVisableActivity] = useState(false);

// const exportPDF =()=>{


    const createPDF =async()=> {
        let options = {
          html: `<p> ${parsedText} </p>`,
          fileName: 'test',
          directory: 'Documents',
        };
    
        let file = await RNHTMLtoPDF.convert(options)
        // console.log(file.filePath);
        alert(file.filePath);
      }
    // }

 const callService=async()=>{
    let data = new FormData();
   
    data.append('pdf',{name: fileResponse[0].name, uri: fileResponse[0].uri, type:fileResponse[0].type} );
    const url='http://209.127.24.106:3000/replace'
//    const response=await Axios.post(url,data)
     
//    const res=await response.data
const response=await fetch(url, {method: 'POST', body:data })
let jsonData=await response.json();
    
//    console.log(jsonData.txt,'res')
//    createPDF(jsonData.txt)
   setParsedText(jsonData.txt)
   search ()

 }
 
    
    const handleDocumentSelection = async () => {  
        setVisableActivity(true)
        try {
          const response = await DocumentPicker.pick({
            presentationStyle: 'fullScreen',
             type: [types.pdf],
          });
          setFileResponse(response);
        //   const patterns = Patterns.Common.Email
          console.log(response,'ressss')
          
         callService();

          
          
        //   const res = await Extractor.extract(response[0].uri, Patterns.Common.Email);
        //   console.log(res,'re');

        //   const pdf =await PDFDocument.open;
        //   const  pageText=pdf.getPageText(res.pages)

        //   for (let pageIndex = 1; pageIndex<= pdf.getPagesCount(); pageIndex++) {
        //     pageText += pdf.getPageText(pageIndex);
        // }
        // let document = Document.load(response[0].uri);
      
        // // Extract the text
        // let text = document.getText();
        // console.log(text,'text')

        // console.log(pdf,'pageText');
        // const utf =await RNFetchBlob.fs.readFile('sdfsdfsf', 'utf8')
        // console.log(utf,'utffff')
     
        } catch (err) {
          console.warn(err);
          ToastAndroid.show('مشکلس از سمت سرور به وجود آمده لطفا دوباره تست کنید',ToastAndroid.SHORT)

        }
      }

     


    const search = () => {
        const DataName = data

        let newText = parsedText.split(" ")
        console.log(newText,'newText')
        const search = newText.map(data => DataName.find(item => item.name == data) ? DataName.find(item => item.name == data).trans : data)


        setTimeout(() => {
            onChangeText(null)
            toggleModal(true)
            setFind(search)
            setVisableActivity(false)

        }, 1500);
        // let find = data.find((item) => item.name == text)
        // if (find) {
        //     console.log(find, 'find')
        //     setFind(find)
        //     toggleModal(true)
        //     onChangeText(null)
        // } else {
        //     toggleModal(true)
        // }
    }

    const addWord = () => {
        if (newWorld && persianWorld) {
            const last = data.findLast((item) => true)
            const newData = { id: last.id + 1, name: newWorld, trans: persianWorld }
            setNewWorld(null)
            setPersianWorld(null)
            setData(prevData => [...prevData, newData])
            alert('کلمه جدید اضافه شد')
        } else {
            alert('لطفا هر دو مورد رو پر کنید')
        }

    }
    const toggleModal = (visible) => {
        setVisable(visible)
    }



    // const readFile = () => {
    //     RNFS.readDir(RNFS.DocumentDirectoryPath)
    //      .then((result) => {
    //      console.log('GOT RESULT', result);
    //      return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    //    })
    //    .then((statResult) => {
    //     if (statResult[0].isFile()) {
    //      return RNFS.readFile(statResult[1], 'utf8');
    //   }
    //   return 'no file';
    //   })
    //   .then((contents) => {
    //    setContent(contents);
    //    console.log(contents);
    //   })
    //    .catch((err) => {
    //     console.log(err.message, err.code);
    //    });
    //  }

    return (
        <SafeAreaView style={styles.container}>
            {visableActivity ? <ActivityIndicator size="large" /> 
              :
              <>
            <Modal backdropOpacity={0.3} animationType={"slide"} transparent={true}
                visible={isVisable}
                onRequestClose={() => { toggleModal(false) }} >

                <ScrollView style={styles.modal}>
                    {/* {
                        find ?

                            <Text style={styles.text}>{`معادل کلمه   ${find?.trans} == ${find?.name}`}</Text>
                            :
                            <Text style={styles.text}>{`چنین کلمه ایی موجود نیس`}</Text>
                    } */}

                    {
                        find ?
                            <View>
                                <Text style={styles.text}>{`${find.map((item) => {
                                    return (item)
                                }).join(' ')}`}</Text>
                            </View>
                            :
                            null
                    }

                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginBottom:15}}>
                    <TouchableOpacity style={{ width: 80, height: 40, borderRadius: 5, marginRight:10,backgroundColor: 'white', marginTop: 20, justifyContent: 'center', alignItems: 'center', }} onPress={() => toggleModal(false)}>

<Text style={{ color: '#3f2949' }}>
    {`لغو`}
</Text>
</TouchableOpacity>

<TouchableOpacity style={{ width: 80, height: 40, borderRadius: 5, backgroundColor: 'white', marginTop: 20, justifyContent: 'center', alignItems: 'center', }} 
       onPress={() => {toggleModal(false),createPDF()}}>

<Text style={{ color: '#3f2949' }}>
    {`دانلود`}
</Text>
</TouchableOpacity>
                    </View>

                    
                </ScrollView>
            </Modal>
            <Text style={{ marginTop: 20, fontSize: 18, textAlign: 'center', fontFamily: 'iranSans', color: '#fff' }}>
                {`افزودن کلمه جدید`}
            </Text>
            <View style={{ alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row-reverse', marginTop: 30 }}>
                <TextInput placeholderTextColor={'#B4D0DD'} onChangeText={setNewWorld} value={newWorld} style={{ width: '40%', textAlign: 'center', borderRadius: 5, borderColor: 'white', borderWidth: 0.5, backgroundColor: 'white' }} placeholder='کلمه جدید '>
                </TextInput>

                <TextInput placeholderTextColor={'#B4D0DD'} onChangeText={setPersianWorld} value={persianWorld} style={{ width: '40%', textAlign: 'center', borderRadius: 5, borderColor: 'white', borderWidth: 0.5, backgroundColor: 'white' }} placeholder='معادلش به فارسی'>
                </TextInput>
            </View>
            <View>

                <TouchableOpacity style={{ alignSelf: 'center', width: 120, height: 40, borderRadius: 5, backgroundColor: '#B4D0DD', marginTop: 20, justifyContent: 'center', alignItems: 'center', }} onPress={addWord}>

                    <Text style={{ color: 'white', fontFamily: 'iranSans' }}>
                        {`افزودن کلمه جدید`}
                    </Text>
                </TouchableOpacity>
            </View >

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/* <TextInput placeholderTextColor={'#B4D0DD'} onChangeText={onChangeText} value={text} style={{ width: '80%', textAlign: 'center', borderRadius: 5, borderColor: 'white', borderWidth: 0.5, backgroundColor: 'white' }} placeholder='جمله یا کلمه ایی تایپ کنید'>
                </TextInput> */}

                {/* {console.log(fileResponse,'fileResponse')} */}

                <Text style={{ color: 'white' ,justifyContent: 'center', alignItems: 'center',marginBottom:20}}>
                        {fileResponse?.name}
                    </Text>

                <TouchableOpacity style={{ width: 80, height: 40, borderRadius: 5, backgroundColor: '#B4D0DD', marginTop: 20, justifyContent: 'center', alignItems: 'center', }} onPress={handleDocumentSelection}>

                    <Text style={{ color: 'white' ,textAlign:'center'}}>
                        {fileResponse ==0 ? 'اضافه کردن فایل' : 'فایل جدید'}
                    </Text>
                </TouchableOpacity>
            </View>

            </>
               }
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#332FD0',

    },
    modal: {
        flex:1,
        height: '35%',
        marginTop: 'auto',
        backgroundColor: '#B6D2E3',
        padding:15
        // justifyContent: 'center',
        // alignItems: 'center'


    },
    text: {
        color: '#3f2949',
        marginTop: 10,
        fontFamily: 'iranSans'
    }
})

export default Home