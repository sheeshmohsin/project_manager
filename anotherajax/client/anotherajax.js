 Projects = new Meteor.Collection('projects');
 if (Meteor.isClient) {
 	Session.setDefault('appName', 'Project Manager');
  Session.setDefault('showProjectDialog', false);
  Session.setDefault('editing_project', null);
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
  Template.projectForm.events({
    'click .save':function(evt, tmpl){
      var name = tmpl.find('.name').value;
      var client = tmpl.find('.client').value;
      var status = tmpl.find('.status').value;
      addProject(name,client,status);
      Session.set('showProjectDialog',false);
    },
    'click .cancel':function(evt, tmpl){
      Session.set('showProjectDialog', false);
    }
  })
  Template.projects.events({
    'click .addProject':function(evt, tmpl){
      Session.set('showProjectDialog', true);
    }
  })
  Template.projectRow.events({
    'dblclick .projectRow':function(evt, tmpl){
      Session.set('editing_project',tmpl.data._id)
      Session.set('showProjectDialog',true);
    }
  })
  Template.projectForm.project = function(){
    return Projects.findOne({_id:Session.get('editing_project')})
  }
  Template.projects.showProjectDialog = function(){
    return Session.get('showProjectDialog');
  }
  var addProject = function(name,client,status){
    Projects.insert({name:name,client:client,status:status});
  }
}


