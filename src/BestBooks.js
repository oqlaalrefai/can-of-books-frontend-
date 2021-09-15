import React from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import BookFormModel from "./BookFormModal";
import UpdateBook from './component/UpdateBook';
import { withAuth0 } from '@auth0/auth0-react';


const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

export class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Books: [],
      displayModel: false,
      showUpdateModal: false,
      selectedBookDataObj: {}
    };
  }
  handelDisplayUpdateModal=(DataBookobject)=>{
    this.setState({
      showUpdateModal: !this.state.showUpdateModal,
      selectedBookDataObj:DataBookobject

    });
  }

  displayModel = () => {
    this.setState({
      displayModel: !this.state.displayModel,
    });
  };


  componentDidMount = () => {
    axios
      .get(`${REACT_APP_SERVER_URL}/books/${this.props.auth0.user.email}`)
      .then((bookResponse) => {
        this.setState({ Books: bookResponse.data });
      })
      .catch((error) => alert("the book collection is empty."));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      title: e.target.bookName.value,
      description: e.target.bookDescription.value,
      status: e.target.bookStatus.value,
      email: e.target.email.value,
    };

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/books`, requestBody)
      .then((respondBooks) => {
        this.state.Books.push(respondBooks.data);
        this.setState({ Books: this.state.Books });
        this.displayModel();
      })
      .catch(() => alert("something went Wrong"));
  };
  handelUpdateModal = (e) => {
    e.preventDefault();

    const reqBody = {
      title: e.target.bookName.value,
      description: e.target.bookDescription.value,
      status: e.target.bookStatus.value,
      email: e.target.email.value,
  
    };
    axios.put(`${process.env.REACT_APP_SERVER_URL}/books/${this.state.selectedBookDataObj._id}`, reqBody).then(updatedBookObject => {

      

      const updateBookArr = this.state.Books.map(book => {


        if (book._id === this.state.selectedBookDataObj._id) {
          book = updatedBookObject.data

          return book;
        }

        return book;

      });

      this.setState({
        Books: updateBookArr,
        selectedBookDataObj: {}
      })

console.log(this.state.selectedBookDataObj);

      this.handelDisplayUpdateModal(); // hide the update modal

    }).catch(() => alert("Something went wrong!"));
  

  }

  handelDeleteBook = (bookId) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/books/${bookId}`)
      .then((deleteResponse) => {
        if (deleteResponse.data.deletedCount === 1) {
          const newBooksArray = this.state.Books.filter(
            (book) => book._id !== bookId
          );
          this.setState({ Book: newBooksArray });
        }
      })
      .catch(() => alert("something went wrong"));
  };

  render() {
    return (
      <div>
        <Button onClick={this.displayModel}> ADD Book</Button>

        {this.state.displayModel &&
        
        <BookFormModel
          show={this.state.displayModel}
          handleClose={this.displayModel}
          handleSubmit={this.handleSubmit}

        />
        
        }
        {
          this.state.showUpdateModal &&
          <>
            <UpdateBook
              show={this.state.showUpdateModal}
              handelUpdateModal={this.handelUpdateModal}
              handelDisplayUpdateModal={this.handelDisplayUpdateModal}
              selectedBookDataObj={this.state.selectedBookDataObj}
            />
          </>
        }
        
        {this.state.Books.length > 0 &&
          <>
            {this.state.Books.map((element) => {
              return (
                <>
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>{element.title}</Card.Title>
                      <Card.Text> {element.description}</Card.Text>
                      <Card.Text> {element.status}</Card.Text>
                      <Card.Text> {element.email}</Card.Text>
                    </Card.Body>
                    <Button
                      variant="danger"
                      onClick={() => this.handelDeleteBook(element._id)}
                    >
                      Delete Book
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => this.handelDisplayUpdateModal(element)}
                    >
                      Update Book
                    </Button>
                  </Card>
                </>
              );
            })}
          </>
        }
        ​
      </div>
    );
  }
}
export default withAuth0(BestBooks);