import React, { Component, Fragment } from 'react';
import Form from './Form';





export default class UpdateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      user: '',
      courseId: '',
      userId: '',
      errors: []
    }
  }
  

  
  async componentDidMount() {
    const { context } = this.props;
    context.data.courseDetail(this.props.match.params.id).then(course => {
        this.setState({
          title: course.title,
          description: course.description,
          estimatedTime: course.estimatedTime,
          materialsNeeded: course.materialsNeeded,
          user: context.authenticatedUser,
          courseId: course.id,
          userId: course.userId
        });
    })
    .catch((err) => {
      console.log(err);
      this.props.history.push("/notfound");
    });
  }

  render() {
    const { context } = this.props;
    const  {
    title,
    description,
    estimatedTime,
    materialsNeeded,
    errors
    } = this.state;
    
    return(
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Update Course"
          elements={() => (
            <Fragment>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <div>
                    <input 
                      id="title" 
                      name="title" 
                      type="text" 
                      value={title}
                      onChange={this.change} 
                      className="input-title course--title--input" 
                      placeholder="Course title..." />
                  </div>
                  <p>By {context.authenticatedUser.Name}</p>
                </div>
                <div className="course--description">
                  <div>
                    <textarea 
                      id="description" 
                      name="description" 
                      value={description}
                      onChange={this.change} 
                      placeholder="Course description..."
                      className="course--description" />
                  </div> 
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <div>
                        <input 
                          id="estimatedTime" 
                          name="estimatedTime" 
                          type="text"
                          value={estimatedTime} 
                          onChange={this.change} 
                          className="course--time--input"                              
                          placeholder="Hours" />
                      </div>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div>
                        <textarea
                          id="materialsNeeded" 
                          name="materialsNeeded"
                          value={materialsNeeded}
                          onChange={this.change} 
                          placeholder="List materials..." 
                        ></textarea>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </Fragment>
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
    const { emailAddress, password, } = context.authenticatedUser;
    const {
      title,
      user,
      description,
      estimatedTime,
      userId,
      materialsNeeded,
    } = this.state;

    const courseId = this.props.match.params.id;
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
      user
    };
    
    context.data.updateCourse(courseId, course, emailAddress, password).then( errors => {
      if (errors && errors.length > 0){
        this.setState({ errors });
      } else {
        this.props.history.push('/forbidden')
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
