package mvc.controller;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/")
public class Server {
	static Set<Session> Users= Collections.synchronizedSet(new HashSet<Session>());
	
	@OnOpen
	public void openConnection(Session userSession){
		Users.add(userSession);
	}
	@OnMessage
	public void receiveMessage(String message, Session userSession) throws IOException{
		String nickname = (String) userSession.getUserProperties().get("nickname");
		if (nickname== null){
			userSession.getUserProperties().put("nickname", message);
			userSession.getBasicRemote().sendText(buildJsonData("System", "Escreva o seu nickname"));
			userSession.getBasicRemote().sendText(buildJsonData("System", "Seu nickname eh: " +message));
		}
		else{
			Iterator<Session> iterator = Users.iterator();
			while (iterator.hasNext()){
				iterator.next().getBasicRemote().sendText(buildJsonData(nickname, message));
			}
			
		}
	}
	@OnClose
	public void closeConnection(Session userSession){
		Users.remove(userSession);
	}
	
	private String  buildJsonData(String nickname, String message){
		JsonObject jsonObe
	}
}
