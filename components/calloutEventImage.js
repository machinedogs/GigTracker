
export const EventImage = (event) => {

    var value = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml">
   <head>
      <style> * { margin: 0px; padding:0; } </style>
   </head>
   <body>
      <div style=' font-size: 70px; '>
         <img  style=' margin: 10;  width: 100%  ;  overflow: hidden; box-shadow: 10px 10px 10px 10px pink inset;'src="` + event.image + `" /> 
      </div>
   </body>
</html> `
    return (value)

};
