
export const UserImage = (event) => {

   var value = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml">
   <head>
      <style> * { margin: 0px; padding-right:100; padding-top:40 } </style>
   </head>
   <body>
      <div style = '
      display: inline-block;
      position: relative;
      width: 300px;
      height: 300px;
      overflow: hidden;
      border-radius: 50%;'>
         <img  style='   width: auto;
         height: 100%;
         margin-left: -50px'src="` + event.event.host.profile + `" /> 
      </div>
   </body>
</html> `
   return (value)

};
