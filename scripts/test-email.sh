#!/bin/bash
curl -X POST 'https://rcteukovzyyoptebzffb.supabase.co/functions/v1/send-deal-email' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjdGV1a292enl5b3B0ZWJ6ZmZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1MzE2MjEsImV4cCI6MjA1NDEwNzYyMX0.jq_rWXteKxTyjrLQGyUm2Gz_VoZ-Oz-SdzPsnRx8osA' \
-H 'Content-Type: application/json' \
-d '{
  "userEmail": "emonislamweb@gmail.com",
  "userName": "Emon Islam",
  "restaurantName": "Test Restaurant",
  "dealTitle": "Test Deal",
  "confirmationId": "TEST123",
  "expiryDate": "2024-02-29",
  "dealDescription": "Test Description"
}'