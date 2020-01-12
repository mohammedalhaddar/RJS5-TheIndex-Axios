import React, { Component } from "react";

// import authors from "./data.js";
import axios from "axios";

// Components
import Sidebar from "./Sidebar";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";

class App extends Component {
  state = {
    currentAuthor: null,
    authors: [],
    isLoading: true,
  };

  componentDidMount(){
    this.loadData()
  }

  loadData = async () => {
    let auths = await axios.get("https://the-index-api.herokuapp.com/api/authors/")
    this.setState({
      authors: auths.data,
      isLoading: false
    })
  }

  selectAuthor = async author => {
    let fullAuth = await axios.get(`https://the-index-api.herokuapp.com/api/authors/${author.id}`)
    this.setState({ currentAuthor: fullAuth.data });
  }

  unselectAuthor = () => this.setState({ currentAuthor: null });

  getContentView = () => {
    if (this.state.isLoading){
      return (
        <div>Loading</div>
      )
    }
    if (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return <AuthorsList authors={this.state.authors} selectAuthor={this.selectAuthor} />;
    }
  };

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          <div className="content col-10">{this.getContentView()}</div>
        </div>
      </div>
    );
  }
}

export default App;
