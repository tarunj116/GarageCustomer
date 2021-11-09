import React from 'react';
import axios from 'axios';
import SecureStorage from 'react-native-secure-storage';
import {ToastAndroid} from 'react-native';
import {BASE_URL} from '../config';
import {createAction} from '../utils/createAction';
import {sleep} from '../utils/sleep';
import {Loading} from '../components/Loading';

export function useAuth() {
  const [loading, setLoading] = React.useState(false);
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case 'SET_USER':
          return {
            ...state,
            user: {...action.payload},
          };
        case 'REMOVE_USER':
          return {
            ...state,
            user: undefined,
          };
        case 'SET_LOADING':
          return {
            ...state,
            loading: action.payload,
          };
        default:
          return state;
      }
    },
    {
      user: undefined,
      loading: true,
    },
  );
  const auth = React.useMemo(
    () => ({
      login: async (email, password) => {
        console.log(email);
        if(email == ''){
          ToastAndroid.show("Please enter Mobile Number!", ToastAndroid.SHORT,ToastAndroid.CENTER);
          return false;
        }
        if(password == ''){
          ToastAndroid.show("Please enter Password!", ToastAndroid.SHORT,ToastAndroid.CENTER);
          return false;
        }
        
        
        const url=`${BASE_URL}/customer/login`;
        const params = JSON.stringify({
          "phone":email,
          "password":password
          // "phone":"33333333",
          // "password":"Admin@123"
          
          });
          console.log(params);
      axios.post(url, params,{

        "headers": {
        
        "content-type": "application/json",
        
        },
        
        })
        .then(function(response) {
        console.log(response);
          if (response.data.success == true) {
            //ToastAndroid.show(response.data.message, ToastAndroid.SHORT,ToastAndroid.CENTER);
            //alert(response.data.message);
           
            SecureStorage.setItem('user', JSON.stringify(response.data.token));
            SecureStorage.setItem('userNewId', JSON.stringify(response.data.user_id));
            dispatch(createAction('SET_USER', response.data.response));
           
          }else{
            console.log(response);
            //dispatch(createAction('SET_LOADING', false));
          }
        
        })
        
        .catch(function(error) {
        // alert(error.response.data.error);
         console.log(error);
        //alert(error.response.data.error);
        
        });
      },
      logout: async () => {
        await SecureStorage.removeItem('user');
        dispatch(createAction('REMOVE_USER'));
      },
      register: async (name,countryCode,phone,email,location,lat,long,password,cpassword) => {
        await sleep(2000);
        const urlReg=`${BASE_URL}/customer/register`;
        const paramsRegister = JSON.stringify({
          "name":name,
          "email":email,
          "phone":phone,
          "password":password,
          "location":location,
          "lat":"24.45354",
          "long":"76.43434",
          "term_condition":"1"
          
          });
          console.log(paramsRegister);
          
          axios.post(urlReg, paramsRegister,{

            "headers": {
            
            "content-type": "application/json",
            
            },
            
            })
            .then(function(response) {
              console.log(response);
                if (response.data.success == true) {
                  alert(response.data.message);
                  
                  return false;
                 
                 
                }else{
                  alert(response);
                 
                }
              
              })
              
              .catch(function(error) {
             //  alert(error.response.data.error)
                 ToastAndroid.show(error.response.data.error, ToastAndroid.SHORT,ToastAndroid.CENTER);
              // console.log(error);
             
              
              });
      },
    }),
    [],
  );
  React.useEffect(() => {
    sleep(2000).then(() => {
      SecureStorage.getItem('user').then(user => {
        if (user) {
          dispatch(createAction('SET_USER', JSON.parse(user)));
        }
        dispatch(createAction('SET_LOADING', false));
      });
    });
  }, []);
  return {auth, state};
}
