// Require the Model
// a model by convention singular and upperCase
const SkillModel = require('../models/skill')

module.exports = {
	index: index,
	show,
	new: newSkill,
	create,
	delete: deleteSkill,
	edit,
	update
	// optionally
	// index
}

function update(req, res){
	// always look at the content of the 
	// form in your terminal!
	console.log(req.body)
	// !! forces the datatype to its truthy or falsy value
	// req.body.done when its undefined would be forced to false
	// req.body.done when its value is 'on' would be forced to true

	req.body.done = !!req.body.done;

	// Tell the model, hey here is the update we want to add 
	// to the todo with this id
	SkillModel.update(req.params.id, req.body);

	res.redirect(`/skills/${req.params.id}`)
}

function edit(req, res){
	// get A todo from the DB
	const skill = SkillModel.getOne(req.params.id);
	console.log(skill, " < skill from the db")
	res.render('skills/edit', {skill: skill})
}


function deleteSkill(req, res){
	// tell the model to delete the todo of the id 
	// req.params.id represents the id coming from 
	// the form on the client
	SkillModel.deleteOne(req.params.id);
	res.redirect('/skills')
}

function create(req, res){
	console.log(req.body, ' <- req.body, which is the contents of the form')
	// give the model the contents of the form to put into the database (we have fake database right now)
	SkillModel.create(req.body)
	// respond with a redirct, 
	// so we tell the client a page to make a request too, its our choice
	// in this case lets redirect the client back to the todo's index page, where we are listing 
	// all the todos
	// res.redirect doesn't accept a view, it accepts a path of a route
	res.redirect('/skills')
}

function newSkill(req, res){


   res.render('skills/new') 
}

function show(req, res){
	console.log(req.params.id, " <- req.params.id")

	res.render('skills/show', {skill: SkillModel.getOne(req.params.id) })
}



// then render the todos/index.ejs, and inject a todos variable,
// that contains all the todos in the model file

function index(req, res, next) {
	
	res.render('skills/index.ejs', {skills: SkillModel.getAll() })
}