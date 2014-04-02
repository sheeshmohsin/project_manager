 Projects = new Meteor.Collection('projects');
 if (Meteor.isClient) {
 	Session.setDefault('appName', 'Project Manager');
  Meteor.Router.add({
	'/':'homepage',
	'/projects':'projects',
	'/employees':'employees'
	})
  Handlebars.registerHelper("formatDate", function(datetime, format){
    if(moment) {
      return moment(datetime).format("MM/DD/YYYY");
    }
    else {
      return datetime;
    }
  });
  Template.menu.appName = function() {
  	return Session.get('appName');
  }
  Template.projects.projectList = function(){
  	return Projects.find()
  }
}


