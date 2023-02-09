export type AmplifyDependentResourcesAttributes = {
  "api": {
    "addApi": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    },
    "deleteApi": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    },
    "getOrder": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    },
    "updateOrder": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    }
  },
  "auth": {
    "crudapplicationdde90a3e": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    }
  },
  "function": {
    "orderLambda": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  },
  "storage": {
    "ordersDb": {
      "Arn": "string",
      "Name": "string",
      "PartitionKeyName": "string",
      "PartitionKeyType": "string",
      "Region": "string",
      "StreamArn": "string"
    }
  }
}