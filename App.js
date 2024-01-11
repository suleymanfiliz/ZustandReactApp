import { View, Text, SafeAreaView, Button, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import useCounterStore from './src/app/store'
import Counter from './src/components/counter'
import { Formik } from 'formik'
import * as  Yup from 'yup'
import {useForm,Controller} from 'react-hook-form'

const validationShema=Yup.object().shape({
  email:Yup.string().email("Geçerli bir mail giriniz").required("Email zodunludur"),
  password:Yup.string().min(6,"Şifre en az 6 karakter olarak giriniz").required("Şifre en az 6 karakter olup ve zorunludur")
}) 

const App = () => {
  const { increment, decrement } = useCounterStore(state => state)
  const handleOnSubmit = (values) => {console.log("Values :",values) }
  const showZustand = false
  const isformik=false
  const isreactHookFrom=true
  const {control,handleSubmit,formState:{errors}}=useForm({defaultValues:{email:'',password:''}})


  return (
    <SafeAreaView style={{ marginHorizontal: 10 }} >
      {showZustand && (<View >
        <Counter />
        <Button title='İncrement' onPress={increment} />
        <Button title='Decrement' onPress={decrement} />
      </View>)
      }
      {isreactHookFrom &&(
        
        <View style={styles.inputContainer}>
           <Text>E-mail</Text>
            <Controller control={control} name='email' rules={{ required: true }}
              render={({ field }) => (
              <TextInput 
                {...field}
                placeholder='E-posta' style={styles.input}
                autoCapitalize='none'
                keyboardType='email-address'
                value={field.email}
                onChangeText={text=>field.onChange(text)}
              />)} />           
           
           <Text style={styles.errorText}>{errors.email}</Text>
           <Text>Password</Text>
           <Controller control={control} name='password' rules={{ required: true }}
              render={({ field }) => (
              <TextInput 
                {...field}
                placeholder='Password' style={styles.input}                
                value={field.password}
                onChangeText={text=>field.onChange(text)}
                secureTextEntry
              />)}/>                                 
           <Text style={styles.errorText}>{errors.password}</Text>
           <Button title='Giriş Yap' 
           onPress={() => {handleSubmit}} disabled={!isValid}/>
         </View>
          
       ) }

      { isformik && (<Formik 
      validationSchema={validationShema}
      initialValues={{ email: '', password: '' }} 
      onSubmit={handleOnSubmit} >
        { ({handleChange,handleSubmit,values,errors,touched,isValid})=>(
           <View style={styles.inputContainer}>
           <Text>E-mail</Text>
           <TextInput placeholder='E-posta' style={styles.input} 
           onChangeText={ handleChange('email')}
            value={values.email}
            keyboardType='email-address'
           />
           <Text style={styles.errorText}>{errors.email}</Text>
           <Text>Password</Text>
           <TextInput placeholder='Password' style={styles.input} 
           onChangeText={handleChange('password')} secureTextEntry
            value={values.password}
           />
           <Text style={styles.errorText}>{errors.password}</Text>
           <Button title='Giriş Yap' 
           onPress={() => {handleSubmit}} disabled={!isValid}/>
         </View>
        )  
        }        
      </Formik>
      )}

    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 1,
    borderColor: 'gray'
  },
  inputContainer: {
    gap: 10,
  },
  errorText:{
   color:'red',
   fontSize:12 
  }
})
