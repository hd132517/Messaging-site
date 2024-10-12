package handler;

import dao.ConversationDao;
import dao.MessageDao;
import dao.UserDao;
import dto.ConversationDto;
import dto.MessageDto;
import handler.AuthFilter.AuthResult;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import org.bson.Document;
import request.ParsedRequest;
import response.CustomHttpResponse;
import response.HttpResponseBuilder;
import response.RestApiAppResponse;

public class MessageClearHandler implements BaseHandler{
    @Override
    public HttpResponseBuilder handleRequest(ParsedRequest request) {
        MessageDto messageDto = GsonTool.gson.fromJson(request.getBody(), dto.MessageDto.class);
        MessageDao messageDao = MessageDao.getInstance();
        ConversationDto conversationDto = new ConversationDto();
        ConversationDao conversationDao = ConversationDao.getInstance();

        AuthResult authResult = AuthFilter.doFilter(request);
        if(!authResult.isLoggedIn){
            return new HttpResponseBuilder().setStatus(StatusCodes.UNAUTHORIZED);
        }

        String conversationId = makeConvoId(messageDto.getFromId(), messageDto.getToId());

        conversationDto.setConversationId(conversationId);
        conversationDao.remove(conversationDto);

        messageDto.setConversationId(conversationId);
        messageDao.remove(messageDto);

        var res = new RestApiAppResponse<>(true, List.of(messageDto), null);
        return new HttpResponseBuilder().setStatus("200 OK").setBody(res);
    }

    public static String makeConvoId(String a, String b){
        return List.of(a,b).stream()
                .sorted(Comparator.naturalOrder())
                .collect(Collectors.joining("_"));
    }
}
