

package example;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.services.dynamodbv2.model.ScanRequest;
import com.amazonaws.services.dynamodbv2.model.ScanResult;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.google.gson.Gson;


public class LambdaRequestHandler{   

    static String getAlphaNumericString(int n){
		String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
				+ "0123456789"
				+ "abcdefghijklmnopqrstuvxyz";
		StringBuilder sb = new StringBuilder(n);
		for (int i = 0; i < n; i++) {
		int index
			= (int)(AlphaNumericString.length()
			* Math.random());
		sb.append(AlphaNumericString
			.charAt(index));
		}
		
		return sb.toString();
	}   
	private static String tablename=System.getenv("STORAGE_ORDERSDB_NAME");
    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent request, Context context){
		APIGatewayProxyResponseEvent apiGatewayProxyResponseEvent=new APIGatewayProxyResponseEvent();
		Gson gson=new Gson();
		Map<String , String>headers=new HashMap<>();
        headers.put("Access-Control-Allow-Headers", "Content-Type");
        headers.put("Access-Control-Allow-Origin", "*");    
        headers.put("Access-Control-Allow-Methods", "OPTIONS,POST,GET");
		if(request.getHttpMethod().equals("GET") && request.getPath().equals("/getOrder")){
			AmazonDynamoDB amazonDynamoDB=AmazonDynamoDBClientBuilder.standard().build();
			ScanResult scanResult=amazonDynamoDB.scan(new ScanRequest().withTableName(tablename));
			List<ResponseClass> orders =scanResult.getItems().stream().map(
				item->new ResponseClass(
					item.get("id").getS(),
					item.get("itemName").getS(),
					Integer.parseInt(item.get("quantity").getN())
				)
			)
			.collect(Collectors.toList());
			return apiGatewayProxyResponseEvent.withBody(gson.toJson(orders)).withStatusCode(200).withHeaders(headers);
		}
		if(request.getHttpMethod().equals("POST") && request.getPath().equals("/addOrder")){
			RequestClass order=gson.fromJson(request.getBody(),RequestClass.class);
			DynamoDB dynamoDB=new DynamoDB(AmazonDynamoDBClientBuilder.standard().build());
			Table table=dynamoDB.getTable(tablename);
			Item item=new Item().withPrimaryKey("id", getAlphaNumericString(20))
								.withString("itemName", order.getItemName())
								.withNumber("quantity", order.getQuantity());
			table.putItem(item);
			return apiGatewayProxyResponseEvent.withBody(gson.toJson("Order Added successfully")).withStatusCode(200).withHeaders(headers);
		}
		
        if(request.getHttpMethod().equals("DELETE") && request.getPath().equals("/deleteOrder")){
			RequestClass order=gson.fromJson(request.getBody(),RequestClass.class);
			DynamoDB dynamoDB=new DynamoDB(AmazonDynamoDBClientBuilder.standard().build());
			Table table=dynamoDB.getTable(tablename);
			table.deleteItem("id", order.getId());
			return apiGatewayProxyResponseEvent.withBody(gson.toJson(order.getItemName()+" deleted")).withStatusCode(200).withHeaders(headers);
		}
        if(request.getHttpMethod().equals("PUT") && request.getPath().equals("/updateOrder")){
			RequestClass order=gson.fromJson(request.getBody(),RequestClass.class);
			DynamoDB dynamoDB=new DynamoDB(AmazonDynamoDBClientBuilder.standard().build());
			Table table=dynamoDB.getTable(tablename);
			Map<String,String>expressionAttributeNames=new HashMap<>();
			expressionAttributeNames.put("#N", "itemName");
			expressionAttributeNames.put("#Q", "quantity");
			Map<String,Object>expressionAttributeValues=new HashMap<>();
			expressionAttributeValues.put(":ValN",order.getItemName());
			expressionAttributeValues.put(":ValQ", order.getQuantity());
			table.updateItem("id", order.getId(),
			 "SET #N=:ValN,#Q=:ValQ",expressionAttributeNames,expressionAttributeValues);
			return apiGatewayProxyResponseEvent.withBody(gson.toJson(order.getItemName()+" updated")).withStatusCode(200).withHeaders(headers);
		}
		
		return apiGatewayProxyResponseEvent.withHeaders(headers).withBody("resource not found");
    }
}