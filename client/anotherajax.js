 Projects = new Meteor.Collection('projects');
 if (Meteor.isClient) {
 	Session.setDefault('appName', 'Project Manager');
  Session.setDefault('showProjectDialog', false);
  Session.setDefault('editing_project', null);
  Session.setDefault('employees_active', false);
  Session.setDefault('projects_active', false);
  Session.setDefault('home_active', false);
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
  Template.menu.home_active = function() {
    return Session.get('home_active');
  }
  Template.menu.projects_active = function() {
    return Session.get('projects_active');
  }
  Template.menu.employees_active = function() {
    return Session.get('employees_active');
  }
  Template.menu.events({
    'click .home':function(evt,tmpl){
      Session.set('home_active',true);
      Session.set('projects_active',false);
      Session.set('employees_active',false);
    },
    'click .projects':function(evt,tmpl){
      Session.set('home_active',false);
      Session.set('projects_active',true);
      Session.set('employees_active',false);
    },
    'click .employees':function(evt,tmpl){
      Session.set('home_active',false);
      Session.set('projects_active',false);
      Session.set('employees_active',true);
    }
  })
  Template.projectForm.events({
    'click .save':function(evt, tmpl){
      var name = tmpl.find('.name').value;
      var client = tmpl.find('.client').value;
      var status = tmpl.find('.status').value;
      if(Session.get('editing_project')) {
        updateProject(name,client,status);
      } else {
      addProject(name,client,status);
      }
      Session.set('showProjectDialog',false);
      Session.set('editing_project',null);
    },
    'click .cancel':function(evt, tmpl){
      Session.set('showProjectDialog', false);
      Session.set('editing_project',null);
    },
    'click .remove':function(evt,tmpl){
      removeProject();
      Session.set('showProjectDialog',false)
      Session.set('editing_project',null)
    }
  })
  Template.projects.events({
    'click .addProject':function(evt, tmpl){
      Session.set('showProjectDialog', true);
    }
  })
  Template.projectForm.rendered = function(){
    var project = Projects.findOne({_id:Session.get('editing_project')})
    $('.status').val(project.status);
  }
  Template.projectRow.events({
    'dblclick .projectRow':function(evt, tmpl){
      Session.set('editing_project',tmpl.data._id)
      Session.set('showProjectDialog',true);
    }
  })
  Template.projectForm.project = function(){
    return Projects.findOne({_id:Session.get('editing_project')})
  }
  Template.projectForm.editing_project = function(){
    return Session.get('editing_project');
  }
  Template.projects.showProjectDialog = function(){
    return Session.get('showProjectDialog');
  }
  var addProject = function(name,client,status){
    Projects.insert({name:name,client:client,status:status});
  }
  var updateProject = function(name,client,status){
    Projects.update(Session.get('editing_project'), {$set: {name:name,client:client,status:status}});
    return true;
  }
  var removeProject = function(){
    Projects.remove({_id:Session.get('editing_project')});
  }
}


