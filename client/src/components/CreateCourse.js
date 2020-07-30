import React, { Component } from 'react';
import Form from './Form';
import Data from '../Data';

export default class CreateCourse extends Component {

  constructor() {
    super()
    this.data = new Data();
  }

  state = {
    title: '',
    description:'',
    estimatedTime:'',
    materialsNeeded:'',
    errors: [],
  }

  render() {
    const { context } = this.props;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;

    return(
      <div class="bounds course--detail">
        <h1>Create Course</h1>
        <Form
          cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
            elements={() => (
              <React.Fragment>
                <div class="grid-66">
                  <div class="course--header">
                    <h4 class="course--label">Course</h4>
                    <div>
                      <input 
                        id="title" 
                        name="title" 
                        type="text" 
                        value={title}
                        onChange={this.change} 
                        class="input-title course--title--input" 
                        placeholder="Course title..." />
                      <p>By {context.authenticatedUser.Name}</p>
                    </div>
                      <textarea 
                        id="description" 
                        name="description" 
                        value={description}
                        onChange={this.change} 
                        placeholder="Course description..."
                        class="course--description" />
                  </div>
                  <div class="grid-25 grid-right">
                    <div class="course--stats">
                      <ul class="course--stats--list">
                        <li class="course--stats--list--item">
                          <h4>Estimated Time</h4>
                            <input 
                              id="estimatedTime" 
                              name="estimatedTime" 
                              type="text"
                              value={estimatedTime} 
                              onChange={this.change} 
                              class="course--time--input"                              
                              placeholder="Hours" />
                        </li>
                        <li class="course--stats--list--item">
                          <h4>Materials Needed</h4>
                            <textarea 
                              id="materialsNeeded" 
                              name="materialsNeeded"
                              value={materialsNeeded}
                              onChange={this.change} 
                              placeholder="List materials..." />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )} />
      </div>
    )
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
    const { emailAddress, password, id } = context.authenticatedUser;
    const userId = id;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    };
    context.data.createCourse(course, emailAddress, password).then( errors => {
      if (errors && errors.length > 0){
        this.setState({ errors });
      } else {
        this.props.history.push('/')
      }
    })
    .catch( err => {
      console.log(err);
      this.props.history.push('/error');
    });
  }

  cancel = () => {
    this.props.history.push('/');
  }
}
