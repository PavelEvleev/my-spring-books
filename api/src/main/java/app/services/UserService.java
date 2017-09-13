package app.services;

import app.model.Author;
import app.model.Book;
import app.model.User;
import app.repository.UserRepository;
import app.rest.model.BookInfo;
import app.rest.model.CreateUserCommand;
import app.rest.model.UserInfo;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserInfo> findAll() {
        List<UserInfo> userInfos = userRepository.findAll().
                stream().map((userItem)->initUserInfo(userItem)).collect(Collectors.toList());
        return userInfos;
    }

    public UserInfo findOne(Long id) {
        User tmp = userRepository.findOne(id);
        return initUserInfo(tmp);
    }

    private UserInfo initUserInfo(User user) {
        UserInfo userInfo = new UserInfo();
        userInfo.setId(user.getId());
        userInfo.setName(user.getName());
        userInfo.setPassword(user.getPassword());
        userInfo.setPhone(user.getPhone());
        if (user.getBooks() != null)
            userInfo.setBooks(getBooks(user.getBooks()));
        return userInfo;
    }

    private List<BookInfo> getBooks(List<Book> list) {
        return list.stream().map((bookItem) -> new BookInfo() {{
            setId(bookItem.getId());
            setName(bookItem.getName());
            setPublisher(bookItem.getPublisher());
            setDatePublished(bookItem.getDatePublished());
            setAuthors(UserService.this.getAuthors(bookItem.getAuthors()));
        }}).collect(Collectors.toList());
    }

    private List<String> getAuthors(List<Author> list) {
        return list.stream().map((authorItem) -> authorItem.getName()).collect(Collectors.toList());
    }

    @Transactional
    public UserInfo save(CreateUserCommand user) {
        User newUser = new User(user.getName(), user.getPhone(), user.getPassword());
        return initUserInfo(userRepository.save(newUser));
    }

    @Transactional
    public void delete(Long id) {
        userRepository.delete(id);
    }

    @Transactional
    public void delete(User user) {
        userRepository.delete(user);
    }

    @Transactional
    public void deleteAll() {
        userRepository.deleteAll();
    }

    @Transactional
    public void save(Iterable<User> list) {
        userRepository.save(list);
    }


    public boolean exist(Long id) {
        return userRepository.exists(id);
    }

    public long count() {
        return userRepository.count();
    }
}
