//adafruit IO sensor to website
//kevin root 3/2/22

#include <Adafruit_Sensor.h>
#include "AdafruitIO_WiFi.h"
//#include <HTTPClient.h>

//define everything, could add to a .h file to make prettier 
#define IO_USERNAME "kevinroot"
#define IO_KEY "aio_ebXl66LWVdPxMrittGCnFtPvvsN1"
#define IO_KEY2 "aio_ebXl66LWVdPxMrittGCnFtPvvsN1"
#define WIFI_SSID "Kevin's iPhone"
#define WIFI_PASS "abcdefgh"
#define AOUT_PIN 14 // ESP32 pin GIOP36 (ADC0) that connects to AOUT pin of moisture sensor
#define AOUT_PIN2 11
#define DATA_PIN 10
#define RELAY_PIN 13
#define RELAY_PIN2 12
#if defined(USE_AIRLIFT) || defined(ADAFRUIT_METRO_M4_AIRLIFT_LITE) ||         \
    defined(ADAFRUIT_PYPORTAL)
// Configure the pins used for the ESP32 connection
#if !defined(SPIWIFI_SS) // if the wifi definition isnt in the board variant
// Don't change the names of these #define's! they match the variant ones
#define SPIWIFI SPI
#define SPIWIFI_SS 10 // Chip select pin
#define NINA_ACK 9    // a.k.a BUSY or READY pin
#define NINA_RESETN 6 // Reset pin
#define NINA_GPIO0 -1 // Not connected
#endif
AdafruitIO_WiFi io(IO_USERNAME, IO_KEY, WIFI_SSID, WIFI_PASS, SPIWIFI_SS,
                   NINA_ACK, NINA_RESETN, NINA_GPIO0, &SPIWIFI);
#else
AdafruitIO_WiFi io(IO_USERNAME, IO_KEY, WIFI_SSID, WIFI_PASS);
#endif
//timer variables and setup 
#define BTN_STOP_ALARM    0
hw_timer_t * timer = NULL;
volatile SemaphoreHandle_t timerSemaphore;
portMUX_TYPE timerMux = portMUX_INITIALIZER_UNLOCKED;
volatile uint32_t isrCounter = 0;
volatile uint32_t lastIsrAt = 0;
void ARDUINO_ISR_ATTR onTimer(){
  portENTER_CRITICAL_ISR(&timerMux);
  isrCounter++;
  lastIsrAt = millis();
  portEXIT_CRITICAL_ISR(&timerMux);
  xSemaphoreGiveFromISR(timerSemaphore, NULL);
}
//server name to retrieve or send data from
const char* serverName = "https://webhook.site/4336236d-319a-4440-93f2-3de9cb9644b8";
// set up the feeds
AdafruitIO_Feed *moist = io.feed("moist");
AdafruitIO_Feed *moistier = io.feed("moistier");
//set up pump activation times. Can be used to deliver a certain amount of water 
int waTime = 5000; //time that pump is on
int waTime2 = 5000;
int downTime = 5000; 

//initialize web server and client 
char serverAddress[] = "https://h2bros.ddns.net";  // server address
int port = 443;
WiFiClient wifi;
HttpClient client = HttpClient(wifi, serverAddress, port);
int status = WL_IDLE_STATUS;






void setup() {

// timer setup
  pinMode(BTN_STOP_ALARM, INPUT);
  timerSemaphore = xSemaphoreCreateBinary();
  timer = timerBegin(0, 80, true);
  timerAttachInterrupt(timer, &onTimer, true);
  timerAlarmWrite(timer, 1000000, true);
  timerAlarmEnable(timer);

  pinMode(RELAY_PIN, OUTPUT); //set output pin for relay 
  pinMode(RELAY_PIN2, OUTPUT);

  // start the serial connection
  Serial.begin(115200);
  // wait for serial monitor to open
  while(! Serial);
  // connect to io.adafruit.com
  Serial.print("Connecting to Adafruit IO");
  status = WiFi.begin(WIFI_SSID, WIFI_PASS);
  io.connect();
  // wait for a connection
  while(io.status() < AIO_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.println(io.statusText());

}





void loop() {
  io.run(); //  required

    //timer function
 if (xSemaphoreTake(timerSemaphore, 0) == pdTRUE){
    uint32_t isrCount = 0, isrTime = 0;
    portENTER_CRITICAL(&timerMux); //read interrupt count
    isrCount = isrCounter;
    isrTime = lastIsrAt;
    portEXIT_CRITICAL(&timerMux);
    Serial.print("Current time:"); //print time
    Serial.print(isrCount);
    Serial.println("s");
  }





//Sensor functionality - reads pin data and sends it to adafruit.io
int value = analogRead(AOUT_PIN); //read moisture sensor from ESP32 pin 
int value2 = analogRead(AOUT_PIN2);

 //value = value/35;
 //value2 = value2/35;
 //save moisture values 
 Serial.print("Sending 1st moisuture value to server: ");
 Serial.println(value);
  moist->save(value); //sensor 1 
  Serial.print("Sending 2nd moisuture value to server: ");
 Serial.println(value2);
  moistier->save(value2); //sensor 2
  //moist->save("Water date and time");
 // delay(1000); // wait 5 seconds 
//unsigned long timeout = 50000;
// client.setTimeout(timeout);
 //make a get request 
  client.beginRequest();
  
  Serial.println("making POST request");
  String contentType = "application/x-www-form-urlencoded";
  String postData = "name=Alice&age=12";

  client.post("/get_test", contentType, postData);
  
  
  
  
 // Serial.println("Requesting data from server");
  //client.post(serverName);
 // client.get("/get_test");
  client.endRequest();
  //delay(2000);
  // read the status code and body of the response
  int statusCode = client.responseStatusCode();
  String response = client.responseBody();

  Serial.print("Status code: ");
  Serial.println(statusCode);
  Serial.print("Response: ");
  Serial.println(response);
  
  
  



/*


  // watering function, turns relay on for a given time
  digitalWrite(RELAY_PIN, HIGH); // turn on pump 5 seconds
  delay(waTime);
  digitalWrite(RELAY_PIN, LOW);  // turn off pump 5 seconds
  //delay(1000);
  digitalWrite(RELAY_PIN2, HIGH); // turn on pump 5 seconds
  delay(waTime2);
  digitalWrite(RELAY_PIN2, LOW);  // turn off pump 5 seconds
  delay(downTime);

*/


}
