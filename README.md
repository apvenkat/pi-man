# Pi-Man
### A Web of Things Project 

Pi-Man is a raspberry pi based device management platform which is developed based on modern web architectures and aligned with WoT 
Standards. You can connect,control and monitor sensors/actuators compatible with RPi in this platform via simple Web App.

# W3C based Things Description
All the connected devices will have their own URL to identify themselves and their properties via W3C defined architecture to describe WoT things 

For example, Connect and add an LED in gpio-7 and navigate to postman and make a get request at http://localhost:8080/things , the response will have Thing Description like shown below with property to turn it on/off

```
  {
        "@context": "https://www.w3.org/TR/wot-thing-description/",
        "@type": "Thing",
        "thingID": "gpio-7",
        "thingType": "onoff",
        "thingURL": "/things/gpio-7",
        "name": "Led 2",
        "properties": {
            "on": {
                "type": "onoff",
                "unit": "boolean",
                "href": "/things/gpio-7/properties/on"
            }
        }
    }
```
In similar way you can define all your IoT things with it's properties,actions,events and so on as defined by W3C https://www.w3.org/TR/wot-thing-description/#introduction

# Built with
* Backend and API - Node JS and Express
* Fronend - Basic HTML,CSS rendered via EJS
* database - SQLite
* Security - JWT and Cookies

# Supported Things
* An LED
* A Relay - Which you can connect with a light bulb or a control valve etc
* DHT 11 and DHT 22 ( Temperature and Humidity Sensors)
* More devices yet to come !!

# Install and Run
```
git clone https://github.com/apvenkat/pi-man

npm install

npm start

```
you can access the platform at http://localhost:8080 or use your Pi's IP address if you are accessing it from your laptop

# Future Works
* Adding more supported sensors
* Transform the web page to a Progressive Web App
* Provide Remote access 

# Inspired by
* [Building the Web of Things book](https://webofthings.org/book/)
* [Mozilla Web Things Gateway](https://iot.mozilla.org/)
