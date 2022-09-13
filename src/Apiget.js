import React, { Component } from "react";
import "./Apiget.css";
import { Modal } from "react-bootstrap";

class Apiget extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      show: false,
      status: "notdelete",
      postid: [],
      name: "",
      job: "",
      newuser: false,
    };
  }

  //    display all users
  showModal = (e) => {
    this.setState({
      show: true,
    });
  };
  //    show new user
  newusermodal = (e) => {
    this.setState({
      newuser: true,
    });
  };

  //    start get method

  async componentDidMount() {
    const response = await fetch(
      "https://api.instantwebtools.net/v1/passenger?page=0&size=10"
    );
    const mydata = await response.json();
    this.setState({ data: mydata.data });
    console.log(this.state.data);
    this.requestOptions();
  }

  //   END GET METHOD

  //  star delete method
  deletemethod = (_id) => {
    fetch(`https://api.instantwebtools.net/v1/passenger/${_id},`, {
      method: "DELETE",
    }).then(() => this.setState({ status: "Delete successful" }));
    this.deleteTask(_id);
  };

  deleteTask = (_id) => {
    console.log("delete", _id);
    const newTodos = [...this.state.data];
    const deleteindex = newTodos.findIndex((each) => {
      return each._id === _id;
    });

    newTodos.splice(deleteindex, 1);
    this.setState({
      data: newTodos,
    });
  };

  //   delete method end

  //  POST METHOD START
  postname = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  developerjob = (e) => {
    this.setState({
      job: e.target.value,
    });
  };
  postmydata = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Name: "John", job: "developer" }),
    };
    fetch("https://fakestoreapi.com/products", requestOptions)
      .then((response) => response.json())

      .then(
        (response) => console.log("hello post", response)
        //    this.setState({ postid: mypostdata })
      );
  };

  // post method end

  render() {
    console.log(this.state.status);
    console.log(this.deletemethod);
    console.log(this.state.postid);

    return (
      <>
        <div className="parentdiv">
          {/* post method */}
          <Modal show={this.state.newuser} onHide={this.state.close}>
            <Modal.Body>
              <div>
                <div>
                  <input
                    type="text"
                    placeholder="name"
                    name="name"
                    value={this.state.name}
                    onChange={(e) => this.postname(e)}
                  ></input>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Job"
                    // value=""
                    onChange={(e) => this.developerjob(e)}
                  ></input>
                </div>
              </div>
            </Modal.Body>
          </Modal>

          <div className="parentdivofbutton">
            <div>
              <button
                className="creatdadata"
                onClick={(e) => {
                  this.showModal();
                  //   this.postmydata();
                }}
              >
                Get All Users
              </button>
            </div>

            <div>
              <button
                className="creatdadata"
                onClick={(e) => {
                  this.newusermodal();
                }}
              >
                Create New User
              </button>
            </div>
          </div>
          <div>
            <div>
              <Modal show={this.state.show} onHide={this.state.close}>
                {this.state.data.map((elem, index) => {
                  console.log(elem._id);

                  return (
                    <div key={index}>
                      <Modal.Body>
                        <div className="elemdata">
                          <div>
                            <button className="btnaddedit far fa-edit add-btn"></button>
                          </div>
                          <div className="eledatalist">{elem._id}</div>
                          <div>
                            <button
                              onClick={() => {
                                this.deletemethod(elem._id);
                              }}
                              className="btnaddedit far fa-trash-alt add-btn"
                            ></button>
                          </div>
                        </div>
                      </Modal.Body>
                    </div>
                  );
                })}
              </Modal>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Apiget;
