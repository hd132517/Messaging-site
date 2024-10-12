package dao;

import com.mongodb.client.MongoCollection;
import dto.AuthDto;
import java.util.List;
import java.util.stream.Collectors;
import org.mockito.Mockito;
import org.testng.annotations.Test;

public class DaoTests {

  @Test
  public void testPut(){
    MongoCollection mongoCollection = Mockito.mock(MongoCollection.class);
    AuthDao dao = AuthDao.getInstance(mongoCollection);
    Mockito.doNothing().when(mongoCollection).insertOne(Mockito.any());
    var item = new AuthDto();
    dao.put(item);
    Mockito.verify(mongoCollection).insertOne(Mockito.any());
    var a = List.of(1,2,3).parallelStream()
        .map(r -> r * 3)
        .collect(Collectors.toList());
    System.out.println(a);
  }

}
