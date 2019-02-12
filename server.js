const express = require('express');
const middleware = require('@line/bot-sdk').middleware
const Client = require('@line/bot-sdk').Client
const app = express()

const request = require('request');


const config = {
  channelAccessToken: 'P02zvwoGejY/WCwNq5vKYIjgP6Fk32N5pNwp2pFrUyFtncn9Yh/FzIrquyTBPJ5Q1R6UnZA5ZPj29nCEW56uYaqgxr+LOLNTgPUzOSUVVlVjVHOp0Hrfc/TLkZ6S9PaZu9t5HS+HJqoD0d1K5ndaggdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'd4aa8ac0fa63fb5ecaef3477aff4034b'
}

const client = new Client(config)

app.get('/', function (req, res) {
	res.send('Hello world!!');
})

app.post('/webhook', middleware(config), (req, res) => {
  console.log(req.body.events) // webhook event objects
  console.log(req.body.destination) // user ID of the bot (optional)
  res.sendStatus(200)
  Promise.all(req.body.events.map(handleEvent))
})

function handleEvent(event){
  //if (event.message.type == "text"){
    /*
    var parts = event.message.text.split("x");
    //console.log(event.message.text[0].trim())
    if (parts[0].trim() == 'สวัสดี') {

        for(var i=1;i<=parts[1].trim();i++){
          console.log("hi :"+i)
          let msg = {
              type: "text",
              text: "สวัสดี x " + i
            }
            client.pushMessage(event.source.userId,msg)
      }
      return client.pushMessage(event.source.userId,msg)
      
    }
    */
  if (event.message.type == "text" && event.message.text == "ดี"){
    let msg = {
      type: "text",
      text: "สวัสดีคุณชื่ออะไร ?"
    }
    return client.replyMessage(event.replyToken,msg)

  } else if (event.message.type == "text" && event.message.text == "location"){

    //https://fathomless-reaches-36581.herokuapp.com/api?lat=18.77769165814301&long=98.95345357232975

    var url = 'https://fathomless-reaches-36581.herokuapp.com/api?lat=18.77769165814301&long=98.95345357232975';

    //{ json: true, body: requestData }
 
  


    let msg = {
      // type: "text",
      // text: event.message.text
       //id: "325708",
       type: "location",
       title: "มิ่งมิตร สาขา Malada Space",
       address: "ตำบล สุเทพ อำเภอเมืองเชียงใหม่ เชียงใหม่ 50200",
       latitude: 18.775691 ,
       longitude: 98.954701
     }



    /*
    let msg = {
      // type: "text",
      // text: event.message.text
       //id: "325708",
       type: "location",
       title: "มิ่งมิตร สาขา Malada Space",
       address: "ตำบล สุเทพ อำเภอเมืองเชียงใหม่ เชียงใหม่ 50200",
       latitude: 18.775691 ,
       longitude: 98.954701
     }
     // client.replyMessage(event.replyToken,msg)
     //client.pushMessage(event.source.userId,msg)
     */
     //return client.pushMessage(event.source.userId,msg)
  } else if (event.message.type == "text" && event.message.text == "menu"){

    let msg = {
      "type": "template",
      "altText": "this is a carousel template",
      "template": {
          "type": "carousel",
          "columns": [
              {
                "thumbnailImageUrl": "https://example.com/bot/images/item1.jpg",
                "imageBackgroundColor": "#FFFFFF",
                "title": "this is menu",
                "text": "description",
                "defaultAction": {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "http://example.com/page/123"
                },
                "actions": [
                    {
                        "type": "postback",
                        "label": "Buy",
                        "data": "action=buy&itemid=111"
                    },
                    {
                        "type": "postback",
                        "label": "Add to cart",
                        "data": "action=add&itemid=111"
                    },
                    {
                        "type": "uri",
                        "label": "View detail",
                        "uri": "http://example.com/page/111"
                    }
                ]
              },
              {
                "thumbnailImageUrl": "https://example.com/bot/images/item2.jpg",
                "imageBackgroundColor": "#000000",
                "title": "this is menu",
                "text": "description",
                "defaultAction": {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "http://example.com/page/222"
                },
                "actions": [
                    {
                        "type": "postback",
                        "label": "Buy",
                        "data": "action=buy&itemid=222"
                    },
                    {
                        "type": "postback",
                        "label": "Add to cart",
                        "data": "action=add&itemid=222"
                    },
                    {
                        "type": "uri",
                        "label": "View detail",
                        "uri": "http://example.com/page/222"
                    }
                ]
              }
          ],
          "imageAspectRatio": "rectangle",
          "imageSize": "cover"
      }
    }
    return client.replyMessage(event.replyToken,msg)
  }
}

app.set('port', (process.env.PORT || 4000))
app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})

