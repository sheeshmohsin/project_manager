if (Meteor.isServer) {
	Projects = new Meteor.Collection('projects');
  Meteor.startup(function () {
    return Meteor.methods({
    	removeAllPosts: function() {
    		return Projects.remove({});
    	}
    })
  });
}
