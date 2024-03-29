SETUP THE PROJECT

In the VSCode terminal:

Step 1: npm install

Step 2: npm start

NOTE:
API ENDPOINT:

For BESTURL:

1. Endpoint: http://localhost:8000/users/signup\
   Method: POST\
   Body: {
   userId: "string"
   }\

   API Response: {
   success: true,
   apiKey: "ebos.234bcsncs....."
   }

2. Endpoint: http://localhost:8000/besturl/payment/getQRCode\
   Method: POST\
   Body: {
   "domainName":"string",
   "walletAddress": "string",
   "amount": number,
   "userId": "string"  
   }\
   headers: {
   auth: {
   key: apikey,
   value: "ebos.234abc4bcdn....." /// the return apiKey when signup
   }
   }\

   API Response: {
   "url": "string",
   "ref": "string",
   "sol": number
   }

3. Endpoint: http://localhost:8000/besturl/payment/verify-transaction\
   Method: POST\
   Body: {
   "reference":"string",
   "userId": "string"
   }\
   headers: {
   auth: {
   key: apikey,
   value: "ebos.234abc4bcdn....." /// the return apiKey when signup
   }
   }\

   API Response: {
   status: "string",
   success: boolean,
   signature: "string",
   }

For KOLKART:

1. Endpoint: http://localhost:8000/users/signup\
   Method: POST\
   Body: {
   userId: "string"
   }\

   API Response: {
   success: true,
   apiKey: "ebos.234bcsncs....."
   }

2. Endpoint: http://localhost:8000/besturl/payment/getQRCode\
   Method: POST\
   Body: {
   "orderId":"string",
   "walletAddress": "string",
   "amount": number,
   "userId": "string"  
   }\
   headers: {
   auth: {
   key: apikey,
   value: "ebos.234abc4bcdn....." /// the return apiKey when signup
   }
   }\

   API Response: {
   "url": "string",
   "ref": "string",
   "sol": number
   }

3. Endpoint: http://localhost:8000/besturl/payment/verify-transaction\
   Method: POST\
   Body: {
   "reference":"string",
   "userId": "string"
   }\
   headers: {
   auth: {
   key: apikey,
   value: "ebos.234abc4bcdn....." /// the return apiKey when signup
   }
   }\

   API Response: {
   status: "string",
   success: boolean,
   signature: "string",
   }
