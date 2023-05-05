import React, { useEffect, useRef, useState } from 'react'
import Editor from "@monaco-editor/react";
import firebase from 'firebase'
import firebaseConfig from './firebaseConfig';
import { fromMonaco } from '@hackerrank/firepad'

const App = () => {
  
  const editorRef = useRef(null)
  const [editorLoaded,setEditorLoaded] = useState(false)


 
function handleEditorDidMount(editor,monaco){
    editorRef.current = editor
    setEditorLoaded(true)
  }



  useEffect(() => {
    if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }
  },[])


   useEffect(() =>{
    if(!editorLoaded){
      return
    }

    const dbRef = firebase.database().ref().child("pair001")
    const firepad = fromMonaco(dbRef,editorRef.current)

    const name = prompt("Enter your Name : ")
    if(name){
      firepad.setUserName(name)
    }
  
  },[editorLoaded])



  


  return (
    <div>
      
        <Editor
        height = "90vh"
        defaultLanguage='javascript'
        theme='vs-dark'
        defaultValue='// Write your code here'
        onMount={handleEditorDidMount}
         />
   
    </div>
  )
}

export default App