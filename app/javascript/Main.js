var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();


var Main =
{
		XHRObj: null
};

Main.onLoad = function()
{
	// Enable key event processing
	this.enableKeys();
	widgetAPI.sendReadyEvent();
	
	
	var URL = "http://rposbo-basic-node-api.apphb.com/products/socks?key=" + api_key; // Test URL here
	
	if (this.XHRObj != null){ 
		this.XHRObj.destroy(); 
	}
	this.XHRObj = new XMLHttpRequest();
	
	if (this.XHRObj) {
		alert("got XHR");
		this.XHRObj.onreadystatechange = function () {
			alert("State changed to " + Main.XHRObj.readyState); 
			if (Main.XHRObj.readyState == 4) { 
				alert("got data"); 
				Main.recieveData();
				} 
			}; 
		this.XHRObj.open("GET", URL, true); 
		this.XHRObj.send(null); 
	}
};

Main.recieveData = function () {
	 
	alert("alerting data...");
	var data = JSON.parse(this.XHRObj.responseText);
	for(var i=0; i<data.products.length; i++)
		{		
			var product = data.products[i];
			alert("adding " + product.title);

			var productImg = document.createElement("img");
			productImg.setAttribute("src", product.image);
			
			var title = document.createTextNode(product.title);
			
			var link = document.createElement("a");
			link.appendChild(productImg);
			link.appendChild(title);
			
			var listItem = document.createElement("li");
			listItem.appendChild(link);			
			
			document.getElementById('listing').appendChild(listItem);
		}	 
	};

Main.onUnload = function()
{

};

Main.enableKeys = function()
{
	document.getElementById("anchor").focus();
};

Main.keyDown = function()
{
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);

	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			alert("RETURN");
			widgetAPI.sendReturnEvent();
			break;
		case tvKey.KEY_LEFT:
			alert("LEFT");
			break;
		case tvKey.KEY_RIGHT:
			alert("RIGHT");
			break;
		case tvKey.KEY_UP:
			alert("UP");
			break;
		case tvKey.KEY_DOWN:
			alert("DOWN");
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			alert("ENTER");
			break;
		default:
			alert("Unhandled key");
			break;
	}
};