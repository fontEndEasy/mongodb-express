var express = require('express');
var router = express.Router(); // 路由处理
var crypto = require('crypto'); // 加密处理
var User = require('../models/user'); // 用户信息model
var mongodb = require('../models/db'); // mongo配置文件
var Post = require('../models/post'); // 博文model
/*
/* GET home page. 
	router.get('/', function(req, res, next) {
  		res.render('index', { title: 'Express' });
	});
*/


/**
	* @title String '博客首页'  
	* @url String { String } '/post'
	* @callback { Function }[params: req, res]	 
  * @author zhuxl
  * @date 2016/11/13	 
	*/
module.exports = function(app) {
	app.get('/', function(req, res) {
		Post.get(null, function(err, posts) {
			if(err) {
				posts = [];
			}

			res.render('index', 
				{
					title: '欢迎来到我的博客世界',
					user: req.session.user,
					posts: posts,
					success: req.flash('success').toString(),
					error: req.flash('error').toString(),
					stylesheets: [
						'/stylesheets/style.css',
						'/stylesheets/main.css',
						'/stylesheets/base.css'
					]
				}
			);

		});

		
	});
	
	
	
	/**
	  * @title删除博文功能  
	  * @url { String } '/postRemove'
	  * @callback { Function }[params: req, res]	 
    * @author zhuxl
    * @date 2016/11/13	 
	  */
	app.get('/postRemove', function(req, res) {
		var title = req.query.title;
		
		mongodb.open(function(err, db) {
			if(err) {
				return err;
			}

			db.collection('posts', function(err, collection) {
				if(err) {
					mongodb.close();
					return err;
				}

				collection.remove({'title': title},{ w: 1 }, function(err) {
					mongodb.close();
					if(err) {
						return err;
					}

					req.flash('success', '删除成功!');
					res.redirect('/');
				});
			});
		});
	});
	app.get('/reg', function(req, res) {
		res.render('reg', 
			{
				title: '注册',
				user: req.session.user,
				success: req.flash('success').toString(),
				error: req.flash('error').toString(),
				stylesheets: [
					'/stylesheets/style.css',
					'/stylesheets/main.css',
					'/stylesheets/login.css'
				]
			}
		);
	});
	
	/**
	  * @titlle { String } '注册功能'
	  * @url { String } '/reg'
	  * @callback { Function }[params: req, res]	 
    * @params { String: name, String: password, String: email, String: confirm_password }
    * @author zhuxl
    * @date 2016/11/13	 
	  */
	app.post('/reg', function(req,res) {
		var name = req.body.name,
      		password = req.body.password,
      		email = req.body.email,
      		confirm_password = req.body['confirm-password'];
      	var reg = /^(?:\w)+@(?:\w)+\.(?:\w)+$/;
      		if(!reg.test(email)) {
      			req.flash('error', '邮箱格式不正确!');
      			return res.redirect('/reg');
      		}
      		if(password !== confirm_password){
      			req.flash('error', '两次输入的密码不一致!'); 
    			return res.redirect('/reg');//返回注册页
      		}


      		var md5 = crypto.createHash('md5');
   			var password = md5.update(req.body.password).digest('hex');
   			var newUser = new User({
   				name: name,
   				password: password,
   				email: email
   			});


   			 User.get(newUser.name, function (err, user) {
			    if (err) {
			      req.flash('error', err);
			      return res.redirect('/');
			    }
			    if (user) {
			      req.flash('error', '用户已存在!');
			      return res.redirect('/reg');//返回注册页
			    }
			    //如果不存在则新增用户
			    newUser.save(function (err, user) {
			      if (err) {
			        req.flash('error', err);
			        return res.redirect('/reg');//注册失败返回主册页
			      }
			      req.session.user = user;//用户信息存入 session
			      req.flash('success', '注册成功!');
			      res.redirect('/');//注册成功后返回主页
			    });
			  });      		
	});
	
	
	app.get('/login', function(req, res) {
		res.render('login', 
			{
				title: '登录',
				user: req.session.user,
				success: req.flash('success').toString(),
				error: req.flash('error').toString(),
				stylesheets: [
					'/stylesheets/style.css',
					'/stylesheets/main.css',
					'/stylesheets/login.css'
				]
			}
		);
	});
	
	
	/**
	  * @title { String } '登录功能'
	  * @request { String } '/login'
	  * @callback { Function }[params: req, res]	 
    * @params { String: md5, String: password }
    * @author zhuxl
    * @date 2016/11/13	 
	  */
	app.post('/login', function (req, res) {

	  var md5 = crypto.createHash('md5'),
	      password = md5.update(req.body.password).digest('hex');
	  
	  User.get(req.body.name, function (err, user) {
	    if (!user) {
	      req.flash('error', '用户不存在!'); 
	      return res.redirect('/login');
	    }
	    
	    if (user.password != password) {
	      req.flash('error', '密码错误!'); 
	      return res.redirect('/login');
	    }
	    
	    req.session.user = user;
	    req.flash('success', '登陆成功!');
	    res.redirect('/');
	  });
	});	

	
	
 /**
	 * @title { String } '发表博文功能'
	 * @url { String } '/post'
	 * @callback { Function }[params: req, res]	 
   * @params { String: currentUser, Object: post }
   * @author zhuxl
   * @date 2016/11/13	 
	 */
	app.get('/post', function(req, res) {
		res.render('post', 
			{	
				title: '发表',
				user: req.session.user,
				success: req.flash('success').toString(),
				error: req.flash('error').toString(),
				stylesheets: [
					'/stylesheets/style.css',
					'/stylesheets/main.css',
					'/stylesheets/login.css'
				]
			});
	});
	app.post('/post', function(req, res) {
		var currentUser = req.session.user,
			post = new Post(currentUser.name, req.body.title, req.body.post);

			post.save(function(err) {
				if(err) {
					req.flash('error', err);
					return res.redirect('/');
				}

				req.flash('success', 'publish successed!');
				res.redirect('/');
			});
	});
	


 /**
	 * @title { String } '用户退出功能'
	 * @url { String } '/logout'
	 * @callback { Function }[params: req, res]	 
   * @author zhuxl
   * @date 2016/11/13	 
	 */
	app.get('/logout', function(req, res) {
		req.session.user = null;
		req.flash('success', '退出成功!');
		res.redirect('/');
	});

	app.get('/post', function(req, res) {
		res.send(req.query);
	});
	
	/*
	 * @title { String } '获取博文功能'
	 * @url { String } '/userList'
	 * @callback { Function }[params: req, res]	 
   * @author zhuxl
   * @date 2016/11/13	 
	 */
	app.get('/userList', function(req, res) {
		mongodb.open(function(err, db) {
			if(err) {
				mongodb.close();
				return err;
			}
			db.collection('users', function(err, collection) {
				if(err) {
					mongodb.close();
					return err;
				}

				collection.find().toArray(function(err, items) {
					mongodb.close();
					if(err) {
						return err;
					}
					res.render('userList', {
						title: '用户列表',
						userList: items,
						user: req.session.user,
						success: req.flash('success').toString(),
						error: req.flash('error').toString(),
						stylesheets: [
							'/stylesheets/style.css',
							'/stylesheets/main.css',
							'/stylesheets/login.css'
						]
					})
				});
			});


		});
	});
};
