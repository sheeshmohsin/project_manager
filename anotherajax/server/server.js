if (Meteor.isServer) {
	Projects = new Meteor.Collection('projects');
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
