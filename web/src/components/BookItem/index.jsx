import React from 'react'
import ActionButton from './../GroupIconButton/FavorDeleteButton'
import Paper from 'material-ui/Paper'
import Comments from './../Comments'

class BookCard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      favorite: false
    }
  }

  handleDeleteBook = () => {
    this.props.deleteBook();
  }

  groupAuthors = (authors) => {
    let result = ''
    if (Array.isArray(authors)) {
      result = authors.map((a, i) => i === 0 ? a.name : ', ' + a.name)
    }
    return result
  }

  render() {
    const { book, edit, added, liked } = this.props;
    return (
      <div className="book-card-container">
        <div className="book-card-img">
          <div>
            <img src={book.cover ? book.cover : require("../../img/book.png")} alt="book" width="226" height="300" />
          </div>
        </div>
        <Paper zDepth={2} className="box-card-info">
          <div className="book-card-info">
            <p><span> Book name:</span> {book.name}</p>
            <p><span>Authors:</span> {this.groupAuthors(book.authors)}</p>
            <p><span>Genre:</span> {book.genre ? book.genre.name : ''}</p>
            <ActionButton
              added={added} liked={liked}
              toggleLikeBook={this.props.handleToggleLikeBook}
              handleClickFavor={this.props.handleAddToCollection}
              handleClickUnfavor={this.props.handleRemoveFromCollection}
              countLiked={book.rating}
            />
          </div>
        </Paper>
        <div className="book-card-description">
          Description: {book.description?book.description:"don`t have description, possible will add soon."}
        </div>
        <Comments className="book-comments" comments={book.comments} handleSendComment={this.props.handleSendComment} />
      </div>
    )
  }
}

BookCard.defaultProps = { edit: false }

export default BookCard