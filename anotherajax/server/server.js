if (Meteor.isServer) {
	Projects = new Meteor.Collection('projects');
  Meteor.startup(function () {
    Meteor.methods({
    	removeAllProjects:function(){
    		Projects.remove({});
    	}
    })
  });
}
