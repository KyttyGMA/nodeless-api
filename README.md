***General description*** This API consumes the Gold-API to obtain the current gold price in USD and then calculates how many tangerines can be bought with one unit of gold, using a fixed price of 0.33 USD per tangerine acordin to wallmart's tangerine price .


***ENDPOINT*** The API has a single endpoint, which is a GET request that returns the number of mandarins that can be bought with one unit of gold.


***RESPONSE*** The response is an integer representing the number of mandarins that can be bought with one unit of gold.


***NOTES*** The API uses the https library to make the GET request to the Gold-API. The response is parsed as JSON and the gold price in USD is extracted. Then, the number of mandarins that can be bought with one unit of gold is calculated and returned as a string.
