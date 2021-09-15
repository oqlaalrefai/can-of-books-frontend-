import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import BookFormModel from "./BookFormModal";
import UpdateBook from "./component/UpdateBook";
import { withAuth0 } from "@auth0/auth0-react";
import Carousel from 'react-bootstrap/Carousel';

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

export class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Books: [],
      displayModel: false,
      showUpdateModal: false,
      selectedBookDataObj: {},
    };
  }
  handelDisplayUpdateModal = (DataBookobject) => {
    this.setState({
      showUpdateModal: !this.state.showUpdateModal,
      selectedBookDataObj: DataBookobject,
    });
  };

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
        console.log(this.state.Books)

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
      img:e.target.img.value
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
      img:e.target.img.value

    };
    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/books/${this.state.selectedBookDataObj._id}`,
        reqBody
      )
      .then((updatedBookObject) => {
        const updateBookArr = this.state.Books.map((book) => {
          if (book._id === this.state.selectedBookDataObj._id) {
            book = updatedBookObject.data;

            return book;
          }

          return book;
        });

        this.setState({
          Books: updateBookArr,
          selectedBookDataObj: {},
        });

        console.log(this.state.selectedBookDataObj);

        this.handelDisplayUpdateModal(); // hide the update modal
      })
      .catch(() => alert("Something went wrong!"));
  };

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
        {this.state.displayModel && (
          <BookFormModel
            show={this.state.displayModel}
            handleClose={this.displayModel}
            handleSubmit={this.handleSubmit}
          />
        )}
        {this.state.showUpdateModal && (
          <>
            <UpdateBook
              show={this.state.showUpdateModal}
              handelUpdateModal={this.handelUpdateModal}
              handelDisplayUpdateModal={this.handelDisplayUpdateModal}
              selectedBookDataObj={this.state.selectedBookDataObj}
            />
          </>
        )}
        {this.state.Books.length > 0 && (

          <>
        
          <Carousel>
            {this.state.Books.map((element) => {
              return (
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={element.img}
                      alt="First slide"
                    />
                    <Carousel.Caption>
                      <h3>{element.title}</h3>
                      <p>
                      {element.description}
                      </p>
                      <p>
                      {element.status}
                      </p>
                      <p>
                      {element.email}
                      </p>
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
                  <Button 
                    variant="danger"
                  onClick={this.displayModel}> ADD Book</Button>

                    </Carousel.Caption>
                  </Carousel.Item>

              );

            })}
          
          </Carousel>

          </>

        )}
        ​
      </div>
    );
  }
}
export default withAuth0(BestBooks);
