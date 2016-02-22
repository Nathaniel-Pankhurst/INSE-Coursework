chooseAjax = function(URL, method, data, callback){
  if(method == "GET"){
    AjaxGet(URL, callback);
  }else{
    AjaxPut(URL, data, callback);
  }
}

function AjaxGet(URL, callback)
  { var ajaxObj = new XMLHttpRequest();
    ajaxObj.open("GET", URL, true); // The TRUE implies asynchronous
    ajaxObj.onreadystatechange = function()
      { if (ajaxObj.status == 200)
	      if (ajaxObj.readyState == 4)
		    callback(ajaxObj.responseText);
      }
    ajaxObj.send(ajaxObj.responseText);
  }

  function AjaxPut(URL, data, callback)
    { var ajaxObj = new XMLHttpRequest();
      ajaxObj.open("POST", URL, true); // The TRUE implies asynchronous
      ajaxObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      ajaxObj.onreadystatechange = function()
        { if (ajaxObj.status == 200)
          if (ajaxObj.readyState == 4)
          callback();
        }
      ajaxObj.send(data);
    }
