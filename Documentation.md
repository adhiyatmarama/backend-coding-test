# kanban

This is the documentation for using this test API. The base url for this API is `http://localhost:8010`


### 1. Get All Rides

* **URL**
  
  /rides

* **METHOD**
  
  `GET`

* **SUCCESS RESPONSE**
  
  * CODE: 200 
  * Content:
  
    ```javascript
    [
        {
            "rideID": 1,
            "startLat": 0,
            "startLong": 0,
            "endLat": 45,
            "endLong": 45,
            "riderName": "Adhiyatma",
            "driverName": "Adhiyatma",
            "driverVehicle": "Car",
            "created": "2020-06-13 03:25:06"
        }
    ]
    ```

* **ERROR RESPONSE**
  
  * Empty Data of Rides
    
    * CODE: 404
    
    * Content:
        
      ```javascript
        {
            "error_code": 404,
            "type": 'RIDES_NOT_FOUND_ERROR',
            "message": 'Could not find any rides'
        }
      ```
    
  * Server Error
  
    * CODE: 500

    * Content:

      ```javascript
        {
            "error_code": 500,
            "type": 'SERVER_ERROR',
            "message": 'Unknown error'
        }
      ```

### 2. Add Ride

* **URL**
  
  /rides

* **METHOD**
  
  `POST`

* **REQUEST BODY**
  
  Using JSON

  ```javascript
  {
    "start_lat": 0,
    "start_long": 0,
    "end_lat": 50,
    "end_long": 50,
    "rider_name": "Yasin",
    "driver_name": "Yasin",
    "driver_vehicle": "Motor cycle",
  }
  ```

* **SUCCESS RESPONSE**
  
  * CODE: 201 
  * Content:
  
    ```javascript
    {
        "message": "Successfully add a ride",
        "ride": {
            "rideID": 1,
            "startLat": 0,
            "startLong": 0,
            "endLat": 50,
            "endLong": 50,
            "riderName": "Yasin",
            "driverName": "Yasin",
            "driverVehicle": "Motor cycle",
            "created": "2020-06-13 03:35:09"
        },
    }
    ```

* **ERROR RESPONSE**
  
  * Validation Errors
    
    * CODE: 400
    
    * Content:
        
      ```javascript
        {
            "error_code": 400,
            "type" : "VALIDATION_ERROR",
            "messages": [
                'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
                'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
                'Rider name must be a non empty string',
                'Driver name must be a non empty string',
                'Driver Vehicle must be a non empty string',
            ]
        }
      ```

  * Server Error
    
    *   CODE: 500

    *   Content:

        ```javascript
        {
            "error_code": 500,
            "type": 'SERVER_ERROR',
            "message": 'Unknown error'
        }
        ```

### 3. Get Ride by Id

* **URL**
  
  /rides/_id_

* **METHOD**
  
  `GET`

* **SUCCESS RESPONSE**
  
  * CODE: 200 
  * Content:
  
    ```javascript
    {
        "ride": {
            "rideID": 1,
            "startLat": 0,
            "startLong": 0,
            "endLat": 50,
            "endLong": 50,
            "riderName": "Yasin",
            "driverName": "Yasin",
            "driverVehicle": "Motor cycle",
            "created": "2020-06-13 03:35:09"
        }
    }
    ```

* **ERROR RESPONSE**
  
  * Empty Data of Rides
    
    * CODE: 404
    
    * Content:
        
      ```javascript
        {
            "error_code": 404,
            "type": 'RIDES_NOT_FOUND_ERROR',
            "message": 'Could not find any rides'
        }
      ```
  
  * Server Error
    
    * CODE: 500
    
    * Content:
        
      ```javascript
        {
            "error_code": 500,
            "type": 'SERVER_ERROR',
            "message": 'Unknown error'
        }
      ```
