https://sst.dev/chapters/setup-secure-pages.html

npx aws-api-gateway-cli-test --username admin@example.com --password Passw0rd! --user-pool-id $USER_POOL_ID --app-client-id $USER_POOL_CLIENT_ID --cognito-region $COGNITO_REGION --identity-pool-id $IDENTITY_POOL_ID --invoke-url $API_ENDPOINT --api-gateway-region $API_REGION --path-template /notes --method POST --body "{\"content\":\"hello world\",\"attachment\":\"hello.jpg\"}"

admin@example.com --password Passw0rd!

// we can need it soon
aws cognito-idp admin-confirm-sign-up \
   --region COGNITO_REGION \
   --user-pool-id USER_POOL_ID \
   --username YOUR_USER_EMAIL
