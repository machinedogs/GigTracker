
export const UserImage = (props) => {

   var value = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml">
   <head>
      <style> * { margin: 0px; padding-right:100; padding-top:40 } </style>
   </head>
   <body>
      <div style = '
      display: inline-block;
      position: absolute;
      width: 300px;
      height: 300px;
      overflow: hidden;
      border-radius: 50%;'>
         <img  style='   
         width: 100%; height: 100%; border-radius: 50%;
        'src="` + props.event.host.profile + `" /> 
      </div>
   </body>
</html> `
   return (value)

};
