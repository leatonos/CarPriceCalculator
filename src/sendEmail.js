import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const SendPrice = () => {
    const templateParams = {
        message : "test"
    }
  
    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.send('service_jhfwf4j', 'template_m1n2la3', templateParams, 'xT1QY0MHIR7w2vImm')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };
  
   
  };