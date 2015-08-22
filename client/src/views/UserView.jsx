var React = require('react');

var Router = require('react-router');
var Navigation = Router.Navigation;
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
var Link = Router.Link;

var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var TextField = mui.TextField,
    RaisedButton = mui.RaisedButton,
    Paper = mui.Paper;

var UserView = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  getInitialState: function(){
    return {
      // user: 'nobody'
    };
  },
  render: function() {
    var user = this.props.user;
    if (user.hasOwnProperty('google')) {
      var google = user.google;
      console.log(user);

      // user submitted questions
      var solvedQuestionsList = this.props.user.submittedQuestions.map(function(question) {
        return (
          <li className="question">
            <span>{question.title}</span>
          </li>
        )
      });
      // all questions available
      var allQuestionsList = this.props.questions.map(function(question) {
        return (
          <li key={question.qNumber} className="question">
            <Link to="question" params={{qNumber:question.qNumber}} > {question.title} </Link>
          </li>
        )
      });

     var statsList = this.props.user.stats.map(function(data) {
        return (
          <li className="stats-data">
            <span>{data.q_title}</span> | 
            <span>Score: {data.score}</span> | 
            <span>Solved in: {data.time} seconds</span> | 
            <span>Solution: {data.solution}</span>
          </li>
        )
      });
      
      return (<div className=""> 
        <div className="panel">
        <div className="panel-body row">
          <div className="col-xs-12 col-sm-3 col-md-2">
            <img src={google.profileImage} className="img-responsive img-circle img-thumbnail profileImage"></img>
          </div>
          <div className="col-xs-12 col-sm-9 col-md-10">
            <h1>{google.name}</h1>
            <p><span className="bold">Location:</span> {google.location}</p>
            <p><span className="bold">Tagline:</span> {google.tagline}</p>
            <p><span className="bold">About me:</span></p>
            <p>{google.aboutMe}</p>
          </div>
        </div>
        </div>
        <div className="row">
          <div className="col-xs-6 col-sm-8 col-md-7 col-lg-7 regexResults">
            <div className="panel panel-success">
              <div className="panel-heading">
                <h4 className="panel-title">Regex Results</h4>
              </div>
              <div className="panel-body">
                <p><span className="bold">Score:</span> {user.score}</p>
                <p><span className="bold">Stats:</span></p>
                <ul>
                  {statsList}
                </ul>
              </div> 
            </div>
          </div>
           <div className="col-xs-6 col-sm-4 col-md-3 col-lg-3 submittedQuestions">
            <div className="panel panel-warning">
              <div className="panel-heading">
                <h3 className="panel-title">Submitted Challenges</h3>
              </div>
              <div className="panel-body">
                <ul>
                  {solvedQuestionsList}
                </ul> 
              </div>
            </div>
          </div>
         

        </div>

      </div>);
    } else {
      return (<div className="panel panel-danger"> 
        <div className="panel-body"><p>You are not logged in.</p></div>
        </div>)
    }
  }
})

module.exports = UserView;
