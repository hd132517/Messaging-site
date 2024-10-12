package handler;

import dao.AuthDao;
import dao.UserDao;
import dto.AuthDto;
import java.time.Instant;
import java.util.Map;
import org.apache.commons.codec.digest.DigestUtils;
import org.bson.Document;
import request.ParsedRequest;
import response.CustomHttpResponse;
import response.HttpResponseBuilder;

public class LogoutHandler implements BaseHandler{
    @Override
    public HttpResponseBuilder handleRequest(ParsedRequest request) {
        var res = new HttpResponseBuilder();
        res.setStatus("200 OK");
        //res.setHeaders(Map.of("Set-Cookie", "auth=" + hash));
        res.setHeader("Set-Cookie", "auth=" + 0);
      return res;
    }
}
