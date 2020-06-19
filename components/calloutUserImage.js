import React from 'react'
import { Button } from '@material-ui/core';
import {
    Text
} from 'react-native';
export const UserImage = (event) => {


    var value = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml">
   <head>
      <style> * { margin: 0px; padding-right:100; } </style>
   </head>
   <body>
      <div>
         <img  style='   border-radius: 50%  ; width:400px 'src="` + event.event.host.profile + `" /> 
      </div>
   </body>
</html> `
    return (value)

};