package app.rest.model;

import app.model.Comment;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Pavel on 08.09.2017.
 */
public class BookInfo {

    public BookInfo(Long id, String name, String publisher, Date datePublished) {
        this.id = id;
        this.name = name;
        this.publisher = publisher;
        this.datePublished = datePublished;
    }

    private Long id;

    private String name;

    private String publisher;

    private Date datePublished;

    private List<String> authors = new ArrayList<>();

    private List<CommentInfo> comments = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public Date getDatePublished() {
        return datePublished;
    }

    public void setDatePublished(Date datePublished) {
        this.datePublished = datePublished;
    }

    public List<String> getAuthors() {
        return authors;
    }

    public void setAuthors(List<String> authors) {
        this.authors = authors;
    }

    public List<CommentInfo> getComments() {
        return comments;
    }

    public void setComments(List<CommentInfo> comments) {
        this.comments = comments;
    }
}
